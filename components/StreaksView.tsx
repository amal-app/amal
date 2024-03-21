import React from 'react'
import { View, getThemeColors } from './Themed'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { OpenSansSemiBoldText } from './StyledText'
import { KNOWLEDGE, PRAYING, QURAN } from '@/assets/images'

interface StreakProps {
    image: ImageSourcePropType;
    count: number;
};

const IncompleteStreak = ({ image, count }: StreakProps) => {
    const themeColors = getThemeColors();
    const styles = styleSheet(themeColors);

    return (
        <View style={styles.streakItemNotDone}>
            <Image source={image} style={styles.streakIcon} resizeMode='center' />
            <View style={{ ...styles.streakCircle, backgroundColor: themeColors.accent_3 }}>
                <OpenSansSemiBoldText
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{ ...styles.streakText, color: themeColors.secondary_2 }}>
                    {count}
                </OpenSansSemiBoldText>
            </View>
        </View>
    );
};

const CompleteStreak = ({ image, count }: StreakProps) => {
    const themeColors = getThemeColors();
    const styles = styleSheet(themeColors);

    return (
        <View style={styles.streakItemDone}>
            <Image source={image} style={styles.streakIcon} resizeMode='center' />
            <View style={{ ...styles.streakCircle, backgroundColor: themeColors.accent_2 }}>
                <OpenSansSemiBoldText
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{ ...styles.streakText, color: themeColors.accent_1 }}>
                    {count}
                </OpenSansSemiBoldText>
            </View>
        </View>
    );
};

const StreaksView = () => {
    const themeColors = getThemeColors()
    const styles = styleSheet(themeColors)

    return (
        <View style={styles.streaksContainer}>
            <IncompleteStreak image={QURAN} count={82} />
            <View style={styles.separator} />
            <CompleteStreak image={PRAYING} count={112} />
            <View style={styles.separator} />
            <IncompleteStreak image={KNOWLEDGE} count={6} />
        </View>
    )
};

const styleSheet = (themeColors: { accent_1: string }) => StyleSheet.create({
    streaksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
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

export default StreaksView;