import { Dimensions, InteractionManager, NativeModules, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
	AnimationCallback,
	Extrapolation,
	interpolate,
	runOnJS,
	runOnUI,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated';
import { router } from 'expo-router';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { HOME_SCREEN } from '@/assets/images';
import { AnimatedView, View, getThemeColors } from '@/components/Themed';
import StreaksView from '@/components/StreaksView';
import ChallengesView from '@/components/ChallengesView';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import ExpandableFloatingButton from '@/components/ExpandableFloatingButton';
import { useState } from 'react';

const { height: SCREEN_HEIGHT_WITH_NOTCH } = Dimensions.get('window');
const SCREEN_HEIGHT = SCREEN_HEIGHT_WITH_NOTCH - Constants.statusBarHeight;

const SCROLL_VALUE = -SCREEN_HEIGHT * 0.2;
const BOTTOM_PANEL_BORDER_RADIUS = 30;

const HomeScreen = () => {
	const themeColors = getThemeColors();

	const lastGestureDy = useSharedValue(0);
	const animatedValue = useSharedValue(0);
	const opacityValue = useSharedValue(0.0);

	const [isExpanded, setIsExpanded] = useState(false);
	const [displayOverlay, setDisplayOverlay] = useState(false);

	const springAnimation = (direction: string, callback?: AnimationCallback) => {
		"worklet";
		lastGestureDy.value = direction === 'down' ? 0 : SCROLL_VALUE;
		animatedValue.value = withSpring(lastGestureDy.value, {
			overshootClamping: true,
		}, callback);
	};

	const opacityAnimation = (mode: 'on' | 'off') => {
		"worklet";
		if (mode === 'on') {
			setDisplayOverlay(true);
		}

		opacityValue.value = withTiming(mode === 'on' ? 0.85 : 0.0, {
			duration: 300,
		}, () => {
			if (mode === 'off') {
				runOnJS(setDisplayOverlay)(false);
			}
		})
	};

	const pan = Gesture.Pan()
		.onChange((event) => {
			animatedValue.value += event.changeY;
		})
		.onFinalize((event) => {
			lastGestureDy.value += event.translationY;

			if (event.translationY > 0) {
				if (event.translationY <= 25) {
					springAnimation('up');
				} else {
					springAnimation('down');
				}
			} else {
				if (event.translationY >= -25) {
					springAnimation('down');
				} else {
					springAnimation('up', () => runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light));
				}
			}
		});

	const screenTapOnBottomSheetUp = Gesture.Tap()
		.onFinalize((event) => {
			if (animatedValue.value === SCROLL_VALUE) {
				springAnimation('down');
			}
		});

	const screenTapOnAdd = Gesture.Tap()
		.onFinalize((event) => {
			opacityAnimation('off');
			runOnJS(setIsExpanded)(false);
		});

	const bottomSheetAnimation = useAnimatedStyle(() => {
		return {
			borderTopLeftRadius: interpolate(
				animatedValue.value,
				[SCROLL_VALUE, SCROLL_VALUE / 2, 0],
				[BOTTOM_PANEL_BORDER_RADIUS, 0, 0],
				Extrapolation.CLAMP,
			),
			borderTopRightRadius: interpolate(
				animatedValue.value,
				[SCROLL_VALUE, SCROLL_VALUE / 2, 0],
				[BOTTOM_PANEL_BORDER_RADIUS, 0, 0],
				Extrapolation.CLAMP,
			),
			transform: [
				{
					translateY: interpolate(
						animatedValue.value,
						[SCROLL_VALUE, 0],
						[SCROLL_VALUE, 0],
						Extrapolation.CLAMP,
					),
				},
			],
		}
	});

	const opacityStyle = useAnimatedStyle(() => {
		return {
			opacity: opacityValue.value,
		}
	});

	return (
		<GestureHandlerRootView style={styles.container}>
			<AnimatedView style={styles.container}>
				<GestureDetector gesture={screenTapOnBottomSheetUp}>
					<Animated.Image
						source={HOME_SCREEN}
						style={[styles.image]}
					/>
				</GestureDetector>
				<GestureDetector gesture={pan}>
					<AnimatedView style={[styles.panelContainer, bottomSheetAnimation]}>
						<View style={[styles.draggableOval, { backgroundColor: themeColors.accent_3 }]} />
						<StreaksView />

						<ScrollView scrollEventThrottle={16} contentContainerStyle={styles.scrollableContainer}>
							<ChallengesView style={{ marginTop: 10 }} />
						</ScrollView>
					</AnimatedView>
				</GestureDetector>

				{displayOverlay && <GestureDetector gesture={screenTapOnAdd}><AnimatedView style={[styles.overlay, opacityStyle]} /></GestureDetector>}

				<ExpandableFloatingButton 
					isExpanded={isExpanded} 
					setIsExpanded={setIsExpanded} 
					onPress={ () => opacityAnimation(displayOverlay ? 'off' : 'on') } 
					style={styles.addButton} expanded={[
						{
							onPress: () => router.push('/add'),
							icon: "edit",
							label: "Log",
						},
						{
							onPress: () => router.push('/add'),
							icon: "flag",
							label: "Challenge",
						}
					]}
				/>
				<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
			</AnimatedView>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: '100%',
		height: '40%',
	},
	panelContainer: {
		height: '100%',
		alignItems: 'center',
	},
	draggableOval: {
		width: 30,
		height: 5,
		borderRadius: 40,
		opacity: 0.7,
		marginVertical: 7.5,
	},
	scrollableContainer: {
		width: '100%',
		alignItems: 'center',
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'black',
	},
});

export default HomeScreen;