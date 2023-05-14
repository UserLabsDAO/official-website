import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import "./Menu.css"
import closeIcon from "../resources/phone_menu_close.png"
import titleIcon from "../resources/phone_menu_title.png"
import shareIcon from "../resources/phone_menu_share.png"
import egg_bg from '../resources/egg_bg.png';
import { animate } from "popmotion";
import { useTranslation2 } from "../language/useTranslation";
import { LANG_CHINESE } from "../language/LanguageContext";

const Menu = forwardRef(({ index, onMenuClick }: { index: Number, onMenuClick: Function }, ref) => {

    const rootRef = useRef<HTMLDivElement>(null as any);
    const containerRef = useRef<HTMLDivElement>(null as any);
    // const [sp,setSP] = useState(index)
    let sp = index;
    const [isShowEgg, setShowEgg] = useState(true)

    useImperativeHandle(ref, () => ({
        show: () => {
            show()
        },
        close: () => {
            close()
        },
        showEgg: () => {
            setShowEgg(false)

        }
    }));

    function close() {
        rootRef.current.style.opacity = "0"
        containerRef.current.style.marginLeft = "-400px"
        rootRef.current.style.pointerEvents = "none"
    }

    function show() {
        sp = index;
        rootRef.current.style.opacity = "1"
        containerRef.current.style.marginLeft = "0px"
        rootRef.current.style.pointerEvents = "auto"
    }

    function isSelected(index) {
        return sp == index || (index == 3 && sp > 100);
    }

    function onItemClick(index) {
        close()
        onMenuClick(index)
    }

    function getMI(id, content) {
        if (id == 5 && isShowEgg) {
            return <EggItem />
        } else if (id > 100) {
            return <MenuItem2 isSelected={isSelected(id)} onClick={onItemClick} id={id} content={content} />
        } else {
            return <MenuItem isSelected={isSelected(id)} onClick={onItemClick} id={id} content={content} />
        }
    }

    return (<div ref={rootRef} className="menu_root" onClick={() => { close() }}>
        <div ref={containerRef} className="menu_container" onClick={(event) => { event.stopPropagation() }}>
            <div style={{ float: "left", width: 300 }}>
                <img src={closeIcon} className="phone_menu_close" onClick={() => { close() }} alt="" />
            </div>
            <div style={{ float: "left" }}>
                <img src={titleIcon} className="phone_menu_title" alt="" />
            </div>
            {getMI(1, "Chapter I - Take User’s Wealth Back")}
            {getMI(2, "Chapter II - Why Now?")}
            {getMI(3, "Chapter III - User Wealth Token")}
            {getMI(101, "- Overview")}
            {getMI(102, "- Building Intuition")}
            {getMI(103, "- Mechanism")}
            {getMI(104, "- Ecosystem")}
            {getMI(105, "- Conclusion and Vision")}
            {getMI(4, "Chapter IV - LFG")}
            {getMI(5, "SIZZLE - The World’s First Product \nTo Support UWT")}
            <div style={{ height: 10 }}></div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "auto", marginBottom: "34px", alignItems: 'center', width: "100%" }}>
                <img src={shareIcon} className="share_icon" alt="" />
            </div>
        </div>
        <div style={{ width: "80px", height: "100vh", position: "absolute", right: 0 }} onClick={() => { close() }}></div>
    </div>)
})

export default Menu;


function MenuItem({ isSelected, content, onClick, id }: { isSelected: Boolean, content: string, onClick: Function, id: Number }) {
    return (
        <div style={{ display: "flex", height: "41px", alignItems: "center", marginTop: 3, textAlign: "left" }} onClick={() => { onClick(id) }}>
            <div style={{ display: "flex" }}>
                <div style={{ width: 7, height: 7, background: "white", visibility: `${isSelected ? "visible" : "hidden"}`, marginLeft: 20, marginTop: 5 }} />
                <span className={isSelected ? "item_menu_text_s" : "item_menu_text_n"}>{content}</span>
            </div>
        </div>
    )
}
function MenuItem2({ isSelected, content, onClick, id }: { isSelected: Boolean, content: string, onClick: Function, id: Number }) {

    return (
        <div style={{ display: "flex", height: "41px", alignItems: "center", marginTop: 3, marginLeft: 55, float: "left" }} onClick={() => { onClick(id) }}>
            <span className={isSelected ? "item_menu_text_s" : "item_menu_text_n"}>{content}</span>
        </div>
    )
}

function EggItem() {
    const { t, lan } = useTranslation2()
    const eggTips = useRef(null as any);
    const isChinese = lan == LANG_CHINESE;
    const eggTipClassName = isChinese ? "item_egg_text" : "item_egg_text_en";
    function onClick() {
        const transY = 30;
        animate({
            to: 1,
            duration: 200,
            onUpdate: (progress) => {
                if (eggTips.current) {
                    let ele = eggTips.current as HTMLElement;
                    ele.style.transform = ` translate(0px,${transY - transY * progress}px)`;
                    ele.style.opacity = `${progress / 2}`;
                }
            },
            onComplete: () => {
                setTimeout(() => {
                    animate({
                        from: 1,
                        to: 0,
                        duration: 200,
                        onUpdate: (progress) => {
                            if (eggTips.current) {
                                let ele = eggTips.current as HTMLElement;
                                ele.style.transform = ` translate(0px,${transY - transY * progress}px)`;
                                ele.style.opacity = `${progress / 2}`;
                            }
                        },

                    })
                }, 1500)
            }
        })

    }

    return (<>
        <div style={{ display: "flex", height: "41px", alignItems: "center", marginTop: 3, marginLeft: 35, float: "left" }} onClick={() => { onClick() }}>
            <img src={egg_bg} style={{ width: 18, height: 19, marginRight: 2 }} alt="" />
            <span className="item_menu_text_n">???</span>
            <span ref={eggTips} className={eggTipClassName} style={{ opacity: 0 }}>{t('egg_tips')}</span>
        </div>

    </>)
}