import AsyncStorage from '@react-native-community/async-storage'
import { noop } from 'lodash'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import defaultSettings, { getDirFromLocale, LocaleType } from '../config/defaultSettings'
import removeUndefined from '../utils/removeUndefined'

export interface Settings {
    locale: LocaleType
    direction: 'rtl' | 'ltr'
    userId?: string
}

export const SettingsContext = createContext<[Settings, (newSettings: Partial<Settings>) => void, boolean]>([defaultSettings, noop, true])

interface Props {
    children: React.ReactChild
}

let shouldLoadSettings = true
let lastSettingsPromise: Promise<Settings> | null = null

export const loadSettings = async () => {
    if (!shouldLoadSettings) {
        return lastSettingsPromise!
    }
    lastSettingsPromise = new Promise(resolve => {
        ;(async () => {
            const doc = await AsyncStorage.getItem('settings')
            if (!doc) {
                return
            }
            const data = JSON.parse(doc)
            if (!data) {
                return
            }
            const savedSettings = removeUndefined(data)
            const newSettings = { ...defaultSettings, ...savedSettings }
            resolve(newSettings)
        })()
    })
    return lastSettingsPromise
}

export const saveSettings = (settings: Settings) => {
    shouldLoadSettings = true
    return AsyncStorage.setItem(
        'settings',
        JSON.stringify(
            removeUndefined({
                ...settings,
                direction: getDirFromLocale(settings.locale),
            })
        )
    ).then(() => loadSettings())
}

export const useSettings = () => useContext(SettingsContext)

export default function Settings({ children }: Props) {
    const [settings, _setSettings] = useState(defaultSettings)
    const [loading, setLoading] = useState(true)
    const setSettings = (newSettings: Settings) => {
        _setSettings({
            ...newSettings,
            direction: getDirFromLocale(newSettings.locale),
        })
    }

    useEffect(() => {
        AsyncStorage.getItem('settings')
            .then(doc => {
                setLoading(false)
                if (!doc) {
                    return
                }
                const data = JSON.parse(doc)
                if (!data) {
                    return
                }
                const savedSettings = removeUndefined(data)
                const newSettings = { ...defaultSettings, ...savedSettings }
                setSettings(newSettings)
            })
            .catch(noop)
    }, [])

    const _saveSettings = useCallback(
        (newSettings: Settings) => {
            saveSettings({ ...settings, ...newSettings })
        },
        [settings]
    )

    const updateSettings = (newSettings: Partial<Settings>) => {
        const finalSettings = { ...settings, ...newSettings }
        setSettings(finalSettings)
        _saveSettings(finalSettings)
    }

    return <SettingsContext.Provider value={[{ ...settings }, updateSettings, loading]}>{children}</SettingsContext.Provider>
}
