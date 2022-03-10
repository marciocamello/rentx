export type CarAccessories = {
    id: string;
    type: string;
    name: string;
}

export type CarPhotos = {
    id: string;
    photo: string;
}

export interface CarDTO {
    id: string;
    brand: string;
    name: string;
    about: string;
    period: string;
    price: number;
    fuel_type: string;
    thumbnail: string;
    accessories: CarAccessories[];
    photos: CarPhotos[];
}