import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Button, Dialog, Icon, makeStyles } from '@rneui/themed';
import { LatoText, OpenSansSemiBoldText } from './StyledText';

interface ExtraMetricProps {
    labelName: string;
    labelValue: () => string;
    dialogVisibleState: [boolean, Dispatch<SetStateAction<boolean>>];
    onDialogPress?: ((event: GestureResponderEvent) => void) | undefined;
    children: ReactNode;
};

const ExtraMetricComponent = ({ labelName, labelValue, dialogVisibleState, onDialogPress, children }: ExtraMetricProps) => {
    const styles = useStyles();

    const [dialogVisible, setDialogVisible] = dialogVisibleState;

    const toggleVisibleDialog = () => {
        setDialogVisible(!dialogVisible);
    };

    return (
        <>
            <View style={styles.inputContainer2}>
                <OpenSansSemiBoldText style={styles.label}>{labelName}</OpenSansSemiBoldText>
                <TouchableOpacity onPress={toggleVisibleDialog} style={styles.click}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <LatoText>{labelValue()}</LatoText>
                        <Icon name="chevron-right"></Icon>
                    </View>
                </TouchableOpacity>
            </View>
            <Dialog
                isVisible={dialogVisible}
                onBackdropPress={toggleVisibleDialog}
                overlayStyle={styles.dialogContainer}
            >
                <Dialog.Title title={`Select ${labelName}`} titleStyle={styles.dialogTitle} />
                <View style={styles.durationInputContainer}>
                    {children}
                </View>
                <Button
                    radius={"lg"}
                    type="solid"
                    onPress={onDialogPress}
                    containerStyle={{ width: '95%', marginTop: 10 }}>{`Set ${labelName}`}</Button>
            </Dialog>
        </>
    );
}

export default ExtraMetricComponent

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