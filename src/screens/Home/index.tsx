import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';

import { database } from '../../database';
import { api } from '../../services/api';

import LogoSvg from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
    Container,
    Header,
    TotalCards,
    HeaderContent,
    CarList,
} from './styles';

export function Home() {

    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const synchronizing = useRef(false);

    function handleCarDetails(car: ModelCar) {
        navigation.navigate('CarDetails', { carId: car.id })
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                    .get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const {
                    changes,
                    latestVersion
                } = response.data;

                return {
                    changes,
                    timestamp: latestVersion
                };
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                if (user) {
                    await api.post('/users/sync', user).catch(console.log);
                }
            }
        });

        await fetchCars();
    }

    async function fetchCars() {
        try {
            const carCollection = database.get<ModelCar>('cars');
            const cars = await carCollection.query().fetch();

            setCars(cars);
        } catch (error) {
            console.log('Home::error', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchCars();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const syncChanges = async () => {
            if (netInfo.isConnected && !synchronizing.current) {
                synchronizing.current = true;
                try {
                    offlineSynchronize();
                }
                catch (error) {
                    console.log('Home::error', error);
                }
                finally {
                    synchronizing.current = false;
                }
            }
        }

        syncChanges();
    }, [netInfo.isConnected]);

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