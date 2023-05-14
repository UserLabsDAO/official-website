import { useEffect } from 'react';
import './Main.css';
import Lottie from 'lottie-react';
import video_mask from './res/video_mask.png';
import tv_logo from './res/tv_logo.png';
import { redeemOpenTimeLeft } from './data/Constant';
import { CountDown } from './util/CountDown';
import p1 from './res/p1.png';
import p2 from './res/p2.png';
import p3 from './res/p3.png';
import p4 from './res/p4.png';
import p5 from './res/p5.png';
import p6 from './res/p6.png';
import bg from './res/bg.png';
import bg_s from './res/bg_s.png';
import tv_mask from './res/tv_mask.png';
import { useRef } from 'react';
import { isMobile } from 'react-device-detect';

const ani1Json = require('./res/ani1.json');
const ani2Json = require('./res/ani2.json');
const ani3Json = require('./res/ani3.json');
const ani4Json = require('./res/ani4.json');

const videoMargin = 10;
const videoMarginCoverHeight = 15;
const textBottomMargin = 111 + videoMargin;
const contdownBottomMargin = 148 + videoMargin;
const contdownTagBottomMargin = 224 + videoMargin;

const getSize = (pxSize: number) => {
    return '' + (pxSize * 100 / 1600) + 'vw';
}

