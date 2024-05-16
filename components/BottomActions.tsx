import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";
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
              source={require("./../assets/camera.png")}
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={onGalleryPress} style={styles.tabButton}>
          <Image
            source={require("./../assets/gallery.png")}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHistoryPress} style={styles.tabButton}>
          <Image
            source={require("./../assets/history.png")}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BottomActions;
