import React from 'react';
import { CSSProperties } from 'react';
import { LANG_CHINESE, LanguageContext } from '../language/LanguageContext';
import { useTranslation2 } from '../language/useTranslation';
import './ManifestoContent.css';

export const ParagraphTitle = ({ text,topMargin = "0px" }: { text: string,topMargin?:String }) => {
  return (
    <div style={{ width: "100%", display: "flex",marginTop:`${topMargin}`,textAlign:"left",marginLeft:"-20px" }}>
      <div style={{ height: "13px", width: "13px", backgroundColor: "#ffffff",marginTop:"8px",flexShrink:0 }} />
      <div>
      <span className="phone_content_title">
        {text}
      </span>
      </div>
    </div>
  );
};

export const TextParagraph = ({ text = {},topMargin = "30px",texts = [],nums = [] }: { text?: any,topMargin?:String,texts?:Array<string>,nums?:Array<string|number> }) => {

  const { language } = React.useContext(LanguageContext);
  const className = language == LANG_CHINESE?"text_content": "text_content_o";

    function formatText(){
       if(texts.length>0){
        return texts.map((itemText,index)=>{
          return (
            <span key={index}>
              <span>{itemText}</span>
              {nums.length>index&&<HightLightNum num={nums[index]} />}
            </span>)
        })
      }else{
        return <span>{text}</span>
      }
    }

    return (
      <div className={className} style={{marginTop:`${topMargin}`}}>
        {formatText()}
      </div>
    );
  };

export const ImageParagraph = ({ image, width, height, discribe = "" }: {
    image: string;
    width?: string;
    height?: string;
    discribe?: string;
  }) => {

    const { language } = React.useContext(LanguageContext);
    const className = language == LANG_CHINESE?"img_discribe": "img_discribe_o";

    return (
      <div style={{ textAlign: "left" }}>
        <img src={image} style={{ width: `${width}`, height: `${height}`, marginTop: "15px" }} alt="" />
        {discribe && <div className={className} ><span>{discribe}</span></div>}
      </div>
    );
  };

const HightLightNum = ({num}:{num:string|number})=>{
  const {lan } = useTranslation2();

  const KeyNumStyle: CSSProperties = {
    fontFamily: lan == LANG_CHINESE ? 'Source Han Serif CN' : 'TomorrowMedium',
    fontStyle: 'normal',
    fontWeight: lan == LANG_CHINESE ? 700 : 500,
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight:"150%",
    marginRight:4
}


    return <span style={{...KeyNumStyle}}> {num}</span>
  }


  