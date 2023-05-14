import { forwardRef, useImperativeHandle, useRef } from 'react';
import "../../node_modules/video-react/dist/video-react.css";
import cha3P1 from '../resources/cha3_p1.png';
import cha3P2 from '../resources/cha3_p2.png';
import cha3P3 from '../resources/cha3_p3.png';
import cha3P4 from '../resources/cha3_p4.png';
import cha3P5 from '../resources/cha3_p5.png';

import cha3M1 from '../resources/cha3_m1.png';
import cha3M1Eng from '../resources/cha3_m1_eng.png';
import cha3M2Eng from '../resources/cha3_m2_eng.png';
import cha3M10 from '../resources/cha3_m10.png';
import cha3M10Eng from '../resources/cha3_m10_eng.png';
import cha3M11 from '../resources/cha3_m11.png';
import cha3M11Eng from '../resources/cha3_m11_eng.png';
import cha3M12 from '../resources/cha3_m12.png';
import cha3M12Eng from '../resources/cha3_m12_eng.png';
import cha3M13 from '../resources/cha3_m13.png';
import cha3M13Eng from '../resources/cha3_m13_eng.png';
import cha3M14 from '../resources/cha3_m14.png';
import cha3M15 from '../resources/cha3_m15.png';
import cha3M16 from '../resources/cha3_m16.png';
import cha3M17 from '../resources/cha3_m17.png';
import cha3M18 from '../resources/cha3_m18.png';
import cha3M19 from '../resources/cha3_m19.png';
import cha3M2 from '../resources/cha3_m2.png';
import cha3M20 from '../resources/cha3_m20.png';
import cha3M3 from '../resources/cha3_m3.png';
import cha3M4 from '../resources/cha3_m4.png';
import cha3M5 from '../resources/cha3_m5.png';
import cha3M6 from '../resources/cha3_m6.png';
import cha3M7 from '../resources/cha3_m7.png';
import cha3M8 from '../resources/cha3_m8.png';
import cha3M9 from '../resources/cha3_m9.png';
import link from '../resources/link.png';


import { MENUTOP_OFFSET, textindent } from '../data/Constant';
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE } from '../language/LanguageContext';
import { useTranslation2 } from '../language/useTranslation';
import getContentStyle from '../util/ContentStyleUtil';
import { ChapterContent, ChapterMultiContent, ChapterTitle, PSep } from './Cha1';
import ClaimButton from './ClaimButton';
import './Main.css';

interface ChapterSubTitleProps {
    text: string;
    level: number;

}
export const ChapterSubTitle = (props: ChapterSubTitleProps) => {
    const { t, lan } = useTranslation2();
    const { ChapterSubTitleStyle, ChapterSubTitleLevel2Style, ChapterSubTitleLevel3Style } = getContentStyle(lan);
    let s = ChapterSubTitleStyle;
    if (props.level == 1) {
        s = ChapterSubTitleLevel2Style;
    } else if (props.level == 2) {
        s = ChapterSubTitleLevel3Style;
    }
    return (
        <div style={{ ...s, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 35 }} onClick={() => { }}>
            {props.text}
        </div>
    )
}
interface ChapterMenuProps {
    index: string;
    text: string;
    level: number;

}
export const ChapterMenu = (props: ChapterMenuProps) => {
    const { t, lan } = useTranslation2();
    const { Chapter3MenuStyle } = getContentStyle(lan);
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ ...Chapter3MenuStyle, marginLeft: 30 * props.level }} onClick={() => { }}>
                {props.index}
            </span>
            <span style={{ ...Chapter3MenuStyle, marginLeft: 15 }} onClick={() => { }}>
                {props.text}
            </span>
        </div>
    )
}

