import { CSSProperties } from "react";
import { LANG_CHINESE, LanguageContext } from "../language/LanguageContext"



const getContentStyle = (language: string) => {

    const languageFont = (language: string) => {
        if (language == LANG_CHINESE) {
            return 'FZYouSongS';
        } else {
            return 'TomorrowRegular';
        }
    }


    const language2Font = (language: string) => {
        if (language == LANG_CHINESE) {
            return 'Source Han Serif CN';
        } else {
            return 'Tomorrow';
        }
    }

    const languageFontWeight = (language: string) => {
        if (language == LANG_CHINESE) {
            return 800;
        } else {
            return 400;
        }
    }


    const languageLineHeight = (language: string) => {
        if (language == LANG_CHINESE) {
            return '165%';
        } else {
            return '150%';
        }
    }

    const languageTextIndent = (language: string) => {
        if (language == LANG_CHINESE) {
            return 30;
        } else {
            return 0;
        }
    }

    const ChapterTitleStyle: CSSProperties = {
        fontFamily: 'Tomorrow',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 32,
        lineHeight: '38px',
        color: '#FFFFFF'
    }
    const ContentStyle: CSSProperties = {
        fontFamily: languageFont(language),
        fontStyle: 'normal',
        fontWeight: languageFontWeight(language),
        fontSize: 18,
        lineHeight: languageLineHeight(language),
        textIndent: languageTextIndent(language),
        fontFeatureSettings: `'pnum' on, 'lnum' on, 'pcap' on`,
        color: 'rgba(255, 255, 255, 0.70)',
        marginTop: 35,
        textAlign: 'start'
    }
    const ImageDescStyle: CSSProperties = {
        fontFamily: languageFont(language),
        fontStyle: 'normal',
        fontWeight: languageFontWeight(language),
        fontSize: 15,
        lineHeight: '18px',
        textAlign: 'center',
        color: '#868686'
    }
    const ImageStyle = {
        image: { marginTop: 15, marginBottom: 10 },
        desc: ImageDescStyle
    }


    const KeyNumStyle: CSSProperties = {
        fontFamily: language == LANG_CHINESE ? 'Source Han Serif CN' : 'TomorrowMedium',
        fontStyle: 'normal',
        fontWeight: language == LANG_CHINESE ? 700 : 500,
        fontSize: 18,
        color: '#FFFFFF',
    }


    const ClaimStyle: CSSProperties = {
        fontFamily: languageFont(language),
        fontStyle: 'normal',
        fontWeight: languageFontWeight(language),
        fontSize: 18,
        color: '#6BB8FF',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        textDecoration: 'underline',
    }

    const ChapterSubTitleStyle: CSSProperties = {
        fontFamily: language2Font(language),
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: 23,
        lineHeight: '38px',
        color: '#FFFFFF'
    }

    const ChapterSubTitleLevel2Style: CSSProperties = {
        fontFamily: language2Font(language),
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 20,
        lineHeight: '165%',
        color: '#FFFFFF'
    }

    const ChapterSubTitleLevel3Style: CSSProperties = {
        fontFamily: language2Font(language),
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '165%',
        color: '#FFFFFF'
    }


    const Chapter3MenuStyle: CSSProperties = {
        fontFamily: languageFont(language),
        fontStyle: 'normal',
        fontWeight: languageFontWeight(language),
        fontSize: 18,
        lineHeight: '180%',
        color: '#868686',
        marginBlockStart: 0,
        marginBlockEnd: 0
    }

    const ContentLineStyle: CSSProperties = {
        fontFamily: language == LANG_CHINESE ? 'FZYouSongS' : 'TomorrowMedium',
        fontStyle: 'normal',
        fontWeight: languageFontWeight(language),
        fontSize: 18,
        lineHeight: languageLineHeight(language),
        fontFeatureSettings: `'pnum' on, 'lnum' on, 'pcap' on`,
        color: '#FFFFFF',
        textDecoration: language === LANG_CHINESE ? 'underline' : 'none',
        // textDecorationSkipInk: 'none'
    }


    const ContentC3NumberStyle: CSSProperties = {
        fontFamily: 'Latin Modern Math'
    }
    const SizzleTipsStyle: CSSProperties = {
        fontFamily: languageFont(language),
        fontStyle: 'normal',
        fontWeight: languageFontWeight(language),
        fontSize: 15,
        lineHeight: '165%',
        fontFeatureSettings: `'pnum' on, 'lnum' on, 'pcap' on`,
        color: '#868686',
        textAlign: 'start'
    }
    return {
        ChapterTitleStyle, ContentStyle, ImageStyle, KeyNumStyle, ClaimStyle, ChapterSubTitleStyle,
        Chapter3MenuStyle, ContentLineStyle, ContentC3NumberStyle, ChapterSubTitleLevel2Style, ChapterSubTitleLevel3Style, SizzleTipsStyle
    };
}

export default getContentStyle;