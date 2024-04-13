import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed';
import { LatoText } from '@/components/StyledText';
import React from 'react'

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <LatoText style={styles.title}>index</LatoText>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
	},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddScreen;