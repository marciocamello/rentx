import React from 'react';

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from './styles';

interface Props {
    imagesURL: string[]
}

export function ImageSlider({
    imagesURL
}: Props) {
    return (
        <Container>
            <ImageIndexes>
                <ImageIndex active={true} />
                <ImageIndex active={true} />
                <ImageIndex active={true} />
                <ImageIndex active={true} />
            </ImageIndexes>

            <CarImageWrapper>
                <CarImage
                    source={{
                        uri: imagesURL[0]
                    }}
                    resizeMode="contain"
                />
            </CarImageWrapper>
        </Container>
    );
}