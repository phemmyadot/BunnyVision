import React, { useContext } from 'react';
import { View, Text, Platform, Alert, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles';
import { AppContext, DialogType } from '../utils';

interface ImageSelectorProps {
    onImageSelected: (base64EncodedImage?: string | null) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelected }) => {
    const appContext = useContext(AppContext);
    const insets = useSafeAreaInsets();

    const verifyPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.', [
                    { text: 'Okay' },
                ]);
                return false;
            }
        }
        return true;
    };

    const takeImageHandler = async () => {
        appContext.setShowPhotoSelector(false);
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            appContext.setDialogType(DialogType.PermissionAlert);
            appContext.setShowDialog(true);
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            aspect: [16, 9],
            quality: 0,
            base64: true,
        });
        if (!image.canceled) {
            appContext.reset();
            appContext.setLoading(true);
            appContext.setImage(image.assets[0].uri);
            onImageSelected(image.assets[0].base64);
        }
    };

    const pickImageHandler = async () => {
        appContext.setShowPhotoSelector(false);
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await ImagePicker.launchImageLibraryAsync({
            aspect: [16, 9],
            quality: 0,
            base64: true,
        });

        if (!image.canceled) {
            appContext.reset();
            appContext.setLoading(true);
            appContext.setImage(image.assets[0].uri);
            onImageSelected(image.assets[0].base64);
        }
    };

    return (
        <>
            <Modal visible={appContext.showPhotoSelector} animationType="slide" transparent={true}>
                <TouchableWithoutFeedback onPress={() => appContext.setShowPhotoSelector(false)}>
                    <View style={styles.photoModeSelector}>
                        <View style={[styles.photoSelectorButtonsContainer, { paddingBottom: insets.bottom + 20 }]}>
                            <TouchableOpacity style={styles.photoSelectorButton} onPress={takeImageHandler}>
                                <Text style={styles.photoSelectorButtonText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.photoSelectorButton} onPress={pickImageHandler}>
                                <Text style={styles.photoSelectorButtonText}>Pick Image from Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default ImageSelector;
