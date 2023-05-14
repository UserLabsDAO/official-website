import React, { useState, useRef, useEffect } from 'react';
import logo from '../resources/logo.png';
import bg_point from '../resources/bg_point.png';
import start_enter from '../resources/start_enter.png';
import Main from './Main';

import './AppWeb.css';
import { animate, linear } from 'popmotion';
import { useTranslation, useTranslation2 } from '../language/useTranslation';
function AppWeb() {

    useEffect(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
        document.documentElement.style.overflowY = "hidden";
        document.documentElement.style.overflowX = "hidden";
        document.documentElement.style.marginRight = '15px';

        return function unmount() {

        };
    }, []);


    const Cover = (props: { onClick: () => void; }) => {

        const divRef = useRef(null as any);
        const bgRef = useRef(null as any);
        const buttonRef = useRef(null as any);
        const onPageClick = () => {
            setPlayAnim(false)
            document.documentElement.style.overflowY = "auto";
            document.documentElement.style.marginRight = '0';
            divRef.current.style.opacity = 0;
            props.onClick();

        }

        const [fontLoaded, setFontLoaded] = useState(false);
        const [isClick, setClick] = useState(false)

        const [isPlayAnim, setPlayAnim] = useState(true)

        useEffect(() => {
            if (isClick && fontLoaded) {
                onPageClick()
            }

        }, [isClick, fontLoaded])

        useEffect(() => {
            document.fonts.ready.then(() => {
                //字体加载完成回调
                setFontLoaded(true)
            })
        }, [])



        const buttonAniStyle = {
            animationDuration: '800ms',
            animationName: 'buttonTransAnimation',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
        }
        const keyframesStyle = `
    @keyframes buttonTransAnimation {
      from {
        transform: translate(-20px,0);
      }
      to {
        transform: translate(20px,0);
      }
    }
  `;

        const buttonAniPause = (pause) => {
            // if (buttonRef.current) {
            //     let ele = buttonRef.current as HTMLElement;
            //     ele.style.animationPlayState = pause ? 'paused' : 'running';
            // }
        }

        useEffect(() => {
            let ani;
            if (isPlayAnim) {
                ani = animate({
                    to: 1,
                    duration: 1000 * 60 * 2,
                    ease: linear,
                    repeat: Infinity,
                    onUpdate: (progress) => {
                        if (bgRef.current) {
                            (bgRef.current as HTMLElement).style.transform = `translate(0,-${10000 * progress}px)`
                        }
                    }
                })

            }
            return () => {
                if (ani) {
                    ani.stop()
                }
            }
        }, [isPlayAnim]);

        return (
            <div ref={divRef} onClick={() => { setClick(true) }} style={{
                transition: 'opacity 400ms linear', flexDirection: 'column',
                opacity: 1,
                width: '100%', height: '100%', display: 'flex', alignItems: 'center', alignContent: 'center', position: 'fixed',
            }}>
                <div ref={bgRef} style={{
                    position: 'absolute',
                    backgroundImage: `url(${bg_point})`, backgroundRepeat: 'repeat',
                    width: '100%', height: '20000px'
                }}></div>
                <img className='cover_logo' src={logo} />
                {/* <span className='tips' style={{
                    marginTop: 50
                }}>「 Take user’s wealth back 」</span> */}
                <style>{keyframesStyle}</style>
                <img ref={buttonRef} className='cover_enter' onMouseEnter={() => { buttonAniPause(true) }} onMouseLeave={() => { buttonAniPause(false) }} onClick={onPageClick} style={{ ...buttonAniStyle, cursor: 'pointer' }} src={start_enter} />
            </div>
        );
    }

    const mainRef = useRef(null as any);

    return (
        <>
            <Cover onClick={() => {
                console.log("mainRef.current:", mainRef.current);
                mainRef.current.show();
            }} />

            <Main ref={mainRef} />
        </>)


}

export default AppWeb;
