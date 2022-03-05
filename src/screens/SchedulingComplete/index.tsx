import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';


export function SchedulingComplete() {
    const { width } = useWindowDimensions();

    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate('Home');
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <LogoSvg
                width={width}
            />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>

                <Message>
                    Agora voce precisa ir {'\n'}
                    ate a consessionaria da RENTX {'\n'}
                    para retirar o carro.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton
                    title="OK"
                    onPress={handleBack}
                />
            </Footer>

        </Container>
    );
}