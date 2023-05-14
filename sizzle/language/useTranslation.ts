import React, { useState } from 'react';
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE,LANG_THAI, LanguageContext } from './LanguageContext';
import { CHINESE_CONTENT } from '../translations/CHINESE';
import { ENGLISH_CONTENT } from '../translations/ENGLISH';
import { JAPANESE_CONTENT } from '../translations/JAPANESE';
// import { THAI_CONTENT } from '../translations/THAI';


const loadTranContent = (lang) => {
  if (lang == LANG_CHINESE) {
    return CHINESE_CONTENT;
  } else if (lang == LANG_ENGLISH) {
    return ENGLISH_CONTENT
  } else if (lang === LANG_JAPANESE) {
    return JAPANESE_CONTENT
  }
  //  else if (lang === LANG_THAI) {
  //   return THAI_CONTENT
  // }
  return {}
}

interface Translations {
  [key: string]: string;
}

export const useTranslation = () => {
  const { language } = React.useContext(LanguageContext);
  const [translations, setTranslations] = React.useState<Translations>(CHINESE_CONTENT);


  React.useEffect(() => {
    // const loadTranslations = async () => {
    //   try {
    //     console.log("fffffff ",language)//lan ENGLISH,JAPANESE CHINESE
    //     const module = await import(`../translations/${language}.json`);
    //     setTranslations(module.default);
    //   } catch (error) {
    //     console.warn(`Failed to load translations for ${language}`);
    //   }
    // };

    // loadTranslations();
    setTranslations(loadTranContent(language));
  }, [language]);

  const t = (key: string) => {
    const translation = translations[key];

    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return '';
    }

    return translation;
  };

  return t;
};

export const useTranslation2 = () => {
  const { language } = React.useContext(LanguageContext);
  const [translations, setTranslations] = React.useState<Translations>(CHINESE_CONTENT);
  const [lan, setLan] = useState(language)

  React.useEffect(() => {
    // const loadTranslations = async () => {
    //   try {
    //     const module = await import(`../translations/${language}.json`);
    //     setTranslations(module.default);
    //     setLan(language);
    //   } catch (error) {
    //     console.warn(`Failed to load translations for ${language}`);
    //   }
    // };
    // loadTranslations();

    setTranslations(loadTranContent(language));
    setLan(language);
  }, [language]);

  const t = (key: string) => {
    const translation = translations[key];

    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return '';
    }

    return translation;
  };

  return { t, lan };
};
