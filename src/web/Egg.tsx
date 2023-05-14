import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cha1P1 from '../resources/cha1_p1.png';
import cha1P2 from '../resources/cha1_p2.png';
import cha1P3 from '../resources/cha1_p3.png';
import './Main.css'
import { Cha4CountDown } from './Cha4CountDown';
import { MENUTOP_OFFSET, redeemOpenTimeLeft, textindent } from '../data/Constant';
import { CountDown } from '../util/CountDown';
import { AppendixCountDown } from './AppendixCountDown';
import ClaimButton from './ClaimButton';
import egg_bg2 from '../resources/egg_bg2.png';
import egg_fg from '../resources/egg_fg.png';
import egg_paper_bg from '../resources/egg_paper_bg.png';
import egg_paper_tag from '../resources/egg_paper_tag.png';
import egg_parade from '../resources/egg_parade.png';
import { animate as animatepopmotion } from 'popmotion';
import { animate, cubicBezier } from '../util/AnimationUtil';
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE } from '../language/LanguageContext';
import { useTranslation, useTranslation2 } from '../language/useTranslation';
import getContentStyle from '../util/ContentStyleUtil';

let eggParadeTransY = 0;
let eggAni;
const Egg = forwardRef<any, any>((props, ref) => {

    const rorate = -2; const scale = 1.5; const duration = 800;
    const paperInitTransY = -400;
    const paperInitTransX = -300;
    const egg_icon_scale = 0.85;
    const rootRef = useRef(null as any);
    const contentRef = useRef(null as any);
    const claimButtonRef = useRef(null as any);
    const eggButtonGroupRef = useRef(null as any);
    const eggButtonIconRef = useRef(null as any);
    const eggParadeRef = useRef(null as any);
    const [open, setOpen] = useState(false)
    const [btnScale, setBtnScale] = useState(egg_icon_scale)


    useImperativeHandle(ref, () => ({
        showClaimAni: (position, money, skipAnim = false) => {
            claimButtonRef.current.showAni(money, skipAnim);
        },
        menuTops: () => {
            return rootRef.current.offsetTop - MENUTOP_OFFSET - 300;
        }

    }));

    const openEgg = () => {
        setOpen(true);
        props.onEggShow();

    }

    const aniContent = () => {
        const curS = document.documentElement.scrollTop;
        let targetS = rootRef.current.offsetTop;
        if (targetS > document.documentElement.scrollHeight - document.documentElement.clientHeight) {
            targetS = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        }
        console.log(" document.documentElement.scrollHeight " + document.documentElement.scrollHeight);
        console.log(" document.documentElement.clientHeight " + document.documentElement.clientHeight);
        console.log("scrollToBottom " + targetS);
        animate({
            duration: duration,
            easing: cubicBezier(0, 0, 0.01, 1),
            onUpdate: (value: number) => {
                const s = curS + (targetS - curS) * value;
                document.documentElement.scrollTo({ left: 0, top: s });

                const sc = scale - (scale - 1) * value;

                const transX = paperInitTransX - paperInitTransX * value;
                const transY = paperInitTransY - paperInitTransY * value;

                contentRef.current.style.transform = `translate(${transX}px, ${transY}px) rotate(${rorate}deg) scale(${sc})`;
                contentRef.current.style.opacity = value;
                if (eggParadeRef.current) {
                    eggParadeRef.current.style.transform = `translate(0px, ${100 - 100 * value}%)`;
                }
            },
            onComplete: () => { }
        })
    }



    const OnMouseEnterLeave = (enter: boolean) => {
        if (eggAni) {
            eggAni.stop();
        }
        let curScale = btnScale;
        let tarScale = enter ? 1 : egg_icon_scale;
        eggAni = animatepopmotion({
            from: curScale,
            to: tarScale,
            stiffness: 155,
            damping: 10.6,
            mass: 1,
            onUpdate: progress => {
                setEffButtonScale(progress)
            },
            onComplete: () => {
                if (!enter) {
                    repeatEggAni();
                }
            }
        })

    }

    function setEffButtonScale(scale) {
        // if (eggButtonIconRef.current) {
        //     eggButtonIconRef.current.style.transform = `scale(${scale})`;
        // }
        setBtnScale(scale)
    }


    const repeatEggAni = () => {
        // if (true) { return; }
        let curScale = egg_icon_scale;
        let tarScale = 1;
        if (eggAni) {
            eggAni.stop();
        }
        eggAni = animatepopmotion({
            from: curScale,
            to: tarScale,
            stiffness: 155,
            damping: 10.6,
            mass: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            onUpdate: progress => {
                setEffButtonScale(progress)
            },
            onComplete: () => {

            }
        })
    }
    const initParadeOffset = () => {
        let w = window.innerWidth;
        if (w < 1575) {
            return -505
        } else if (w < 1920) {
            return -445
        } else {
            return -125
        }
    }
    const [paradeBottomOffset, setParadeBottomOffset] = useState(initParadeOffset());

    const resetParadeBottom = () => {
        setParadeBottomOffset(initParadeOffset());
    }

    //>1920 0  >1575 1 else 2
    const [screenLevel, setScreenLevel] = useState(0);
    const resizeUpdate = (e) => {
        // 通过事件对象获取浏览器窗口的高度
        let w = e.target.innerWidth;
        if (w > 1920) {
            setScreenLevel(0);
        } else if (w > 1575) {
            setScreenLevel(1);
        } else {
            setScreenLevel(2);
        }
    };
    useEffect(() => {
        resetParadeBottom()
    }, [screenLevel]);



    useEffect(() => {
        repeatEggAni();

        // 页面刚加载完成后获取浏览器窗口的大小
        let w = window.innerWidth;
        if (w > 1920) {
            setScreenLevel(0);
        } else if (w > 1575) {
            setScreenLevel(1);
        } else {
            setScreenLevel(2);
        }
        // resetParadeBottom();
        // 页面变化时获取浏览器窗口的大小 
        window.addEventListener('resize', resizeUpdate);
        return function unmount() {
            if (eggAni) {
                eggAni.stop();
                eggAni = null;
            }
            // 组件销毁时移除监听事件
            window.removeEventListener('resize', resizeUpdate);
        };
    }, []);

    useEffect(() => {
        if (open) {
            aniContent();
            // setEggParadeTransX(getEggParadeTransX());
            // eggParadeTransY = getEggParadeHeight() / 2
            if (eggAni) {
                eggAni.stop();
            }
        }
    }, [open]);


    const getEggParadeWidth = () => {
        return document.documentElement.clientWidth;
    }

    const getEggParadeHeight = () => {
        return document.documentElement.clientWidth * 2847 / 5962;
    }

    const getEggParadeTransX = () => {
        if (contentRef.current) {
            return -contentRef.current.getBoundingClientRect().x;
        } else {
            return 0;
        }
    }

    const { t, lan } = useTranslation2()
    function getOpacity() {
        if (lan == LANG_JAPANESE) {
            return 0;
        } else {
            return 1;
        }
    }

    const isChinese = lan == LANG_CHINESE;
    const isEnglish = lan == LANG_ENGLISH;

    const { SizzleTipsStyle } = getContentStyle(lan);
    const [eggParadeTransX, setEggParadeTransX] = useState(0);

    const claimAndOpen = (onlyOpen: boolean) => {
        window.open("https://userdao.pro/sizzle", '_blank');
        if (!onlyOpen) {
            props.claim(5);
        }
    }

    let contentStyle: CSSProperties = {
        fontFamily: 'Sthginkra',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: isChinese ? '140%' : '130%',
        /* or 25px */

        fontFeatureSettings: `'pnum' on, 'lnum' on, 'pcap' on`,

        /* Manifesto/manifesto-purewhite */

        color: '#FFFFFF',
        textAlign: 'start'
    }

    return (
        <div ref={rootRef} style={{
            width: 850,
            position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            opacity: `${getOpacity()}`

        }}>
            {!open ?
                <div style={{
                    width: 850,
                    height: 589,
                    position: 'relative',
                    justifyContent: 'center', alignItems: 'center',
                    display: 'flex', flexDirection: 'column'

                }}>
                    <div onClick={openEgg} onMouseEnter={() => { OnMouseEnterLeave(true) }} onMouseLeave={() => { OnMouseEnterLeave(false) }} style={{
                        cursor: 'pointer',
                        position: 'relative',
                        width: 176, height: 199,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <img src={egg_bg2} style={{ width: '100%', height: '100%', position: 'absolute' }} />
                        <img src={egg_fg} ref={eggButtonIconRef} style={{ width: 79, height: 79, marginTop: 10, zIndex: 1, transform: `scale(${btnScale})` }} />
                    </div>
                </div>
                :
                <div style={{
                    position: 'relative'
                }}>
                    <div ref={contentRef} style={{
                        paddingLeft: 60,
                        paddingRight: 25,
                        width: 895 - 60 - 25, marginTop: 20,
                        height: 861,
                        transform: `rotate(${rorate}deg)`,
                        position: 'relative',
                        display: 'flex', flexDirection: 'column',
                        backgroundImage: `url(${egg_paper_bg})`,
                        backgroundSize: '100% 100%',
                    }}>
                        <img src={egg_paper_tag} style={{ position: 'absolute', top: -4, left: 40, width: 66, height: 68 }} />
                        <img src={sizzle_title} style={{ width: 772, height: 57, marginTop: 53, marginLeft: -9 }} />

                        <div style={{ ...contentStyle, marginTop: isChinese ? 38 : 13 }}>
                            {t('egg_c1')}
                        </div>

                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c2')}
                        </div>

                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c3')}
                        </div>

                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c3_1')}<br />
                            {t('egg_c3_2')}
                        </div>
                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c4')}<br />
                            {t('egg_c5')}<br />
                            {t('egg_c6')}
                        </div>
                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c7')}<br />
                            {t('egg_c8')}
                        </div>
                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c9')}
                        </div>
                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c10')}<br />
                            {t('egg_c11')}
                        </div>

                        <div style={{ ...contentStyle, marginTop: 21, display: 'flex' }}>
                            <AppendixCountDown duration={redeemOpenTimeLeft() / 1000} />
                        </div>

                        <div style={{ ...contentStyle, marginTop: 21 }}>
                            {t('egg_c12')}
                        </div>

                        {isChinese ?
                            <div style={{ ...SizzleTipsStyle, marginTop: isChinese ? 38 : 27, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {t('egg_c13')}
                                <div style={{ width: '100%', display: 'flex', color: '#868686' }}>   {t('egg_c14')}
                                    <ClaimButton link={true} textStyle={{ fontSize: 15 }} ref={claimButtonRef} label="userdao.pro/sizzle" position={5} onClaimClick={() => { claimAndOpen(false); }} onAniDone={() => { props.onAniDone(5) }} onLinkClick={() => { claimAndOpen(true); }} />
                                    <span style={{ textIndent: 0 }}>   {t('egg_c15')}</span></div>
                            </div> :
                            <div style={{ ...SizzleTipsStyle, marginTop: isChinese ? 38 : 27, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {t('egg_c13_1')}
                                <div >   {t('egg_c13_2')}
                                </div>
                                <div style={{ width: '100%', display: 'flex', color: '#868686' }}>
                                    <ClaimButton link={true} textStyle={{ fontSize: 15 }} ref={claimButtonRef} label="userdao.pro/sizzle" position={5} onClaimClick={() => {
                                        claimAndOpen(false);
                                    }} onAniDone={() => { props.onAniDone(5) }} onLinkClick={() => { claimAndOpen(true); }} />
                                    <span style={{ textIndent: 0 }}>   {t('egg_c15')}</span></div>
                            </div>}

                    </div>
                    {/* 2560 × 713 */}
                    <img src={egg_parade}
                        ref={eggParadeRef}
                        style={{ width: 2560, height: 838, position: 'absolute', bottom: paradeBottomOffset, zIndex: -100, left: 'calc((100% - 2560px)/2)' }} />

                </div>
            }
        </div>
    );
});
export default Egg;


export const sizzle_title = "data:image/png;base64,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"