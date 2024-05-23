import React, { FC, useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';
import { AppContext, DialogType } from '../utils';
import { HomeNavigationProp } from '../screens/Home';

export type RootStackParamList = {
    Home: undefined;
    Info: undefined;
    Settings: undefined;
};

interface BottomActionsProps {
    navigation: HomeNavigationProp;
}

const BottomActions: FC<BottomActionsProps> = ({ navigation }) => {
    const appContext = useContext(AppContext);

    const onCameraPress = () => {
        if (appContext.message) {
            appContext.setDialogType(DialogType.NewPhotoAlert);
            appContext.setShowDialog(true);
        } else {
            appContext.setShowPhotoSelector(true);
        }
    };

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const onInfoPress = () => {
        navigation.navigate('Info');
    };

    return (
        <>
            <View style={styles.FabButtonContainer}>
                <View style={styles.FabButtonInnerContainer}>
                    <TouchableOpacity onPress={onCameraPress} style={styles.FabButton}>
                        <Image source={require('./../assets/scan-icon.png')} style={styles.fabIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomTab}>
                <TouchableOpacity onPress={onSettingsPress} style={styles.tabButton}>
                    <Image source={require('./../assets/settings.png')} style={[styles.tabIcon, { height: 23 }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onInfoPress} style={styles.tabButton}>
                    <Image source={require('./../assets/about.png')} style={styles.tabIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default BottomActions;
