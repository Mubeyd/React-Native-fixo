import i18n from 'i18next'
import moment from 'moment'
import 'moment/locale/ar'
import 'moment/locale/tr'
import React, { useEffect } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import ar from '../translations/ar'
import en from '../translations/en'
import tr from '../translations/tr'
import { useSettings } from './Settings'

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translation: en,
        },
        ar: {
            translation: ar,
        },
        tr: {
            translation: tr,
        },
    },
    interpolation: {
        escapeValue: false, // react already safes from xss
        format: function (value, format) {
            // if (format === 'uppercase') return value.toUpperCase();
            if (value instanceof Date) {
                return moment(value).format(format)
            }
            return value
        },
    },
})

export interface Props {
    children: React.ReactNode
}

export default function Locale({ children }: Props) {
    const [{ locale }] = useSettings()

    useEffect(() => {
        i18n.changeLanguage(locale || 'en')
    }, [locale])

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
