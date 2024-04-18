/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as BaseText, View as BaseView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import Animated, { AnimatedProps } from 'react-native-reanimated';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & BaseText['props'];
export type ViewProps = ThemeProps & BaseView['props'];
export type AnimatedViewProps = ThemeProps & AnimatedProps<import("react-native").ViewProps>

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function getThemeColors() {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme];
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <BaseText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <BaseView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function DefaultView(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <BaseView style={[style]} {...otherProps} />;
}

export function AnimatedView(props: AnimatedViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
};
