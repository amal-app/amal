import { Dimensions, Platform, StyleSheet, Text, Image } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { HOME_SCREEN, KNOWLEDGE, PRAYING, QURAN } from '@/assets';
import { View, getThemeColors } from '@/components/Themed';
import { LatoText, OpenSansSemiBoldText } from '@/components/StyledText';

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
					<View style={styles.draggableContainer}>
						<View style={styles.draggableOval} />
					</View>
					<View style={styles.streaksContainer}>
						<View style={styles.streakItemNotDone}>
							<Image source={QURAN} style={styles.streakIcon} resizeMode='center' />
							<View style={{ ...styles.streakCircle, backgroundColor: themeColors.accent_3 }}>
								<OpenSansSemiBoldText 
									adjustsFontSizeToFit 
									numberOfLines={1} 
									style={{...styles.streakText, color: themeColors.secondary_2 }}>
										82
								</OpenSansSemiBoldText>
							</View>
						</View>
						<View style={styles.separator} />
						<View style={styles.streakItemDone}>
							<Image source={PRAYING} style={styles.streakIcon} resizeMode='center' />
							<View style={{ ...styles.streakCircle, backgroundColor: themeColors.accent_2 }}>
								<OpenSansSemiBoldText 
									adjustsFontSizeToFit 
									numberOfLines={1} 
									style={{...styles.streakText, color: themeColors.accent_1, }}>
										112
								</OpenSansSemiBoldText>
							</View>
						</View>
						<View style={styles.separator} />
						<View style={styles.streakItemNotDone}>
							<Image source={KNOWLEDGE} style={styles.streakIcon} resizeMode='center' />
							<View style={{ ...styles.streakCircle, backgroundColor: themeColors.accent_3 }}>
								<OpenSansSemiBoldText 
									adjustsFontSizeToFit 
									numberOfLines={1} 
									style={{...styles.streakText, color: themeColors.secondary_2, }}>
										6
								</OpenSansSemiBoldText>
							</View>
						</View>
					</View>
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
	draggableContainer: { 
		width: '100%', 
		alignItems: 'center',
		marginVertical: 7.5,
	},
	draggableOval: {
		width: 30,
		height: 5,
		borderRadius: 40,
		backgroundColor: themeColors.accent_3,
		opacity: 0.7
	},
	scrollableContainer: {
		minHeight: height * 0.9,
	},
	streaksContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: width * 0.1,
	},
	streakItemNotDone: {
		flexDirection: 'row',
		alignItems: 'center',
		opacity: 0.75,
	},
	streakItemDone: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	streakIcon: {
		height: 50,
		width: 50
	},
	streakCircle: {
		marginLeft: 5,
		width: 40,
		height: 40,
		borderRadius: 20,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	streakText: {
		fontSize: 24,
	},
	separator: {
		width: 1,
		height: '100%',
		backgroundColor: themeColors.accent_1,
	},
});

export default App;