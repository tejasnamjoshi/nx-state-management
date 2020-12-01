import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';

import LanguageChange from './app/LanguageChange/LanguageChange';
import { en, es } from './locales';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { en, es },
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
