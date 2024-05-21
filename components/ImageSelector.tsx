import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Alert,
    Modal,
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../styles';

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
            <TouchableOpacity style={styles.modalContent} onPress={onClose}>
                <View
                    style={[
                        styles.buttonsContainer,
                        { paddingBottom: insets.bottom + 20 }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takeImageHandler}
                    >
                        <Text style={styles.buttonText}>Take Photo</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={pickImageHandler}
                    >
                        <Text style={styles.buttonText}>
                            Pick Image from Gallery
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginTop: 'auto',
        justifyContent: 'flex-end',
        height: '100%'
    },
    buttonsContainer: {
        backgroundColor: colors.primary,
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    button: {
        paddingVertical: 10,
        width: '100%'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: colors.white
    },
    divider: {
        height: 0.3,
        backgroundColor: colors.white,
        marginVertical: 10
    }
});

export default ImageSelector;
