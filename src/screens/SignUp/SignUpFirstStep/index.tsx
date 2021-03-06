import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
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

export function SignUpFirstStep() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [document, setDocument] = useState('');

    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                document: Yup.string().required('CPF/CNH obrigatório'),
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('E-mail obrigatório'),
                name: Yup.string().required('Nome obrigatório'),
            });

            const data = { name, email, document }
            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', {
                user: data
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
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            placeholder="Nome"
                            iconName='user'
                            value={name}
                            onChangeText={setName}
                        />
                        <Input
                            placeholder="Email"
                            iconName='mail'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Input
                            placeholder="CPF/CNH"
                            iconName='credit-card'
                            keyboardType='numeric'
                            value={document}
                            onChangeText={setDocument}
                        />
                    </Form>

                    <Button
                        title='Próximo'
                        onPress={handleNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}