import React, { useContext } from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from '../styles';
import { AppContext, DialogType } from '../store/utils';
import { navigate } from '../services/navigation';

const dialogMessages = new Map<DialogType, string>([
    [DialogType.NewPhotoAlert, 'Are you sure you want to take a new photo?'],
    [DialogType.ResetAlert, 'Are you sure you want to reset the app?'],
    [DialogType.PermissionAlert, 'You need to grant camera permissions to use this app.'],
    [DialogType.Error, 'An error occurred. Please try again.'],
    [DialogType.SaveSettings, 'Settings saved successfully.'],
]);

const buttonText = new Map<DialogType, string>([
    [DialogType.NewPhotoAlert, 'Yes'],
    [DialogType.ResetAlert, 'Yes'],
    [DialogType.PermissionAlert, 'Okay'],
    [DialogType.Error, 'Okay'],
    [DialogType.SaveSettings, 'Okay'],
]);

const Dialog = () => {
    const appContext = useContext(AppContext);

    const closeDialog = (type: DialogType) => {
        switch (type) {
            case DialogType.NewPhotoAlert:
                appContext.setShowPhotoSelector(true);
                break;
            case DialogType.ResetAlert:
                appContext.reset();
                break;
            case DialogType.PermissionAlert:
            case DialogType.Error:
            case DialogType.SaveSettings:
                break;
        }
        appContext.setShowDialog(false);
    };

    return (
        <Modal visible={appContext.showDialog} animationType="slide" transparent={true}>
            <TouchableWithoutFeedback style={styles.modal} onPress={() => appContext.setShowDialog(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.headerText, { color: colors.primary }]}>
                            {dialogMessages.get(appContext.dialogType)}
                        </Text>
                        {appContext.dialogType === DialogType.Error && (
                            <Text style={[styles.bodyText, { color: colors.primary, marginTop: 10 }]}>
                                {appContext.errorMessage}
                            </Text>
                        )}
                        <View style={styles.divider} />
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => closeDialog(appContext.dialogType)}>
                            <Text style={styles.bodyText}>{buttonText.get(appContext.dialogType)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default Dialog;
