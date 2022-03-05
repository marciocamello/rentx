import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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

export function CarDetails() {

    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate('Home');
    }

    function handleConfirmRental() {
        navigation.navigate('Scheduling');
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
                    imagesURL={[
                        'https://www.enterprise.com/content/dam/ecom/utilitarian/common/exotics/us-refresh/car-thumbnails/thumbnail-2019-lamborghini-huracan-2048x1360.png',
                        'https://www.enterprise.com/content/dam/ecom/utilitarian/common/exotics/us-refresh/car-thumbnails/thumbnail-2019-lamborghini-huracan-2048x1360.png',
                    ]}
                />
            </CardImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Diario</Period>
                        <Price>R$ 100,00</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory name="380km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />
                </Accessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário
                    touro de lide indultado
                    na praça Real Maestranza de Sevilla.
                    É um belíssimo carro para quem gosta de acelerar.
                </About>
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