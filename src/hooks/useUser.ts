import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { usersColRef } from '../config/firebaseCollections'
import { User } from '../models/firestoreInterfaces'

export default function useUser(): (User & { uid: string }) | undefined {
    const [user] = useAuthState(auth())
    const [userSnapshot] = useCollection(usersColRef.where('phoneNumber', '==', (user as FirebaseAuthTypes.User)?.phoneNumber || ''))

    if (userSnapshot === undefined || userSnapshot.size === 0) {
        return undefined
    }
    const data: User | undefined = userSnapshot.docs[0].data()

    if (data === undefined) {
        return undefined
    }

    return { ...data, uid: userSnapshot.docs[0].id }
}
