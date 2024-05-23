import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/BottomActions';
import { Picker } from '@react-native-picker/picker';
import Spacer from '../components/Spacer';
import { colors, styles } from '../styles';
import { PersistentStorage } from '../persistent-storage';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

type Props = {
    navigation: SettingsNavigationProp;
};

const Settings: React.FC<Props> = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState('default');

    const persistentStorage = PersistentStorage.getInstance();

    useEffect(() => {
        (async () => {
            const language = (await persistentStorage.getData('language')) || 'en';
            setSelectedLanguage(language);
            const voice = (await persistentStorage.getData('voice')) || 'default';
            setSelectedVoice(voice);
            const speechEnabled: boolean = (await persistentStorage.getData('speechEnabled')) === 'true' ? true : false;
            setIsSpeechEnabled(speechEnabled);
        })();
    });

    const handleSelectVoice = (value: string) => {
        setSelectedVoice(value);
        persistentStorage.storeData(value, 'voice');
    };

    const handleSelectLanguage = (value: string) => {
        setSelectedLanguage(value);
        persistentStorage.storeData(value, 'language');
    };

    const handleToggleSpeech = (value: boolean) => {
        setIsSpeechEnabled(value);
        persistentStorage.storeData(value ? 'true' : 'false', 'speechEnabled');
    };
    return (
        <View style={styles.container}>
            <ScrollView style={styles.messageContainer}>
                <View style={styles.settingsSection}>
                    <Text style={styles.subheader}>Language</Text>
                    <Picker
                        selectedValue={selectedLanguage}
                        style={localStyles.picker}
                        onValueChange={handleSelectLanguage}>
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Spanish" value="es" />
                        <Picker.Item label="French" value="fr" />
                    </Picker>
                </View>

                <View style={styles.settingsSection}>
                    <Text style={styles.subheader}>Enable Read-Out/Speech</Text>
                    <Switch
                        trackColor={{ true: colors.primary }}
                        value={isSpeechEnabled}
                        onValueChange={handleToggleSpeech}
                    />
                </View>

                {isSpeechEnabled && (
                    <View style={styles.settingsSection}>
                        <Text style={styles.subheader}>Voice Selection</Text>
                        <Picker
                            selectedValue={selectedVoice}
                            style={localStyles.picker}
                            onValueChange={handleSelectVoice}>
                            <Picker.Item label="Default" value="default" />
                            <Picker.Item label="Male Voice" value="male" />
                            <Picker.Item label="Female Voice" value="female" />
                        </Picker>
                    </View>
                )}

                <Spacer size={100} />
            </ScrollView>
        </View>
    );
};

const localStyles = StyleSheet.create({
    header: { color: colors.dark, textAlign: 'left', marginBottom: 10 },

    picker: {
        width: '100%',
    },
});

export default Settings;
