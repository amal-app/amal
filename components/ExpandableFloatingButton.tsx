import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ViewProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LatoText } from './StyledText';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useTheme } from '@rneui/themed';

type ExpandableFloatingButtonProps = {
    onPress: () => void;
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>
    expanded: ExpandedFloatingButtonProps[];
} & View['props'];

interface ExpandedFloatingButtonProps {
    onPress: () => void;
    icon: keyof typeof AntDesign.glyphMap;
    label: string;
};

const ExpandedFloatingButton = ({ onPress, icon, label }: ExpandedFloatingButtonProps) => {
    const { theme } = useTheme();

    return (
        <Animated.View style={styles.buttonContainer} entering={ZoomIn} >
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.secondary }]} onPress={onPress}>
                <AntDesign name={icon} size={36} color={theme.colors.black} />
            </TouchableOpacity>
            <LatoText style={styles.buttonText}>{label}</LatoText>
        </Animated.View>
    );
};

const ExpandableFloatingButton = ({ onPress, isExpanded, setIsExpanded, expanded, ...viewProps }: ExpandableFloatingButtonProps) => {
    const { style, ...otherProps } = viewProps

    return (
        <View style={[style, styles.container]} {...otherProps}>
            {isExpanded && expanded.map(button =>
                <ExpandedFloatingButton key={button.label} {...button} />
            )}
            <ExpandedFloatingButton key={"toggle"} onPress={() => {
                setIsExpanded(!isExpanded);
                onPress();
            }} icon={isExpanded ? 'close' : 'plus'} label='' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    buttonContainer: {
        alignItems: "center",
        marginLeft: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 8,
        marginTop: 2,
    },
});

export default ExpandableFloatingButton;