import { forwardRef, useImperativeHandle, useRef } from "react";
import Popup, { PopupProps } from "./Popup"
import './ClaimPopup.css'
import wallet_c from '../resources/wallet_c.png';
import twitter_c from '../resources/twitter_c.png';
import right from '../resources/right.png';
import link from '../resources/link.png';
import close from '../resources/close.png';
import Lottie from "lottie-react";
import moneyJson from "../lottiejson/money.json";

export interface ClaimPopupProps extends PopupProps {
    onClaim: () => void;
}
const ClaimPopup = forwardRef<any, ClaimPopupProps>((props, ref) => {
    let claiming = false;
    const lottieRef = useRef(null as any);
    const moneyJsonRef = useRef(null as any);
    useImperativeHandle(ref, () => ({
        show: () => {
            popup?.current?.show();
            setTimeout(() => {
                lottieRef.current.style.opacity = 1;
                moneyJsonRef?.current.goToAndPlay(0, true);
            }, 200)
        }
        ,
        close: () => {
            popup?.current.close();
        }
    }));

    const lottieComplete = () => {
        lottieRef.current.style.opacity = 0;
    }

    const doClaim = () => {
        props.onClaim();
    }
    const popup = useRef(null as any);
    return <Popup ref={popup}  >
        <div onClick={(event) => { event.stopPropagation() }} style={{ width: 870, backgroundColor: '#060606', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid rgba(255, 228, 88, 0.3)', borderRight: '1px solid rgba(255, 228, 88, 0.3)', borderBottom: '1px solid rgba(255, 228, 88, 0.3)', borderTop: '5px solid #FFE458' }}>
            <div style={{
                background: 'linear-gradient(180deg, #F5ECB8 0%, rgba(245, 236, 184, 0) 100%)',
                opacity: 0.3, width: '100%', height: 124, position: 'absolute', top: 0
            }} />
            <div style={{ marginTop: 35, display: 'flex', justifyContent: 'center', position: 'relative', width: '100%' }}>
                <span className="title" style={{}}>$UWT Airdrop</span>
                <div className="title_demo"><span className="title_demo_text">Demo</span></div>

                <div ref={lottieRef} style={{
                    pointerEvents: 'none',
                    width: 576, height: 576,
                    display: 'flex', justifyContent: 'center', position: 'absolute', left: 200, top: '50%',
                    transform: `translate(-25%,-60%)`, opacity: 0
                }}>
                    <Lottie lottieRef={moneyJsonRef} animationData={moneyJson} loop={false} autoPlay={false} onComplete={lottieComplete} />
                </div>
            </div>

            <div style={{ marginTop: 15, width: "100%", textAlign: "center" }}>
                <span className="slogan" style={{ fontWeight: 700 }}>$UWT</span>
                <span className="slogan" style={{ fontWeight: 500 }}> Is a Risingcoin Supported by Product Revenue and Can Be Exchanged for </span>
                <span className="slogan" style={{ fontWeight: 700 }}>$ETH</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 15, }}>
                <span className="address" >Contract Address: </span>
                <span className="address" style={{ textDecoration: 'underline' }} >0xf9AD...b018</span>
                <img src={link} style={{ marginLeft: 8, width: 16, height: 16 }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 45 }}>
                <span className="step" style={{ marginRight: 20 }}>STEP 1</span>
                <div style={{ display: 'flex', backgroundColor: '#1d1d1d', width: 662, height: 60, alignItems: 'center' }}>
                    <img src={wallet_c} style={{ marginLeft: 20, width: 22, height: 22 }} />
                    <span className="step_content" style={{ marginLeft: 8 }}>userdao.eth</span>
                    <img src={right} style={{ marginLeft: 10, marginRight: 'auto', width: 20, height: 20 }} />
                    <span className="step_status" style={{ marginRight: 20 }}>Test Address</span>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                <span className="step" style={{ marginRight: 20 }}>STEP 2</span>
                <div style={{ display: 'flex', backgroundColor: '#1d1d1d', width: 662, height: 60, alignItems: 'center' }}>
                    <img src={twitter_c} style={{ marginLeft: 20, width: 24, height: 22 }} />
                    <span className="step_content" style={{ marginLeft: 6 }}>@userdao</span>
                    <img src={right} style={{ marginLeft: 10, marginRight: 'auto', width: 20, height: 20 }} />
                    <span className="step_status" style={{ marginRight: 20 }}>Test Account</span>
                </div>
            </div>

            <div onClick={doClaim} style={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', marginTop: 45, marginBottom: 40, width: 742, height: 60, backgroundColor: '#FFE458', cursor: 'pointer' }}>
                <span className="button_text">Claim</span>
                <div className="gas" style={{ display: 'flex', position: 'absolute', top: 15, right: 15, alignItems: 'center', justifyContent: 'center' }}>
                    GAS FREE
                </div>
            </div>
            <img src={close} onClick={() => { popup?.current?.close(); }} style={{ position: 'absolute', top: 13, right: 10, width: 30, height: 30 }} />
        </div>

    </Popup>
});

export default ClaimPopup;