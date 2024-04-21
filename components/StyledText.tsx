import { useRef, useState } from 'react';
import { Text, TextProps } from './Themed';
import { Dimensions, LayoutChangeEvent } from 'react-native';

export function RobotoBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Roboto_700Bold' }]} />;
}

export function OpenSansSemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'OpenSans_600SemiBold' }]} />;
}

export function LatoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Lato_400Regular' }]} />;
}

export function scaleText() {
  const [fontSize, setFontSize] = useState(16);

  const onTextLayout = (event: LayoutChangeEvent) => {
    const { width } = Dimensions.get('window');
    const textWidth = event.nativeEvent.layout.width;

    const newFontSize = (fontSize * width) / textWidth;
    setFontSize(Math.trunc(newFontSize - 2));
  };

  return {fontSize, onTextLayout}
}
