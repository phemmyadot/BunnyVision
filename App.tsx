import React, { useState, useEffect, FC } from "react";
import { SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RekognitionService } from "./rekognitionService";
import { GPTService } from "./gptService";
import { ErrorBoundary } from "./ErrorBoundary";
import { styles } from "./styles";
import AppTopBar from "./components/AppTopBar";
import BottomActions from "./components/BottomActions";
import RecognitionScreen from "./components/RecognitionScreen";

const App = () => {
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const rekognitionService = RekognitionService.getInstance();
  const gptService = GPTService.getInstance();
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setLoading(true);
        const imageData = await rekognitionService.analyzeImage(
          result.assets[0].uri
        );

        const description = await gptService.getDescriptionFromGPT4(
          JSON.stringify(imageData)
        );
        setDescription(description);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ErrorBoundary>
        <AppTopBar />
        <RecognitionScreen
          image={image}
          description={description}
          loading={loading}
        />
        <BottomActions
          onCameraPress={() => {}}
          onGalleryPress={pickImage}
          onHistoryPress={() => {}}
        />
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default App;
