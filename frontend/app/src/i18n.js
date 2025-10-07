import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/tarnslate.json';
import translationFA from './locales/fa/tarnslate.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      fa: { translation: translationFA },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
