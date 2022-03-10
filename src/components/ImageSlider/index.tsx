import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import {
    Container,
    ImageIndexes,
    CarImageWrapper,
    CarImage,
} from './styles';

interface Props {
    imagesURL: string[]
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({
    imagesURL
}: Props) {

    const [imageIndex, setImageIndex] = useState(0);

    const indexChanges = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index);
    });

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesURL.map((_, index) => (
                        <Bullet
                            key={String(index)}
                            active={imageIndex === index}
                        />
                    ))
                }
            </ImageIndexes>

            <FlatList
                data={imagesURL}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{
                                uri: item
                            }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanges.current}
            />
        </Container>
    );
}