import { Text, TextProps } from './Themed';

export function RobotoBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Roboto_700Bold' }]} />;
}

export function OpenSansSemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'OpenSans_600SemiBold' }]} />;
}

export function LatoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Lato_400Regular' }]} />;
}
