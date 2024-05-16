import { View, Text } from "react-native";
import { styles } from "../styles";

const AppTopBar = () => {
  return (
    <View style={styles.appTopBar}>
      <Text style={styles.appTopBarText}>Image Recognition</Text>
    </View>
  );
};

export default AppTopBar;
