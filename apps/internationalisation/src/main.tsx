import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';

import LanguageChange from './app/LanguageChange/LanguageChange';

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
  fr: {
    translation: {
      'Welcome to React': 'Bienvenue à React et react-i18next',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <LanguageChange />
  </React.StrictMode>,
  document.getElementById('root')
);
