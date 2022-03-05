import React from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuote,
    RentalPriceTotal,
    Footer,
} from './styles';

export function SchedulingDetails() {
    const theme = useTheme();

    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate('Scheduling');
    }

    function handleConfirmRental() {
        navigation.navigate('SchedulingComplete');
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

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            size={RFValue(24)}
                            name="calendar"
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2022</DateValue>
                    </DateInfo>

                    <Feather
                        size={RFValue(10)}
                        name="chevron-right"
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>18/07/2022</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuote>R$ 580,00 x3 diarias</RentalPriceQuote>
                        <RentalPriceTotal>R$ 2900,00</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Rent now"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                />
            </Footer>

        </Container>
    );
}