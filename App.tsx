import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, FC } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Camera, PermissionStatus } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { RekognitionService } from "./rekognitionService";
import { GPTService } from "./gptService";
import { ErrorBoundary } from "./ErrorBoundary";

interface BottomActionsProps {
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onHistoryPress: () => void;
}
const BottomActions: React.FC<BottomActionsProps> = ({
  onCameraPress,
  onGalleryPress,
  onHistoryPress,
}) => {
  return (
    <>
      <View style={styles.FabButtonContainer}>
        <View style={styles.FabButtonInnerContainer}>
          <TouchableOpacity onPress={onCameraPress} style={styles.FabButton}>
            <Image
              source={require("./assets/camera.png")}
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={onGalleryPress} style={styles.tabButton}>
          <Image
            source={require("./assets/gallery.png")}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHistoryPress} style={styles.tabButton}>
          <Image
            source={require("./assets/history.png")}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

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
        <CameraScreen
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

interface CameraScreenProps {
  image: string;
  description: string;
  loading: boolean;
}
const CameraScreen: React.FC<CameraScreenProps> = ({
  image,
  description,
  loading,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <Text>Loading...</Text>}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  descriptionContainer: {
    padding: 40,
  },
  description: {
    textAlign: "justify",
  },
  tabIcon: {
    width: 18,
    height: 18,
  },
  tabButton: {
    padding: 18,
    borderRadius: 50,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: "15%",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -7,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
  FabButtonContainer: {
    bottom: 40,
    right: 0,
    left: 0,
    alignItems: "center",
    zIndex: 1,
  },
  FabButtonInnerContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -50,
    },
    shadowOpacity: 0.07,
    shadowRadius: 20,
  },
  FabButton: {
    backgroundColor: "#613EEA",
    padding: 18,
    borderRadius: 50,
  },
});
