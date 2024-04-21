import { View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { View as ThemedView } from '@/components/Themed'
import { Button, Text, makeStyles } from '@rneui/themed'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import { RobotoBoldText } from '@/components/StyledText'

const LogQuranScreen = () => {
    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');

    const surahs = [
        { name: 'Surah Baqarah', verses: Array.from({ length: 286 + 1 }, (_, i) => i == 0 ? '' : 'Verse ' + i.toString()) },
        { name: 'Surah Imran', verses: Array.from({ length: 200 + 1 }, (_, i) => i == 0 ? '' : 'Verse ' + i.toString()) },
    ];
    
    const [selectedSurah, setSelectedSurah] = useState<string>(surahs[0].name);
    const [selectedVerse, setSelectedVerse] = useState<string>(surahs[0].verses[0]);

    const handleLog = () => {
        // Handle logging here, e.g., sending the data to a server
        console.log('Logged:', { hours, minutes, selectedSurah, selectedVerse });
    };

    const styles = useStyles();

    return (
        <>
            <Stack.Screen options={{ title: 'Log Quran' }} />
            <ThemedView style={styles.container}>
                {/* Time Input */}
                <View style={styles.inputContainer}>
                    <RobotoBoldText style={{ fontSize: 24 }}>Time</RobotoBoldText>
                    <View style={styles.timeInputContainer}>
                        <Picker
                            selectedValue={hours}
                            onValueChange={(itemValue) => setHours(itemValue.toString())}
                            style={styles.timePicker}
                        >
                            {[...Array(24)].map((_, i) => (
                                <Picker.Item key={i} label={i.toString()} value={i.toString()} />
                            ))}
                        </Picker>
                        <Text>hours</Text>
                        <Picker
                            selectedValue={minutes}
                            onValueChange={(itemValue) => setMinutes(itemValue.toString())}
                            style={styles.timePicker}
                        >
                            {[...Array(3)].map((_, i) => (
                                <Picker.Item key={i} label={((i + 1) * 15).toString()} value={((i + 1) * 15).toString()} />
                            ))}
                        </Picker>
                        <Text>minutes</Text>
                    </View>
                </View>

                {/* Length Input */}
                <View style={[styles.inputContainer, {marginTop: 5}]}>
                    <RobotoBoldText style={{ fontSize: 24 }}>Length</RobotoBoldText>
                    <View style={styles.lengthInputContainer}>
                        <PickerIOS
                            selectedValue={selectedSurah}
                            onValueChange={(itemValue) => {
                                if (itemValue === null) {
                                    return;
                                }
                                setSelectedSurah(itemValue.toString());
                                setSelectedVerse(surahs.find((s) => s.name === itemValue)?.verses[0]!);
                            }}
                            style={styles.surahPicker}
                        >
                            {surahs.map((surah) => (
                                <Picker.Item key={surah.name} label={surah.name} value={surah.name} />
                            ))}
                        </PickerIOS>
                        <PickerIOS
                            selectedValue={selectedVerse}
                            onValueChange={(itemValue) => {
                                if (itemValue === null) {
                                    return;
                                }
                                setSelectedVerse(itemValue.toString());
                            }}
                            style={styles.versePicker}
                        >
                            {surahs.find((s) => s.name === selectedSurah)?.verses.map((verse) => (
                                <Picker.Item key={verse} label={verse} value={verse} />
                            ))}
                        </PickerIOS>
                    </View>
                </View>

                {/* Log Button */}
                <Button
                  radius={"lg"}
                  type="solid"
                  containerStyle={{ width: '95%', marginTop: 10 }}>Log</Button>
            </ThemedView>
        </>
    )
}

export default LogQuranScreen

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
    },
    timeInputContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary,
		borderRadius: 40,
    },
    timePicker: {
        width: 100,
    },
    lengthInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary,
		borderRadius: 40,
    },
    surahPicker: {
        width: 200,
    },
    versePicker: {
        width: 175,
    },
    logButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    logButtonText: {
        color: '#fff',
        fontSize: 16,
    },
}));