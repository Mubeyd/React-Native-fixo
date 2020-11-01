import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
    name: string
    surname: string
    phoneNumber: string
    // adress: string
    createdAt: FirebaseFirestoreTypes.Timestamp
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
