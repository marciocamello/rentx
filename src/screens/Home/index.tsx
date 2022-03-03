import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from '../../assets/logo.svg';

import { Car, CardDataProps } from '../../components/Car';

import {
    Container,
    Header,
    TotalCards,
    HeaderContent,
    CarList
} from './styles';

export function Home() {

    const carData: CardDataProps = {
        brand: 'Fiat',
        name: 'Uno',
        rent: {
            period: 'Diária',
            price: 80
        },
        thumbnail: 'https://i.imgur.com/7jtQ4.png'
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <LogoSvg
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCards>
                        Total 12 cars
                    </TotalCards>
                </HeaderContent>
            </Header>

            <CarList
                data={[1, 2, 3, 4, 5, 6, 7]}
                keyExtractor={(item) => String(item)}
                renderItem={({ item }) => <Car data={carData} />}
            />
        </Container>
    );
}