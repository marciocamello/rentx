import React, {
    useState,
    createContext,
    useContext,
    useEffect,
} from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';
import { Alert } from 'react-native';

interface User {
    id: string;
    user_id: string;
    name: string;
    email: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    updatedUser: (user: User) => Promise<void>;
    loading: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            });

            if (response.data.message === "Email or password incorret!") {

                return Alert.alert(
                    'Erro na autenticação',
                    'E-mail ou usuário inválido!'
                )
            }

            const { token, user } = response.data;

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userCollection = await database.get<ModelUser>('users');

            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser._raw.id = user.id;
                    newUser.user_id = user.id,
                        newUser.name = user.name;
                    newUser.email = user.email;
                    newUser.driver_license = user.driver_license;
                    newUser.avatar = user.avatar;
                    newUser.token = token;
                }).then((userData) => {
                    setData(userData._raw as unknown as User);
                }).catch((error) => {
                    console.log('signIn::error', error);
                    return Alert.alert(
                        'Erro na autenticação',
                        'Não foi possível realizar o login!'
                    )
                });
            });

        } catch (error: any) {
            console.log('signIn::error', error);
            throw new Error(error);
        }
    }

    async function updatedUser(user: User) {
        try {
            const userCollection = await database.get<ModelUser>('users');
            await database.write(async () => {
                const useSelected = await userCollection.find(user.id);
                await useSelected.update((userData) => {
                    userData.name = user.name;
                    userData.email = user.email;
                    userData.driver_license = user.driver_license;
                    userData.avatar = user.avatar;
                });
            });

            setData(user);
        } catch (error: any) {
            console.log('error', error);
            throw new Error(error);
        }
    }

    async function signOut() {
        try {
            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                const userSelected = await userCollection.find(data.id);
                await userSelected.destroyPermanently();
            });

            setData({} as User);
        } catch (error: any) {
            console.log('error', error);
            throw new Error(error);
        }
    }

    useEffect(() => {

        async function loadUserData() {
            const userCollection = database.get<ModelUser>('users');
            const user = await userCollection.query().fetch();

            if (user.length > 0) {
                const userData = user[0]._raw as any | ModelUser;
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                setData(userData);
            }

            setLoading(false);
        }

        loadUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut,
                updatedUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export {
    AuthProvider,
    useAuth,
}