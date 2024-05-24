import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/BottomActions';
import { Picker } from '@react-native-picker/picker';
import Spacer from '../components/Spacer';
import { colors, styles } from '../styles';
import { PersistentStorage } from '../services/persistent-storage';
import { getLocales } from 'expo-localization';
import { AppContext, DialogType } from '../store/utils';
import { Voice, getAvailableVoicesAsync, stop, speak, isSpeakingAsync } from 'expo-speech';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Language {
    label: string;
    value: string;
}

const languages: Language[] = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
];

type Props = {
    navigation: SettingsNavigationProp;
};

const Settings: React.FC<Props> = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState('');
    const [enableSaveButton, setEnableSaveButton] = useState(false);
    const [voices, setVoices] = useState<Voice[]>([]);

    const persistentStorage = PersistentStorage.getInstance();
    const appContext = useContext(AppContext);

    const checkForChanges = async () => {
        const language = await persistentStorage.getData('language');
        const voice = await persistentStorage.getData('voice');
        const speechEnabled = (await persistentStorage.getData('speechEnabled')) === 'true';

        if (language !== selectedLanguage || voice !== selectedVoice || speechEnabled !== isSpeechEnabled) {
            setEnableSaveButton(true);
        } else {
            setEnableSaveButton(false);
        }
    };

    useEffect(() => {
        (async () => {
            const language = (await persistentStorage.getData('language')) || getLocales()[0].languageCode || 'en';
            setSelectedLanguage(language);
            setVoicesForLanguage(language);

            const voice = (await persistentStorage.getData('voice')) || 'com.apple.voice.compact.en-US.Samantha';
            setSelectedVoice(voice);
            const speechEnabled: boolean = (await persistentStorage.getData('speechEnabled')) === 'true';
            setIsSpeechEnabled(speechEnabled);
        })();
    }, []);

    useEffect(() => {
        checkForChanges();
    }, [selectedLanguage, selectedVoice, isSpeechEnabled]);

    const saveSettings = () => {
        persistentStorage.storeData(isSpeechEnabled ? 'true' : 'false', 'speechEnabled');
        persistentStorage.storeData(selectedLanguage, 'language');
        persistentStorage.storeData(selectedVoice, 'voice');

        appContext.setDialogType(DialogType.SaveSettings);
        appContext.setShowDialog(true);
        checkForChanges();
    };

    const setVoicesForLanguage = async (language: string) => {
        const voices = await getAvailableVoicesAsync().then(voices => {
            const localLanguage = getLocales()[0].languageTag;
            const enDefault = 'en-US';
            const frDefault = 'fr-FR';
            const esDefault = 'es-ES';
            if (localLanguage.startsWith(language)) {
                return voices.filter(voice => voice.language === localLanguage);
            } else {
                if (language === 'en') {
                    return voices.filter(voice => voice.language === enDefault);
                } else if (language === 'fr') {
                    return voices.filter(voice => voice.language === frDefault);
                } else if (language === 'es') {
                    return voices.filter(voice => voice.language === esDefault);
                }
            }
        });
        setVoices((voices ?? []).sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleVoiceChange = async (voice: string) => {
        if (await isSpeakingAsync()) stop();
        setSelectedVoice(voice);
        setTimeout(() => {
            speak('Voice changed', { voice: voice });
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={!enableSaveButton}
                onPress={saveSettings}
                style={[localStyles.saveButton, !enableSaveButton && { backgroundColor: '#999999' }]}>
                <Text style={localStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <ScrollView style={styles.settingsContainer}>
                <View style={styles.settingsSection}>
                    <Text style={styles.subheader}>Language</Text>
                    <Picker
                        selectedValue={selectedLanguage}
                        style={localStyles.picker}
                        onValueChange={setSelectedLanguage}>
                        {languages.map(language => (
                            <Picker.Item key={language.value} label={language.label} value={language.value} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.settingsSection}>
                    <Text style={styles.subheader}>Enable Speech</Text>
                    <Switch
                        trackColor={{ true: colors.primary }}
                        value={isSpeechEnabled}
                        onValueChange={setIsSpeechEnabled}
                    />
                </View>

                {isSpeechEnabled && (
                    <View style={styles.settingsSection}>
                        <Text style={styles.subheader}>Voice Selection</Text>
                        <Picker
                            selectedValue={selectedVoice}
                            style={localStyles.picker}
                            onValueChange={handleVoiceChange}>
                            {voices.map(voice => (
                                <Picker.Item key={voice.identifier} label={voice.name} value={voice.identifier} />
                            ))}
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
    saveButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 20,
    },
    saveButtonText: {
        color: colors.white,
    },
});

export default Settings;
