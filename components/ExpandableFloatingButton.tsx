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

const ExpandableFloatingButton = ({ onPress, expanded, ...viewProps }: ExpandableFloatingButtonProps) => {
    const { style, ...otherProps } = viewProps

    const themeColors = getThemeColors();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={[style, styles.container]} {...otherProps}>
            {isExpanded && expanded.map(button =>
                <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.secondary_1 }]}>
                    <AntDesign name={button.icon} size={36} color={themeColors.secondary_2} />
                    {/* <LatoText style={styles.buttonText}>{button.label}</LatoText> */}
                </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.secondary_1 }]} onPress={ () => {
                setIsExpanded(!isExpanded);
                onPress();
             } }>
                <AntDesign name={isExpanded ? "close" : "plus"} size={36} color={themeColors.secondary_2} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    button: {
        width: 56,
        height: 56,
        marginLeft: 10,
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
        fontSize: 12,
        marginLeft: 5,
    },
});

export default ExpandableFloatingButton;