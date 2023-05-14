/* eslint-disable jsx-a11y/alt-text */
import React, { forwardRef, Ref } from "react";
import { MineInfo } from "../data/Data";
import logo from '../resources/phone_mini_logo.png';
import menuIcon from "../resources/phone_top_bar_menu.png";
import PhoneLang from "./PhoneLang";
import PhoneMine from "./PhoneMine";
//连接钱包按钮
//cliam弹窗样式
//弹窗点击消失
//动画

const TopBar = forwardRef(
  (
    { onMenuClick, mineInfo,onDisconnect }: { onMenuClick: Function; mineInfo?: MineInfo; onDisconnect:Function },
    ref
  ) => {
    console.log(mineInfo)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          paddingTop: 10,
          backgroundImage: "linear-gradient(#060606, rgba(0,0,0,0))",
          paddingBottom:90
        }}
      >
        
        <img
          src={menuIcon}
          style={{ width: 40, height: 40, marginLeft: 0 ,pointerEvents:"auto"}}
          onClick={() => {
            onMenuClick();
          }}
        />
        <img src={logo} style={{ width: 121, height: 42,marginLeft:-4}} />
        <div style={{ width: 32, height: 32, marginLeft: "auto",pointerEvents:"auto" }}>
          <PhoneLang />
        </div>
        <div style={{ height: 32, marginRight: 20,pointerEvents:"auto",marginLeft:10 }}>
          <PhoneMine mineInfo={mineInfo} onDisconnect = {()=>{onDisconnect()}} />
        </div>
      </div>
    );
  }
);

export default TopBar;
