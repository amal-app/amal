import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { View as ThemedView } from '@/components/Themed'
import { Button, Dialog, Icon, Text, makeStyles } from '@rneui/themed'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import { LatoText, OpenSansSemiBoldText, RobotoBoldText, scaleText } from '@/components/StyledText'

const LogQuranScreen = () => {
    const { fontSize, onTextLayout } = scaleText();
    const styles = useStyles();

    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');

    const surahs = [
        { name: 'Surah Baqarah', verses: Array.from({ length: 286 + 1 }, (_, i) => i == 0 ? '' : 'Verse ' + i.toString()) },
        { name: 'Surah Imran', verses: Array.from({ length: 200 + 1 }, (_, i) => i == 0 ? '' : 'Verse ' + i.toString()) },
    ];

    const [selectedSurah, setSelectedSurah] = useState<string>(surahs[0].name);
    const [selectedVerse, setSelectedVerse] = useState<string>(surahs[0].verses[0]);

    const [durationVisible, setDurationVisible] = useState(false);
    const [lastVerseVisible, setLastVerseVisible] = useState(false);

    const toggleDurationVisibleDialog = () => {
        setDurationVisible(!durationVisible);
    };

    const toggleLastVerseDialog = () => {
        setLastVerseVisible(!lastVerseVisible);
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Log Quran' }} />
            <ThemedView style={styles.container}>
                {/* Base screen for logging quran */}
                <RobotoBoldText style={{ fontSize: fontSize, marginBottom: 5, }} onLayout={onTextLayout}>Want to log anything else?</RobotoBoldText>
                <View style={styles.inputContainer2}>
                    <OpenSansSemiBoldText style={styles.label}>Duration</OpenSansSemiBoldText>
                    <TouchableOpacity onPress={toggleDurationVisibleDialog} style={styles.click}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <LatoText>Select duration...</LatoText>
                            <Icon name="chevron-right"></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer2}>
                    <OpenSansSemiBoldText style={styles.label}>Last Verse</OpenSansSemiBoldText>
                    <TouchableOpacity onPress={toggleLastVerseDialog} style={styles.click}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <LatoText>Select last Quran verse...</LatoText>
                            <Icon name="chevron-right"></Icon>
                        </View>
                    </TouchableOpacity>
                </View>

                <LatoText style={{ marginTop: 5 }}>Note: The above options are <OpenSansSemiBoldText>optional</OpenSansSemiBoldText>.</LatoText>

                <Button
                    radius={"lg"}
                    type="solid"
                    containerStyle={{ width: '95%', marginTop: 5 }}>Log</Button>

                {/* Dialog for duration input */}
                <Dialog
                    isVisible={durationVisible}
                    onBackdropPress={toggleDurationVisibleDialog}
                    overlayStyle={styles.dialogContainer}
                >
                    <Dialog.Title title="Select Duration" titleStyle={styles.dialogTitle} />
                    <View style={styles.durationInputContainer}>
                        <Picker
                            selectedValue={hours}
                            onValueChange={(itemValue) => setHours(itemValue.toString())}
                            style={styles.durationPicker}
                        >
                            {[...Array(24)].map((_, i) => (
                                <Picker.Item key={i} label={i.toString()} value={i.toString()} />
                            ))}
                        </Picker>
                        <Text>hours</Text>
                        <Picker
                            selectedValue={minutes}
                            onValueChange={(itemValue) => setMinutes(itemValue.toString())}
                            style={styles.durationPicker}
                        >
                            {[...Array(4)].map((_, i) => (
                                <Picker.Item key={i} label={(i * 15).toString()} value={(i * 15).toString()} />
                            ))}
                        </Picker>
                        <Text>minutes</Text>
                    </View>
                    <Button
                        radius={"lg"}
                        type="solid"
                        containerStyle={{ width: '95%', marginTop: 10 }}>Set Duration</Button>
                </Dialog>

                {/* Dialog for last verse input */}
                <Dialog
                    isVisible={lastVerseVisible}
                    onBackdropPress={toggleLastVerseDialog}
                    overlayStyle={styles.dialogContainer}
                >
                    <Dialog.Title title="Select Last Verse" titleStyle={styles.dialogTitle} />
                    <View style={[styles.inputContainer, { marginTop: 5 }]}>
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
                        <Button
                            radius={"lg"}
                            type="solid"
                            containerStyle={{ width: '95%', marginTop: 10 }}>Set Last Verse</Button>
                    </View>
                </Dialog>
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
    dialogContainer: {
        width: '95%',
        backgroundColor: theme.colors.background,
    },
    dialogTitle: {
        color: theme.colors.black,
    },
    inputContainer2: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: theme.colors.secondary,
    },
    label: {
        flex: 3,
    },
    click: {
        flex: 5,
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
    },
    durationInputContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary,
        borderRadius: 40,
    },
    durationPicker: {
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