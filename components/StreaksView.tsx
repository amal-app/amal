import React from 'react'
import { View } from './Themed'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { OpenSansSemiBoldText } from './StyledText'
import { KNOWLEDGE, PRAYING, QURAN } from '@/assets/images'
import { useTheme } from '@rneui/themed'
import { theme } from '@/constants/Colors'

interface StreakProps {
    image: ImageSourcePropType;
    count: number;
};

const IncompleteStreak = ({ image, count }: StreakProps) => {
    const { theme } = useTheme();
    return (
        <View style={styles.streakItemNotDone}>
            <Image source={image} style={styles.streakIcon} resizeMode='center' />
            <View style={{ ...styles.streakCircle, backgroundColor: theme.colors.grey1 }}>
                <OpenSansSemiBoldText
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{ ...styles.streakText, color: theme.colors.black }}>
                    {count}
                </OpenSansSemiBoldText>
            </View>
        </View>
    );
};

const CompleteStreak = ({ image, count }: StreakProps) => {
    const { theme } = useTheme();
    return (
        <View style={styles.streakItemDone}>
            <Image source={image} style={styles.streakIcon} resizeMode='center' />
            <View style={{ ...styles.streakCircle, backgroundColor: theme.colors.success }}>
                <OpenSansSemiBoldText
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{ ...styles.streakText, color: theme.colors.warning }}>
                    {count}
                </OpenSansSemiBoldText>
            </View>
        </View>
    );
};

const StreaksView = () => {
    const { theme } = useTheme();
    return (
        <View style={styles.streaksContainer}>
            <IncompleteStreak image={QURAN} count={82} />
            <View style={[styles.separator, {backgroundColor: theme.colors.warning}]} />
            <CompleteStreak image={PRAYING} count={112} />
            <View style={[styles.separator, {backgroundColor: theme.colors.warning}]} />
            <IncompleteStreak image={KNOWLEDGE} count={6} />
        </View>
    )
};

const styles = StyleSheet.create({
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
    },
});

export default StreaksView;