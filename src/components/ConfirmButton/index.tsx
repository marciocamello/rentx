import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Title
} from './styles';

interface Props extends RectButtonProps {
    title: string;
    onPress?: () => void;
}

export function ConfirmButton({
    title,
    onPress,
    ...rest
}: Props) {
    return (
        <GestureHandlerRootView>
            <Container {...rest} onPress={onPress}>
                <Title>{title}</Title>
            </Container>
        </GestureHandlerRootView>
    );
}