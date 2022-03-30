import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

import { CarDTO } from '../../dtos/carDTO';
import { Car as ModelCar } from '../../database/model/Car';
import { database } from '../../database';

import {
    Container,
    Header,
    CardImages,
    Details,
    Accessories,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Footer,
    OfflineInfo
} from './styles';

interface Params {
    carId: string;
}

export function CarDetails() {

    const [car, setCar] = useState<CarDTO>({} as CarDTO);
    const netInfo = useNetInfo();

    const navigation = useNavigation();
    const route = useRoute();
    const { carId } = route.params as Params;

    const theme = useTheme();

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            ),
        }
    });

    function handleBack() {
        navigation.goBack();
    }

    function handleConfirmRental() {
        navigation.navigate('Scheduling', {
            car
        });
    }

    async function getCachedCar() {
        const carCollection = database.get<any>('cars');
        const car = await carCollection.find(carId);
        setCar(car);
    }

    async function fetchOnlineData() {
        const response = await api.get(`/cars/${carId}`);
        setCar(response.data);
    }

    useEffect(() => {

        if (netInfo.isConnected === true) {

            fetchOnlineData();
        } else {

            getCachedCar();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    {
                        backgroundColor: theme.colors.background_secondary,
                    }
                ]}
            >
                <Header>
                    <BackButton
                        onPress={handleBack}
                    />
                </Header>

                <Animated.View
                    style={[sliderCarsStyleAnimation]}
                >
                    <CardImages>
                        <ImageSlider
                            imagesURL={
                                !!car.photos ?
                                    car.photos : [{
                                        id: car.thumbnail,
                                        photo: car.thumbnail
                                    }]
                            }
                        />
                    </CardImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>

                {car.accessories && <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>}

                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title="Choose rent period"
                    onPress={handleConfirmRental}
                />

                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar seu carro.
                    </OfflineInfo>
                }
            </Footer>

        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    }
});