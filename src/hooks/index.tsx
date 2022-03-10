import React from 'react';

import { AuthProvider } from './auth';

interface AuthProviderProps {
    children: React.ReactNode;
}

function AppProvider({ children }: AuthProviderProps) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export {
    AppProvider,
}
