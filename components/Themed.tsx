/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as BaseText, View as BaseView } from 'react-native';

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Colors, useTheme } from '@rneui/themed';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & BaseText['props'];
export type ViewProps = ThemeProps & BaseView['props'];
export type AnimatedViewProps = ThemeProps & AnimatedProps<import("react-native").ViewProps>

export function useThemeColor(colorName: keyof Omit<Colors, 'platform'>) {
  const { theme } = useTheme();
  return theme.colors[colorName];
}

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = useThemeColor('black');

  return <BaseText style={[{ color: color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background');

  return <BaseView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function DefaultView(props: ViewProps) {
  const { style, ...otherProps } = props;
  
  return <BaseView style={[style]} {...otherProps} />;
}

export function AnimatedView(props: AnimatedViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background');

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
};
