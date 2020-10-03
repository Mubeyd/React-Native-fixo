import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
    name: string
    phoneNumber: string
    createdAt: FirebaseFirestoreTypes.Timestamp
}