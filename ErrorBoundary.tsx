import React, { useContext, useEffect } from 'react';
import { Text, SafeAreaView, StatusBar, View } from 'react-native';

const ErrorDisplay: React.FunctionComponent = () => {
    return (
        <SafeAreaView>
            <StatusBar hidden={true} />
            <View>
                <Text>Something went wrong</Text>
            </View>
        </SafeAreaView>
    );
};

interface ErrorBoundaryProps {
    children: React.ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <ErrorDisplay />;
        }
        return this.props.children;
    }
}
