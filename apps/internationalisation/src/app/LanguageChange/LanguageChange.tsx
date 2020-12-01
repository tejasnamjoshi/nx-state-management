import './LanguageChange.scss';

import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface ILanguageChangeProps {}

export function LanguageChange(props: ILanguageChangeProps) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (languageStr: string) => {
    setLanguage(languageStr);
  };

  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('Welcome to React')}</h1>
      <button onClick={() => handleLanguageChange('fr')}>
        {t('Change Language - French')}
      </button>
      <button onClick={() => handleLanguageChange('en')}>
        {t('Change Language - English')}
      </button>
    </div>
  );
}

export default LanguageChange;
