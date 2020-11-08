import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
    phoneNumber: string
    name: string
    surname: string
    addresses: string[]
    services: string[]
    createdAt: FirebaseFirestoreTypes.Timestamp
}
export interface Provider {
    name: string
    phoneNumber: string
    logo: string
    serviceType: string
    description: string
    rating: number
    reviews: number
    adresses: string[]
    services: string[]
    createdAt: FirebaseFirestoreTypes.Timestamp
}
export interface Address {
    country: string
    city: string
    province: string
    details: string
    latitude: number
    longitude: number
    LocationTypes: 'Home' | 'Office' | 'Other'
}
export interface Service {
    serviceType: string
    price: number
    orderState: string
    image: string
    audio: string
    descrpition: string
    createdAt: FirebaseFirestoreTypes.Timestamp
}
