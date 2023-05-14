import { forwardRef, useImperativeHandle, useState } from "react";
import './Main.css'
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE, LANG_THAI, LanguageContext } from '../language/LanguageContext';
import langIcon from '../resources/lang.png';
import React from "react";
const Lang = forwardRef<any, any>((props, ref) => {
    const { language, switchLanguage } = React.useContext(LanguageContext);
    const langvalues = [LANG_ENGLISH, LANG_CHINESE, LANG_JAPANESE, LANG_THAI];
    // const langlabels = ['ENGLISH', '简体中文', '日本語', 'ภาษาไทย'];
    const langlabels = ['ENGLISH', '简体中文', '日本語'];

    const [showDetail, setShowDetail] = useState(false);

    const doSwitch = (index) => {
        console.log("doSwitch " + index);
        switchLanguage(langvalues[index]);
        setShowDetail(false)
    }

    const showText  = ()=>{
        return document.documentElement.clientWidth>1920
    }

    return <div className='lang lang_size' onClick={() => { setShowDetail(!showDetail) }} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className="lang_img"/>
            <span className='share_content lang_text'>LANGUAGES</span>
        </div>
        {
            showDetail ? <div style={{
                position: 'absolute',
                display: 'flex', flexDirection: 'column', width: 154, top: 63, background: '#1D1D1D',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)'
            }}>
                <div
                    onClick={() => { setShowDetail(false) }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }} />
                {langlabels.map((lang, index) =>
                    <div className="share_content" onClick={() => { doSwitch(index) }} style={{
                        cursor: 'pointer',
                        justifyContent: 'center', zIndex: 1,
                        display: 'flex', alignItems: 'center', width: '100%'
                    }} key={index}>
                        <span className="share_content" style={{ width: '100%', padding: '15px 0 15px 0', color: language == langvalues[index] ? '#EAEAEA' : '#868686' }} >{lang}</span>
                    </div>
                )}
            </div> : <></>
        }

    </div>
})

export default Lang;