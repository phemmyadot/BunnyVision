import React, { FC } from 'react';
import { View } from 'react-native';

interface SpacerProps {
    size?: number;
}

const Spacer: FC<SpacerProps> = ({ size }) => {
    return <View style={{ height: size }} />;
};

export default Spacer;
