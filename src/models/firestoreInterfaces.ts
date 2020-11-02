import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
    phoneNumber: string
    name: string
    surname: string
    addresses: string
    createdAt: FirebaseFirestoreTypes.Timestamp
}

export interface Address {
    country: string
    city: string
    province: string
    details: string
    latitude: number
    longitude: number
}

export interface Provider {
    name: string
    phoneNumber: string
    adress: string
    logo: string
    serviceType: string
    description: string
    rating: number
    reviews: number
    createdAt: FirebaseFirestoreTypes.Timestamp
}
export interface service {
    providerId: string
    userId: string
    serviceType: string
    price: number
    orderState: string
    image: string
    audio: string
    descrpition: string
}
