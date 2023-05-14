import React from 'react';

export const LANG_ENGLISH = 'ENGLISH';
export const LANG_CHINESE = 'CHINESE';
export const LANG_JAPANESE = 'JAPANESE';
export const LANG_THAI = 'THAI';

interface LanguageContextType {
  language: string;
  switchLanguage: (string) => void;
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: '',
  switchLanguage: (language) => {},
});