import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import uwt from '../resources/uwt.png';
import wallet_black from '../resources/wallet_black.png';
import black_arrowdown from '../resources/black_arrowdown.png';
import right from '../resources/right.png';
import link_grey from '../resources/link_grey.png';
import quit from '../resources/quit.png';
import './Menus.css';
import './Main.css';
import { Menu } from "../data/Data";
import { CountDown } from "../util/CountDown";
import { redeemOpenTime, redeemOpenTimeLeft } from "../data/Constant";
import { animate } from "popmotion";
import egg_bg from '../resources/egg_bg.png';
import { useTranslation2 } from "../language/useTranslation";
import { LANG_ENGLISH } from "../language/LanguageContext";

interface MenuProps {
    onSwitchMenu: (indexs: number[]) => void;
    style: any;
}

const Menus = forwardRef<any, MenuProps>(({ onSwitchMenu, style }, ref) => {
    const { t, lan } = useTranslation2()

    const eggTips = useRef(null as any);
    const [menus, setMenus] = useState<any[]>([]);
    const [hidden, setHidden] = useState(true);
    const resetMenus = () => {
        let menuText = [
            ['Chapter I - Take User’s Wealth Back'],
            ['Chapter II - Why Now?'],
            ['Chapter III - User Wealth Token'],
            ['Chapter IV - LFG'],
            ['SIZZLE - The World’s First Product', 'To Support UWT']
        ]
        if (screenLevel == 1) {
            menuText = [
                ['Chapter I - Take User’s Wealth Back'],
                ['Chapter II - Why Now?'],
                ['Chapter III - User Wealth Token'],
                ['Chapter IV - LFG'],
                ['SIZZLE - The World’s First Product', 'To Support UWT']
            ]
        }
        if (screenLevel == 2) {
            menuText = [
                ['Chapter I - Take User’s', 'Wealth Back'],
                ['Chapter II - Why Now?'],
                ['Chapter III - User', 'Wealth Token'],
                ['Chapter IV - LFG'],
                ['SIZZLE - The World’s First', 'Product To Support UWT']
            ]
        }
        let menusTemp: Menu[] = [
            { label: menuText[0], indexs: [0, 0], childrens: null, isSpecial: false },
            { label: menuText[1], indexs: [1, 0], childrens: null, isSpecial: false },
            {
                label: menuText[2], indexs: [2, 0], childrens: [
                    { label: ['- Overview'], indexs: [2, 1], childrens: null, isSpecial: false },
                    { label: ['- Building Intuition'], indexs: [2, 2], childrens: null, isSpecial: false },
                    { label: ['- Mechanism'], indexs: [2, 3], childrens: null, isSpecial: false },
                    { label: ['- Ecosystem'], indexs: [2, 4], childrens: null, isSpecial: false },
                    { label: ['- Conclusion and Vision'], indexs: [2, 5], childrens: null, isSpecial: false }
                ], isSpecial: false
            },
            { label: menuText[3], indexs: [3, 0], childrens: null, isSpecial: false },
            { label: menuText[4], indexs: [4, 0], childrens: null, isSpecial: true },
        ]
        setMenus(menusTemp);
    }

    useImperativeHandle(ref, () => ({

        switchMenuByScroll: (indexs: number[]) => {
            switchMenu(indexs, true);
        },

        showEgg: () => {
            setHidden(false);
        }
    }));


    //>1920 0  >1575 1 else 2
    const [screenLevel, setScreenLevel] = useState(0);
    const resizeUpdate = (e) => {
        // 通过事件对象获取浏览器窗口的高度
        let w = e.target.innerWidth;
        if (w > 1920) {
            setScreenLevel(0);
        } else if (w > 1575) {
            setScreenLevel(1);
        } else {
            setScreenLevel(2);
        }
    };

    useEffect(() => {
        resetMenus()
    }, [screenLevel]);

    useEffect(() => {
        // 页面刚加载完成后获取浏览器窗口的大小
        let w = window.innerWidth;
        if (w > 1920) {
            setScreenLevel(0);
        } else if (w > 1575) {
            setScreenLevel(1);
        } else {
            setScreenLevel(2);
        }
        resetMenus();
        // 页面变化时获取浏览器窗口的大小 
        window.addEventListener('resize', resizeUpdate);

        return () => {
            // 组件销毁时移除监听事件
            window.removeEventListener('resize', resizeUpdate);
        }
    }, []);

    const [curIndex, setCurIndex] = useState([0, 0]);
    const blockRef = useRef(null as any);
    const menuContainerRef = useRef(null as any);

    const getMenuElement = (indexs) => {
        const ms = (menuContainerRef.current as HTMLElement).children[indexs[0]];
        if (indexs[1] == 0) {
            return ms.children[0] as HTMLElement;
        } else {
            return ms.children[1].children[indexs[1] - 1] as HTMLElement;
        }
    }

    const getChildMenuContainerElement = (indexs) => {
        const ms = (menuContainerRef.current as HTMLElement).children[indexs[0]];
        return ms.children[1] as HTMLElement;
    }

    const selectMenu = (element: HTMLElement, selected: boolean) => {
        element.style.transition = `color,opacity  400ms linear 0s`;
        element.style.color = selected ? '#EAEAEA' : '#868686';
        element.style.opacity = selected ? '1' : '0.4';
    }


    const getBlockPosition = (index) => {
        if (menuContainerRef.current) {
            const cs = (menuContainerRef.current as HTMLElement).childNodes;
            let result = 0;
            for (let i = 0; i < cs.length && i < index; i++) {
                let mc = cs[i] as HTMLElement;
                if (mc.childElementCount > 1) {
                    let line = (mc.childNodes[0] as HTMLElement).clientHeight;
                    line += 30;
                    result += line;
                } else {
                    let line = mc.clientHeight;
                    result += line;
                }

            }
            return result;
        } else {
            return 0;
        }
    }

    const switchMenu = (indexs, ignorScroll = false) => {
        if (isSameIndexs(curIndex, indexs)) {
            return;
        }
        console.log('switchMenu ' + indexs[0] + " " + indexs[1])
        const blockPosition = getBlockPosition(indexs[0]);
        const block = blockRef.current;
        block.style.transition = `translate  400ms linear 0s`;
        block.style.translate = `0 ${blockPosition}px`;

        selectMenu(getMenuElement(curIndex), false)
        selectMenu(getMenuElement(indexs), true)
        if (curIndex[0] != indexs[0]) {
            //切换章节了
            selectMenu(getMenuElement([curIndex[0], 0]), false)
            selectMenu(getMenuElement([indexs[0], 0]), true)

            //处理展开收起
            if (curIndex[1] > 0) {
                const menuContainer = getChildMenuContainerElement(curIndex);
                let pMenu = menus[curIndex[0]];
                // showMenu(getChildMenuContainerElement(curIndex), false);
                animate({
                    from: 1,
                    to: 0,
                    duration: 400,
                    onUpdate: (progress) => {
                        menuContainer.style.opacity = '' + progress
                        menuContainer.style.height = '' + pMenu.childrens.length * 54 * progress + 'px'
                    },
                    onComplete: () => {
                        menuContainer.style.pointerEvents = 'none'
                    }
                })
            }
            if (indexs[1] > 0) {
                // showMenu(getChildMenuContainerElement(indexs), true);

                const menuContainer = getChildMenuContainerElement(indexs);
                let pMenu = menus[indexs[0]];
                // showMenu(getChildMenuContainerElement(curIndex), false);
                animate({
                    from: 0,
                    to: 1,
                    duration: 400,
                    onUpdate: (progress) => {
                        menuContainer.style.opacity = '' + progress
                        menuContainer.style.height = '' + pMenu.childrens.length * 54 * progress + 'px'
                    },
                    onComplete: () => {
                        menuContainer.style.pointerEvents = 'auto'
                    }
                })
            }
        }

        setCurIndex(indexs);
        if (!ignorScroll) {
            onSwitchMenu(indexs);
        }

    }

    const isSameIndexs = (indexsA: number[], indexsB: number[]) => {
        return indexsA.length === 2 && indexsB.length === 2 && indexsA[0] === indexsB[0] && indexsA[1] === indexsB[1]
    }

    const clickEgg = () => {
        const transY = 30;
        animate({
            to: 1,
            duration: 200,
            onUpdate: (progress) => {
                if (eggTips.current) {
                    let ele = eggTips.current as HTMLElement;
                    ele.style.transform = ` translate(0px,${transY - transY * progress}px)`;
                    ele.style.opacity = `${progress}`;
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
                                ele.style.opacity = `${progress}`;
                            }
                        },

                    })
                }, 1500)
            }
        })
    }

    const makeMenu = (menu: Menu, isChild: boolean) => {
        const hasChild = menu.childrens != null
        return isChild ?
            <span key={menu.indexs[1]} className='menu_item menu_item_part' style={{ marginBottom: 30, cursor: 'pointer', color: isSameIndexs(curIndex, menu.indexs) ? '#EAEAEA' : '#868686', opacity: isSameIndexs(curIndex, menu.indexs) ? 1 : 0.4, marginLeft: 22 }} onClick={() => { switchMenu(menu.indexs); }} >
                {menu.label[0]}
            </span>
            :
            <div key={menu.indexs[0] * 10} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {menu.isSpecial && hidden ?
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 30, opacity: isSameIndexs(curIndex, menu.indexs) ? 1 : 0.4 }} onClick={clickEgg}>
                        <img src={egg_bg} style={{ width: 18, height: 24, marginRight: 2 }} />
                        <span className='menu_item  menu_item_part' style={{ color: '#868686' }}  >
                            ???
                        </span>

                        <span ref={eggTips} className='menu_item  menu_item_part' style={{ opacity: 0, marginLeft: 16, color: '#02D4CB', fontSize: lan == LANG_ENGLISH ? 18 : 15 }}  >
                            {t('egg_tips')}
                        </span>
                    </div>
                    :
                    <>
                        {
                            menu.label.length > 1 ?
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 30, opacity: isSameIndexs(curIndex, menu.indexs) ? 1 : 0.4 }} onClick={() => { switchMenu([menu.indexs[0], menu.childrens == null ? 0 : 1]); }}>
                                    <span className='menu_item  menu_item_part' style={{ cursor: 'pointer', color: isSameIndexs(curIndex, menu.indexs) ? '#EAEAEA' : '#868686' }}  >
                                        {menu.label[0]}
                                    </span>
                                    <span className='menu_item  menu_item_part' style={{ cursor: 'pointer', color: isSameIndexs(curIndex, menu.indexs) ? '#EAEAEA' : '#868686' }}  >
                                        {menu.label[1]}
                                    </span></div>
                                :
                                <span className='menu_item  menu_item_part' style={{ marginBottom: 30, cursor: 'pointer', color: isSameIndexs(curIndex, menu.indexs) ? '#EAEAEA' : '#868686', opacity: isSameIndexs(curIndex, menu.indexs) ? 1 : 0.4 }} onClick={() => { switchMenu([menu.indexs[0], menu.childrens == null ? 0 : 1]); }} >
                                    {menu.label[0]}
                                </span>
                        }
                        {
                            hasChild ?
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', opacity: 0, height: 0, pointerEvents: 'none' }}>
                                    {menu.childrens.map((cm, index) =>
                                        makeMenu(cm, true))}
                                </div> : <></>
                        }</>}
            </div>
    }



    return <>

        <div ref={ref} className='menu menu_position' style={{ ...style }}>
            <div ref={blockRef} className="menu_block" />
            <div ref={menuContainerRef} style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, alignItems: 'flex-start' }}>
                {menus.map((menu, index) =>
                    makeMenu(menu, false)
                )}
            </div>
        </div>
        {

        }

    </>;
});



export default Menus;