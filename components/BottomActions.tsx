import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";
interface BottomActionsProps {
  onCameraPress: () => void;
  onSettingsPress: () => void;
  onAboutPress: () => void;
}
const BottomActions: React.FC<BottomActionsProps> = ({
  onCameraPress,
  onSettingsPress,
  onAboutPress,
}) => {
  return (
    <>
      <View style={styles.FabButtonContainer}>
        <View style={styles.FabButtonInnerContainer}>
          <TouchableOpacity onPress={onCameraPress} style={styles.FabButton}>
            <Image
              source={require("./../assets/scan-icon.png")}
              style={styles.fabIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={onSettingsPress} style={styles.tabButton}>
          <Image
            source={require("./../assets/settings.png")}
            style={[styles.tabIcon, { height: 23 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAboutPress} style={styles.tabButton}>
          <Image
            source={require("./../assets/about.png")}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BottomActions;
