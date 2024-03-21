import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { HOME_SCREEN, KNOWLEDGE, PRAYING, QURAN } from '@/assets/images';
import { View, getThemeColors } from '@/components/Themed';
import StreaksView from '@/components/StreaksView';

const { width, height: screenHeightWithNotch } = Dimensions.get('window');
const height = screenHeightWithNotch - Constants.statusBarHeight
const IMG_HEIGHT = 300;

const App = () => {
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

	const themeColors = getThemeColors()
	const styles = styleSheet(themeColors)

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[-IMG_HEIGHT, 0, IMG_HEIGHT]
					)
				},
			]
		};
	});

	return (
		<View style={styles.container}>
			<Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.Image
					source={HOME_SCREEN}
					style={[styles.image, imageAnimatedStyle]}
				/>
				<View style={styles.scrollableContainer}>
					<View style={styles.draggableOval} />
					<StreaksView />
				</View>
			</Animated.ScrollView>
		</View>
	);
};

const styleSheet = (themeColors: { base: string, accent_1: string, accent_2: string, accent_3: string }) => StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: width,
		height: IMG_HEIGHT
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
		minHeight: height * 0.9,
		alignItems: 'center',
		borderTopStartRadius: 20,
  		borderTopEndRadius: 20,
	},
});

export default App;