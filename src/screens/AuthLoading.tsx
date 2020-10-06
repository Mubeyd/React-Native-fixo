import { firebase } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth/'

import { useSettings } from '../containers/Settings'
import Loading from './Loading'
import MainTab from './MainTab'
import RootStackScreen from './RootStackScreen'

export interface Props { }

const AuthLoading = ({ }: Props) => {
    const [user, loading] = useAuthState(firebase.auth())
    const [{ userId }, , loadingSettings] = useSettings()

    useEffect(() => {
        if (loading || loadingSettings) {
            return
        }

        // if (user) {
        //     // console.log('user.uid :>> ', user?.uid);
        //     // <MainTab />
        // } else {
        //     // console.log('user.uid else :>> ', user?.uid);
        //     console.log('userId :>> ', userId);
        //     // <RootStackScreen />
        // }
    }, [user, loading, userId, loadingSettings])

    return (
        <NavigationContainer>
            {/* { user ? <RootStackScreen /> : <MainTab />} */}
            { user ? <MainTab /> : <RootStackScreen />}
        </NavigationContainer>

    )
}

export default AuthLoading
