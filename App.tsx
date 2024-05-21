import React, { useState } from 'react';
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';
import { RekognitionService } from './rekognitionService';
import { GPTService } from './gptService';
import { ErrorBoundary } from './ErrorBoundary';
import { colors, styles } from './styles';
import AppTopBar from './components/AppTopBar';
import BottomActions from './components/BottomActions';
import RecognitionScreen from './components/RecognitionScreen';
import ImageSelector from './components/ImageSelector';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyStatusBar from './components/MyStatusBar';
import * as Speech from 'expo-speech';

const App = () => {
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPhotoSelector, setShowPhotoSelector] = useState<boolean>(false);

    const rekognitionService = RekognitionService.getInstance();
    const gptService = GPTService.getInstance();
    const pickImage = async (image: string) => {
        try {
            setImage(image);
            setLoading(true);
            const imageData = await rekognitionService.analyzeImage(image);

            const description = await gptService.getDescriptionFromGPT4(
                JSON.stringify(imageData)
            );
            setDescription(description);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const reset = () => {
        setImage(null);
        setDescription(null);
        Speech.isSpeakingAsync().then((speaking) => {
            if (speaking) {
                Speech.stop();
            }
        });
    };

    return (
        <SafeAreaProvider>
            <MyStatusBar backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <ErrorBoundary>
                    <TouchableWithoutFeedback
                        onPress={() => setShowPhotoSelector(false)}
                    >
                        <>
                            <AppTopBar reset={reset} />
                            <RecognitionScreen
                                image={image}
                                description={description}
                                loading={loading}
                            />
                            <BottomActions
                                onCameraPress={() => setShowPhotoSelector(true)}
                                onSettingsPress={() => {}}
                                onAboutPress={() => {}}
                            />
                            <View
                                style={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <ImageSelector
                                    isVisible={showPhotoSelector}
                                    onClose={() => setShowPhotoSelector(false)}
                                    onImageSelected={pickImage}
                                />
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </ErrorBoundary>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
