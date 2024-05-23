import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/BottomActions';
import { Picker } from '@react-native-picker/picker';
import Spacer from '../components/Spacer';
import { colors, styles } from '../styles';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

type Props = {
    navigation: SettingsNavigationProp;
};

const Settings: React.FC<Props> = ({ navigation }) => {
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedVoice, setSelectedVoice] = useState('default');

    const handleSelectVoice = (value: string) => {};
    return (
        <View style={styles.container}>
            <ScrollView style={styles.messageContainer}>
                <View style={styles.settingsSection}>
                    <Text style={styles.subheader}>Language</Text>
                    <Picker
                        selectedValue={selectedLanguage}
                        style={localStyles.picker}
                        onValueChange={itemValue => setSelectedLanguage(itemValue)}>
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
                        onValueChange={value => setIsSpeechEnabled(value)}
                    />
                </View>

                {isSpeechEnabled && (
                    <View style={styles.settingsSection}>
                        <Text style={styles.subheader}>Voice Selection</Text>
                        <Picker
                            selectedValue={selectedVoice}
                            style={localStyles.picker}
                            onValueChange={itemValue => setSelectedVoice(itemValue)}>
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
