'use client'

import { create } from 'zustand'
import ru from '@/locales/ru'
import type { TranslationKey } from '@/types/translations'

type Language = 'ru'

interface TranslationStore {
  language: Language
  setLanguage: (language: Language) => void
}

const useTranslationStore = create<TranslationStore>((set) => ({
  language: 'ru',
  setLanguage: (language) => set({ language }),
}))

export function useTranslation() {
  const { language, setLanguage } = useTranslationStore()

  const t = (key: TranslationKey): string => {
    const keys = key.split('.')
    let translation: any = ru

    for (const k of keys) {
      if (translation[k] === undefined) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      translation = translation[k]
    }

    return translation
  }

  return {
    t,
    language,
    setLanguage,
  }
}
