import { Button, Image, StyleSheet } from 'react-native'
import React from 'react'
import { OpenSansSemiBoldText, RobotoBoldText } from './StyledText';
import { DefaultView, View, ViewProps } from './Themed';
import { FEMALE, MALE } from '@/assets/images';
import { useTheme } from '@rneui/themed';

const GetRandomImage = () => {
    return Math.round(Math.random()) === 1 ? MALE : FEMALE
}

const ChallengeView = (props: ViewProps) => {
    const { theme } = useTheme();
    const { style } = props;

    return (
        <DefaultView style={[styles.challengeContainer, style, { backgroundColor: theme.colors.secondary }]}>
            <DefaultView style={{ flex: 2 }}>
                <DefaultView style={{flex: 1}}>
                    <DefaultView style={{flex: 1, flexDirection: 'row'}}>
                        <Image source={GetRandomImage()} style={{flex: 1, height: 50, resizeMode: 'contain'}} />
                        {Math.round(Math.random()) === 1 && <Image source={GetRandomImage()} style={{flex: 1, height: 50, resizeMode: 'contain'}} />}
                    </DefaultView>
                </DefaultView>
            </DefaultView>
            <DefaultView style={{ flex: 6, marginLeft: 10 }}>
                <RobotoBoldText style={{ fontSize: 16 }}>Family Challenge</RobotoBoldText>
                <OpenSansSemiBoldText>Quran Challenge</OpenSansSemiBoldText>
            </DefaultView>
            <DefaultView style={{ flex: 2 }}>
                <Button title='View' />
            </DefaultView>
        </DefaultView>
    )
}

const ChallengesView = (props: ViewProps) => {
    const { style } = props;

    return (
        <DefaultView style={[styles.challengesContainer, style]}>
            {Array(15).fill(0).map((_, index) => <ChallengeView key={index} />)}
        </DefaultView>
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