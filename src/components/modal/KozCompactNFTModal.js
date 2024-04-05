import { useState, useEffect } from "react";

import "./KozCompactNFTModal.scss";
import kozmoCoinImg from "../../assets/images/NetworkTicker/koz-token.svg"

const KozCompactNFTModal = ({setKozCompactNFTModal}) =>{

    //=======================
    //모달 실행 시 오버플로우 설정 useEffect
    //=======================
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=>{document.body.style.overflow = ""}
    },[])


    //=======================
    //모달 조작 함수
    //=======================
    const handleCLose = () => {
        setKozCompactNFTModal(false);
    }

    const bgClose =(e)=>{
        if(e.target === e.currentTarget)
            handleCLose();
    }



    const [infoData,setInfoData] = useState([
        {title : "Number of Issues" , value : (50000).toLocaleString()},
        {title : "Allocation Quantity" , value : (1000000000).toLocaleString()},
        {title : "Staking Reward" , value : (850000000).toLocaleString()},
        {title : "Accrual of DAO" , value : "15%"},
    ]);

    return <div className="koz-compact-nft-modal" onClick={(e)=>{bgClose(e)}}>
        <div className="koz-modal__box">
            <div className="koz-modal__title mb16">KOZ COMPACT NFT</div>
            {infoData?.map((item,index)=> 
            <div className={`koz-modal__information--box ${index === infoData.length - 1 ? "mb16" : "mb8"}`} key={index}>
                <div className="color-gray fs14 fw400">{item.title}</div>
                <div className="color-white fs14 fw400">{item.value}</div>
            </div>
            )}
            <div className="koz-modal__token--box mb8">
                <img src={kozmoCoinImg} alt="icon"/>
                <span className="token__text">KOZ</span>
            </div>
            <div className="koz-modal__input--box mb16">
                <input type="text" className="koz-modal__input"/>
                <span className="EA">EA</span>
            </div>
            <div className="color-gray fs14 fw400 mb8">Total Amount</div>
            <div className="color-yellow fs16 fw500 mb16">{0} KOZ</div>
            <div className="koz-modal__btn--box mb16">
                <button className="fs14 fw500 btn cancel" onClick={()=>{handleCLose()}}>CANCEL</button>
                <button className="fs14 fw500 btn ok">OK</button>
            </div>
            <div className="color-gray fs14 fw400 mb8">Your Balance</div>
            <div className="color-white fs16 fw500">{0} KOZ</div>

        </div>
    </div>
}
export default KozCompactNFTModal;