import React, { useState, useEffect, useContext } from 'react';
import { styles } from '../styles';
import { Camera, PermissionStatus } from 'expo-camera';
import { View, Text, Image, ScrollView } from 'react-native';
import { speak, stop } from 'expo-speech';
import AnimatedLottieView from 'lottie-react-native';
import { GPTService } from '../gptService';
import * as Speech from 'expo-speech';
import ImageSelector from './ImageSelector';
import { AppContext, DialogType } from '../utils';

const RecognitionScreen = () => {
    const appContext = useContext(AppContext);

    const gptService = GPTService.getInstance();

    const pickImage = async (image: string, base64EncodedImage?: string | null) => {
        try {
            appContext.reset();
            if (!base64EncodedImage) {
                return;
            }
            appContext.setImage(image);
            appContext.setLoading(true);

            const message = await gptService.gpt4(base64EncodedImage);

            appContext.setMessage(message);
            if (message) {
                handleSpeak(message);
            }
            appContext.setLoading(false);
        } catch (error: any) {
            appContext.reset();
            appContext.setLoading(false);
            appContext.setErrorMessage(error.message);
            console.error(error.message);
            appContext.setDialogType(DialogType.Error);
            appContext.setShowDialog(true);
        }
    };

    const handleSpeak = (message: string) => {
        speak(message, {});

        return () => {
            console.log('Stopping speech');
            stop();
        };
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== PermissionStatus.GRANTED) {
                appContext.setDialogType(DialogType.PermissionAlert);
                appContext.setShowDialog(true);
                return;
            }
        })();
    }, [appContext.message]);

    return (
        <>
            <View style={styles.container}>
                {appContext.image ? (
                    <Image source={{ uri: appContext.image }} style={styles.image} />
                ) : (
                    <Image source={require('../assets/placeholder.png')} style={styles.image} />
                )}
                <ScrollView style={styles.messageContainer}>
                    {appContext.loading ? (
                        <View style={styles.loadingContainer}>
                            <AnimatedLottieView
                                source={require('../assets/loading.json')}
                                autoPlay
                                style={styles.loading}
                            />
                        </View>
                    ) : !appContext.loading && appContext.message ? (
                        <Text style={styles.message}>{appContext.message}</Text>
                    ) : (
                        <Text style={[styles.message, styles.textCenter]}>Please select an image to analyze</Text>
                    )}
                </ScrollView>
            </View>
            {appContext.showPhotoSelector && (
                <View
                    style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                    <ImageSelector onImageSelected={pickImage} />
                </View>
            )}
        </>
    );
};

export default RecognitionScreen;