const Cha3 = forwardRef<any, any>((props, ref) => {

    const rootRef = useRef(null as any);
    const claimButtonRef = useRef(null as any);
    const { t, lan } = useTranslation2();
    const { ContentStyle, ContentLineStyle, ContentC3NumberStyle } = getContentStyle(lan);
    useImperativeHandle(ref, () => ({
        showClaimAni: (position, money, skipAnim = false) => {
            claimButtonRef?.current?.showAni(money, skipAnim);
        },
        menuTops: () => {
            return [
                rootRef.current.offsetTop + OverViewRef.current.offsetTop - MENUTOP_OFFSET,
                rootRef.current.offsetTop + IntuitionRef.current.offsetTop - MENUTOP_OFFSET,
                rootRef.current.offsetTop + MechanismRef.current.offsetTop - MENUTOP_OFFSET,
                rootRef.current.offsetTop + EcosystemRef.current.offsetTop - MENUTOP_OFFSET,
                rootRef.current.offsetTop + ConclusionAndVisionRef.current.offsetTop - MENUTOP_OFFSET,]
        }

    }));
    const OverViewRef = useRef(null as any);
    const IntuitionRef = useRef(null as any);
    const MechanismRef = useRef(null as any);
    const EcosystemRef = useRef(null as any);
    const ConclusionAndVisionRef = useRef(null as any);

    function getOpacity() {
        if (lan == LANG_JAPANESE) {
            return 0;
        } else {
            return 1;
        }
    }

    const isChinese = lan == LANG_CHINESE;
    const isEnglish = lan == LANG_ENGLISH;

    const marginFix1 = -17.5;
    const marginSubP = 17.5;
    const subMarginLeft = 30;

    const level3ContentStyle = isChinese ? {} : { marginLeft: 30 };
    return (
        <div ref={rootRef} className='chapter_block' style={{ opacity: `${getOpacity()}` }}>
            <div ref={OverViewRef}></div>
            <ChapterTitle text='Chapter III - User Wealth Token' />
            <ChapterSubTitle text={t('cha3_c1')} level={0} />
            <div style={{ marginTop: 15, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                <ChapterMenu index='1' text={t('cha3_m1')} level={0} />
                <ChapterMenu index='2' text={t('cha3_m2')} level={0} />
                <ChapterMenu index='3' text={t('cha3_m3')} level={0} />
                <ChapterMenu index='1' text={t('cha3_m3_1')} level={1} />
                <ChapterMenu index='2' text={t('cha3_m3_2')} level={1} />
                <ChapterMenu index='3' text={t('cha3_m3_3')} level={1} />
                <ChapterMenu index='1' text={t('cha3_m3_3_1')} level={2} />
                <ChapterMenu index='2' text={t('cha3_m3_3_2')} level={2} />
                <ChapterMenu index='3' text={t('cha3_m3_3_3')} level={2} />
                <ChapterMenu index='4' text={t('cha3_m3_3_4')} level={2} />
                <ChapterMenu index='4' text={t('cha3_m3_4')} level={1} />
                <ChapterMenu index='1' text={t('cha3_m3_4_1')} level={2} />
                <ChapterMenu index='2' text={t('cha3_m3_4_2')} level={2} />
                <ChapterMenu index='3' text={t('cha3_m3_4_3')} level={2} />
                <ChapterMenu index='4' text={t('cha3_m3_4_4')} level={2} />
                <ChapterMenu index='5' text={t('cha3_m3_5')} level={1} />
                <ChapterMenu index='4' text={t('cha3_m4')} level={0} />
                <ChapterMenu index='1' text={t('cha3_m4_1')} level={1} />
                <ChapterMenu index='2' text={t('cha3_m4_2')} level={1} />
                <ChapterMenu index='5' text={t('cha3_m5')} level={0} />
            </div>
            {/* overview */}
            <ChapterSubTitle text={t('cha3_m1')} level={0} />
            <span style={{ ...ContentStyle }}>
                {t('cha3_c2')}
                <span style={{ ...ContentLineStyle, textIndent: 0 }}>
                    {t('cha3_c3')}
                </span>
            </span>

            <div style={{ marginTop: marginFix1 }}>
                <ChapterMultiContent text='' texts={[t('cha3_c4'), t('cha3_c5'), t('cha3_c6')]} />
            </div>
            <div style={{ marginTop: marginFix1 }}>
                <ChapterContent text={t('cha3_c7')} />
            </div>

            <div ref={IntuitionRef} />
            <ChapterSubTitle text={t('cha3_m2')} level={0} />

            <ChapterContent text={t('cha3_c8')} />



            <div style={{ marginTop: isChinese? marginFix1+10 :marginFix1}}>
                <ChapterContent text={t('cha3_c9')} />
            </div>
            <PSep />

            {
                isEnglish ? <div style={{ ...ContentStyle, marginTop: 0, display: 'flex', position: 'relative' }}>
                    <span style={{}}>{t('cha3_c10&11')}</span>
                    <img src={cha3M1Eng} style={{ position: 'absolute', left: 290, top: -2, width: 296, height: 37 }}></img>

                </div>
                    :
                    <div style={{ ...ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',height:40 }}>
                        <span style={{ textAlign: 'center' }}>{t('cha3_c10')}</span>
                        <img src={cha3M1} style={{ width: 215, height: 42, marginTop: 2 }}></img>
                        <span style={{ textIndent: 0 }}>{t('cha3_c11')}</span>
                    </div>
            }


            <div style={{ ...ContentStyle, marginTop: isChinese ? 0 : marginSubP }}>
                <span style={{ ...ContentLineStyle }}>{t('cha3_c12')}</span>
            </div>

            {
                isEnglish ? <div style={{ ...ContentStyle, marginTop: marginSubP, display: 'flex', position: 'relative' }}>
                    <span style={{ lineHeight: '185%' }}>{t('cha3_c13')}</span>
                    <img src={cha3M2Eng} style={{ position: 'absolute', left: 216, top: 66, width: 523, height: 38 }}></img>

                </div>
                    :
                    <div style={{ ...ContentStyle, marginTop: marginSubP+10, position: 'relative' }}>
                        <span style={{ lineHeight: '160%' }}>{t('cha3_c13')}</span>
                        <img src={cha3M2} style={{ position: 'absolute', left: 95, top: 26, width: 345, height: 40 }}></img>
                    </div>
            }



            <div style={{ ...ContentStyle, marginTop: isChinese? marginSubP+15:marginSubP }}>
                <span style={{ ...ContentLineStyle }}>{t('cha3_c14')}</span>
            </div>

            <video id="playChatVideo" controls={true} src={require('../resources/cha3.mp4')} width="754" height="644" style={{}}>

            </video >
            <div style={{ marginTop: marginFix1 }}>
                <ChapterContent text={t('cha3_c15')} />
            </div>
            <PSep />
            <div style={{ ...ContentStyle, marginTop: 0 }}>
                <span style={{ ...ContentLineStyle }}>{t('cha3_c16')}</span>
            </div>

            <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                <span style={{ ...ContentLineStyle }}>{t('cha3_c17')}</span>
            </div>



            <div ref={MechanismRef} />
            <ChapterSubTitle text={t('cha3_m3')} level={0} />



            <div style={{ marginLeft: subMarginLeft, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <ChapterSubTitle text={t('cha3_m3_1')} level={1} />
                <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                    <div > <span style={{ ...ContentC3NumberStyle }}>P：</span>{t('cha3_c18')}</div>
                    <div > <span style={{ ...ContentC3NumberStyle }}> S：</span>{t('cha3_c19')}</div>
                    <div> <span style={{ ...ContentC3NumberStyle }}> I：</span>{t('cha3_c20')}</div>
                    <div > <span style={{ ...ContentC3NumberStyle }}>C：</span>{t('cha3_c21')}</div>
                </div>

                <ChapterSubTitle text={t('cha3_m3_2')} level={1} />
                <div style={{ width: '100%', marginTop: marginSubP, display: 'flex', justifyContent: 'center' }}>
                    <img src={cha3M3} style={{ width: 105, height: 68 }} />
                </div>

                <div style={{ marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c22')} />
                </div>

                <ChapterSubTitle text={t('cha3_m3_3')} level={1} />
                <div style={{ marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c23')} />
                </div>


                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_3_1')} level={2} />
                </div>
                <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: marginSubP }}>
                    <div><span style={{ ...ContentC3NumberStyle }}>ΔS：</span>{t('cha3_c24')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}>ΔI：</span>{t('cha3_c25')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}>δ：</span>{t('cha3_c26')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}> α：</span>{t('cha3_c27')}</div>
                </div>

                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_3_2')} level={2} />
                </div>

                <div style={{ width: '100%', marginTop: marginSubP, display: 'flex', justifyContent: 'center' }}>
                    <img src={cha3M4} style={{ width: 233, height: 75 }} />
                </div>

                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_3_3')} level={2} />
                </div>
                <div style={{ marginTop: marginFix1, ...level3ContentStyle }}>
                    <ChapterContent text={t('cha3_c28')} />
                </div>
                <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
                    <span style={{ textAlign: 'center' }}>{t('cha3_c29')}</span>
                    <img src={cha3M5} style={{ width: 336, height: 84, marginLeft: 7, marginTop: 6 }} title={'C：' + t('cha3_c21')} />
                </div>
                <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
                    <span style={{ textAlign: 'center' }}>{t('cha3_c30')}</span>
                    <img src={cha3M6} style={{ width: 221, height: 53, marginTop: 1, marginLeft: 7 }} title={'S：' + t('cha3_c19')} />
                </div>


                <div style={{ ...ContentStyle, textIndent: 0 }}>
                    <img src={cha3P1} style={{ width: 730, height: 308 }} />
                </div>

                {/* 数值举例1 */}
                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_3_4')} level={2} />
                </div>
                <div style={{ ...level3ContentStyle, marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c31')} />
                </div>

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c32')}</span>
                            <img src={cha3M7} style={{ width: 243, height: 36, marginTop: 4, marginLeft: 5 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c32')}</span>
                            <img src={cha3M7} style={{ width: 286, height: 42, marginTop: 4, marginLeft: 5 }} />
                        </div>
                }
                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c33')}</span>
                            <img src={cha3M8} style={{ width: 220, height: 22, marginLeft: 5 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c33')}</span>
                            <img src={cha3M8} style={{ width: 220, height: 22, marginLeft: 5 }} />
                        </div>
                }

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 16, display: 'flex', flexDirection: 'column' }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c34')}</span>
                            <img src={cha3M9} style={{ width: 346, height: 50, marginTop: 10 }} />
                        </div> :
                        <div style={{ ...ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c34')}</span>
                            <img src={cha3M9} style={{ width: 346, height: 50 }} />
                        </div>
                }

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c35')}</span>
                            <img src={cha3M10Eng} style={{ width: 411, height: 41, marginLeft: 3, marginTop: 3 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c35')}</span>
                            <img src={cha3M10} style={{ width: 452, height: 45, marginLeft: 3, marginTop: 3 }} />
                        </div>
                }

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                            <span style={{}}>{t('cha3_c36')}</span>
                            <img src={cha3M11Eng} style={{ width: 309, height: 13, marginLeft: 2 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c36')}</span>
                            <img src={cha3M11} style={{ width: 342, height: 15 }} />
                        </div>
                }


                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c37')}</span>
                            <img src={cha3M12Eng} style={{ width: 212, height: 14 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c37')}</span>
                            <img src={cha3M12} style={{ width: 235, height: 16 }} />
                        </div>
                }


                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 15, position: 'relative' }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c38&39')}</span>
                            <img src={cha3M13Eng} style={{ width: 257, height: 39, position: 'absolute', left: 135, top: -3 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 65 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c38')}</span>
                            <img src={cha3M13} style={{ width: 285, height: 44 }} />
                            <span style={{ textAlign: 'center', textIndent: 0 }}>{t('cha3_c39')}</span>
                        </div>
                }




                <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                    <img src={cha3P4} style={{ width: 760, height: 483, marginLeft: -30 }}></img>
                </div>


                <ChapterSubTitle text={t('cha3_m3_4')} level={1} />




                <div style={{ marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c40')} />
                </div>

                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_4_1')} level={2} />
                </div>
                <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: marginSubP }}>
                    <div><span style={{ ...ContentC3NumberStyle }}>R：</span>{t('cha3_c41')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}>B：</span>{t('cha3_c42')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}>t：</span>{t('cha3_c43')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}>β：</span>{t('cha3_c44')}</div>
                    <div><span style={{ ...ContentC3NumberStyle }}>T：</span>{t('cha3_c45')}</div>
                </div>


                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_4_2')} level={2} />
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: marginSubP }}>
                    <img src={cha3M14} style={{ width: 233, height: 44 }} title={'I：' + t('cha3_c20')} />
                </div>

                <div style={{ marginTop: marginFix1, ...level3ContentStyle }}>
                    <ChapterContent text={t('cha3_c46')} />
                </div>

                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_4_3')} level={2} />
                </div>



                <div style={{ marginTop: marginFix1, ...level3ContentStyle }}>
                    <ChapterContent text={t('cha3_c47')} />
                </div>


                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c48')}</span>
                            <img src={cha3M15} style={{ width: 314, height: 56, marginLeft: 10 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c48')}</span>
                            <img src={cha3M15} style={{ width: 314, height: 56 }} />
                        </div>
                }



                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={cha3P2} style={{ width: 730, height: 401 }} />
                </div>


                {/* 数值举例-2 */}
                <div style={{ marginLeft: subMarginLeft }}>
                    <ChapterSubTitle text={t('cha3_m3_4_4')} level={2} />
                </div>
                <PSep />
                <div style={{ ...ContentStyle, ...level3ContentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 60 }}>
                    <span style={{}}>{t('cha3_c49')}</span>
                </div>

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c50')}</span>
                            <img src={cha3M16} style={{ marginLeft: 5, width: 145, height: 14 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c50')}</span>
                            <img src={cha3M16} style={{ marginLeft: 5, width: 145, height: 14 }} />
                        </div>
                }

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{}}>{t('cha3_c51&c52')}</span>
                        </div> :
                        <>
                            <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                                <span style={{}}>{t('cha3_c51')}</span>
                            </div>
                            <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                                <span style={{}}>{t('cha3_c52')}</span>

                            </div>
                        </>
                }
                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginTop: 15 }}>
                            <img src={cha3M17} style={{ width: 699, height: 49 }} />
                        </div> :
                        <div style={{ ...ContentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginTop: -10, height: 60 }}>
                            <img src={cha3M17} style={{ width: 699, height: 49 }} />
                        </div>
                }


                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, display: 'flex', flexDirection: 'column', marginTop: 35 }}>
                            <span style={{}}>{t('cha3_c53')}</span>
                            <img src={cha3M18} style={{ marginLeft: 5, width: 604, height: 19, marginTop: 10 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 60 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c53')}</span>
                            <img src={cha3M18} style={{ marginLeft: 5, width: 604, height: 19 }} />
                        </div>
                }



                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 20, position: 'relative' }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c54&c55')}</span>
                            <img src={cha3M19} style={{ width: 134, height: 14, position: 'absolute', left: 205, top: 8 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c54')}</span>
                            <img src={cha3M19} style={{ marginLeft: 5, width: 134, height: 14 }} />
                            <span style={{ textAlign: 'center', textIndent: 0 }}>{t('cha3_c55')}</span>
                        </div>
                }


                <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: isEnglish?15:0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                    <span style={{}}>{t('cha3_c56')}</span>

                </div>

                {
                    isEnglish ?
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 20, marginBottom: 10, position: 'relative' }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c57&c58')}</span>
                            <img src={cha3M20} style={{ width: 320, height: 44, position: 'absolute', left: 270, top: -6 }} />
                        </div> :
                        <div style={{ ...ContentStyle, ...level3ContentStyle, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                            <span style={{ textAlign: 'center' }}>{t('cha3_c57')}</span>
                            <img src={cha3M20} style={{ marginLeft: 5, width: 320, height: 44 }} />
                            <span style={{ textAlign: 'center', textIndent: 0 }}>{t('cha3_c58')}</span>
                        </div>
                }



                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                    <img src={cha3P3} style={{ width: 760, height: 495, marginLeft: -30 }} />
                </div>

                <ChapterSubTitle text={t('cha3_m3_5')} level={1} />
                <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                    <div>
                        {t('cha3_c59')}<span style={{ ...ContentLineStyle, textDecoration: 'underline' }}>0x4cbC...F234</span><img src={link} style={{ marginLeft: 2, width: 16, height: 16 }} /> {t('cha3_c60')}
                    </div>

                    <div style={{ ...ContentStyle, marginTop: isEnglish ? 13 : 0 }}>
                        <ol style={{ margin: 0, marginLeft: 7 }}>
                            <li style={{ textIndent: 0 }}>{t('cha3_c61')}</li>
                        </ol>
                    </div>
                </div>

                <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                    <div>
                        {t('cha3_c62')}<span style={{ ...ContentLineStyle, textDecoration: 'underline' }}>0x4cbC...F234</span><img src={link} style={{ marginLeft: 2, width: 16, height: 16 }} />{t('cha3_c63')}
                    </div>
                   

                    <div style={{ ...ContentStyle, marginTop: isEnglish ? 13 : 0 }}>
                        <ol style={{ margin: 0, marginLeft: 7 }}>
                            <li style={{ textIndent: 0 }}>{t('cha3_c64')}</li>
                            <li style={{ textIndent: 0 }}>{t('cha3_c65')}</li>
                            <li style={{ textIndent: 0 }}>{t('cha3_c66')}</li>
                            <li style={{ textIndent: 0 }}>{t('cha3_c67')}</li>
                        </ol>
                    </div>
                </div>
            </div>



            <div ref={EcosystemRef} />
            <ChapterSubTitle text={t('cha3_m4')} level={0} />

            <div style={{ ...ContentStyle, textIndent: 0 }}>
                <img src={cha3P5} style={{ width: 760, height: 365 }} />
            </div>
            <div style={{ marginLeft: subMarginLeft, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <ChapterSubTitle text={t('cha3_m4_1')} level={1} />

                <div style={{ marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c68')} />
                </div>
                <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                    <ol style={{ margin: 0 }}>
                        <li style={{ textIndent: 0 }}>{t('cha3_c69')} </li>
                        <li style={{ textIndent: 0 }}>{t('cha3_c70')} </li>
                        <li style={{ textIndent: 0 }}>{t('cha3_c71')} </li>
                    </ol>
                </div>
                <ChapterSubTitle text={t('cha3_m4_2')} level={1} />
                <div style={{ marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c72')} />
                </div>
                <div style={{ marginTop: marginFix1 }}>
                    <ChapterContent text={t('cha3_c73')} />
                </div>


                <div style={{ ...ContentStyle, marginTop: marginSubP }}>

                    <ol style={{ margin: 0, marginLeft: 7 }}>
                        <li style={{ textIndent: 0 }}>{t('cha3_c74')}</li>
                        <li style={{ textIndent: 0 }}>{t('cha3_c75')}</li>
                        <li style={{ textIndent: 0 }}>{t('cha3_c76')}</li>
                    </ol>
                </div>
            </div>


            <div ref={ConclusionAndVisionRef} />
            <ChapterSubTitle text={t('cha3_m5')} level={0} />



            <ChapterContent text={t('cha3_c77')} />
            <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                <ol style={{ margin: 0, marginLeft: 7 }}>
                    <li style={{ textIndent: 0 }}>{t('cha3_c78')}</li>
                    <li style={{ textIndent: 0 }}>{t('cha3_c79')}</li>
                    <li style={{ textIndent: 0 }}>{t('cha3_c80')}</li>
                </ol>
            </div>
            <ChapterContent text={t('cha3_c81')} />
            <div style={{ ...ContentStyle, marginTop: marginSubP }}>
                {t('cha3_c82')}
                <div style={{ marginLeft: isChinese ? 30 : 0, marginTop: isChinese ? 0 : 20, display: 'flex' }}>
                    <ClaimButton ref={claimButtonRef} label={t('cha3_c83')} position={3} onClaimClick={() => { props.claim(3) }} onAniDone={() => { props.onAniDone(3) }} />

                </div>
            </div>


        </div>
    );
});
export default Cha3;