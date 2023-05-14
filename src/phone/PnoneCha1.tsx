import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TEST_DATA_NUMBER } from "../data/Constant";
import { LANG_CHINESE } from "../language/LanguageContext";
import { useTranslation, useTranslation2 } from "../language/useTranslation";
import cha1P1 from '../resources/cha1_p1.png';
import cha1P2 from '../resources/cha1_p2.png';
import cha1P3 from '../resources/cha1_p3.png';

import ClaimButton from "../web/ClaimButton";
import './ManifestoContent.css';
import { TextParagraph, ImageParagraph, ParagraphTitle } from "./ManifestoElement";


const PhoneCha1 = forwardRef<any, any>((props, ref) => {
  const claimButtonRef = useRef(null as any)
  const claimButton2Ref = useRef(null as any);
  const rootRef = useRef(null as any);
  const pSpace = "10px";

  const { t, lan } = useTranslation2();
  const firstTopMargin = lan == LANG_CHINESE?"0px":"15px"

  useImperativeHandle(ref, () => ({
    showClaimAni: (position, money, skipAnim = false) => {
      console.log("---position---"+position);
      (position == 0 ? claimButtonRef : claimButton2Ref).current.showAni(money, skipAnim);
  },
  menuTops: () => {
    return [rootRef.current.offsetTop ]
}

}));

  return (
    <div ref = {rootRef} 
    className="container">
        <ParagraphTitle text="Chapter I - Take User’s Wealth Back" topMargin={'0px'}/>
        <TextParagraph text={t("cha1_c1")}/>

        <TextParagraph topMargin={firstTopMargin} text={<>{t("cha1_c2")}
              <ClaimButton ref={claimButtonRef} textStyle = {{lineHeight:"100%"}} label={t("cha1_c3")} position={0} onClaimClick={() => { props.claim(0) }} onAniDone={()=>{props.onAniDone(0)}} />
              <span style= {{textIndent:0}}>{t("cha1_c4")}</span>
            </>} />
        <TextParagraph topMargin={firstTopMargin} text={t("cha1_c5")}/>
        <TextParagraph topMargin={firstTopMargin} text={t("cha1_c6")} />

        <TextParagraph text={t("cha1_c7")} />
        <ImageParagraph image={cha1P1} width="100%" discribe={t("cha1_p1")} />
        <TextParagraph text={t("cha1_c8")} />
        <ImageParagraph image={cha1P2} width="100%" discribe={t("cha1_p2")} />
        <TextParagraph text={t("cha1_c9")}/>
        {/* <ImageParagraph image={cha1P3} width="100%" discribe="Musical.ly在2018年8月正式融入TikTok"/> */}
        <TextParagraph text={t("cha1_c10")}/>
        <TextParagraph text={t("cha1_c11")} topMargin = {pSpace}/>
        <TextParagraph text={t("cha1_c12")} topMargin = {pSpace}/>
        <TextParagraph text={t("cha1_c13")} topMargin = {pSpace}/>
        <TextParagraph text={t("cha1_c14")} topMargin = {pSpace}/>
        <TextParagraph text={t("cha1_c15")} topMargin = {pSpace}/>
        <TextParagraph texts={[t("cha1_c16_1_p"),t("cha1_c16_2_p"),t("cha1_c16_3_p"),t("cha1_c16_4_p"),]} nums = {TEST_DATA_NUMBER} />
        <TextParagraph text={<>{t("cha1_c17")}
            <ClaimButton ref={claimButton2Ref} label={t("cha1_c18")} position={1} onClaimClick={() => { props.claim(1) }} onAniDone={()=>{props.onAniDone(1)}} />
            <span style= {{textIndent:0}}>{t("cha1_c19")}</span>
            </>} 
            />
    </div>
  );
});

export default PhoneCha1;
