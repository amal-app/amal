import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import { LatoText, RobotoBoldText } from './StyledText';
import { ViewProps, getThemeColors } from './Themed';

const ChallengeView = () => {
    const themeColors = getThemeColors()

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.secondary_1, borderRadius: 50, marginHorizontal: 10, marginVertical: 2, padding: 10, flexDirection: 'row', }}>
            <View style={{flex: 8}}>
                <RobotoBoldText>Test</RobotoBoldText>
                <LatoText>Test2</LatoText>
            </View>
            <View style={{flex: 2}}>
                <Button title='Button' />
            </View>
        </View>
    )
}

const ChallengesView = (props: ViewProps) => {
    const { style } = props;

    return (
        <View style={[{ width: '100%', alignItems: 'center' }, style]}>
            {Array(15).fill(0).map((_, index) => <ChallengeView />)}
        </View>
    )
};

const styles = StyleSheet.create({});

export default ChallengesView;