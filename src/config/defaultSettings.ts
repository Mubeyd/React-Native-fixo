import * as Localization from 'react-native-localize'
import { Settings } from '../containers/Settings'

export type DirectionType = 'rtl' | 'ltr'

export type LocaleType = 'en' | 'ar' | 'tr'
export const locales: LocaleType[] = ['en', 'ar', 'tr']

export const languageLabels: Record<LocaleType, string> = {
    en: 'English',
    ar: 'عربي',
    tr: 'Türkçe',
}

export const languageIcons: Record<LocaleType, string> = {
    en: '🇬🇧',
    ar: '🇸🇦',
    tr: '🇹🇷',
}

export const getDirFromLocale = (locale: LocaleType): DirectionType => (locale === 'ar' ? 'rtl' : 'ltr')

export const getDefaultLocale = () => {
    let defaultLocale: LocaleType = Localization.getLocales().map(locale => locale.languageCode)[0] as LocaleType

    if (!(defaultLocale in languageLabels)) {
        defaultLocale = 'en'
    }

    return defaultLocale
}

const defaultLang = getDefaultLocale()

const defaultSettings: Settings = {
    locale: defaultLang,
    direction: getDirFromLocale(defaultLang),
    userId: undefined,
}

export default defaultSettings
