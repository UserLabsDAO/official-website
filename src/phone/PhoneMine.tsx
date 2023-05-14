/* eslint-disable jsx-a11y/alt-text */
import { forwardRef, useEffect, useImperativeHandle, useState,useRef } from "react";

import uwt from "../resources/uwt.png";
import wallet_black from "../resources/wallet_black.png";
import black_arrowdown from "../resources/black_arrowdown.png";
import right from "../resources/right.png";
import link_grey from "../resources/link_grey.png";
import wallet_gray from "../resources/wallet_gray.png";
import quit from "../resources/quit.png";
import "./PhoneMine.css";
import { MineInfo } from "../data/Data";
import { CountDown } from "../util/CountDown";
import { redeemOpenTime, redeemOpenTimeLeft } from "../data/Constant";
import { animate } from "popmotion"
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { shortenAddr, connector } from "util/index";

const PhoneMine = forwardRef<any, any>((props, ref) => {
  const {isConnected,address} = useAccount()
  const {disconnectAsync} = useDisconnect()
  const {connectAsync} = useConnect()
  
  useImperativeHandle(ref, () => ({
    show: () => {},
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

  const moneyIconRef = useRef(null as any);
  const [showDetail, setShowDetail] = useState(false);

  const [curBalance,setBalance] = useState(0.00)

  useEffect(() => {
    if (props?.mineInfo != null && !props?.mineInfo.animated) {
      const toBalance = props?.mineInfo.balance;
      moneyIconRef.current.style.animation = 'rotateYAnimation 800ms linear';
      let numDuration = (((toBalance.minus(curBalance)).toNumber()) * 100 / 5) * (1000 / 60) * 1.0;
      if (numDuration < 800) {
          numDuration = 800;
      }
      numDuration = 1200;
      animate({
          from: curBalance,
          to: toBalance.toNumber(),
          duration: numDuration,
          onUpdate: (progress: number) => {
            setBalance(progress)
          },
          onComplete: () => {
            const newMineInfo = Object.assign({}, props?.mineInfo)
            newMineInfo.animated = true;
            moneyIconRef.current.style.animation = 'none';
          }
      });
  }
}, [props?.mineInfo]);

  const switchDetail = () => {
    if (isConnected) {
      setShowDetail(!showDetail)
    }else{
      connectAsync({connector})
    }
  };

  function getShowBalance(){
    return curBalance.toFixed(2);
  }


  function getNConnectUI() {
    return (
      <div style={{ cursor: "pointer" }} className="phone_MyUWT">
        <img className="phone_no_connect_wallet" src={wallet_black} />
        {isConnected? shortenAddr(address):"CONNECT"}
      </div>
    );
  }

  function getWalletUI() {
    return (
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          position: "relative",
          height:"34px" ,
        }}
      >
        <div style={{ height: 46, display: "flex" }} onClick={switchDetail}>
         <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 238, 138, 0.15)",
              border: "1px solid rgba(255, 238, 138, 0.35)",
              height: "34px",
              paddingLeft:10,
              paddingRight:10,
              width:63
            }}
          >

            <style>{keyframesStyle}</style>
            <img ref = {moneyIconRef} src={uwt} style={{ width: 14, height: 14, marginRight:8 }} />
            <span className="phone_info_balance">{getShowBalance()}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFE458",
              height: "36px",
              width: 50,
            }}
          >
            <img
              src={wallet_black}
              style={{ width: 14, height: 14, marginRight: 5 }}
            />
            <img
              src={black_arrowdown}
              style={{ width: 11, height: 6 }}
            />
          </div>
        </div>
      </div>
    );
  }

  function getRecoderUI(){
    if(!showDetail|| !isConnected){
        return <></>
    }
    return(
        <div
            style={{
              padding: "25px 30px 30px 25px",
              position:"fixed",
              top: 69,
              left: 0,
              display: "flex",
              flexDirection: "column",
              width: "calc(100% - 87px)",
              borderLeft: "1px solid rgba(255, 228, 88, 0.3)",
              borderRight: "1px solid rgba(255, 228, 88, 0.3)",
              borderBottom: "1px solid rgba(255, 228, 88, 0.3)",
              borderTop: "5px solid #FFE458",
              background: "#060606",
              marginLeft:15,
              zIndex:1
            }}
          >

          <div
                onClick={()=>{setShowDetail(false)}}
                  style={{
                    position:"fixed",
                    top: 0,
                    left: 0,
                    width:"100%",
                    height:"100%",
                  }}/>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="phone_pop_title">UWT Balance</span>
              <img
                src={link_grey}
                style={{ width: 15, height: 15, marginLeft: 7 }}
              />
              <img src={wallet_gray} style = {{width:12,height:12,marginLeft:"auto"}}></img>
              <span className="phone_address">{address && shortenAddr(address)}</span>
            </div>

            <div
              style={{
                marginTop: 15,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={uwt}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <span className="phone_pop_balance">{getShowBalance()}</span>
            </div>
            <div
              style={{
                marginTop: 20,
                marginBottom: 5,
                width: "100%",
                height: 1,
                backgroundColor: "#363636",
              }}
            />
            {props?.mineInfo?.record.map((money, index) => (
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
              >
                <img
                  src={right}
                  style={{ marginRight: 10, width: 13, height: 13 }}
                />
                <span className="phone_pop_claim" style={{ marginRight: 10 }}>
                  CLAIM
                </span>
                <span
                  className="phone_pop_claim_value"
                  style={{ marginRight: "auto" }}
                >
                  {money.toString()} UWT
                </span>
                <img src={link_grey} style={{ width: 13, height: 13 }} />
              </div>
            ))}

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
                width: "100%",
                height: 48,
                backgroundColor: "rgba(210, 202, 159, 0.17)",
              }}
            >
              <span className="phone_pop_redeem">Redeem</span>

              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  right: 10,
                  top: 9,
                  height: 25,
                  backgroundColor: " #F5ECB8",
                  opacity: 0.6,
                  borderRadius: 5,
                  paddingLeft:6,
                  paddingRight:6
                }}
              >
              
                <CountDown
                  cName="phone_pop_timer"
                  duration={redeemOpenTimeLeft() / 1000}
                />
              </div>
            </div>

            <div
              onClick={async() => {
                await disconnectAsync()
                // setShowDetail(false);
                // props.onDisconnect();
                // event.stopPropagation();
              }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
                width: "100%",
                height: 48,
                backgroundColor: "#1D1D1D",
              }}
            >
              <span className="phone_pop_dis" style={{marginLeft:10}}>Disconnect</span>
              <img
                src={quit}
                style={{ width: 14, height: 14, marginLeft: 6 }}
              />
            </div>
          </div>
    )
  }
  return <div>
    {getWalletUI()}
    {getRecoderUI()}
    </div>;
});

export default PhoneMine;
