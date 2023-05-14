import React, { useState, useEffect } from "react";
import './AppendixCountDown.css'
import { useTranslation2 } from "../language/useTranslation";
import { LANG_CHINESE, LANG_ENGLISH, LANG_JAPANESE } from "../language/LanguageContext";

export const AppendixCountDown = (props) => {
    const duration = props.duration;
    const phone = props.phone;

    const [time, setTime] = useState(duration);
    const [timeLabel, setTimeLabel] = useState(["", "", "", ""]);

    const { t, lan } = useTranslation2()


    const isChinese = lan == LANG_CHINESE;
    const isEnglish = lan == LANG_ENGLISH;
    useEffect(() => {
        const tick = setInterval(() => {

            let leftTime = time - 1;
            const leftD = Math.floor(leftTime / (3600 * 24))
            leftTime -= leftD * 3600 * 24;
            const leftH = Math.floor(leftTime / 3600);
            leftTime -= leftH * 3600;
            const leftM = Math.floor(leftTime / 60);
            leftTime -= leftM * 60;
            const leftS = Math.floor(leftTime);

            setTime(time - 1);
            setTimeLabel([leftD > 9 ? "" + leftD : "0" + leftD,
            leftH > 9 ? "" + leftH : "0" + leftH,
            leftM > 9 ? "" + leftM : "0" + leftM,
            leftS > 9 ? "" + leftS : "0" + leftS]);
        }, 1000);
        return () => clearInterval(tick);
    });

    const s = {
        width: 40,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    };
    const s1 = { width: phone?24:31, height: 34, alignItems: 'center', justifyContent: 'center', display: 'flex' };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="appendix_block" style={s}>
                {timeLabel[0]}
            </div>

            {isChinese ? <div style={s1}>
                天
            </div> : <div style={{ ...s1, width: phone?34:56 }}>
                Days
            </div>}


            <div className="appendix_block" style={s}>
                {timeLabel[1]}
            </div>
            
            {isChinese ? <div style={s1}>
            时
            </div> : <div style={{ ...s1, width: phone?28:47 }}>
                Hrs
            </div>}

            <div className="appendix_block" style={s}>
                {timeLabel[2]}
            </div>
            {isChinese ? <div style={s1}>
            分
            </div> : <div style={{ ...s1, width: phone?34:56 }}>
                Mins
            </div>}

            <div className="appendix_block" style={s}>
                {timeLabel[3]}
            </div>
            {isChinese ? <div style={{ ...s1, marginLeft: 5, width: 'auto' }}>
                秒后
            </div>:<div style={{ ...s1, marginLeft: 5, width: 'auto' }}>
                Secs
            </div>
            }



        </div>
    );
}