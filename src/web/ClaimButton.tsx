import { CSSProperties, forwardRef, useImperativeHandle, useRef, useState } from "react";
import './ClaimButton.css'
import CircleAnimation from "../widget/CircleAnimation";
// import { animate, springEasing } from "../util/AnimationUtil";

import { animate } from "popmotion"
import Lottie from "lottie-react";
import moneyJson from "../lottiejson/money.json";
import { BrowserView, MobileView } from "react-device-detect";
import { LanguageContext } from "../language/LanguageContext";
import React from "react";
import getContentStyle from "../util/ContentStyleUtil";
import { useTranslation2 } from "../language/useTranslation";

interface ClaimButtonProps {
    label: string;
    position: number;
    onClaimClick: () => void;
    onAniDone: () => void;
    textStyle?: CSSProperties;
    link?: boolean;
    onLinkClick?: () => void;
}

const ClaimButton = forwardRef<any, ClaimButtonProps>((props, ref) => {

    const text = useRef(null as any);
    const circleRef = useRef(null as any);
    const lottieRef = useRef(null as any);
    const moneyJsonRef = useRef(null as any);
    const [claimed, setClaimed] = useState(false);


    const changeTextColor = () => {
        text.current.style.transition = `color  400ms linear 0s`;
        text.current.style.color = '#c5c5c5';
        text.current.style.textDecoration = 'none';
    }

    // const [money, setMoney] = useState(0);

    useImperativeHandle(ref, () => ({
        showAni: (money, skipAnim = false) => {
            if (props.link) {
                setClaimed(true);
            } else {
                changeTextColor();
                text.current.style.pointerEvents = 'none';
            }

            if (circleRef.current) {
                circleRef.current.playAnimation();
            }
            playMoneyAnimation(money, skipAnim)

        }

    }));

    const { label, position, onClaimClick, onAniDone, onLinkClick } = props;

    const moneyRef = useRef(null as any);

    const playMoneyAnimation = (moneyValue, skipAnim) => {
        const ele = moneyRef.current as HTMLElement;
        (ele.childNodes[0] as HTMLElement).innerText = '+' + moneyValue + ' UWT';
        animate({
            to: 1,
            // duration: 992,
            stiffness: 203,
            damping: 12.1,
            mass: 1,
            onUpdate: progress => {
                ele.style.transform = `translate(-50%,${-36 * progress}px)`
                ele.style.opacity = '' + progress;
            },
            onComplete: () => {
                setTimeout(() => {
                    animate({
                        to: 1,
                        duration: 200,
                        onUpdate: progress => {
                            ele.style.opacity = '' + (1 - progress);
                        },
                        onComplete: () => {
                            onAniDone();
                        }
                    })
                }, 1000)
            }
        })
        if (!skipAnim) {
            lottieRef.current.style.opacity = 1;
            moneyJsonRef.current.goToAndPlay(0, true);
        }

    }

    const lottieComplete = () => {
        lottieRef.current.style.opacity = 0;
    }

    function getMoneyUI() {
        return (
            <>

                <BrowserView>
                    <div ref={moneyRef} style={{
                        pointerEvents: 'none',
                        display: 'flex', justifyContent: 'center', position: 'absolute', left: '50%', top: 0,
                        transform: `translate(-50%,0)`, height: 24,
                        background: '#FFE458', boxShadow: '0px 0px 10px #FFE458', borderRadius: 2,
                        padding: '5px 10px 5px 10px',
                        opacity: 0
                    }}>
                        <span className="claim_money_tips"></span>
                    </div>
                </BrowserView>
                <MobileView>

                    <div ref={moneyRef} style={{
                        pointerEvents: 'none',
                        display: 'flex', justifyContent: 'center', position: 'absolute', left: '50%', top: 0,
                        transform: `translate(-50%,0)`, height: 18,
                        background: '#FFE458', boxShadow: '0px 0px 10px #FFE458', borderRadius: 2,
                        padding: '5px 10px 5px 10px',
                        opacity: 0
                    }}>
                        <span className="claim_money_tips" style={{ fontSize: "15px", lineHeight: "18px", fontWeight: 400 }}></span>
                    </div>
                </MobileView>
            </>
        )
    }


    const { t, lan } = useTranslation2();
    const { ClaimStyle } = getContentStyle(lan);

    let ts = { ...ClaimStyle };
    let phoneTextSize: number | string = 15;
    let phoneTextWidget: number | string = 400;
    let phoneTextLineHeight: number | string = "220%";
    if (props.textStyle) {
        ts = { ...ts, ...props.textStyle }
        if (props.textStyle.fontSize) {
            phoneTextSize = props.textStyle.fontSize;
        }
        if (props.textStyle.fontWeight) {
            phoneTextWidget = props.textStyle.fontWeight;
        }
        if (props.textStyle.lineHeight) {
            phoneTextLineHeight = props.textStyle.lineHeight;
        }
    }//whiteSpace: 'nowrap',
    return <div style={{
        position: 'relative',
        textIndent: 0,
        display: "inline-block"
    }}>
        <BrowserView>
            <span ref={text} onClick={(event) => { if (claimed) { onLinkClick && onLinkClick() } else { onClaimClick(); } event.stopPropagation() }} style={{ ...ts }}>{label}</span>
        </BrowserView>
        <MobileView>
            <span ref={text} onClick={(event) => { if (claimed) { onLinkClick && onLinkClick() } else { onClaimClick(); } event.stopPropagation() }} style={{ ...ts, fontSize: phoneTextSize, lineHeight: phoneTextLineHeight, whiteSpace: "normal", fontWeight: phoneTextWidget }}>{label}</span>
        </MobileView>

        <CircleAnimation ref={circleRef} firstSize={18} lastSize={118} duration={500} />
        {getMoneyUI()}
        <div ref={lottieRef} style={{
            pointerEvents: 'none',
            width: 316, height: 316,
            display: 'flex', justifyContent: 'center', position: 'absolute', left: '50%', top: '50%',
            transform: `translate(-50%,-50%)`, opacity: 0
        }}>
            <Lottie lottieRef={moneyJsonRef} animationData={moneyJson} loop={false} autoPlay={false} onComplete={lottieComplete} />
        </div>
        <div></div>


    </div>
});







export default ClaimButton;

