import firestore from '@react-native-firebase/firestore'

export const usersColRef = firestore().collection('users')