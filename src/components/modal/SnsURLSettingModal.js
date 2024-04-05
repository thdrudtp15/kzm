import { useState,useEffect } from "react";

//import axios from "axios";

import InputComponents from "../ui/InputComponents.js"

import "./SnsURLSettingModal.scss";
import closeIcon from "../../assets/images/close.svg";
import axios from "axios";
import { apiURL } from "../../data/EnvData.js";
import Cookies from "js-cookie";


const SnsURLSettingModal = ({setSnsUrlSettingModal,socialName,socialImg,getSocialData,socialType,prevAddress = ""}) =>{ 

    const [snsAddress, setSnsAddress] = useState("");
    const [valid, setValid] = useState("");

    const [Regex , setRegex] = useState("");

    //========================
    //URL주소 요청 함수
    //========================
    const onSubmit = async () => {
        const data = {
            sort : socialName,
            address : snsAddress,
            social_account : "",
            sns_email : ""
        }
        try{
            const res = await axios.post(`${apiURL}/api/user/sns`,data,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            console.log(res);
            getSocialData();
            setSnsUrlSettingModal(false);
        }
        catch(e){
            console.log(e);
        }
    }


    //========================
    //모달 조작 함수
    //========================

    const clickBackground =(e) => {
        if(e.target === e.currentTarget)
            handleClose();
    }

    const handleClose = () =>{
        setSnsUrlSettingModal(false);
    }

    //========================
    //SNS URL입력 함수
    //========================
    const handleSnsAddress = (e) => {
        let value = e.target.value;
        setSnsAddress(value);
    }


    //========================
    //SNS URL 유효성 검사
    //========================
    useEffect(()=>{
        if(snsAddress === "")
            setValid("")
        else if(Regex.test(snsAddress))
            setValid(true);
        else 
            setValid(false);
    },[snsAddress])

    //========================
    //스크롤 기능 비활성화 useEffect
    //========================

    useEffect(()=>{
        document.body.style.overflow = "hidden";

        switch(socialName) {
            case "Discord" :
               setRegex(/^https:\/\/discord\.com\/channels\//);
                break;
            case "Twitch" :
               setRegex(/^https:\/\/www\.twitch\.tv\//i);
                break;
            case "Twitter" :
               setRegex(/^https:\/\/twitter\.com\//);
                break;
            case "Telegram" :
               setRegex(/^https:\/\/t\.me\//);
                break;
            case "YouTube" :
               setRegex(/^https:\/\/www\.youtube\.com\//);
                break;
        }
        setSnsAddress(prevAddress);
        return () => { document.body.style.overflow = ""}
    },[])



    return <div className="adddiscord-modal" onClick={(e)=>{clickBackground(e)}}>
        <div className="adddiscord-modal__box">
            <div className="adddiscord-box__close" onClick={()=>{handleClose()}}>
                <img src={closeIcon} alt="close"  draggable={false}/>
            </div>
            <div className="adddiscord-box__header">
                <img src={socialImg} draggable={false} alt="social"/>
                <div className="header__text">{socialName}</div>
            </div>
            <div className="discription__text">
                {socialType} {socialName} URL
            </div>
            <div className="URL-input__box">
                <div className="input__name">{socialName} URL</div>
                <InputComponents type={"input"} placeholder={"Enter your Discord URL"} Function={handleSnsAddress} Value={snsAddress}/>
                <div className="warning-text">{valid === false && "Please write the correct URL address"}</div>
            </div>
            <button className={`ok-button ${valid === false && "disabled-button"}`} onClick={()=>{onSubmit()}} disabled={!valid}>
                OK
            </button>
        </div>
    </div>
}
export default SnsURLSettingModal;