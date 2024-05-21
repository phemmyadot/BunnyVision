import React, { useState, useEffect } from 'react';
import { styles } from '../styles';
import { Camera, PermissionStatus } from 'expo-camera';
import { View, Text, Image, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

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

    const speak = (description: string) => {
        Speech.speak(description);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === PermissionStatus.GRANTED);
        })();
        if (description) speak(description);
        else Speech.stop();
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
                <Text style={styles.description}>
                    {description
                        ? description
                        : 'Please select an image to analyze'}
                </Text>
            </ScrollView>
        </View>
    );
};

export default RecognitionScreen;