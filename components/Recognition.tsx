import React, { useContext } from 'react';
import { styles } from '../styles';
import { View, Text, Image, ScrollView } from 'react-native';
import { speak, stop } from 'expo-speech';
import AnimatedLottieView from 'lottie-react-native';
import { GPTService } from '../services/gptService';
import ImageSelector from './ImageSelector';
import { AppContext, DialogType } from '../store/utils';
import Spacer from './Spacer';
import { PersistentStorage } from '../services/persistent-storage';

const Recognition = () => {
    const appContext = useContext(AppContext);

    const gptService = GPTService.getInstance();
    const persistentStorage = PersistentStorage.getInstance();

    const pickImage = async (base64EncodedImage?: string | null) => {
        try {
            if (!base64EncodedImage) {
                return;
            }

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

    const handleSpeak = async (message: string) => {
        const speechEnabled = (await persistentStorage.getData('speechEnabled')) === 'true';
        if (!speechEnabled) {
            return;
        }
        speak(message, {
            voice: (await persistentStorage.getData('voice')) || 'com.apple.voice.compact.en-US.Samantha',
        });

        return () => {
            stop();
        };
    };

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
                    <Spacer size={100} />
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

export default Recognition;
