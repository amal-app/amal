import { Dimensions, Platform, StyleSheet, Text, Image } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { HOME_SCREEN, KNOWLEDGE, PRAYING, QURAN } from '@/assets';
import { View } from '@/components/Themed';
import { LatoText } from '@/components/StyledText';
import { StatusBar } from 'expo-status-bar';

const { width, height: screenHeightWithNotch } = Dimensions.get('window');
const height = screenHeightWithNotch - Constants.statusBarHeight
const IMG_HEIGHT = 300;

const App = () => {
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

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
			<Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} bounces={false}>
				<Animated.Image
					source={HOME_SCREEN}
					style={[styles.image, imageAnimatedStyle]}
				/>
				<View style={{ minHeight: height * 0.9 }}>
          <View style={styles.streaksContainer}>
            <Image source={QURAN} style={{height: 50, width: 50}} />
            <Image source={PRAYING} style={{height: 50, width: 50}} />
            <Image source={KNOWLEDGE} style={{height: 50, width: 50}} />
          </View>
					<LatoText>Test</LatoText>
				</View>
			</Animated.ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: width,
		height: IMG_HEIGHT
	},
  streaksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.175,
  }
});

export default App;