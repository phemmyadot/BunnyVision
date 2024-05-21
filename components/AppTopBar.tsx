import { View, Text, Platform } from "react-native";
import { styles } from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppTopBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.appTopBar,
        Platform.OS === "android" && {
          paddingTop: insets.top + 20,
        },
      ]}
    >
      <Text style={styles.appTopBarText}>BunnyVision</Text>
    </View>
  );
};

export default AppTopBar;
