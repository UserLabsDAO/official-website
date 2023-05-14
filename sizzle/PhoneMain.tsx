import { useEffect } from 'react';
import './PhoneMain.css';
import Lottie from 'lottie-react';
import video_mask from './res/p_video_mask.png';
import tv_logo from './res/tv_logo.png';
import tv_Gif from './res/tv.gif';
import { redeemOpenTimeLeft } from './data/Constant';
import { CountDown } from './util/CountDown';
import p1 from './res/p_p1.png';
import p2 from './res/p_p2.png';
import p3 from './res/p_p3.png';
import p4 from './res/p_p4.png';
import p5 from './res/p_p5.png';
import p6 from './res/p_p6.png';
import page_bg from './res/page_bg.png';
import bg_s from './res/bg_s.png';
import tv_mask from './res/p_tv_mask.png';
import { useRef } from 'react';
import { isMobile } from 'react-device-detect';

const ani1Json = require('./res/ani1.json');
const ani2Json = require('./res/ani2.json');
const ani3Json = require('./res/ani3.json');
const ani4Json = require('./res/ani4.json');


const getSize = (pxSize: number) => {
  return '' + (pxSize * 100 / 390) + 'vw';
}

let ticking = false;
let lastKnownScrollPosition = 0;
let ani1Played = false;
let ani2Played = false;
let ani3Played = false;
let ani4Played = false;

interface PhoneMainProps {
  mobile: boolean;
}


