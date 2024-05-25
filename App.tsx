import React, { useContext, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { colors } from './styles';
import AppTopBar from './components/AppTopBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyStatusBar from './components/MyStatusBar';
import AppProvider, { AppContext } from './store/utils';
import Dialog from './components/Dialog';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Info from './screens/Info';
import Settings from './screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { leftToRightAnimation, navigationRef } from './services/navigation';
import { isSpeakingAsync, stop } from 'expo-speech';

const Stack = createStackNavigator();

const MyStack = () => {
    useEffect(() => {
        return () => {
            (async () => {
                if (await isSpeakingAsync()) stop();
            })();
        };
    }, []);
    const appContext = useContext(AppContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            screenListeners={{
                state: e => {
                    appContext.setCurrentRoute(e.data.state.routes[e.data.state.index].name);
                },
            }}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} options={leftToRightAnimation} />
            <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
    );
};
const App = () => {
    return (
        <SafeAreaProvider>
            <MyStatusBar backgroundColor={colors.primary} />
            <ErrorBoundary>
                <AppProvider>
                    <AppTopBar />
                    <NavigationContainer ref={navigationRef}>
                        <MyStack />
                    </NavigationContainer>
                    <Dialog />
                </AppProvider>
            </ErrorBoundary>
        </SafeAreaProvider>
    );
};

export default App;
