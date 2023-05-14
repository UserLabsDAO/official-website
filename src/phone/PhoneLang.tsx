import { forwardRef, useImperativeHandle, useState } from "react";
import '../web/Main.css'
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE, LANG_THAI, LanguageContext } from '../language/LanguageContext';
import languageIcoon from "../resources/phone_top_bar_language.png"
import bgIcoon from "../resources/phone_lang_bg.png"
import React from "react";
const PhoneLang = forwardRef<any, any>((props, ref) => {
    const { language, switchLanguage } = React.useContext(LanguageContext);
    const langvalues = [LANG_ENGLISH, LANG_CHINESE, LANG_JAPANESE, LANG_THAI];
    // const langlabels = ['ENGLISH', '简体中文', '日本語', 'ภาษาไทย'];
    const langlabels = ['ENGLISH', '简体中文', '日本語'];

    const [showDetail, setShowDetail] = useState(false);

    const doSwitch = (index:any) => {
        switchLanguage(langvalues[index]);
        setShowDetail(false)
    }

    return <div onClick={() => { setShowDetail(!showDetail) }}>
        <div >
            <img src={languageIcoon} style={{ width: 32, height: 32}} />
        </div>
        {
             showDetail ? <div style={{
                position: 'absolute',
                display: 'flex', flexDirection: 'column', width: 154, height:170, background: `url(${bgIcoon})`,
                zIndex:1,
                paddingTop:25,
                marginLeft:-25,
                marginTop:-5
            }}>
                <div
                onClick={()=>{setShowDetail(false)}}
                  style={{
                    position:"fixed",
                    top: 0,
                    left: 0,
                    width:"100%",
                    height:"100%",
                  }}/>
                {langlabels.map((lang, index) =>
                    <div className="share_content" onClick={() => { doSwitch(index) }} style={{
                        cursor: 'pointer',
                        justifyContent: 'center',
                        zIndex:1,
                        display: 'flex', alignItems: 'center', width: '100%'
                    }} key={index}>
                        <span className="share_content" style={{ fontSize:"15px", lineHeight:"22px", width: '100%', padding: '15px 0 15px 0', color: language == langvalues[index] ? '#EAEAEA' : '#868686' }} >{lang}</span>
                    </div>
                )}
            </div>  : <></>
        }

    </div>
})

export default PhoneLang;