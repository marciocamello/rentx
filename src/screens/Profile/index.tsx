import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { useNetInfo } from '@react-native-community/netinfo';
import { api } from '../../services/api';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from './styles';

export function Profile() {
    const {
        user,
        signOut,
        updatedUser
    } = useAuth();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    const [avatar, setAvatar] = useState<string>(user.avatar);
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [driverLicense, setDriverLicense] = useState<string>(user.driver_license);

    const [oldPassword, setOldPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const theme = useTheme();
    const navigation = useNavigation();
    const netInfo = useNetInfo();

    function handleBack() {
        navigation.goBack();
    }

    function handleSignOut() {
        Alert.alert('Tem certezxa que deseja sair?',
            'Voce vai precisar da internet para conectar-se novamente.', [
            {
                text: 'Cancelar',
            },
            {
                text: 'Sair',
                onPress: () => signOut()
            }
        ]);
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
            Alert.alert('Para mudar a senha, conecte-se a Internet');
        } else {
            setOption(optionSelected);
        }
    }

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
    }

    let schema: Yup.ObjectSchema<any>;

    async function handleProfileUpdate() {

        try {

            if (option === 'passwordEdit') {

                schema = Yup.object().shape({
                    oldPassword: Yup.string().required('Senha antiga é obrigatória'),
                    password: Yup.string().required('Senha é obrigatória'),
                    confirmPassword: Yup.string().required('Confirmação de senha é obrigatória')
                        .oneOf([Yup.ref('password')], 'Confirmação de senha não confere'),
                });
            } else {

                schema = Yup.object().shape({
                    name: Yup.string().required('Nome é obrigatório'),
                    driverLicense: Yup.string().required('CNH/CPF é obrigatório'),
                });
            }

            const data = {
                name,
                driverLicense,
            };

            await schema.validate(data);

            if (password && oldPassword) {

                api.put('users', {
                    password,
                    old_password: oldPassword
                }).catch(error => console.log(error))
            }

            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token,
            });

            Alert.alert('Perfil atualizado com sucesso!');

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                Alert.alert('Erro na validação', err.message);
                return;
            } else {
                Alert.alert('Erro ao atualizar perfil', 'Ocorreu um erro ao atualizar seu perfil, tente novamente.');
            }
        }

    }

    return (
        <KeyboardAvoidingView
            behavior="position"
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <GestureHandlerRootView>
                                <LogoutButton onPress={handleSignOut}>
                                    <Feather
                                        name="power"
                                        size={24}
                                        color={theme.colors.shape}
                                    />
                                </LogoutButton>
                            </GestureHandlerRootView>
                        </HeaderTop>

                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleAvatarSelect}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>

                    </Header>

                    <Content
                        style={{
                            marginBottom: useBottomTabBarHeight()
                        }}
                    >
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Senha
                                </OptionTitle>
                            </Option>
                        </Options>

                        {
                            option === 'dataEdit' ? (
                                <Section>
                                    <Input
                                        iconName="user"
                                        placeholder="Nome"
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />
                                    <Input
                                        iconName="mail"
                                        editable={false}
                                        defaultValue={user.email}
                                        onChangeText={setEmail}
                                    />
                                    <Input
                                        iconName="credit-card"
                                        placeholder="CNH/CPF"
                                        keyboardType='numeric'
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </Section>
                            ) : (
                                <Section>
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Senha atual"
                                        onChangeText={setOldPassword}
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Nova Senha"
                                        onChangeText={setPassword}
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Repetir Senha"
                                        onChangeText={setConfirmPassword}
                                    />
                                </Section>
                            )
                        }

                        <Button
                            title="Salvar"
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}