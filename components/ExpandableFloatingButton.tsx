import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ViewProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getThemeColors } from './Themed';
import { LatoText } from './StyledText';

type ExpandableFloatingButtonProps = {
    onPress: () => void; // todo make optional
    expanded: ExpandedFloatingButtonProps[];
} & View['props']

interface ExpandedFloatingButtonProps {
    onPress: () => void;
    icon: keyof typeof AntDesign.glyphMap;
    label: string;
}

const ExpandedFloatingButton = ({ onPress, icon, label }: ExpandedFloatingButtonProps) => {
    const themeColors = getThemeColors();

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.secondary_1 }]} onPress={onPress}>
                <AntDesign name={icon} size={36} color={themeColors.secondary_2} />
            </TouchableOpacity>
            <LatoText style={styles.buttonText}>{label}</LatoText>
        </View>
    )
}

const ExpandableFloatingButton = ({ onPress, expanded, ...viewProps }: ExpandableFloatingButtonProps) => {
    const { style, ...otherProps } = viewProps

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={[style, styles.container]} {...otherProps}>
            {isExpanded && expanded.map(button =>
                <ExpandedFloatingButton {...button} />
            )}
            <ExpandedFloatingButton onPress={() => {
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
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 8,
        marginTop: 2,
    },
});

export default ExpandableFloatingButton;