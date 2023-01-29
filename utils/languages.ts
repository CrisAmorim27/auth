export const languages = {
  'pt-br': {
    label: 'Portuguese',
    code: 'pt-br',
    icon: '/flags/br.png',
    getTranslations: async() => await import('../languages/pt-br.json')
  },
  'en-us': {
    label: 'English',
    code: 'en-us',
    icon: '/flags/us.png',
    getTranslations: async() => await import('../languages/en-us.json')
  }
}

export type LanguageCode = keyof typeof languages
