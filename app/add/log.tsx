import { ImageSourcePropType, StyleSheet } from 'react-native'
import { DefaultView, View } from '@/components/Themed';
import { ButtonGroup, Image, useTheme } from '@rneui/themed';
import React, { useState } from 'react'
import { KNOWLEDGE, PRAYING, QURAN } from '@/assets/images';
import { LatoText, RobotoBoldText, scaleText } from '@/components/StyledText';

interface LogButtonProps {
  image: ImageSourcePropType;
  text: string;
};

const LogButton = ({ image, text }: LogButtonProps) => {
  return (
    <DefaultView style={styles.logButtonContainer}>
      <Image source={image} style={{
        height: 50,
        width: 50
      }}
        resizeMode='center' />
      <LatoText style={styles.textStyle}>{text}</LatoText>
    </DefaultView>
  )
}

const AddScreen = () => {
  const { theme } = useTheme();
  const { fontSize, onTextLayout } = scaleText();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <RobotoBoldText style={{ fontSize: fontSize }} onLayout={onTextLayout}>What amal have you done?</RobotoBoldText>
      <ButtonGroup
        buttons={[
          <LogButton image={QURAN} text='Quran' />,
          <LogButton image={PRAYING} text='Prayer' />,
          <LogButton image={KNOWLEDGE} text={`Islamic\nKnoweldge`} />,
        ]}
        containerStyle={[styles.buttonGroupContainer, { backgroundColor: theme.colors.background }]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroupContainer: {
    height: 100,
  },
  logButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
  }
});

export default AddScreen;