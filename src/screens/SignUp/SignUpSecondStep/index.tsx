import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        document: string;
    }
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params as Params;

    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        try {

            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
                    .required('Confirmação de senha obrigatória')
            });

            await schema.validate({
                password,
                confirmPassword
            });

            const data = {
                ...user,
                password,
                confirmPassword
            };

            // save user
            // go to confirmation screen
            navigation.navigate('Confirmation', {
                title: 'Cadastro realizado\n com sucesso!',
                message: `Agora você já pode fazer login\nna aplicação.`,
                nextScreenRoute: 'SignIn'
            });
        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                Alert.alert('Erro na validação', error.message);
            } else {
                console.log(error);
                Alert.alert('Erro ao cadastrar', 'Ocorreu um erro ao fazer cadastro, tente novamente.');
            }
        }
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
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua{'\n'}conta
                    </Title>
                    <Subtitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil.
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </Form>

                    <Button
                        title='Próximo'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}