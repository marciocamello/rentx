import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { LoadAnimation } from '../components/LoadAnimation';

export function Routes() {
    const { user, loading } = useAuth();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {loading ? <LoadAnimation /> : (
                <NavigationContainer>
                    {user.id ? <AppTabRoutes /> : <AuthRoutes />}
                </NavigationContainer>
            )}
        </GestureHandlerRootView>
    );
}