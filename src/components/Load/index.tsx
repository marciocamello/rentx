import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export function Load() {
    const theme = useTheme();

    return (
        <ActivityIndicator
            color={theme.colors.main}
            size="large"
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
            }}
        />
    );
}