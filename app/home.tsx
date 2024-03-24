import { Dimensions, Platform, ScrollView, StyleSheet } from 'react-native';
import Animated, {
	AnimationCallback,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { HOME_SCREEN, KNOWLEDGE, PRAYING, QURAN } from '@/assets/images';
import { AnimatedView, View, getThemeColors } from '@/components/Themed';
import StreaksView from '@/components/StreaksView';
import ChallengesView from '@/components/ChallengesView';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

const { width, height: screenHeightWithNotch } = Dimensions.get('window');
const height = screenHeightWithNotch - Constants.statusBarHeight

const SCROLL_VALUE = -200

const App = () => {
	const themeColors = getThemeColors()
	const styles = styleSheet(themeColors)

	const lastGestureDy = useSharedValue(0);
	const animatedValue = useSharedValue(0);

	const pan = Gesture.Pan()
		.onChange((event) => {
			animatedValue.value += event.changeY;
		})
		.onFinalize((event) => {
			const springAnimation = (direction: string, callback?: AnimationCallback) => {
				// TODO I have no idea why this must be declared within onFinalize?
				lastGestureDy.value = direction === 'down' ? 0 : SCROLL_VALUE;
				animatedValue.value = withSpring(lastGestureDy.value, {
					overshootClamping: true,
				}, callback);
			};

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
					springAnimation('up', () => {
						runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
					});
				}
			}
		});

	const bottomSheetAnimation = useAnimatedStyle(() => {
		return {
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
						<View style={styles.draggableOval} />
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

const styleSheet = (themeColors: { base: string, accent_1: string, accent_2: string, accent_3: string }) => StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: width,
		height: '40%',
	},
	panelContainer: {
		height: '100%',
		alignItems: 'center',
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
	},
	draggableOval: {
		width: 30,
		height: 5,
		borderRadius: 40,
		backgroundColor: themeColors.accent_3,
		opacity: 0.7,
		marginVertical: 7.5,
	},
	scrollableContainer: {
		width: '100%',
		alignItems: 'center',
	},
});

export default App;