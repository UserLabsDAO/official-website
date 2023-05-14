import React, { CSSProperties, forwardRef, useImperativeHandle, useRef } from 'react';
import { MENUTOP_OFFSET, TEST_DATA_NUMBER } from '../data/Constant';
import { useTranslation2 } from '../language/useTranslation';
import cha1P1 from '../resources/cha1_p1.png';
import cha1P2 from '../resources/cha1_p2.png';
import getContentStyle from '../util/ContentStyleUtil';
import ClaimButton from './ClaimButton';
import './Main.css';
import { LANG_CHINESE } from '../language/LanguageContext';

interface ChapterWidgetProps {
    text: string;
    texts?: string[];
}

interface ChapterWidgetImageProps {
    url: string;
    width: number;
    height: number;
    desc: string;
    cusTextStyle?:CSSProperties;
}

export const ChapterTitle = (props: ChapterWidgetProps) => {
    const { t, lan } = useTranslation2()
    const { ChapterTitleStyle } = getContentStyle(lan);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { }}>
            <div style={{ width: 18, height: 18, backgroundColor: '#ffffff' }}></div>
            <span style={{ ...ChapterTitleStyle, marginLeft: 10 }}>
                {props.text}
            </span>
        </div>
    )
}

export const ChapterContent = (props: ChapterWidgetProps) => {
    // const { language } = React.useContext(LanguageContext);
    const { t, lan } = useTranslation2()
    const { ContentStyle } = getContentStyle(lan);
    return (
        <div style={{ ...ContentStyle }}>
            {props.text}</div>
    )
}

export const ChapterMultiContent = (props: ChapterWidgetProps) => {
    const { t, lan } = useTranslation2()
    const { ContentStyle } = getContentStyle(lan);
    return (
        <div style={{ ...ContentStyle }}>
            {props?.texts?.map((word, index) => <><div>{word}</div><PSep/></>)}
        </div>
    )
}

export const ChapterImage = (props: ChapterWidgetImageProps) => {
    const { t, lan } = useTranslation2()
    const { ImageStyle } = getContentStyle(lan);
    let spanStyle = {...ImageStyle.desc };
    if(props.cusTextStyle){
        spanStyle = {...spanStyle,...props.cusTextStyle}
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img src={props.url} style={{ ...ImageStyle.image, width: props.width, height: props.height }} />
            {props.desc === '' ? <></> : <span style={{ ...spanStyle }}> {props.desc}</span>}

        </div>
    )
}


export const PSep = () => {
    const { t, lan } = useTranslation2()
    return (
        lan === LANG_CHINESE ? <></> : <div style={{ height: 10 }} />
    )
}

function usePrevious(data) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = data
    }, [data])
    return ref.current
}



const Cha1 = forwardRef<any, any>((props, ref) => {
    // const t = useTranslation();
    const { t, lan } = useTranslation2();
    const { ContentStyle, KeyNumStyle } = getContentStyle(lan);
    const claimButtonRef = useRef(null as any);
    const claimButton2Ref = useRef(null as any);
    const rootRef = useRef(null as any);

    useImperativeHandle(ref, () => ({
        showClaimAni: (position, money, skipAnim = false) => {
            (position == 0 ? claimButtonRef : claimButton2Ref).current.showAni(money, skipAnim);
        },
        menuTops: () => {
            return rootRef.current.offsetTop - MENUTOP_OFFSET;
        }


    }));


    return (
        <div ref={rootRef} className='chapter_block'>
            <ChapterTitle text='Chapter I - Take User’s Wealth Back' />
            <div style={{ ...ContentStyle }}>
                <div > {t('cha1_c1')}</div>
                <PSep />
                <div style={{ display: 'flex' }}>{t('cha1_c2')}
                    <ClaimButton
                        ref={claimButtonRef}
                        label={t('cha1_c3')}
                        position={0}
                        onClaimClick={() => { props.claim(0) }}
                        onAniDone={() => { props.onAniDone(0) }}
                    />
                    <span style={{ textIndent: 0 }}> {t('cha1_c4')}</span>
                </div> 
                <PSep />
                <div > {t('cha1_c5')}</div>
                 <PSep />
                <div> {t('cha1_c6')}</div>
            </div>
            <ChapterContent text={t('cha1_c7')} />
            <ChapterImage url={cha1P1} width={760} height={352} desc={t('cha1_p1')} />
            <ChapterContent text={t('cha1_c8')} />
            <ChapterImage url={cha1P2} width={760} height={492} desc={t('cha1_p2')} />
            <ChapterContent text={t('cha1_c9')} />
            <ChapterMultiContent text='' texts={[t('cha1_c10'), t('cha1_c11'), t('cha1_c12'), t('cha1_c13'), t('cha1_c14'), t('cha1_c15')]} />
            <div style={{ ...ContentStyle }}>
                <span>{t('cha1_c16_1')}</span>
                <span style={{ ...KeyNumStyle, textIndent: 0 }}>{TEST_DATA_NUMBER[0]}</span>
                <span style={{ textIndent: 0 }}>{t('cha1_c16_2')}</span>
                <span style={{ ...KeyNumStyle, textIndent: 0 }}>{TEST_DATA_NUMBER[1]}</span>
                <span style={{ textIndent: 0 }}>{t('cha1_c16_3')}</span>
                <span style={{ ...KeyNumStyle, textIndent: 0 }}>{TEST_DATA_NUMBER[2]}</span>
                <span style={{ textIndent: 0 }}>{t('cha1_c16_4')}</span>
            </div>
            <div style={{ ...ContentStyle, display: 'flex' }}>
                {t('cha1_c17')}
                <ClaimButton ref={claimButton2Ref} label={t('cha1_c18')} position={1} onClaimClick={() => { props.claim(1) }} onAniDone={() => { props.onAniDone(1) }} />
                <span style={{ textIndent: 0 }}>  {t('cha1_c19')}</span>
            </div>
        </div>
    );
});
export default Cha1;