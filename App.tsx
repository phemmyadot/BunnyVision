import React, { useState } from "react";
import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RekognitionService } from "./rekognitionService";
import { GPTService } from "./gptService";
import { ErrorBoundary } from "./ErrorBoundary";
import { styles } from "./styles";
import AppTopBar from "./components/AppTopBar";
import BottomActions from "./components/BottomActions";
import RecognitionScreen from "./components/RecognitionScreen";
import ImageSelector from "./components/ImageSelector";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ErrorBoundary>
          <TouchableWithoutFeedback onPress={() => setShowPhotoSelector(false)}>
            <>
              <AppTopBar />
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
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
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
