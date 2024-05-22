import React, { useState } from 'react';
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    View,
    Text,
    Modal,
    TouchableOpacity
} from 'react-native';
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
import ConfirmationDialog from './components/ConfirmationDialog';

const App = () => {
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPhotoSelector, setShowPhotoSelector] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmationText, setConfirmationText] = useState<string>('');

    const gptService = GPTService.getInstance();
    const pickImage = async (
        image: string,
        base64EncodedImage?: string | null
    ) => {
        try {
            if (!base64EncodedImage) {
                return;
            }
            setImage(image);
            setLoading(true);
            // const imageData = await rekognitionService.analyzeImage(image);

            const description = await gptService.gpt4(base64EncodedImage);

            // const description = await gptService.getDescriptionFromGPT4(
            //     JSON.stringify(imageData)
            // );
            setDescription(description);
            setLoading(false);
        } catch (error) {
            reset();
            setLoading(false);
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
        setShowConfirmation(false);
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
                            <AppTopBar
                                reset={() => {
                                    setConfirmationText(
                                        'Are you sure you want to reset?'
                                    );
                                    setShowConfirmation(true);
                                }}
                            />
                            <RecognitionScreen
                                image={image}
                                description={description}
                                loading={loading}
                            />
                            <BottomActions
                                onCameraPress={() => {
                                    if (!image) setShowPhotoSelector(true);
                                    else {
                                        setConfirmationText(
                                            'Are you sure you want to take a new photo?'
                                        );
                                        setShowConfirmation(true);
                                    }
                                }}
                                onSettingsPress={() => {}}
                                onAboutPress={() => {}}
                            />
                            {showPhotoSelector && (
                                <View
                                    style={{
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <ImageSelector
                                        isVisible={showPhotoSelector}
                                        onClose={() =>
                                            setShowPhotoSelector(false)
                                        }
                                        onImageSelected={pickImage}
                                    />
                                </View>
                            )}
                            <ConfirmationDialog
                                isOpen={showConfirmation}
                                onClose={() => setShowConfirmation(false)}
                                onConfirm={() => {
                                    if (
                                        confirmationText ===
                                        'Are you sure you want to reset?'
                                    ) {
                                        reset();
                                    } else {
                                        reset();
                                        setShowConfirmation(false);
                                        setShowPhotoSelector(true);
                                    }
                                }}
                                message={confirmationText}
                            />
                        </>
                    </TouchableWithoutFeedback>
                </ErrorBoundary>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
