import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import uwt from '../resources/uwt.png';
import wallet_black from '../resources/wallet_black.png';
import black_arrowdown from '../resources/black_arrowdown.png';
import right from '../resources/right.png';
import link_grey from '../resources/link_grey.png';
import quit from '../resources/quit.png';
import './Mine.css'
import './Main.css'
import { MineInfo } from "../data/Data";
import { CountDown } from "../util/CountDown";
import { CLAIM_MONEYS, redeemOpenTime, redeemOpenTimeLeft } from "../data/Constant";
import {
    ConnectorNotFoundError,
    SwitchChainNotSupportedError,
    useConnect,
    useDisconnect,
    useNetwork,
    configureChains, Chain, WagmiConfig, createClient, useAccount
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { animate } from "popmotion"
import { shortenAddr } from "util/index";
import BigNumber from "bignumber.js";


const Mine = forwardRef<any, any>((props, ref) => {
    const connector = new InjectedConnector()
    const { isConnected, address } = useAccount()
    console.log("isConnected:", isConnected, address)
    const { connectAsync, connectors } = useConnect()
    const { disconnectAsync } = useDisconnect()

    const { chain } = useNetwork()
    const findConnector = connectors.find((c) => c.id === chain?.id.toString())
    const [screenLevel, setScreenLevel] = useState(0);
    const resizeUpdate = (e) => {
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
        let w = window.innerWidth;
        if (w > 1920) {
            setScreenLevel(0);
        } else if (w > 1575) {
            setScreenLevel(1);
        } else {
            setScreenLevel(2);
        }

        window.addEventListener('resize', resizeUpdate);

        return () => {
            window.removeEventListener('resize', resizeUpdate);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        show: (info: MineInfo) => {
            if (info?.balance?.toNumber() === 0) {
                info.animated = true;
            } else {
                info.animated = false;
            }
            setMineInfo(info);
        }
    }));
    const keyframesStyle = `
    @keyframes rotateYAnimation {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(360deg);
      }
    }
  `;
    const [mineInfo, setMineInfo] = useState<MineInfo>(    {
        balance: new BigNumber(CLAIM_MONEYS[0]),
        address: address && shortenAddr(address),
        record: [new BigNumber(CLAIM_MONEYS[0])],
        animated: false
    })

    useEffect(() => {
        if (mineInfo != null && !mineInfo.animated) {
            const curBalance: number = balanceNumber() as number;
            const toBalance = mineInfo?.balance;
            moneyIconRef.current.style.animation = 'rotateYAnimation 800ms linear';

            animate({
                from: 0.15,
                to: 0.5,
                duration: 400,
                repeat: 1,
                repeatType: "reverse",
                onUpdate: (progress) => {
                    moneyGroupRef.current.style.background = `rgba(255, 238, 138, ${progress})`
                },
            })

            let numDuration = toBalance && (toBalance.minus(curBalance).toNumber() * 100 / 5) * (1000 / 60) * 1.0;
            if (numDuration && numDuration < 800) {
                numDuration = 800;
            }
            numDuration = 1200;
            animate({
                from: curBalance,
                to: toBalance?.toNumber(),
                duration: numDuration,
                onUpdate: (progress: number) => {
                    let pl = '0.00';
                    if (progress > 0) {
                        pl = '' + progress.toFixed(2);
                    }
                    moneyRef.current.innerText = '' + pl;
                },
                onComplete: () => {
                    const newMineInfo = Object.assign({}, mineInfo)
                    newMineInfo.animated = true;
                    setMineInfo(newMineInfo);
                    moneyIconRef.current.style.animation = 'none';
                }
            });
        }
    }, [mineInfo]);

    const [showDetail, setShowDetail] = useState(false);

    const moneyRef = useRef(null as any);
    const moneyIconRef = useRef(null as any);
    const moneyGroupRef = useRef(null as any);

    const switchDetail = () => {
        if (isConnected) {
            setShowDetail(!showDetail);
        }else {
            connectAsync({connector})
        }
    }

    const balance = () => {
        if (mineInfo == null) {
            return '0.00';
        } else if (mineInfo?.record?.length == 0) {
            return '0.00';
        } else {
            if (mineInfo?.animated) {
                return mineInfo?.balance?.toString();
            } else {
                return (mineInfo?.record && mineInfo?.balance?.minus(mineInfo?.record[mineInfo?.record?.length - 1]))?.toString()
            }
        }
    }

    const balanceNumber = (): number | undefined => {
        if (mineInfo == null) {
            return 0;
        } else {
            if (mineInfo?.animated) {
                return mineInfo?.balance?.toNumber();
            } else {
                if (mineInfo?.record?.length == 0) {
                    return 0;
                } else {
                    return (mineInfo?.record && mineInfo?.balance?.minus(mineInfo?.record[mineInfo?.record?.length - 1]))?.toNumber()
                }
            }
        }
    }

    return <div >
        {
            // mineInfo == null ? (<div style={{ cursor: "pointer" }} className="wallet_btn_uncon wallet_btn_uncon_val "
            //     onClick={async () => { if (!isConnected) await connectAsync({ connector }) }}>
            //     <img className="wallet_btn_walleticon" src={wallet_black} />
            //     {isConnected ? shortenAddr(address) : screenLevel < 2 ? 'CONNECT WALLET' : "CONNECT"}
            // </div>) :
                <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'end', position: 'relative' }} >
                    <div className="wallet_btn_conn" style={{ display: 'flex' }} onClick={switchDetail}>

                        <div ref={moneyGroupRef} className="money_group" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(255, 238, 138, 0.15)',
                            border: '1px solid rgba(255, 238, 138, 0.35)'
                        }}>
                            <style>{keyframesStyle}</style>
                            <img ref={moneyIconRef} src={uwt} className="money_icon" />
                            <span ref={moneyRef} className="info_balance wallet_button_connected_money_fontsize" >{balance()}</span>
                        </div>

                        <div className="address_connect_button" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: '#FFE458', height: '100%'
                        }} >
                            <img src={wallet_black} className="wallet_btn_walleticon" />
                            <span className="info_address wallet_button_connected_fontsize" >{address && shortenAddr(address)}</span>
                        </div>

                    </div >

                    {showDetail ? <div style={{
                        padding: '25px 30px 30px 30px',
                        position: 'absolute', top: 71,
                        right: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        width: 528,
                        borderLeft: '1px solid rgba(255, 228, 88, 0.3)',
                        borderRight: '1px solid rgba(255, 228, 88, 0.3)',
                        borderBottom: '1px solid rgba(255, 228, 88, 0.3)',
                        borderTop: '5px solid #FFE458',
                        background: '#060606',
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

                        <div style={{
                            display: 'flex', alignItems: 'center'
                        }} >
                            <span className="pop_title" >UWT Balance</span>
                            <img src={link_grey} style={{ width: 15, height: 15, marginLeft: 7 }} />
                        </div>

                        <div style={{
                            marginTop: 15,
                            display: 'flex', alignItems: 'center'
                        }} >
                            <img src={uwt} style={{ width: 40, height: 40, marginRight: 10 }} />
                            <span className="pop_balance" >{mineInfo?.balance?.toString()}</span>
                        </div>
                        <div style={{
                            marginTop: 22, marginBottom: 13, width: '100%', height: 1, backgroundColor: '#363636'
                        }} />
                        {mineInfo?.record?.map((money, index) =>
                            <div style={{
                                marginTop: 15,
                                display: 'flex', alignItems: 'center'
                            }} key={index}>
                                <img src={right} style={{ marginRight: 10, width: 13, height: 13 }} />
                                <span className="pop_claim" style={{ marginRight: 10 }}>CLAIM</span>
                                <span className="pop_claim_value" style={{ marginRight: 'auto' }}>{money.toString()} UWT</span>
                                <img src={link_grey} style={{ width: 13, height: 13 }} />
                            </div>
                        )}

                        <div style={{
                            position: 'relative',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginTop: 30, width: '100%', height: 48, backgroundColor: 'rgba(210, 202, 159, 0.17)'
                        }} >
                            <span className="pop_redeem" >Redeem</span>
                            <div style={{
                                position: 'absolute',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', right: 10, top: 9, width: 150, height: 30, backgroundColor: ' #F5ECB8', opacity: 0.6, borderRadius: 5
                            }} >
                                <span className="pop_timer" style={{ marginRight: 5 }} >Starts in</span> <CountDown cName="pop_timer" duration={redeemOpenTimeLeft() / 1000} />
                            </div>
                        </div>


                        <div onClick={async (event) => {
                            //  setShowDetail(false); props.onDisconnect(); event.stopPropagation()
                            await disconnectAsync()
                        }} style={{
                            position: 'relative',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginTop: 15, width: '100%', height: 48, backgroundColor: '#121212'
                        }} >
                            <span className="pop_dis" >Disconnect</span>
                            <img src={quit} style={{ width: 17, height: 17, marginLeft: 8 }} />
                        </div>
                    </div> : <></>
                    }
                </div>
        }
    </div>
})

export default Mine;