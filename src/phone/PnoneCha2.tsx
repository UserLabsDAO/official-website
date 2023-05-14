import React, { forwardRef, useImperativeHandle, useRef } from "react";
import cha2P1 from "../resources/cha2_p1.png";
import cha2P2 from "../resources/phone_cha2_p2.png";
import ClaimButton from "../web/ClaimButton";

import "./ManifestoContent.css";
import {
  TextParagraph,
  ImageParagraph,
  ParagraphTitle,
} from "./ManifestoElement";
import { useTranslation2 } from "../language/useTranslation";

const PhoneCha2 = forwardRef<any, any>((props, ref) => {
  const claimButtonRef = useRef(null as any);
  const rootRef = useRef(null as any);
  const {t} = useTranslation2()
  const lpadding = "10px"

  useImperativeHandle(ref, () => ({
    showClaimAni: (position, money, skipAnim = false) => {
      console.log("---position---"+position);
      claimButtonRef.current.showAni(money,skipAnim);
    },
    menuTops: () => {
      return [rootRef.current.offsetTop ]
    }
  }));

  return (
    <div ref = {rootRef} 
    className="container" style={{padding: 20}}>
      <ParagraphTitle text="Chapter II - WHY NOW?" />
      <TextParagraph
        text={
          t("cha2_c1")
        }
      />
      <ImageParagraph
        image={cha2P1}
        width="100%"
        discribe={t("cha2_p1")}
      />
      <TextParagraph
        text={
          t("cha2_c2")}
      />
      <TextParagraph
        text={
          t("cha2_c3")
        }
      />
      <ImageParagraph
        image={cha2P2}
        width="100%"
        discribe={t("cha2_p2")}
      />
      <TextParagraph
        text={
          t("cha2_c4")
        }
      />
      <TextParagraph
        text={
          t("cha2_c5")
        }
      />
      <TextParagraph
        text={
          t("cha2_c6")
        }
      />
      <TextParagraph
        text={
          t("cha2_c7")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c8")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c9")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c10")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c11")
        }
      />
      <TextParagraph
        text={
          t("cha2_c12")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c13")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c14")
        }
      />
      <TextParagraph
        text={
          t("cha2_c15")
        }
      />
      <TextParagraph
        text={
          t("cha2_c16")
        }
        topMargin={lpadding}
      />
      <TextParagraph
        text={
          t("cha2_c17")
        }
        topMargin={lpadding}
      />
      <TextParagraph text={
          t("cha2_c18")
        } />
      <TextParagraph
        text={
          <div style={{ display:"flex"}}>
            <ClaimButton
            ref={claimButtonRef}
            label={
              t("cha2_c19")
            }
            position={2}
            onClaimClick={() => {
              props.claim(2);
            }}
            onAniDone={() => {
              props.onAniDone(2);
            }}
          />
          </div>
          
        }
        topMargin="0px"
      />
    </div>
  );
});

export default PhoneCha2;
