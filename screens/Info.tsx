import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/BottomActions';
import { colors, styles } from '../styles';
import Spacer from '../components/Spacer';
import * as Application from 'expo-application';
import Constants from 'expo-constants';

type InfoPageNavigationProp = StackNavigationProp<RootStackParamList, 'Info'>;

type Props = {
    navigation: InfoPageNavigationProp;
};

const InfoPage: React.FC<Props> = () => {
    const getVersion = () => {
        if (Constants.appOwnership === 'expo') {
            return require('../package.json').version;
        }
        return Application.nativeApplicationVersion;
    };
    return (
        <View style={styles.container}>
            <ScrollView style={styles.messageContainer}>
                <Text style={styles.titleText}>BunnyVision</Text>
                <Text style={styles.subBodyText}>Version {getVersion()}</Text>
                <View style={styles.infoSection}>
                    <Text style={styles.message}>
                        BunnyVision is an innovative image recognition app that leverages advanced AI technology to
                        provide detailed descriptions of uploaded images. Our mission is to help users explore and
                        understand the world through their photos.
                    </Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={[styles.headerText, localStyles.header]}>Technologies Used</Text>
                    <Text style={styles.subheader}>GPT-4o</Text>
                    <Text style={styles.message}>
                        BunnyVision uses GPT-4, a state-of-the-art language model developed by OpenAI, to analyze images
                        and generate detailed descriptions.
                    </Text>
                    <Text style={styles.message}>
                        GPT-4 is capable of understanding and generating human-like text, making it ideal for providing
                        rich and accurate descriptions.
                    </Text>
                    <Text style={styles.message}>
                        Future builds will include the ability to ask follow-up questions for more detailed insights.
                    </Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={[styles.headerText, localStyles.header]}>Contact Us</Text>
                    <Text style={styles.message}>If you have any questions or need support, please contact us at:</Text>
                    <Text style={styles.message}>babafemiadojutelegan@gmail.com</Text>
                </View>
                <Spacer size={100} />
            </ScrollView>
        </View>
    );
};

const localStyles = StyleSheet.create({
    header: { color: colors.dark, textAlign: 'left' },
});

export default InfoPage;
