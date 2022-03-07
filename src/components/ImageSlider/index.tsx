import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

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
                        <ImageIndex
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