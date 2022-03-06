import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface DateValueProps {
    selected: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 300px;

    background-color: ${({ theme }) => theme.colors.header};

    justify-content: center;
    padding: 25px 25px 10px ;
    padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(25)}px;

    margin-top: 24px;
`;

export const RentalPeriod = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 32px 0;
`;

export const DateInfo = styled.View`
    width: 30%;
`;

export const DateTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(12)}px;

    ${({ selected, theme }) => !selected && css`
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.text};
        padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: 24,
    },
    showsVerticalScrollIndicator: false,
})`

`;

export const Footer = styled.View`
    padding: 24px;
`;