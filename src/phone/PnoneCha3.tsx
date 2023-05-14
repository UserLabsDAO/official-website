/* eslint-disable eqeqeq */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import cha3P1 from '../resources/phone_cha3_p1.png';
import cha3P2 from '../resources/cha3_p2.png';
import cha3P3 from '../resources/phone_cha3_p3.png';
import cha3P4 from '../resources/phone_cha3_p4.png';
import cha3P5 from '../resources/cha3_p5.png';

import cha3M1 from '../resources/cha3_m1.png';
import cha3M1Eng from '../resources/cha3_m1_eng.png';
import cha3M2 from '../resources/cha3_m2.png';
import cha3M2Eng from '../resources/cha3_m2_eng.png';
import cha3M3 from '../resources/cha3_m3.png';
import cha3M4 from '../resources/cha3_m4.png';
import cha3M5 from '../resources/cha3_m5.png';
import cha3M6 from '../resources/cha3_m6.png';
import cha3M7 from '../resources/cha3_m7.png';
import cha3M8 from '../resources/cha3_m8.png';
import cha3M9 from '../resources/cha3_m9.png';
import cha3M10 from '../resources/phone_cha3_m10.png';
import cha3M11 from '../resources/cha3_m11.png';
import cha3M12 from '../resources/cha3_m12.png';
import cha3M13 from '../resources/cha3_m13.png';
import cha3M14 from '../resources/cha3_m14.png';
import cha3M15 from '../resources/cha3_m15.png';
import cha3M16 from '../resources/cha3_m16.png';
import cha3M17 from '../resources/phone_cha3_m17.png';
import cha3M18 from '../resources/phone_cha3_m18.png';
import cha3M19 from '../resources/cha3_m19.png';
import cha3M20 from '../resources/cha3_m20.png';
import cha3VideoImg from '../resources/cha3_video_img.png';
import link from '../resources/link.png';

import './ManifestoContent.css';
import { TextParagraph, ImageParagraph, ParagraphTitle } from "./ManifestoElement";
import ClaimButton from "../web/ClaimButton";
import { useTranslation2 } from "../language/useTranslation";
import { LanguageContext, LANG_CHINESE, LANG_JAPANESE } from "../language/LanguageContext";

