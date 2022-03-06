import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    AppointmentsTitle,
    AppointmentsQuantity,
    Appointments,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

interface MyCarsProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = useState<MyCarsProps[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser/?user_id=1');
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
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Seus agendamentos, {'\n'}
                    estao aqui.
                </Title>
                <SubTitle>
                    Conforto, seguranca e praticidade.
                </SubTitle>

            </Header>
            {loading ? (<Load />) : (
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={car => String(car.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Periodo</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{
                                                marginHorizontal: 10
                                            }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            )}
        </Container>
    );
}