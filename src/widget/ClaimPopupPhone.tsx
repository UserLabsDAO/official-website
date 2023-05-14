/* eslint-disable jsx-a11y/alt-text */
import { forwardRef, useImperativeHandle, useRef } from "react";
import Popup, { PopupProps } from "./Popup"
import './ClaimPopupPhone.css'
import wallet from '../resources/wallet.png';
import twitter_b from '../resources/twitter_b.png';
import right from '../resources/right.png';
import link from '../resources/link.png';
import close from '../resources/close.png';
import { ClaimPopupProps } from "./ClaimPopup";
import Lottie from "lottie-react";
import moneyJson from "../lottiejson/money.json";

const ClaimPopupPhone = forwardRef<any, ClaimPopupProps>((props, ref) => {
    const lottieRef = useRef(null as any);
    const moneyJsonRef = useRef(null as any);
    const popup = useRef(null as any);

    useImperativeHandle(ref, () => ({
        show: () => {
            popup?.current?.show();
            setTimeout(() => {
                lottieRef.current.style.opacity = 1;
                moneyJsonRef?.current?.goToAndPlay(0, true);
            }, 200)
        }
        ,
        close: () => {
            popup?.current?.close();
        }
    }));

    const lottieComplete = () => {
        lottieRef.current.style.opacity = 0;
    }

    const doClaim = () => {
        props.onClaim();
    }


    return <Popup ref={popup}  >
        <div onClick={(event) => { event.stopPropagation() }} className = "phone_claim_pop_root">
            <div style={{
                background: 'linear-gradient(180deg, #F5ECB8 0%, rgba(245, 236, 184, 0) 100%)',
                opacity: 0.3, width: '100%', height: 124, position: 'absolute', top: 0
            }} />

            <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center', position: 'relative', width: '100%',alignItems:"center" }}>
                <span className="phone_title" style={{}}>$UWT Airdrop</span>
                <div className="phone_title_demo"><span className="phone_title_demo_text">Demo</span></div>

                <div ref={lottieRef} style={{
                    pointerEvents: 'none',
                    width: 288, height: 288,
                    display: 'flex', justifyContent: 'center', position: 'absolute', left: 100, top: '50%',
                    transform: `translate(-25%,-60%)`, opacity: 0
                }}>
                    <Lottie lottieRef={moneyJsonRef} animationData={moneyJson} loop={false} autoPlay={false} onComplete={lottieComplete} />
                </div>
            </div>




            <div style={{ marginTop: 15,width:"100%",textAlign:"center" }}>            
                <span className="phone_slogan" style={{ fontWeight: 700 }}>$UWT</span>
                <span className="phone_slogan" style={{ fontWeight: 500 }}> Is a Risingcoin Supported by Product Revenue and Can Be Exchanged for </span>
                <span className="phone_slogan" style={{ fontWeight: 700 }}>$ETH</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 15, }}>
                <span className="claim_phone_address" >Contract: </span>
                <span className="claim_phone_address" style={{ textDecoration: 'underline' }} >0xf9AD...b018</span>
                <img src={link} style={{ marginLeft: 8, width: 13, height: 13 }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 25,width:"100%" }}>
                <span className="phone_step" style={{ marginLeft: 15 }}>STEP 1</span>
                <div style={{ display: 'flex', backgroundColor: '#1d1d1d',width:"100%", height: 48, alignItems: 'center',marginRight:15,marginLeft:10 }}>
                    <img src={wallet} style={{ marginLeft: 15, width: 16, height: 16 }} />
                    <span className="phone_step_content" style={{ marginLeft: 10 }}>userdao.eth</span>
                    <img src={right} style={{ marginLeft: 10, marginRight: 'auto', width: 16, height: 16 }} />
                    <span className="phone_step_status" style={{ marginRight: 15 }}>Test Address</span>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 20,width:"100%" }}>
                <span className="phone_step" style={{ marginLeft: 15 }}>STEP 2</span>
                <div style={{ display: 'flex', backgroundColor: '#1d1d1d',width:"100%", height: 48, alignItems: 'center',marginRight:15,marginLeft:10 }}>
                    <img src={twitter_b} style={{ marginLeft: 15, width: 18, height: 14 }} />
                    <span className="phone_step_content" style={{ marginLeft: 6 }}>@userdao</span>
                    <img src={right} style={{marginLeft: 10, marginRight: 'auto', width: 16, height: 16 }} />
                    <span className="phone_step_status" style={{ marginRight: 15 }}>Test Account</span>
                </div>
            </div>

            <div onClick={doClaim} className = "phone_claim_btn">
                <span className="phone_claim_button_text">Claim</span>
                <div className="phone_gas" style={{ display: 'flex', position: 'absolute', top: 12.5, right: 10, alignItems: 'center', justifyContent: 'center' }}>
                    GAS FREE
                </div>
            </div>
            <img src={close} onClick={() => { popup?.current?.close(); }} style={{ position: 'absolute', top: 12, right: 7, width: 25, height: 25 }} />
        </div>

    </Popup>
});

export default ClaimPopupPhone;