const PhoneMain = (props: PhoneMainProps) => {

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
            + (page1Ref.current as HTMLElement).offsetHeight * 1
            - document.documentElement.clientHeight
        }
        return 0;
      case 2:
        if (page2Ref.current && ani2Ref.current) {
          return (page2Ref.current as HTMLElement).offsetTop
            + (page2Ref.current as HTMLElement).offsetHeight * 1
            - document.documentElement.clientHeight
        }
        return 0;
      case 3:
        if (page3Ref.current && ani3Ref.current) {
          return (page3Ref.current as HTMLElement).offsetTop
            + (page3Ref.current as HTMLElement).offsetHeight * 1
            - document.documentElement.clientHeight
        }
        return 0;
      case 4:
        if (page4Ref.current && ani4Ref.current) {
          return (page4Ref.current as HTMLElement).offsetTop
            + (page4Ref.current as HTMLElement).offsetHeight * 1
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



  const PhoneTv = (props: any) => {
    return (
      <div style={{ width: '100%', height: getSize(346), position: 'relative', display: 'flex', backgroundColor: 'black', pointerEvents: 'none' }}>
        <img src={tv_Gif} style={{ width: '100%', height: getSize(320), filter: 'blur(5px)', marginTop: getSize(12), marginBottom: getSize(12) }} />
        <img src={video_mask} style={{ width: '100%', position: 'absolute', top: 0 }} />
        <img src={tv_mask} style={{ width: '100%', position: 'absolute', top: 0 }} />
        <img src={tv_logo} style={{ width: getSize(287), position: 'absolute', top: getSize(101), left: '50%', right: '50%', transform: `translate(-${getSize(287 / 2)},0px)` }} />
        <span style={{
          width: '100%',
          position: 'absolute',
          bottom: getSize(38),
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 8,
          textAlign: 'center',
          color: '#D3D3D3'
        }}>As the first product to support UserDAO’s <span style={{ textDecoration: 'underline' }}>$UWT</span>, <br /> 51% of the Revenue will be injected into the UWT Treasury</span>
        {/* <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', position: 'absolute', bottom: getSize(68),

        }}> <CountDown duration={redeemOpenTimeLeft() / 1000} mobile={true} /></div>
        <span style={{
          width: '100%',
          position: 'absolute',
          bottom: getSize(105),
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: 8,
          textAlign: 'center',
          color: '#D6D6D6'
        }}>COUNTDOWN</span> */}

      </div>
    )
  }

  const PageBg = (props) => {
    const postion = props.reverse ? { left: 0, transform: 'rotateY(180deg)' } : { right: 0 };
    return (<img style={{ width: getSize(331), height: getSize(168), position: 'absolute', bottom: 0, ...postion }} src={page_bg} />);
  }
  interface PageImageProps {
    reverse: boolean;
    widthvw: number;
    heightvw: number;
    src: string;
  }
  const PageImage = (props: PageImageProps) => {
    const postion = props.reverse ? { left: 0, transform: 'rotateY(180deg)' } : { right: 0 };
    return (
      <div style={{ width: '100%', height: getSize(168), display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'center' }}>
        <img style={{ width: getSize(331), height: getSize(168), position: 'absolute', bottom: 0, ...postion }} src={page_bg} />
        <img style={{ width: props.widthvw, height: props.heightvw }} src={props.src} />
      </div>
    )
  }

  return (
    <div className="p_App" style={{ backgroundImage: `url(${bg_s})`, backgroundRepeat: 'repeat', }}>
      <PhoneTv mobile={props.mobile} />
      <div ref={page1Ref} className='p_page' style={{ backgroundColor: TEST ? 'red' : 'transparent' }}>
        <div style={{
          width: getSize(248*1.2), height: getSize(145*1.2), transform: 'skewX(4deg) rotate(4deg)', marginTop: getSize(47*2), marginBottom: getSize(27)
        }}>
          <Lottie lottieRef={ani1Ref} animationData={ani1Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani1_images/'} onComplete={() => { onAniComplete(1) }} />
        </div>
        <PageImage reverse={false} widthvw={324} heightvw={127} src={p1} />
      </div>


      <div ref={page2Ref} className='p_page' style={{ backgroundColor: TEST ? 'yellow' : 'transparent' }}>
        <div style={{
          width: getSize(243*1.48148), height: getSize(201*1.48148), marginTop: getSize(47*2), marginBottom: getSize(27)
          , backgroundColor: TEST2 ? 'yellow' : 'transparent'
        }}>
          <Lottie lottieRef={ani2Ref} animationData={ani2Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani2_images/'} onComplete={() => { onAniComplete(2) }} />
        </div>
        <PageImage reverse={true} widthvw={334} heightvw={104} src={p2} />
      </div>

      <div ref={page3Ref} className='p_page' style={{ backgroundColor: TEST ? 'green' : 'transparent' }}>
        <div style={{
          width: getSize(225*1.2), height: getSize(227*1.2), marginTop: getSize(47*2), marginBottom: getSize(27), transform: 'skewX(4deg) rotate(4deg)'
          , backgroundColor: TEST2 ? 'green' : 'transparent'
        }}>
          <Lottie lottieRef={ani3Ref} animationData={ani3Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani3_images/'} onComplete={() => { onAniComplete(3) }} />
        </div>
        <PageImage reverse={false} widthvw={269} heightvw={78} src={p3} />
      </div>

      <div ref={page4Ref} className='p_page' style={{ backgroundColor: TEST ? 'pink' : 'transparent' }}>
        <div style={{
          width: getSize(299*1.2), height: getSize(152*1.2), marginTop: getSize(47*2), marginBottom: getSize(27), transform: 'skewX(-10deg) rotate(-10deg)'
          , backgroundColor: TEST2 ? 'pink' : 'transparent'
        }}>
          <Lottie lottieRef={ani4Ref} animationData={ani4Json} loop={false} autoplay={false} assetsPath={process.env.PUBLIC_URL + '/ani4_images/'} onComplete={() => { onAniComplete(4) }} />
        </div>
        <PageImage reverse={true} widthvw={300} heightvw={122} src={p4} />
      </div>

      <div ref={page5Ref} className='p_page' style={{ backgroundColor: TEST ? 'purple' : 'transparent' }}>
        <img style={{ width: getSize(272), height: getSize(110), marginTop: getSize(47*2), marginBottom: getSize(27) }} src={p6} />
        <PageImage reverse={false} widthvw={355} heightvw={78} src={p5} />
      </div>


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#656A75', backgroundColor: 'black', width: '100%', height: 74, fontSize: 13, marginTop: getSize(47*2) }}>
        Made by User Labs © 2023
      </div>
    </div>



  );
}

export default PhoneMain;
