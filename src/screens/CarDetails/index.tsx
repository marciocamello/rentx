import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/carDTO';

import {
    Container,
    Header,
    CardImages,
    Content,
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
} from './styles';

interface Params {
    car: CarDTO;
}

export function CarDetails() {

    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    function handleConfirmRental() {
        navigation.navigate('Scheduling', {
            car
        });
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton
                    onPress={handleBack}
                />
            </Header>

            <CardImages>
                <ImageSlider
                    imagesURL={car.photos}
                />
            </CardImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <About>{car.about}</About>
            </Content>

            <Footer>
                <Button
                    title="Choose rent period"
                    onPress={handleConfirmRental}
                />
            </Footer>

        </Container>
    );
}