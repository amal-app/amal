import { Dimensions, Platform, ScrollView, StyleSheet } from 'react-native';
import Animated, {
	AnimationCallback,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
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

const { height: SCREEN_HEIGHT_WITH_NOTCH } = Dimensions.get('window');
const SCREEN_HEIGHT = SCREEN_HEIGHT_WITH_NOTCH - Constants.statusBarHeight;

const SCROLL_VALUE = -SCREEN_HEIGHT * 0.2;
const BOTTOM_PANEL_BORDER_RADIUS = 30;

const App = () => {
	const themeColors = getThemeColors();

	const lastGestureDy = useSharedValue(0);
	const animatedValue = useSharedValue(0);

	const springAnimation = (direction: string, callback?: AnimationCallback) => {
		// TODO I have no idea why this must be declared within onFinalize?
		lastGestureDy.value = direction === 'down' ? 0 : SCROLL_VALUE;
		animatedValue.value = withSpring(lastGestureDy.value, {
			overshootClamping: true,
		}, callback);
	};

	const pan = Gesture.Pan()
		.onChange((event) => {
			animatedValue.value += event.changeY;
		})
		.onFinalize((event) => {
			lastGestureDy.value += event.translationY;

			if (event.translationY > 0) {
				if (event.translationY <= 25) {
					runOnJS(springAnimation)('up');
				} else {
					runOnJS(springAnimation)('down');
				}
			} else {
				if (event.translationY >= -25) {
					runOnJS(springAnimation)('down');
				} else {
					runOnJS(springAnimation)('up', () => runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light));
				}
			}
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

	return (
		<GestureHandlerRootView style={styles.container}>
			<AnimatedView style={styles.container}>
				<Animated.Image
					source={HOME_SCREEN}
					style={[styles.image/*, imageAnimatedStyle*/]}
				/>
				<GestureDetector gesture={pan}>
					<AnimatedView style={[styles.panelContainer, bottomSheetAnimation]}>
						<View style={[styles.draggableOval, { backgroundColor: themeColors.accent_3 }]} />
						<StreaksView />

						<ScrollView scrollEventThrottle={16} contentContainerStyle={styles.scrollableContainer}>
							<ChallengesView style={{ marginTop: 10 }} />
						</ScrollView>
					</AnimatedView>
				</GestureDetector>

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
});

export default App;