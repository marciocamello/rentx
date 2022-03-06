import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import LogoSvg from '../../assets/logo.svg';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
    Container,
    Header,
    TotalCards,
    HeaderContent,
    CarList,
    MyCarsButton
} from './styles';

export function Home() {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
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
                    <TotalCards>
                        Total 12 cars
                    </TotalCards>
                </HeaderContent>
            </Header>

            {loading ? (<Load />) : (
                <CarList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Car
                        data={item}
                        onPress={() => handleCarDetails(item)}
                    />}
                />
            )}
            <MyCarsButton
                onPress={handleOpenMyCars}
            >
                <Ionicons
                    name="ios-car-sport"
                    size={RFValue(24)}
                    color={theme.colors.shape}
                />
            </MyCarsButton>
        </Container>
    );
}