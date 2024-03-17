import { HOME_SCREEN } from '@/assets';
import React, { useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, Animated } from 'react-native';
import { LatoText } from './StyledText';

const { width, height } = Dimensions.get('window');

const TestScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const imageWidth = width; // The image will effectively take up roughly 30% of the screen due to the panel covering it
  const panelHeight = height * 0.7; // Panel covers 70% of the screen

  // Animated event for handling the scroll and adjusting the panel's position
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Interpolate the scroll value to translate the panel position
  const panelTranslateY = scrollY.interpolate({
    inputRange: [0, panelHeight],
    outputRange: [0, -panelHeight / 2], // Adjust the output range to control how much the panel moves up
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Image
        source={HOME_SCREEN}
        style={{width: width}}
        resizeMode="contain"
      />
      {/* <Animated.ScrollView
        style={[
          styles.scrollPanel,
          {
            transform: [{ translateY: panelTranslateY }],
          },
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {<LatoText>Test</LatoText>}
      </Animated.ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  image: {
    width: '100%',
    position: 'absolute',
  },
  scrollPanel: {
    marginTop: height * 0.3, // Start the panel 30% down from the top
    height: height, // Make sure the scroll view is tall enough
    width: '100%',
    backgroundColor: 'blue', // Or any other background color for the panel
  },
});

export default TestScreen;
