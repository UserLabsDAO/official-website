import React, { useState, useEffect } from "react";
import { formatDuration } from "../util/TimeUtil";

export const CountDown = (props) => {
    const duration = props.duration;
    const cName = props.cName;

    const [time, setTime] = useState(duration);

    useEffect(() => {
        const tick = setInterval(() => {
            setTime(time - 60);
        }, 1000*60);
        return () => clearInterval(tick);
    });

    return (
        <span className={cName}> {formatDuration(time)}</span>
    );
}