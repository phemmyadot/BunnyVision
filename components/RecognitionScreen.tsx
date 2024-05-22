import React, { useState, useEffect } from 'react';
import { styles } from '../styles';
import { Camera, PermissionStatus } from 'expo-camera';
import { View, Text, Image, ScrollView } from 'react-native';
import { Voice, getAvailableVoicesAsync, speak, stop } from 'expo-speech';
import AnimatedLottieView from 'lottie-react-native';
import { GPTService } from '../gptService';

interface RecognitionScreenProps {
    image: string | null;
    description: string | null;
    loading: boolean;
}
const RecognitionScreen: React.FC<RecognitionScreenProps> = ({
    image,
    description,
    loading
}) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [voice, setVoice] = useState<string>('');

    const handleSpeak = (description: string) => {
        speak(description, {
            // voice: voice
        });

        return () => {
            console.log('Stopping speech');
            stop();
        };
    };

    // useEffect(() => {
    //     (async () => {
    //         const voices = await getAvailableVoicesAsync();
    //         //TODO: set random en-US voice, will be handled in settings
    //         const enUSVoices = voices.filter((v) => v.language === 'en-US');
    //         const randomIndex = Math.floor(Math.random() * enUSVoices.length);
    //         console.log(
    //             'Setting voice to: ',
    //             enUSVoices[randomIndex].identifier
    //         );
    //         setVoice(enUSVoices[randomIndex].identifier);
    //     })();
    // }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === PermissionStatus.GRANTED);
        })();
        if (description) handleSpeak(description);
        else stop();
    }, [description]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Image
                    source={require('../assets/placeholder.png')}
                    style={styles.image}
                />
            )}
            <ScrollView style={styles.descriptionContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <AnimatedLottieView
                            source={require('../assets/loading.json')}
                            autoPlay
                            style={styles.loading}
                        />
                    </View>
                ) : !loading && description ? (
                    <Text style={styles.description}>{description}</Text>
                ) : (
                    <Text style={[styles.description, styles.textCenter]}>
                        Please select an image to analyze
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default RecognitionScreen;
