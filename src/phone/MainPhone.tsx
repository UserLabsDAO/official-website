/* eslint-disable react/jsx-pascal-case */
import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TopBar from "./TopBar";
import { udtoast } from "../util/index";
import './ManifestoContent.css';
import Menu from "./Menu";
import PhoneCha1 from "./PnoneCha1";
import PhoneCha2 from "./PnoneCha2";
import PhoneCha4 from "./PnoneCha4";
import ClaimPopupPhone from "../widget/ClaimPopupPhone";
import { MineInfo } from "../data/Data";
import PhoneCha3 from "./PnoneCha3";
import BigNumber from "bignumber.js";
import { CLAIM_MONEYS } from "../data/Constant";
import PhoneEgg from "./PhoneEgg";
import { udScrollTo, udScrollTop } from "./ScrollUtil";
import { useConnect, useDisconnect } from "wagmi";

const MainPhone = forwardRef((props, ref) => {
  const {connectAsync} = useConnect()
  const {disconnectAsync} = useDisconnect()
  const toobarRef = useRef<HTMLDivElement>(null as any);
  const contentRef = useRef<HTMLDivElement>(null as any);
  const rootRef = useRef<HTMLDivElement>(null as any);
  const menuRef = useRef(null as any);
  const claimPopupRef = useRef(null as any);
  const [clickingClaimButton, setClickingClaimButton] = useState(0);

  const cha1Ref = useRef(null as any);
  const cha2Ref = useRef(null as any);
  const cha3Ref = useRef(null as any);
  const cha4Ref = useRef(null as any);
  const appendixRef = useRef(null as any);
  let pager = [1, 2, 101, 102, 103, 104, 105, 4, 5]
  const [currentPage, setCurrentPage] = useState(pager[0])

  const [mineInfo, setMineInfo] = useState<MineInfo>(null as any)
  const claimableChas = [cha1Ref, cha1Ref, cha2Ref, cha3Ref, cha4Ref, appendixRef];

  useImperativeHandle(ref, () => ({
    show: () => {
      rootRef.current.style.visibility = "visible";
      toobarRef.current.style.opacity = "1";
      toobarRef.current.addEventListener("transitionend", (event) => {
        let style = contentRef.current.style;

        style.opacity = "1";
        style.scale = "1";
      });
    },
  }));

  const showAni = {
    transition: "opacity 400ms linear 0s",
    opacity: 0,
  };

  const showStep2AAni = {
    transition: "opacity 600ms cubic-bezier(0.22, 0.49, 0.17, 0.97) 0s",
    opacity: 0,
  };

  const showStep2BAni = {
    transitionProperty: "opacity,scale",
    transitionDuration: "600ms",
    transitionTimingFunction: "cubic-bezier(0.22, 0.49, 0.17, 0.97)",
    scale: "0.9",
    transformOrigin: "center top",
    opacity: 0,
  };

  const later = (event) => {
    // udtoast("coming soon ...");
    claimPopupRef.current.show();
    event.stopPropagation();
  };


  const onEggShow = () => {
    if (menuRef.current) {
      menuRef.current.showEgg();
    }
  }

  function openMenu() {
    menuRef.current.show()
    let offset = udScrollTop();
    console.log(offset)
    let p = pager[0];
    for (let i = 0; i < pager.length; i++) {
      if (offset >= getOffset(pager[i]) - 100) {
        p = pager[i]
      } else {
        break;
      }
    }
    setCurrentPage(p)
  }



  function getOffset(p) {
    const dd = appendixRef.current.menuTops();
    const offsets = [...cha1Ref.current.menuTops(), ...cha2Ref.current.menuTops(), ...cha3Ref.current.menuTops(), ...cha4Ref.current.menuTops(), appendixRef.current.menuTops()]
    let offset = 10000000;
    if (p == 3) {
      p = 101;
    }
    for (let i = 0; i < pager.length; i++) {
      if (p == pager[i]) {
        offset = offsets[i];
        break;
      }
    }
    return offset
  }

  function onMenuClick(index) {
    udScrollTo({ left: 0, top: getOffset(index), behavior: 'smooth' });
    setCurrentPage(index)
  }

  const claim = (position) => {
    setClickingClaimButton(position);
    if (mineInfo == null) {
      claimPopupRef.current.show();
    } else {
      const money = CLAIM_MONEYS[position];
      claimableChas[position].current.showClaimAni(position, money);
    }
  }

  const claimFinish = () => {
    claimPopupRef.current.close();
    const newMineInfo = {
      balance: new BigNumber(0),
      address: '0x24....2919',
      record: [],
      animated: true
    }
    setMineInfo(newMineInfo);
    claimableChas[clickingClaimButton].current.showClaimAni(clickingClaimButton, CLAIM_MONEYS[clickingClaimButton], true);
  }

  const onAniDone = (position) => {
    let newMineInfo;

    if (mineInfo === null || mineInfo?.record?.length == 0) {
      newMineInfo = {
        balance: new BigNumber(CLAIM_MONEYS[position]),
        address: '0x24....2919',
        record: [new BigNumber(CLAIM_MONEYS[position])],
        animated: false
      }

    } else {
      newMineInfo = Object.assign({}, mineInfo)
      const money = CLAIM_MONEYS[position]
      newMineInfo.balance = newMineInfo.balance.plus(new BigNumber(money));
      newMineInfo.record = [...newMineInfo.record, new BigNumber(money)];

    }
    setMineInfo(newMineInfo);

  }

  useEffect(() => {
    if (mineInfo != null) {
      // mineRef.current.show(mineInfo);
    }
  }, [mineInfo]);

  return (
    <div
      ref={rootRef}
      style={{
        visibility: "hidden",
        overflow: "hidden", backgroundColor: "black"
      }}
    >

      <div
        ref={contentRef}
        style={{
          ...showStep2BAni,
          marginTop: 50,
          overflow: "hidden",
          scrollBehavior: "smooth"
        }}
      >
        <PhoneCha1 ref={cha1Ref} claim={claim} onAniDone={onAniDone} />
        <PhoneCha2 ref={cha2Ref} claim={claim} onAniDone={onAniDone} />
        <PhoneCha3 ref={cha3Ref} claim={claim} onAniDone={onAniDone} />
        <PhoneCha4 ref={cha4Ref} claim={claim} onAniDone={onAniDone} />

        <PhoneEgg ref={appendixRef} claim={claim} onAniDone={onAniDone} onEggShow={onEggShow} />
      </div>

      <div ref={toobarRef} style={{ ...showAni, position: "fixed", left: 0, top: 0, display: "flex", width: "100%", pointerEvents: "none" }}>

        <TopBar onMenuClick={openMenu} mineInfo={mineInfo} onDisconnect={async() => { await disconnectAsync() }} />

      </div>
      <Menu index={currentPage} ref={menuRef} onMenuClick={onMenuClick} />

      <ClaimPopupPhone ref={claimPopupRef} onClaim={() => {
        claimFinish();
      }} />

    </div>
  );
});

export default MainPhone;
