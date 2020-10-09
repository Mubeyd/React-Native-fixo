import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
    userName: string
    surname: string
    phoneNumber: string
    createdAt: FirebaseFirestoreTypes.Timestamp
}