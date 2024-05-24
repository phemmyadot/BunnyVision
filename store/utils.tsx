import React, { FC, ReactNode, createContext } from 'react';
import { GPTService } from '../services/gptService';
import { isSpeakingAsync, stop } from 'expo-speech';

export enum DialogType {
    NewPhotoAlert,
    ResetAlert,
    PermissionAlert,
    Error,
    SaveSettings,
}

interface AppContextType {
    showPhotoSelector: boolean;
    setShowPhotoSelector: (showPhotoSelector: boolean) => void;
    image: string | null;
    setImage: (image: string | null) => void;
    message: string | null;
    setMessage: (message: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    reset: () => void;
    gptService: GPTService;
    showDialog: boolean;
    setShowDialog: (showConfirmation: boolean) => void;
    closeDialog: (onConfirm: () => void) => void;
    dialogType: DialogType;
    setDialogType: (dialogType: DialogType) => void;
    errorMessage: string;
    setErrorMessage: (errorMessage: string) => void;
    currentRoute: string;
    setCurrentRoute: (currentRoute: string) => void;
}

const defaultContext: AppContextType = {
    showPhotoSelector: false,
    setShowPhotoSelector: () => {},
    image: null,
    setImage: () => {},
    message: null,
    setMessage: () => {},
    loading: false,
    setLoading: () => {},
    reset: () => {},
    gptService: GPTService.getInstance(),
    showDialog: false,
    setShowDialog: () => {},
    closeDialog: () => {},
    dialogType: DialogType.ResetAlert,
    setDialogType: () => {},
    errorMessage: '',
    setErrorMessage: () => {},
    currentRoute: '',
    setCurrentRoute: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showPhotoSelector, setShowPhotoSelector] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const [dialogType, setDialogType] = React.useState<DialogType>(DialogType.ResetAlert);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [currentRoute, setCurrentRoute] = React.useState<string>('');

    const reset = () => {
        setImage(null);
        setMessage(null);
        isSpeakingAsync().then(speaking => {
            if (speaking) {
                stop();
            }
        });
    };

    const closeDialog = (onConfirm: () => void) => {
        setShowDialog(false);
        onConfirm();
    };

    return (
        <AppContext.Provider
            value={{
                showPhotoSelector: showPhotoSelector,
                setShowPhotoSelector: setShowPhotoSelector,
                image: image,
                setImage: setImage,
                message: message,
                setMessage: setMessage,
                loading: loading,
                setLoading: setLoading,
                reset: reset,
                gptService: GPTService.getInstance(),
                showDialog: showDialog,
                setShowDialog: setShowDialog,
                closeDialog: closeDialog,
                dialogType: dialogType,
                setDialogType: setDialogType,
                errorMessage: errorMessage,
                setErrorMessage: setErrorMessage,
                currentRoute: currentRoute,
                setCurrentRoute: setCurrentRoute,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext };
export default AppProvider;
