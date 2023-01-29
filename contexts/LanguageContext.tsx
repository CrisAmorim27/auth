import { createContext, useEffect, useState } from 'react';
import { LanguageCode, languages } from '../utils/languages';
import enTranslations from '../languages/en-us.json'

interface Props {
  children: React.ReactNode
}

const defaultValues = {
  language: {
    code: 'en-us',
    translation: enTranslations,
  },
  updateLanguage: (code: LanguageCode) => {}
}

export const LanguageContext = createContext(defaultValues)

export function LanguageProvider({ children }: Props) {
  const [language, setLanguage] = useState(defaultValues.language)

  async function updateLanguage(code: LanguageCode) {
    console.log(code)
    const translation = await (languages[code]).getTranslations()

    setLanguage({
      code,
      translation
    })
  }

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as LanguageCode
    const code = (languages[storedLang]?.code || 'en-us') as LanguageCode

    if(language.code !== code) {
      updateLanguage(code)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}