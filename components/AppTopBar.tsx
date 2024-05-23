import React, { useContext } from 'react';
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext, DialogType } from '../utils';

const AppTopBar = () => {
    const appContext = useContext(AppContext);

    const reset = () => {
        appContext.setDialogType(DialogType.ResetAlert);
        appContext.setShowDialog(true);
    };

    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                styles.appTopBar,
                Platform.OS === 'android' && {
                    paddingTop: insets.top + 20,
                },
            ]}>
            <Text style={styles.headerText}>BunnyVision</Text>
            <TouchableOpacity style={{ padding: 10 }} onPress={reset}>
                <Image source={require('../assets/reset.png')} style={styles.tabIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default AppTopBar;
