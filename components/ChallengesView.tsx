import { Button, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { LatoText, OpenSansSemiBoldText, RobotoBoldText } from './StyledText';
import { ViewProps, getThemeColors } from './Themed';
import { FEMALE, MALE } from '@/assets/images';

const GetRandomImage = () => {
    return Math.round(Math.random()) === 1 ? MALE : FEMALE
}

const ChallengeView = (props: ViewProps) => {
    const { style } = props;
    const themeColors = getThemeColors();

    return (
        <View style={[styles.challengeContainer, { backgroundColor: themeColors.secondary_1 }, style]}>
            <View style={{ flex: 2 }}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image source={GetRandomImage()} style={{flex: 1, height: 50, resizeMode: 'contain'}} />
                        {Math.round(Math.random()) === 1 && <Image source={GetRandomImage()} style={{flex: 1, height: 50, resizeMode: 'contain'}} />}
                        {Math.round(Math.random()) === 1 && <Image source={GetRandomImage()} style={{flex: 1, height: 50, resizeMode: 'contain'}} />}
                    </View>
                </View>
            </View>
            <View style={{ flex: 6, marginLeft: 10 }}>
                <RobotoBoldText style={{ fontSize: 16 }}>Family Challenge</RobotoBoldText>
                <OpenSansSemiBoldText>Quran Challenge</OpenSansSemiBoldText>
            </View>
            <View style={{ flex: 2 }}>
                <Button title='View' />
            </View>
        </View>
    )
}

const ChallengesView = (props: ViewProps) => {
    const { style } = props;

    return (
        <View style={[styles.challengesContainer, style]}>
            {Array(15).fill(0).map((_, index) => <ChallengeView key={index} />)}
        </View>
    )
};

const styles = StyleSheet.create({
    challengesContainer: {
        width: '100%',
        alignItems: 'center',
    },
    challengeContainer: {
        flex: 1,
        height: 75,
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 2,
        padding: 10,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
    }
});

export default ChallengesView;