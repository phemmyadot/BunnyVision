import React, { FC } from 'react';
import BottomActions, { RootStackParamList } from '../components/BottomActions';
import RecognitionScreen from '../components/RecognitionScreen';
import { View } from 'react-native';
import { styles } from '../styles';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeProps {
    navigation: HomeNavigationProp;
}
const Home: FC<HomeProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <RecognitionScreen />
            <BottomActions navigation={navigation} />
        </View>
    );
};

export default Home;