let ticking = false;
let lastKnownScrollPosition = 0;
let ani1Played = false;
let ani2Played = false;
let ani3Played = false;
let ani4Played = false;
const Main = () => {

    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.marginRight = '0';
    const page1Ref = useRef(null as any);
    const ani1Ref = useRef(null as any);
    const page2Ref = useRef(null as any);
    const ani2Ref = useRef(null as any);
    const page3Ref = useRef(null as any);
    const ani3Ref = useRef(null as any);
    const page4Ref = useRef(null as any);
    const ani4Ref = useRef(null as any);
    const page5Ref = useRef(null as any);




    let timer: NodeJS.Timeout | undefined;
    function onScrollEnd(event, scrollPos) {

    }
    const scrollListener = (event) => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScrollChanged(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            onScrollEnd(event, lastKnownScrollPosition);
        }, 150);
    }



    useEffect(() => {
        ani1Played = false;
        ani2Played = false;
        ani3Played = false;
        ani4Played = false;
        lastKnownScrollPosition = 0;
        ticking = false;
        document.addEventListener("scroll", scrollListener);



        onScrollChanged(0);
        return function unmount() {
            document.removeEventListener("scroll", scrollListener);
        };
    }, []);

    const aniPosition = (index) => {
        switch (index) {
            case 1:
                if (page1Ref.current && ani1Ref.current) {
                    return (page1Ref.current as HTMLElement).offsetTop
                        + (page1Ref.current as HTMLElement).offsetHeight * 0.8
                        - document.documentElement.clientHeight
                }
                return 0;
            case 2:
                if (page2Ref.current && ani2Ref.current) {
                    return (page2Ref.current as HTMLElement).offsetTop
                        + (page2Ref.current as HTMLElement).offsetHeight * 0.8
                        - document.documentElement.clientHeight
                }
                return 0;
            case 3:
                if (page3Ref.current && ani3Ref.current) {
                    return (page3Ref.current as HTMLElement).offsetTop
                        + (page3Ref.current as HTMLElement).offsetHeight * 0.8
                        - document.documentElement.clientHeight
                }
                return 0;
            case 4:
                if (page4Ref.current && ani4Ref.current) {
                    return (page4Ref.current as HTMLElement).offsetTop
                        + (page4Ref.current as HTMLElement).offsetHeight * 0.8
                        - document.documentElement.clientHeight
                }
                return 0;
        }
        return 0;
    }

    const onScrollChanged = (scrollPos) => {
        if (scrollPos >= (aniPosition(1)) && !ani1Played) {
            if (ani1Ref.current) {
                ani1Ref.current.goToAndPlay(0, true)
                ani1Played = true;
            }
        }

        if (scrollPos >= (aniPosition(2)) && !ani2Played) {
            if (ani2Ref.current) {
                ani2Ref.current.goToAndPlay(0, true)
                ani2Played = true;
            }
        }

        if (scrollPos >= (aniPosition(3)) && !ani3Played) {
            if (ani3Ref.current) {
                ani3Ref.current.goToAndPlay(0, true)
                ani3Played = true;
            }
        }

        if (scrollPos >= (aniPosition(4)) && !ani4Played) {
            if (ani4Ref.current) {
                ani4Ref.current.goToAndPlay(0, true)
                ani4Played = true;
            }
        }
    }

    const onAniComplete = (index) => {

        console.log("onAniComplete " + index);
        switch (index) {
            case 1:
                if (ani1Ref.current) {
                    ani1Ref.current.goToAndPlay(300, true)
                }
                break;
            case 2:
                if (ani2Ref.current) {
                    ani2Ref.current.goToAndPlay(76, true)
                }
                break;
            case 3:
                if (ani3Ref.current) {
                    ani3Ref.current.goToAndPlay(120, true)
                }
                break;
        }
    }


    const TEST = false;
    const TEST2 = false;


    const BrowserTv = (props: any) => {
        return (
            <div style={{ width: '100%', position: 'relative', display: 'flex', backgroundColor: 'black', pointerEvents: 'none', marginTop: getSize(-10) }}>
                <video muted id="playChatVideo" controls={false} autoPlay src={require('./res/tv.mp4')} width="100%" className='tv_video' style={{ marginBottom: getSize(videoMargin) }} loop ></video>
                <img src={video_mask} style={{ width: '100%', position: 'absolute', top: 0 }} />
                <div style={{ width: '100%', height: getSize(videoMarginCoverHeight), backgroundColor: 'black', position: 'absolute', bottom: 0 }} />
                <img src={tv_mask} style={{ width: '100%', position: 'absolute', top: 0 }} />
                <img src={tv_logo} style={{ width: '36.8vw', position: 'absolute', top: '20vw', left: '50%', right: '50%', transform: 'translate(-18.4vw,0px)' }} />


                <span style={{
                    width: '100%', position: 'absolute', bottom: getSize(textBottomMargin),

                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: getSize(15),
                    lineHeight: getSize(18),
                    textAlign: 'center',
                    color: '#D3D3D3'
                }}>As the first product to support UserDAO’s <span style={{ textDecoration: 'underline' }}>$UWT</span>, 51% of the Revenue will be injected into the UWT Treasury</span>
                {/* <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', position: 'absolute', bottom: getSize(contdownBottomMargin),

                }}> <CountDown duration={redeemOpenTimeLeft() / 1000} /></div>
                <span style={{
                    width: '100%', position: 'absolute', bottom: getSize(contdownTagBottomMargin),

                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: getSize(15),
                    lineHeight: getSize(18),
                    textAlign: 'center',
                    color: '#D6D6D6'
                }}>COUNTDOWN</span> */}

            </div>
        )
    }


    return (
        <div className="App" style={{ backgroundImage: `url(${isMobile ? bg_s : bg})`, backgroundRepeat: 'repeat', }}>

            <BrowserTv />


            <div ref={page1Ref} className='page' style={{ backgroundColor: TEST ? 'red' : 'transparent' }}>
                <img className='p1_img' style={{ width: getSize(772), height: getSize(227), maxWidth: 772, maxHeight: 227 }} src={p1} />
                <div className='p1_ani' style={{
                    width: getSize(586 * 1.2), height: getSize(320 * 1.2), maxWidth: 586 * 1.2, maxHeight: 320 * 1.2, transform: 'skewX(4deg) rotate(4deg)'

                }}>
                    <Lottie lottieRef={ani1Ref} animationData={ani1Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani1_images/'} onComplete={() => { onAniComplete(1) }} />
                </div>
            </div>


            <div ref={page2Ref} className='page' style={{ backgroundColor: TEST ? 'yellow' : 'transparent' }}>
                <img className='p2_img' style={{ width: getSize(556), height: getSize(299), maxWidth: 556, maxHeight: 299 }} src={p2} />
                <div className='p2_ani' style={{
                    width: getSize(510 * 1.7), height: getSize(412 * 1.7), maxWidth: 510 * 1.7, maxHeight: 412 * 1.7
                    , backgroundColor: TEST2 ? 'yellow' : 'transparent'
                }}>
                    <Lottie lottieRef={ani2Ref} animationData={ani2Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani2_images/'} onComplete={() => { onAniComplete(2) }} />
                </div>
            </div>

            <div ref={page3Ref} className='page' style={{ backgroundColor: TEST ? 'green' : 'transparent' }}>
                <img className='p3_img' style={{ width: getSize(448), height: getSize(187), maxWidth: 448, maxHeight: 187 }} src={p3} />
                <div className='p3_ani' style={{
                    width: getSize(605), height: getSize(600), maxWidth: 605, maxHeight: 600, transform: 'skewX(4deg) rotate(4deg)'
                    , backgroundColor: TEST2 ? 'green' : 'transparent'
                }}>
                    <Lottie lottieRef={ani3Ref} animationData={ani3Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani3_images/'} onComplete={() => { onAniComplete(3) }} />
                </div>
            </div>

            <div ref={page4Ref} className='page' style={{ backgroundColor: TEST ? 'pink' : 'transparent' }}>
                <img className='p4_img' style={{ width: getSize(660), height: getSize(299), maxWidth: 660, maxHeight: 299 }} src={p4} />
                <div className='p4_ani' style={{
                    width: getSize(630 * 1.5), height: getSize(312 * 1.5), maxWidth: 630 * 1.5, maxHeight: 312 * 1.5, transform: 'skewX(-10deg) rotate(-10deg)'
                    , backgroundColor: TEST2 ? 'pink' : 'transparent'
                }}>
                    <Lottie lottieRef={ani4Ref} animationData={ani4Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani4_images/'} onComplete={() => { onAniComplete(4) }} />
                </div>
            </div>
            <div ref={page5Ref} className='page' style={{ backgroundColor: TEST ? 'purple' : 'transparent' }}>
                <img className='p5_img' style={{ width: getSize(634), height: getSize(186), maxWidth: 634, maxHeight: 186 }} src={p5} />
                <img className='p6_img' style={{ width: getSize(618), height: getSize(250), maxWidth: 618, maxHeight: 250 }} src={p6} />
            </div>


            <div className='bottombar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#656A75', backgroundColor: 'black', width: '100%', marginTop: getSize(100) }}>
                Made by User Labs © 2023
            </div>
        </div>



    );
}

export default Main;