const PhoneCha3 = forwardRef<any, any>((props, ref) => {
  const claimButtonRef = useRef(null as any);
  const rootRef = useRef(null as any);
  const OverViewRef = useRef(null as any);
  const IntuitionRef = useRef(null as any);
  const MechanismRef = useRef(null as any);
  const EcosystemRef = useRef(null as any);
  const ConclusionAndVisionRef = useRef(null as any);
  const {t,lan} = useTranslation2();
  const titleClassName = lan == LANG_CHINESE?"cha3_title": "cha3_title_o";
  const isChinese = lan == LANG_CHINESE;
  const videoRef  = useRef(null as any);
  const [refresh,setRefresh] = useState(0)
  const [isPlaying,setPlaying] = useState(false)


  useImperativeHandle(ref, () => ({
    showClaimAni: (position, money, skipAnim = false) => {
      claimButtonRef.current.showAni(money,skipAnim);
    },
    menuTops: () => {
      return [
          rootRef.current.offsetTop,
          IntuitionRef.current.offsetTop - 30,
          MechanismRef.current.offsetTop - 30,
          EcosystemRef.current.offsetTop - 30,
          ConclusionAndVisionRef.current.offsetTop - 30,
        ]
  }
  }));

  function Cha3Title(title,ref?){
    return (
      <div ref = {ref} style={{marginTop:30,display:"flex",textIndent:"0em"}}>
              <span className={titleClassName}>
                {title}
              </span>
          </div>
    )
  }//

  function Cha3Line(text,underline = true){
    const w = isChinese?400:400

    return<span style={{color:"white",textDecoration:`${underline?'underline':'none'}`,fontWeight:w,textDecorationSkipInk:"none"}}>{text} </span>
  }

  useEffect(()=>{
    const lis = ()=>{
      setTimeout(() => {
        videoRef.current.controls = false;
        setPlaying(true)
        setRefresh((p)=>{
          return p+1
        })
      }, 100);
    }
    videoRef.current.addEventListener("play",lis)
    return ()=>{
      if(videoRef.current!=null){
        videoRef.current.removeEventListener("play",lis)
      }
    }
  },[])

  function getOpacity() {
    if (lan == LANG_JAPANESE) {
        return 0;
    } else {
        return 1;
    }
}


  return (
    <div ref = {rootRef} 
    className="container" style={{padding: 20,opacity: `${getOpacity()}`}}>
        <ParagraphTitle text="Chapter III - HOW?" />
        {Cha3Title(t('cha3_c1'))}
        <div style={{ marginTop: 15, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'flex-start', alignContent: 'flex-start' }}>

                <Cha3Menu index="1" text={t('cha3_m1')} />
                <Cha3Menu index="2" text={t('cha3_m2')} />
                <Cha3Menu index="3" text={t('cha3_m3')}  />
                <Cha3Menu index="1" leftMargin="17px" text = {t('cha3_m3_1')} />
                <Cha3Menu index="2" leftMargin="17px" text = {t('cha3_m3_2')} />
                <Cha3Menu index="3" leftMargin="17px" text = {t('cha3_m3_3')} />
                <Cha3Menu index="1" leftMargin="34px" text = {t('cha3_m3_3_1')} />
                <Cha3Menu index="2" leftMargin="34px" text = {t('cha3_m3_3_2')} />
                <Cha3Menu index="3" leftMargin="34px" text = {t('cha3_m3_3_3')} />
                <Cha3Menu index="4" leftMargin="34px" text = {t('cha3_m3_3_4')} />
                <Cha3Menu index="4" leftMargin="17px" text = {t('cha3_m3_4')} />
                <Cha3Menu index="1" leftMargin="34px" text = {t('cha3_m3_4_1')} />
                <Cha3Menu index="2" leftMargin="34px" text = {t('cha3_m3_4_2')} />
                <Cha3Menu index="3" leftMargin="34px" text = {t('cha3_m3_4_3')} />
                <Cha3Menu index="4" leftMargin="34px" text = {t('cha3_m3_4_4')} />
                <Cha3Menu index="5" leftMargin="17px" text = {t('cha3_m3_5')} />
                <Cha3Menu index="4" text = {t('cha3_m4')} />
                <Cha3Menu index="1" leftMargin="17px" text = {t('cha3_m4_1')} />
                <Cha3Menu index="2" leftMargin="17px" text = {t('cha3_m4_2')} />
                <Cha3Menu index="5" text = {t('cha3_m5')} />
        </div>
        
        {Cha3Title(t('cha3_m1'))}
        {/* <Cha3Title  title= "-OVERVIEW"/> */}
        <TextParagraph topMargin="30px" text={<>{t("cha3_c2")} {Cha3Line(t("cha3_c3"))}</>} />
        <TextParagraph topMargin="15px" text = {t("cha3_c4")} />
        <TextParagraph topMargin="0px" text = {t("cha3_c5")} />
        <TextParagraph topMargin="0px" text = {t("cha3_c6")} />
        <TextParagraph topMargin="15px" text = {t("cha3_c7")} />
        {/* <Cha3Title title= "-INTUITION"/> */}
        {Cha3Title(t('cha3_m2'),IntuitionRef)}
        <TextParagraph topMargin="30px" text = {t("cha3_c8")} />
        <TextParagraph topMargin="15px" text = {t("cha3_c9")} />
        {
        isChinese?
          <Cha3Img src={cha3M1} text = {t("cha3_c10")} width = {169} topMargin={3} />
          :
          <>
            <TextParagraph topMargin="15px" text = {t("cha3_c10")} />
            <Cha3Img src={cha3M1Eng} width = {231} topMargin={8} />
          </>
        }        
        
        <TextParagraph topMargin={isChinese?"3px":"8px"} text = {t("cha3_c11_p")} />
        <TextParagraph topMargin="15px"  text = {Cha3Line(t("cha3_c12"))} />

        <TextParagraph topMargin="15px" text = {t("cha3_c13_p")} />
        <Cha3Img src={isChinese? cha3M2:cha3M2Eng} width= {"100%"} topMargin = {isChinese?1:8}/>

        <TextParagraph topMargin={isChinese?"1px":"8px"} text = {t("cha3_c13_p2")} />
        <TextParagraph topMargin="15px" text = {Cha3Line(t("cha3_c14"))} />
        <video onClick={()=>{

          videoRef.current.controls = true;
          if(isPlaying){
            videoRef.current.pause()
            setPlaying(false)
          }

        }} ref={videoRef} style={{marginTop:15}} poster = {cha3VideoImg} id="playChatVideo" controls={true} src={require('../resources/cha3.mp4')} width="300px" height="213" loop = {true} playsInline = {true} >
        </video >
        <TextParagraph topMargin="15px" text = {t("cha3_c15")}/>
        <TextParagraph topMargin="15px" text = {Cha3Line(t("cha3_c16"))} />
        <TextParagraph topMargin="15px" text = {Cha3Line(t("cha3_c17"))} />
        {Cha3Title(t('cha3_m3'),MechanismRef)}

        <div style={{marginLeft:15}}>
          <Cha3Title2 title={t('cha3_m3_1')} topMargin={30}/>
          <TextParagraph topMargin="15px" text = {"P："+t('cha3_c18')}/>
          <TextParagraph topMargin={isChinese?"0px":"8px"} text = {"S："+t('cha3_c19')}/>
          <TextParagraph topMargin={isChinese?"0px":"8px"} text = {"I："+t('cha3_c20')}/>
          <TextParagraph topMargin={isChinese?"0px":"8px"} text = {"C："+t('cha3_c21')}/>
          <Cha3Title2 title={t('cha3_m3_2')} topMargin={30}/>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center',marginTop:"15px" }}><img src={cha3M3} style={{ width: 79, height: 51 }} /></div>

          <TextParagraph topMargin="15px" text = {t('cha3_c22')}/>
          <Cha3Title2 title={t('cha3_m3_3')} topMargin={30}/>
          <TextParagraph topMargin="15px" text = {t('cha3_c23')}/>
          <div style={{marginLeft:15}}>
            <Cha3Title3 title={t('cha3_m3_3_1')} topMargin = {15} />
            <TextParagraph topMargin="15px" text = {"ΔS："+t('cha3_c24')}/>
            <TextParagraph topMargin="0px" text = {"ΔI："+t('cha3_c25')}/>
            <TextParagraph topMargin="0px" text = {"δ："+t('cha3_c26_p')}/>
            <TextParagraph topMargin="0px" text = {"α："+t('cha3_c27_p')}/>

            <Cha3Title3 title={t('cha3_m3_3_2')} topMargin = {15} />        
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center',marginTop:"15px" }}><img src={cha3M4} style={{ width: 179, height: 57 }} /></div>

            <Cha3Title3 title={t('cha3_m3_3_3')} topMargin = {15} /> 
            <TextParagraph topMargin="15px" text = {t('cha3_c28_p')}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c29')}/>
            <Cha3Img src={cha3M5} width = {226} topMargin = {15}/>
            <TextParagraph topMargin="20px" text = {t('cha3_c30')}/>
            <Cha3Img src={cha3M6} width = {148} topMargin = {15}/>
          </div>
        </div>

        <ImageParagraph image={cha3P1} width = "100%" />
        
        <div style={{marginLeft:15}}>
          <div style={{marginLeft:15}}>
            <Cha3Title3 title={t('cha3_m3_3_4')} topMargin = {15} /> 
            <TextParagraph topMargin="15px" text = {t('cha3_c31')}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c32')}/>
            <Cha3Img src={cha3M7} width = {183} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c33')}/>
            <Cha3Img src={cha3M8} width = {154} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c34')}/>
            <Cha3Img src={cha3M9} width = {235} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c35')}/>
            <Cha3Img src={cha3M10} width = {270} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c36')}/>
            <Cha3Img src={cha3M11} width = {242} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c37')}/>
            <Cha3Img src={cha3M12} width = {166} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c38')}/>
            <Cha3Img src={cha3M13} width = {210} topMargin = {15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c39_p')}/>
          </div>
        </div>
        <ImageParagraph image={cha3P4} width = "95%"/>
        
        <div style={{marginLeft:15}}>
          <Cha3Title2 title={t('cha3_m3_4')} topMargin = {30} /> 
          <TextParagraph topMargin="15px" text = {t('cha3_c40')}/>

          <div style={{marginLeft:15}}>
            <Cha3Title3 title={t('cha3_m3_4_1')} topMargin = {15} /> 
            <TextParagraph topMargin="15px" text = {"R："+t('cha3_c41')}/>
            <TextParagraph topMargin="0px" text = {"B："+t('cha3_c42')}/>
            <TextParagraph topMargin="0px" text = {"t："+t('cha3_c43')}/>
            <TextParagraph topMargin="0px" text = {"β："+t('cha3_c44')}/>
            <TextParagraph topMargin="0px" text = {"T："+t('cha3_c45')}/>
            <Cha3Title3 title={t('cha3_m3_4_2')} /> 
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center',marginTop:15 }}><img src={cha3M14} style={{ width: 181, height: 37 }} /></div>
            <TextParagraph topMargin="15px" text = {t('cha3_c46')}/>
            <Cha3Title3 title={t('cha3_m3_4_3')} /> 
            <TextParagraph topMargin="15px" text = {t('cha3_c47')}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c48')}/>
            <Cha3Img src={cha3M15} width = {212} topMargin = {10}/>

          </div>

        </div>

        <ImageParagraph image={cha3P2} width = "100%" />
        
        <div style={{marginLeft:15}}>
          <div style={{marginLeft:15}}>
            <Cha3Title3 title={t('cha3_m3_4_4')} />
            <TextParagraph topMargin="15px" text = {t('cha3_c49')}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c50')}/>
            <Cha3Img src={cha3M16} width={101} topMargin={15}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c51')+t('cha3_c52')}/>
            <Cha3Img src={cha3M17} width ="100%" topMargin={15} />
            <TextParagraph topMargin="15px" text = {t('cha3_c53')}/>
            <Cha3Img src={cha3M18} width ={217} topMargin={15} />
            <TextParagraph topMargin="15px" text = {t('cha3_c54')}/>
            <Cha3Img src={cha3M19} width ={99} topMargin={15} />

            <TextParagraph topMargin="15px" text = {t('cha3_c55_p')}/>
            <TextParagraph topMargin="0px" text = {t('cha3_c56_p')}/>
            <TextParagraph topMargin="15px" text = {t('cha3_c57')}/>
            <Cha3Img src={cha3M20} width ={236} topMargin={15} />
            <TextParagraph topMargin="15px" text = {t('cha3_c58_p')}/>
          </div>
        </div>
        
        <ImageParagraph image={cha3P3} width = "100%"/>

        <div style={{marginLeft:15}}>
          <Cha3Title2 title={t('cha3_m3_5')}/>
            <TextParagraph topMargin="15px" text = {<>{t('cha3_c59_p')} {Cha3Line("0x4cbC...F234",true)} <img src={link} style={{ marginLeft:isChinese?0:2, width: 14, height: 14,marginTop:"3px" }} /> {t('cha3_c60')}</>}/>
            <TextParagraph topMargin = '15px' text={"1. "+t('cha3_c61')} />
            <TextParagraph topMargin="15px" text = {<>{t('cha3_c62_p')} {Cha3Line("0x4cbC...F234",true)} <img src={link} style={{ marginLeft:isChinese?0:2, width: 14, height: 14 }} /> {t('cha3_c63')}</>}/>
            <TextParagraph topMargin = '15px' text={"1. "+t('cha3_c64')} />
            <TextParagraph topMargin = '15px' text={"2. "+t('cha3_c65')} />
            <TextParagraph topMargin = '15px' text={"3. "+t('cha3_c66')} />
            <TextParagraph topMargin = '15px' text={"4. "+t('cha3_c67')} />


        </div>
        
        
        {/* <Cha3Title title= "-ECOSYSTEM"/> */}
        {Cha3Title(t('cha3_m4'),EcosystemRef)}
        <ImageParagraph image={cha3P5}  width = "100%"/>
        <div style={{marginLeft:15}}>
          <Cha3Title2 title={t('cha3_m4_1')} />
          <TextParagraph topMargin = '15px' text={t('cha3_c68')} />
          <TextParagraph topMargin = '15px' text={"1. "+t('cha3_c69')} />
          <TextParagraph topMargin = '15px' text={"2. "+t('cha3_c70')} />
          <TextParagraph topMargin = '15px' text={"3. "+t('cha3_c71')} />

          <Cha3Title2 title={t('cha3_m4_2')} />
          <TextParagraph topMargin = '15px' text={t('cha3_c72')} />
          <TextParagraph topMargin = '15px' text={t('cha3_c73')} />
          <TextParagraph topMargin = '15px' text={"1. "+t('cha3_c74')} />
          <TextParagraph topMargin = '15px' text={"2. "+t('cha3_c75')} />
          <TextParagraph topMargin = '15px' text={"3. "+t('cha3_c76')} />
          
        </div>

        {Cha3Title(t('cha3_m5'),ConclusionAndVisionRef)}
        <TextParagraph topMargin="30px" text={t('cha3_c77')} />
        <TextParagraph topMargin = '15px' text={"1. "+t('cha3_c78')} />
        <TextParagraph topMargin = '15px' text={"2. "+t('cha3_c79')} />
        <TextParagraph topMargin = '15px' text={"3. "+t('cha3_c80')} />

        <TextParagraph topMargin = '15px' text={t('cha3_c81')} />
        <TextParagraph topMargin = '15px' text={t('cha3_c82')} />
        <TextParagraph topMargin= '0px' text={<><ClaimButton
            ref={claimButtonRef}
            label={t('cha3_c83')}
            position={3}
            onClaimClick={() => {
              props.claim(3);
            }}
            onAniDone={() => {
              props.onAniDone(3);
            }}
          /> </>} />
        
    </div>
  );
});

export default PhoneCha3;


function Cha3Title2({title,topMargin = 30}:{title:string,topMargin?:number}){

  const { language } = React.useContext(LanguageContext);
  const titleClassName = language == LANG_CHINESE?"cha3_title": "cha3_title_o";

  return (
    <div style={{display:"flex",marginTop:topMargin}}>
      <span className={titleClassName} style={{fontSize:"16.5px",lineHeight:"24px"}}>{title}</span>
    </div>

  )
}

function Cha3Title3({title,topMargin = 15}:{title:string,topMargin?:number}){
  const { language } = React.useContext(LanguageContext);
  const titleClassName = language == LANG_CHINESE?"cha3_title": "cha3_title_o";
  
  return (
    <div style={{display:"flex",marginTop:topMargin}}>
      <span className={titleClassName} style={{fontSize:"15px",lineHeight:"22px"}}>{title}</span>
    </div>

  )
}

const Cha3Menu = ({ text,leftMargin = "0px",index }: { text: string,leftMargin?:String,index:string })=>{

  const { language } = React.useContext(LanguageContext);
  const className = language == LANG_CHINESE?"phone_cha3_menu": "phone_cha3_menu_o";

  return(
    <div style={{display:"flex",marginLeft:`${leftMargin}`,width:"200px",alignItems:"center"}}>
       <div className={className}>
          <span>{index}</span>
          <span style={{marginLeft:"8px"}}>{text}</span>
       </div>
    </div>
  )
}
const Cha3Img = ({ src,text="",width,topMargin}: { src: string,text?: string,topMargin:number|string, width:number|string,height?:number|string})=>{
  return(
    <div className="text_content" style={{marginTop:topMargin,display:"flex",alignItems:"center"}}>
        {text}
        <img src={src} style = {{width:width,marginTop:"4px"}} alt = ""/>
    </div>
  )
}