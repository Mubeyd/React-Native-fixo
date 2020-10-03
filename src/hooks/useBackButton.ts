import { BackHandler } from 'react-native'
import { useEffect } from 'react'

export function useBackButton(handler: () => boolean) {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handler)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handler)
        }
    }, [handler])
}
