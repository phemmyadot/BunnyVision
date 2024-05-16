import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { Camera, PermissionStatus } from "expo-camera";
import { View, Text, Image } from "react-native";

interface RecognitionScreenProps {
  image: string;
  description: string;
  loading: boolean;
}
const RecognitionScreen: React.FC<RecognitionScreenProps> = ({
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

export default RecognitionScreen;
