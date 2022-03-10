import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';

import *  as Yup from 'yup';

import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Subtitle,
    Title,
    Form,
    Footer,
} from './styles';

export function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme();

    const navigation = useNavigation();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                password: Yup.string()
                    .required('A senha é obrigatória')
                    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
                email: Yup.string()
                    .required('O e-mail é obrigatório')
                    .email('Insira um e-mail válido'),
            });

            await schema.validate({ email, password });

            Alert.alert('Sucesso', 'Login realizado com sucesso');

            // fazer login
        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                Alert.alert('Erro na validação', error.message);
            } else {
                Alert.alert('Erro ao fazer login', 'Ocorreu um erro ao fazer login');
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    return (
        <KeyboardAvoidingView
            behavior="position"
            enabled
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>
                            Estamos{'\n'}quase la.
                        </Title>
                        <Subtitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}