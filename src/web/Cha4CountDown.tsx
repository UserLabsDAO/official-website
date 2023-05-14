import React, { useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import './Cha4CountDown.css'

export const Cha4CountDown = (props) => {
    const duration = props.duration;

    const [time, setTime] = useState(duration);
    const [timeLabel, setTimeLabel] = useState(["", "", "", ""]);

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

    function getWebUI() {
        return (<div style={{ display: 'flex', justifyContent: 'center', width: 750, marginTop: 55, marginBottom: 55 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="block" style={{ width: 120, height: 100, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[0]}
                </div>
                <span className="label" style={{ marginTop: 20 }}>days</span>
            </div>

            <div className="sep">
                :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="block" style={{ width: 120, height: 100, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[1]}
                </div>
                <span className="label" style={{ marginTop: 20 }}>HOURS</span>
            </div> <div className="sep">
                :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="block" style={{ width: 120, height: 100, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[2]}
                </div>
                <span className="label" style={{ marginTop: 20 }}>MINUTES</span>
            </div> <div className="sep">
                :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="block" style={{ width: 120, height: 100, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[3]}
                </div>
                <span className="label" style={{ marginTop: 20 }}>SECONDS</span>
            </div>
        </div>)
    }

    function getPhoneUI() {
        return (<div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="phone_block" style={{ width: 54, height: 45, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[0]}
                </div>
                <span className="phone_label" style={{ marginTop: 5 }}>days</span>
            </div>

            <div className="phone_sep">
                :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="phone_block" style={{ width: 54, height: 45, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[1]}
                </div>
                <span className="phone_label" style={{ marginTop: 5 }}>HOURS</span>
            </div> <div className="phone_sep">
                :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="phone_block" style={{ width: 54, height: 45, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[2]}
                </div>
                <span className="phone_label" style={{ marginTop: 5 }}>MINUTES</span>
            </div> <div className="phone_sep">
                :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="phone_block" style={{ width: 54, height: 45, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    {timeLabel[3]}
                </div>
                <span className="phone_label" style={{ marginTop: 5 }}>SECONDS</span>
            </div>
        </div>)
    }

    return (
        <>
            <BrowserView>
                {getWebUI()}
            </BrowserView>
            <MobileView style={{width:'100%'}}>
                {getPhoneUI()}
            </MobileView>
        </>
    );
}