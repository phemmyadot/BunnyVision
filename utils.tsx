import React, { ReactNode, createContext } from 'react';
import { GPTService } from './gptService';
import * as Speech from 'expo-speech';

export enum DialogType {
    NewPhotoAlert,
    ResetAlert,
    PermissionAlert,
    Error,
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
    voice: string;
    setVoice: (voice: string) => void;
    showDialog: boolean;
    setShowDialog: (showConfirmation: boolean) => void;
    closeDialog: (onConfirm: () => void) => void;
    dialogType: DialogType;
    setDialogType: (dialogType: DialogType) => void;
    errorMessage: string;
    setErrorMessage: (errorMessage: string) => void;
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
    voice: '',
    setVoice: () => {},
    showDialog: false,
    setShowDialog: () => {},
    closeDialog: () => {},
    dialogType: DialogType.ResetAlert,
    setDialogType: () => {},
    errorMessage: '',
    setErrorMessage: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [voice, setVoice] = React.useState<string>('');
    const [showPhotoSelector, setShowPhotoSelector] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const [dialogType, setDialogType] = React.useState<DialogType>(DialogType.ResetAlert);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const reset = () => {
        setImage(null);
        setMessage(null);
        Speech.isSpeakingAsync().then(speaking => {
            if (speaking) {
                Speech.stop();
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
                voice: voice,
                setVoice: setVoice,
                showDialog: showDialog,
                setShowDialog: setShowDialog,
                closeDialog: closeDialog,
                dialogType: dialogType,
                setDialogType: setDialogType,
                errorMessage: errorMessage,
                setErrorMessage: setErrorMessage,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext };
export default AppProvider;
