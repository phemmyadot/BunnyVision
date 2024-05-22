import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Alert,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, styles } from '../styles';

interface ImageSelectorProps {
    isVisible: boolean;
    onClose: () => void;
    onImageSelected: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
    isVisible,
    onClose,
    onImageSelected
}) => {
    const insets = useSafeAreaInsets();

    const verifyPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Insufficient permissions!',
                    'You need to grant camera permissions to use this app.',
                    [{ text: 'Okay' }]
                );
                return false;
            }
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0
        });
        if (!image.canceled) {
            onImageSelected(image.assets[0].uri);
        }
        onClose();
    };

    const pickImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0
        });

        if (!image.canceled) {
            onImageSelected(image.assets[0].uri);
        }
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.photoModeSelector}>
                    <View
                        style={[
                            styles.photoSelectorButtonsContainer,
                            { paddingBottom: insets.bottom + 20 }
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.photoSelectorButton}
                            onPress={takeImageHandler}
                        >
                            <Text style={styles.photoSelectorButtonText}>
                                Take Photo
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity
                            style={styles.photoSelectorButton}
                            onPress={pickImageHandler}
                        >
                            <Text style={styles.photoSelectorButtonText}>
                                Pick Image from Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ImageSelector;
