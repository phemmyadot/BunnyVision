import React from 'react';
import { SafeAreaView } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { colors, styles } from './styles';
import AppTopBar from './components/AppTopBar';
import BottomActions from './components/BottomActions';
import RecognitionScreen from './components/RecognitionScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyStatusBar from './components/MyStatusBar';
import AppProvider from './utils';
import Dialog from './components/Dialog';

const App = () => {
    return (
        <SafeAreaProvider>
            <MyStatusBar backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <ErrorBoundary>
                    <AppProvider>
                        <AppTopBar />
                        <RecognitionScreen />
                        <BottomActions />
                        <Dialog />
                    </AppProvider>
                </ErrorBoundary>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
