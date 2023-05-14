import { forwardRef, useImperativeHandle, useRef } from 'react';
import { C4_UPLEVEL, MENUTOP_OFFSET, redeemOpenTimeLeft } from '../data/Constant';
import { LANG_JAPANESE } from '../language/LanguageContext';
import { useTranslation2 } from '../language/useTranslation';
import cha4P1 from '../resources/cha4_p1.png';
import getContentStyle from '../util/ContentStyleUtil';
import { ChapterImage, ChapterMultiContent, ChapterTitle } from './Cha1';
import { Cha4CountDown } from './Cha4CountDown';
import ClaimButton from './ClaimButton';
import './Main.css';

const Cha4 = forwardRef<any, any>((props, ref) => {
    const rootRef = useRef(null as any);
    const claimButtonRef = useRef(null as any);

    const {t,lan} = useTranslation2();
    const { ContentStyle, KeyNumStyle } = getContentStyle(lan);
    useImperativeHandle(ref, () => ({
        showClaimAni: (position, money, skipAnim = false) => {
            claimButtonRef.current.showAni(money, skipAnim);
        },
        menuTops: () => {
            return rootRef.current.offsetTop - MENUTOP_OFFSET;
        }

    }));

    function getOpacity(){
        if(lan == LANG_JAPANESE){
            return 0;
        }else{
            return 1;
        }
    }
    return (
         <div ref={rootRef} className='chapter_block'  style={{opacity:`${getOpacity()}`,marginBottom:0}}>

            <ChapterTitle text='Chapter IV - LFG' />
            <Cha4CountDown duration={redeemOpenTimeLeft() / 1000} />
            <div style={{ ...ContentStyle , marginTop: 0}}>
                <span>{t('cha4_c1')}</span>
                {
                    props.info == null || props.info.balance.toNumber() == 0 ? "" :
                        <>
                            <span style={{ ...KeyNumStyle, textIndent: 0 }}>&nbsp;{props.info.balance.toString()}&nbsp;</span>
                            <span style={{ textIndent: 0 }}>{t('cha4_c1_1')}</span>
                        </>
                }
                <span style={{ textIndent: 0 }}>{t('cha4_c2')}</span>
            </div>
            <div style={{ ...ContentStyle }}>
                <span>{t('cha4_c3_1')}</span>
                <span style={{ ...KeyNumStyle, textIndent: 0 }}>{C4_UPLEVEL}</span>
                <span>{t('cha4_c3_2')}</span>
            </div>
            <div style={{ marginTop: 20 }}>
                <ChapterImage url={cha4P1} width={760} height={413} desc={''} />
            </div>
            <ChapterMultiContent text='' texts={[t('cha4_c4'), t('cha4_c5'), t('cha4_c6'), t('cha4_c7')]} />
            <div style={{ marginTop: 35, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <ClaimButton ref={claimButtonRef} label={t('cha4_c8')} position={4} onClaimClick={() => { props.claim(4) }} onAniDone={() => { props.onAniDone(4) }} />
            </div>
        </div>
    );
});
export default Cha4;