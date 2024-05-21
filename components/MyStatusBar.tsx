import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

interface MyStatusBarProps {
  backgroundColor: string;
}
const MyStatusBar: React.FC<MyStatusBarProps> = ({
  backgroundColor,
  ...props
}) => (
  <View style={[{ backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default MyStatusBar;
