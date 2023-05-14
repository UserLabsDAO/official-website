import BigNumber from 'bignumber.js';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CLAIM_MONEYS, CONTENT_MARGIIN } from '../data/Constant';
import { MineInfo } from '../data/Data';
import bg_point from '../resources/bg_point.png';
import logos from '../resources/logo_s.png';
import ClaimPopup from '../widget/ClaimPopup';
import Cha1 from './Cha1';
import Cha2 from './Cha2';
import Cha3 from './Cha3';
import Cha4 from './Cha4';
import Egg from './Egg';
import Lang from './Lang';
import './Main.css';
import Menus from './Menus';
import Mine from './Mine';
import { useAccount } from 'wagmi';
import { shortenAddr } from 'util/index';

interface Props {
    // style: React.CSSProperties | undefined;
}
let currentIndex = 0;
let swtching = false;
let ticking = false;
let lastKnownScrollPosition = 0;

const Main = forwardRef<any, Props>((props, ref) => {
    const {address} = useAccount()
    const divRef = useRef(null as any);
    const menuRef = useRef(null as any);
    const titlebarBg = useRef(null as any);
    const cha1Ref = useRef(null as any);
    const cha2Ref = useRef(null as any);
    const cha3Ref = useRef(null as any);
    const cha4Ref = useRef(null as any);
    const appendixRef = useRef(null as any);
    const claimPopupRef = useRef(null as any);
    const mineRef = useRef(null as any);


    const [mineInfo, setMineInfo] = useState<MineInfo>(null as any)

    useImperativeHandle(ref, () => ({
        show: () => {
            const divEle = divRef.current as HTMLElement;
            const contentGroup = divEle.children[1] as HTMLElement

            const barbg = divEle.children[2] as HTMLElement
            const logo = divEle.children[3] as HTMLElement
            const buttonGroup = divEle.children[4] as HTMLElement
            const readingGroup = divEle.children[5] as HTMLElement
            // const menuGroup = divEle.children[4] as HTMLElement
            divRef.current.style.visibility = "visible";
            logo.style.opacity = '1';
            buttonGroup.style.opacity = '1';
            logo.addEventListener("transitionend", (event) => {
                // barbg.style.opacity = '1';
                readingGroup.style.opacity = '1';
                contentGroup.style.opacity = '1';
                contentGroup.style.scale = '1';
                // menuGroup.style.opacity = '1';
            });
        }
    }));

    const showAni = {
        transition: 'opacity 400ms linear 0s',
        opacity: 0
    }

    const showStep2AAni = {
        transition: 'opacity 600ms cubic-bezier(0.22, 0.49, 0.17, 0.97) 0s',
        opacity: 0
    }

    const showStep2BAni = {
        transitionProperty: 'opacity,scale',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 0.49, 0.17, 0.97)',
        scale: '0.9',
        transformOrigin: 'center top',
        opacity: 0
    }

    const scrollFromSwitchMenu = (indexs) => {
        const chap1Top = cha1Ref.current.menuTops();
        const chap2Top = cha2Ref.current.menuTops();
        const chap3Top = cha3Ref.current.menuTops();
        const chap4Top = cha4Ref.current.menuTops();
        const appendixTop = appendixRef.current.menuTops();
        const positions = [chap1Top, chap2Top, chap3Top, chap4Top, appendixTop];
        let newScroll = 0;
        if (indexs[1] == 0) {
            newScroll = positions[indexs[0]];
        } else {
            newScroll = positions[indexs[0]][indexs[1] - 1];
        }
        swtching = true;
        document.documentElement.scrollTo({ left: 0, top: newScroll, behavior: 'smooth' });
        if (titlebarBg.current) {
            (titlebarBg.current as HTMLElement).style.opacity = ""+(newScroll > 0 ? 1 : 0);
        }

        // const contentGroup = (divRef.current as HTMLElement).children[3] as HTMLElement;
        // const scrollHeight = contentGroup.scrollHeight;
        // const chap1Top = cha1Ref.current.offsetTop;
        // const chap2Top = cha2Ref.current.offsetTop;
        // const chap3Top = cha3Ref.current.offsetTop;
        // const chap4Top = cha4Ref.current.offsetTop;
        // const appendixTop = appendixRef.current.offsetTop;

        // const positions = [0, chap2Top, chap3Top, chap4Top, appendixTop];

        // let newScroll = positions[index];
        // swtching = true;
        // document.documentElement.scrollTo({ left: 0, top: newScroll, behavior: 'smooth' });
    }


    function onScrollChanged(event, scrollPos) {
        if (swtching) { return; }
        const chap1Top = cha1Ref.current.menuTops();
        const chap2Top = cha2Ref.current.menuTops();
        const chap3Top = cha3Ref.current.menuTops();
        const chap4Top = cha4Ref.current.menuTops();
        const appendixTop = appendixRef.current.menuTops();
        const positions = [chap1Top, chap2Top, ...chap3Top, chap4Top, appendixTop];

        let contentIndex = 0;
        for (let i = 0; i < positions.length; i++) {
            let isLast = i === positions.length - 1;
            if (isLast && scrollPos >= positions[positions.length - 1]) {
                contentIndex = i;
            } else {
                if (scrollPos >= positions[i] && scrollPos < positions[i + 1]) {
                    contentIndex = i;
                    break;
                }
            }
        }

        let indexs = [0, 0];
        if (contentIndex < 2) {
            indexs = [contentIndex, 0];
        } else if (contentIndex < 2 + 5) {
            indexs = [2, contentIndex - 2 + 1];
        } else {
            indexs = [contentIndex - (5 - 1), 0];
        }
        menuRef.current.switchMenuByScroll(indexs);
        if (titlebarBg.current) {
            (titlebarBg.current as HTMLElement).style.opacity = ""+(scrollPos > 0 ? 1 : 0);
        }
    }
    let timer;
    function onScrollEnd(event, scrollPos) {
        swtching = false;
    }
    const scrollListener = (event) => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScrollChanged(event, lastKnownScrollPosition);
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
        currentIndex = 0;
        swtching = false;
        lastKnownScrollPosition = 0;
        ticking = false;
        document.addEventListener("scroll", scrollListener);
        return function unmount() {
            document.removeEventListener("scroll", scrollListener);
        };
    }, []);

    const [clickingClaimButton, setClickingClaimButton] = useState(0);

    const claimableChas = [cha1Ref, cha1Ref, cha2Ref, cha3Ref, cha4Ref, appendixRef];
    const claim = (position) => {
        setClickingClaimButton(position);
        if (mineInfo == null) {
            claimPopupRef.current.show();
        } else {
            const money = CLAIM_MONEYS[position];
            claimableChas[position].current.showClaimAni(position, money);
        }
    }

    const onAniDone = (position) => {
        let newMineInfo;

        if (mineInfo === null || mineInfo?.record?.length == 0) {
            newMineInfo = {
                balance: new BigNumber(CLAIM_MONEYS[position]),
                address: shortenAddr(address),
                record: [new BigNumber(CLAIM_MONEYS[position])],
                animated: false
            }

        } else {
            newMineInfo = Object.assign({}, mineInfo)
            const money = CLAIM_MONEYS[position]
            newMineInfo.balance = newMineInfo.balance.plus(new BigNumber(money));
            newMineInfo.record = [...newMineInfo.record, new BigNumber(money)];

        }
        setMineInfo(newMineInfo);

    }

    useEffect(() => {
        if (mineInfo != null) {
            mineRef.current.show(mineInfo);
        }
    }, [mineInfo]);



    const claimFinish = () => {
        claimPopupRef.current.close();
        const newMineInfo = {
            balance: new BigNumber(0),
            address: shortenAddr(address),
            record: [],
            animated: true
        }
        setMineInfo(newMineInfo);
        claimableChas[clickingClaimButton].current.showClaimAni(clickingClaimButton, CLAIM_MONEYS[clickingClaimButton], true);
    }

    const onEggShow = () => {
        if (menuRef.current) {
            menuRef.current.showEgg();
        }
    }

    return (
        <div ref={divRef} style={{ visibility: 'hidden', width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
            <div style={{
                zIndex: -100000,
                width: '100%', height: '100%', position: 'fixed'
                , backgroundImage: `url(${bg_point})`, backgroundRepeat: 'repeat',
            }} />


            <div className='content_position' style={{ ...showStep2BAni, display: 'flex', position: 'absolute', flexDirection: 'column', alignItems: 'flex-start' }}>
                {/* <div style={{
                    marginTop: 210, marginBottom: 22, display: 'flex', justifyContent: 'center',
                    height: 34, padding: '0px 8px 0px 8px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    borderRadius: 5
                }} >
                    <span className='content_tips'>💡 本文阅读时长约20分钟，一共可领约 13.28 $UWT</span>
                    </div> */}
                <div style={{
                    width: 750,
                    // background: `url(${paperbg})`,
                    marginTop: CONTENT_MARGIIN,
                    color: 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                }}>
                    <Cha1 ref={cha1Ref} claim={claim} onAniDone={onAniDone} />
                    <Cha2 ref={cha2Ref} claim={claim} onAniDone={onAniDone} info={mineInfo} />
                    <Cha3 ref={cha3Ref} claim={claim} onAniDone={onAniDone} />
                    <Cha4 ref={cha4Ref} claim={claim} onAniDone={onAniDone} info={mineInfo} />
                    <Egg ref={appendixRef} claim={claim} onAniDone={onAniDone} onEggShow={onEggShow} />
                    {/* <Appendix ref={appendixRef} claim={claim} onAniDone={onAniDone} /> */}
                </div>
            </div>
            <div ref={titlebarBg} className='title_bar_bg' style={{ opacity: 0, position: 'fixed' }}></div>
            <img style={{ ...showAni, position: 'fixed' }} className='title_logo' src={logos} />
            <div className='button_group' style={{ ...showAni }}>
                <Lang />
                {/* <div className='share'>  <img src={twitterIcon} style={{ width: 16, height: 12, marginRight: 5 }} />
                    <span className='share_content'>SHARE</span>

                </div> */}
                <Mine ref={mineRef} info={mineInfo} onDisconnect={() => { setMineInfo(null as any) }} />
            </div>

            {/* <div className='reading' style={{ ...showStep2AAni }}>
                <img src={eyesIcon} style={{ width: 20, height: 20, marginRight: 5 }} />
                <span className='reading_text' style={{ color: '#04ff69' }}>25</span>
                <span className='reading_text' style={{ color: '#04ff69', marginLeft: 5, marginRight: 5 }}>USERS</span>
                <span className='reading_text' style={{ color: '#EAEAEA' }}>READING NOW</span>
            </div> */}

            <Menus ref={menuRef} onSwitchMenu={(indexs) => scrollFromSwitchMenu(indexs)} style={showStep2AAni} />
            <ClaimPopup ref={claimPopupRef} onClaim={() => { claimFinish(); }} />
        </div >
    );
});
export default Main;