import React from 'react';
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE, LANG_THAI, LanguageContext } from './LanguageContext';

interface LanguageProviderProps {
  children: any;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = React.useState(LANG_CHINESE);

  React.useEffect(() => {
    // 获取用户浏览器的首选语言
    const userLanguage = (navigator.language).toLowerCase()
    console.log("userLanguage " + userLanguage);
    if (userLanguage == undefined || userLanguage == null) {
      setLanguage(LANG_ENGLISH);
    } else {
      if (userLanguage.indexOf('zh') >= 0) {
        if (userLanguage.indexOf('cn') >= 0) {
          setLanguage(LANG_CHINESE);
        } else {
          setLanguage(LANG_CHINESE);
        }
      } else if (userLanguage.indexOf('jp') >= 0 || userLanguage.indexOf('ja') >= 0) {
        setLanguage(LANG_JAPANESE);
      }
      // else if (userLanguage.indexOf('th') >= 0) {
      //   setLanguage(LANG_THAI);//todo 临时注掉
      // } 
      else if (userLanguage.indexOf('en') >= 0) {
        setLanguage(LANG_ENGLISH);
      } else {
        setLanguage(LANG_ENGLISH);
      }
    }
  }, []);

  // const toggleLanguage = () => {
  //   setLanguage(prevLanguage => {
  //     switch (prevLanguage) {
  //       case 'en':
  //         return 'zh-Hans';
  //       case 'zh-Hans':
  //         return 'zh-Hant';
  //       case 'zh-Hant':
  //         return 'ja';
  //       case 'ja':
  //         return 'th';
  //       case 'th':
  //         return 'en';
  //       default:
  //         return 'en';
  //     }
  //   });
  // };

  const switchLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};