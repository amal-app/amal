import { ImageSourcePropType, StyleSheet } from 'react-native'
import { DefaultView, View } from '@/components/Themed';
import { Button, ButtonGroup, Icon, Image, ThemeConsumer, useTheme } from '@rneui/themed';
import React, { useState } from 'react'
import { KNOWLEDGE, PRAYING, QURAN } from '@/assets/images';
import { LatoText, RobotoBoldText, scaleText } from '@/components/StyledText';
import { Stack, router } from 'expo-router';

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

const LogAmalScreen = () => {
  const { theme } = useTheme();
  const { fontSize, onTextLayout } = scaleText();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <Stack.Screen options={{ title: 'Log Amal' }} />
      <View style={styles.container}>
        <RobotoBoldText style={{ fontSize: fontSize }} onLayout={onTextLayout}>What amal have you done?</RobotoBoldText>
        <ButtonGroup
          buttons={[
            <LogButton image={QURAN} text='Quran' />,
            <LogButton image={PRAYING} text='Prayer' />,
            <LogButton image={KNOWLEDGE} text={`Islamic\nKnoweldge`} />,
          ]}
          containerStyle={[styles.buttonGroupContainer, {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.black,
          }]}
          innerBorderStyle={{ color: theme.colors.black }}
          selectedButtonStyle={{ backgroundColor: theme.colors.secondary }}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
        />
        <Button
          radius={"lg"}
          type="solid"
          containerStyle={{ width: '95%' }}
          disabledStyle={{ backgroundColor: theme.colors.grey0 }}
          onPress={() => router.push('/add/log/quran')}
          disabled={selectedIndex === -1}>Next</Button>
      </View>
    </>
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

export default LogAmalScreen;