import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { C4_UPLEVEL, MENUTOP_OFFSET, redeemOpenTimeLeft } from '../data/Constant';
import cha4P1 from '../resources/cha4_p1.png';
import { Cha4CountDown } from "../web/Cha4CountDown";
import './ManifestoContent.css';
import { TextParagraph, ImageParagraph, ParagraphTitle } from "./ManifestoElement";
import ClaimButton from "../web/ClaimButton";
import { useTranslation2 } from "../language/useTranslation";
import { LANG_CHINESE, LANG_JAPANESE } from "../language/LanguageContext";

const PhoneCha4 = forwardRef<any, any>((props, ref) => {
  const claimButtonRef = useRef(null as any);
  const rootRef = useRef(null as any);
  const {t,lan} = useTranslation2();
  const isChinese = lan == LANG_CHINESE;
  const pSpace = "10px"

  useImperativeHandle(ref, () => ({
    showClaimAni: (position, money, skipAnim = false) => {
      console.log("---position---"+position);
      claimButtonRef.current.showAni(money, skipAnim = false);
    },
    menuTops: () => {
      return [rootRef.current.offsetTop ]
    }
  }));

  function Cha3Line(text){
    return<span style={{color:"white",textDecoration:`${isChinese?'underline':'none'}`}}>{text} </span>
  }

  function getOpacity() {
    if (lan == LANG_JAPANESE) {
        return 0;
    } else {
        return 1;
    }
}


  return (
    <div ref = {rootRef} 
    className="container" style={{padding: 17,opacity: `${getOpacity()}`}}>
        <ParagraphTitle text="Chapter IV - LFG" />

        <Cha4CountDown duration={redeemOpenTimeLeft() / 1000} />
        <TextParagraph text={<>{t('cha4_c1')} {props.info != null && props.info.balance.toNumber() > 0 && t('cha4_c1_1')+props.info.balance.toString()} {t('cha4_c2')}</>} />
        
        <TextParagraph texts={[t('cha4_c3_1_p'),t('cha4_c3_2_p')]} nums = {[C4_UPLEVEL]} />

        <ImageParagraph image={cha4P1} width = "100%"/>
        <TextParagraph topMargin={pSpace} text={t('cha4_c4')} />
        <TextParagraph topMargin={pSpace} text={t('cha4_c5')} />
        <TextParagraph topMargin={pSpace} text={t('cha4_c6')} />
        <TextParagraph topMargin={pSpace} text={t('cha4_c7')} />
        <div className='text_content' style={{ width: '100%', display: 'flex',textAlign:"center",justifyContent:"center",marginTop:20 }}>
          <ClaimButton ref={claimButtonRef} label={t('cha4_c8_p')} position={4} onClaimClick={() => { props.claim(4) }} onAniDone={() => { props.onAniDone(4) }} />
        </div>
      <div style={{height:"20px"}}></div>

    </div>
  );
});

export default PhoneCha4;
