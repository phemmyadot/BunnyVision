import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';
import { Animated } from 'react-native';

export const navigationRef = createNavigationContainerRef();

// navigate from anywhere
export const navigate = (routeName: string, params?: object) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
};

// get current route name from anywhere
export const getCurrentRouteName = () => {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute()?.name;
    }
};

export const leftToRightAnimation = {
    cardStyleInterpolator: ({
        current,
        layouts,
    }: {
        current: { progress: Animated.AnimatedInterpolation<number> };
        layouts: {
            screen: { width: number; height: number };
        };
    }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};
