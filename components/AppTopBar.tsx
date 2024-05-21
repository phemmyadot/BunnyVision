import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppTopBarProps {
    reset: () => void;
}
const AppTopBar: React.FC<AppTopBarProps> = ({ reset }) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                styles.appTopBar,
                Platform.OS === 'android' && {
                    paddingTop: insets.top + 20
                }
            ]}
        >
            <Text style={styles.appTopBarText}>BunnyVision</Text>
            <TouchableOpacity style={{ padding: 10 }} onPress={reset}>
                <Image
                    source={require('../assets/reset.png')}
                    style={styles.tabIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

export default AppTopBar;
