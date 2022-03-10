import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from '../../assets/logo.svg';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
    Container,
    Header,
    TotalCards,
    HeaderContent,
    CarList,
} from './styles';

export function Home() {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
                <HeaderContent>
                    <LogoSvg
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    {
                        !loading && (
                            <TotalCards>
                                Total {cars.length} cars
                            </TotalCards>
                        )
                    }
                </HeaderContent>
            </Header>

            {loading ? (<LoadAnimation />) : (
                <CarList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Car
                        data={item}
                        onPress={() => handleCarDetails(item)}
                    />}
                />
            )}

        </Container>
    );
}