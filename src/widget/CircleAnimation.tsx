import React, { forwardRef, useRef } from 'react';
import { animate, cubicBezier } from '../util/AnimationUtil';

interface Props {
    firstSize: number;
    lastSize: number;
    duration: number;
}

interface CircleAnimationRef {
    playAnimation: () => void;
}

const CircleAnimation = forwardRef<CircleAnimationRef, Props>(({ firstSize, lastSize, duration }, ref) => {
    const ring = useRef(null as any);
    React.useImperativeHandle(ref, () => ({
        playAnimation: () => {
            const easing = cubicBezier(0, 0.12, 1, 1);
            const ele = ring?.current as HTMLElement;
            ele.style.width = `${firstSize}px`;
            ele.style.height = `${firstSize}px`;
            ele.style.opacity = '1';
            animate({
                duration: duration,
                easing: easing,
                onUpdate: progress => {
                    const size = firstSize + progress * (lastSize - firstSize);
                    ele.style.width = `${size}px`;
                    ele.style.height = `${size}px`;
                    ele.style.opacity = '' + (1 - progress);
                    console.log(progress);
                }
            });
        }
    }));

    return (

        <div ref={ring} style={{
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: lastSize,
            height: lastSize,
            borderRadius: '50%',
            boxShadow: `0 0 0  1px #FFE458`,
            transform: `translate(-50%,-50%)`,
            opacity: 0,
        }} />

    );
});

export default CircleAnimation;
