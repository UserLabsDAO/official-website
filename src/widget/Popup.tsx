
import { animate } from "popmotion";
import { Ref, useEffect, useRef } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
export interface PopupProps {
    outClose?: boolean;
    children?: any;

}
const Popup = forwardRef<any, PopupProps>((props, ref) => {
    const contentRef = useRef(null as any);
    const { outClose = true, children } = props;
    const [show, setShow] = useState(false);
    useImperativeHandle(ref, () => ({
        show: () => {
            document.documentElement.style.overflowY = "hidden";
            document.documentElement.style.marginRight = '15px';
            setShow(true);
        }
        ,
        close: () => {
            document.documentElement.style.overflowY = "auto";
            document.documentElement.style.marginRight = '0';
            setShow(false);
        }
    }));

    const transY = 100;

    useEffect(() => {
        if (show && contentRef.current) {
            animate({
                to: 1,
                stiffness: 556,
                damping: 19.8,
                mass: 1, onUpdate: (progress) => {
                    if (contentRef.current) {
                        let ele = contentRef.current as HTMLElement;
                        ele.style.transform = ` translate(0px,${transY - transY * progress}px)`;
                        ele.style.opacity = `${progress}`;
                    }
                }

            })
        }
    }, [show]);

    const closeClick = (event) => {
        if (outClose) {
            document.documentElement.style.overflowY = "auto";
            document.documentElement.style.marginRight = '0';
            setShow(false);
            event.stopPropagation();
        }
    }

    return show ? createPortal(<div onClick={closeClick} style={{
        top: 0,
        left: 0,
        zIndex: 100,
        width: "100%",
        height: "100%",
        position: "fixed",
        background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.58) 60.69%)",
        marginTop: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backdropFilter: 'blur(10px)'
    }
    }><div ref={contentRef} style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: 'center',
    }
    }> {children}
        </div>

    </div >, document.body) : <></>;



});

export default Popup;