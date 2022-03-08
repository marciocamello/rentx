import React, { useEffect, useState } from 'react';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { useNavigation } from '@react-navigation/native';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
    const theme = useTheme();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);
    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: positionX.value
                },
                {
                    translateY: positionY.value
                }
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive: (event, ctx: any) => {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd: (event, ctx) => {
            //positionX.value = withSpring(0);
            //positionY.value = withSpring(0);
        }
    });

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

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    });

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

            <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22,
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    }
});