import React, {
    useState,
    createContext,
    useContext,
    useEffect,
} from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

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
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            });

            const { token, user } = response.data;
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser.id = user.id;
                    newUser.name = user.name;
                    newUser.email = user.email;
                    newUser.driver_license = user.driver_license;
                    newUser.avatar = user.avatar;
                    newUser.token = token;
                });
            });

            setData({ ...user, token });
        } catch (error) {
            console.log(error);
            throw new Error();
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
        }

        loadUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
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