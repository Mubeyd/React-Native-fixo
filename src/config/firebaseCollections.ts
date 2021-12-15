import firestore from '@react-native-firebase/firestore'

export const usersColRef = firestore().collection('users')
export const providersColRef = firestore().collection('providers')
export const addressesColRef = firestore().collection('addresses')
export const servicesColRef = firestore().collection('services')