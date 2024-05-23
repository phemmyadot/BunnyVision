import React, { FC, useContext, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext, DialogType } from '../utils';
import { getCurrentRouteName, navigate } from '../navigation';

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
            {appContext.currentRoute === 'Home' ? (
                <>
                    <Text style={styles.headerText}>BunnyVision</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={reset}>
                        <Image source={require('../assets/reset.png')} style={styles.tabIcon} />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <View style={styles.backButton}>
                            <Image source={require('../assets/back.png')} style={styles.tabIcon} />
                            <Text style={styles.headerText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.headerText}>{appContext.currentRoute}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default AppTopBar;
