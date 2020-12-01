import './LanguageChange.scss';

import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageChange() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (languageStr: string) => {
    setLanguage(languageStr);
  };

  const { t } = useTranslation(['topics', 'headings']);
  return (
    <div>
      <h1>{t('headings:TopGunReview')}</h1>
      <h3>{t('Review')}</h3>
      <p></p>
      <button onClick={() => handleLanguageChange('es')}>
        {t('Change Language - Spanish')}
      </button>
      <button onClick={() => handleLanguageChange('en')}>
        {t('Change Language - English')}
      </button>
    </div>
  );
}

export default LanguageChange;
