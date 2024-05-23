import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from '../styles';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal visible={isOpen} animationType="slide" transparent={true}>
            <TouchableWithoutFeedback style={styles.modal} onPress={onClose}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.headerText, { color: colors.primary }]}>{message}</Text>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.bodyText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ConfirmationDialog;
