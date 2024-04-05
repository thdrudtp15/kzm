import { useEffect, useState } from "react";

import {
    useContract,
    useAddress,
    useContractRead,
    useContractWrite,
    Web3Button,
  } from "@thirdweb-dev/react";
import axios from "axios";

import "./JoinModal.scss";
import close from "../../assets/images/close.svg";
import { apiURL } from "../../data/EnvData";
import Cookies from "js-cookie";

const JoinModal = ({setJoinModal,itemId,getAttendanceStatus}) => {

    const walletAddress = useAddress();

    //******************* */
    //content로 모달의 내용을 표시함
    // join = 참가
    // error = 오류
    //******************* */
    const [content,setContent] = useState("join")
    const [errorMessage,setErrorMessage] = useState("에러 메시지")


    //=====================
    //none 스크롤을 위한 useEffect
    //=====================
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=>{document.body.style.overflow = ""}
    },[])

    const clickBackground = (e) => {
        if(e.target === e.currentTarget)
            handleClose();
    }

    const handleClose = () => {
        setJoinModal(false);
    }

    //=========================
    //조인 -- 테스트
    //=========================

    const handleJoin = async () =>{
        const data = {
            tournament_id : itemId,
            wallet_address : walletAddress
        }
        try { 
            const res = await axios.post(`${apiURL}/api/game/tournament/${itemId}/join`,data,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            console.log(res);
            setJoinModal(false);
            getAttendanceStatus();
        }
        catch(e){
            console.log(e.response.data.detail);
            setContent("error");
            setErrorMessage("Network Error!")
        }
    }



    return <div className="join-modal" onClick={clickBackground}>
        <div className="join-modal__box">
            <div className="join-modal__box--close" onClick={handleClose}>
                <img src={close} alt="close"/>
            </div>
            {content === "join" && <Join handleClose={handleClose} handleJoin={handleJoin}/>}
            {content === "error" && <JoinError handleClose={handleClose} errorMessage={errorMessage}/>}
        </div>
    </div>
}

export default JoinModal;


const Join = ({handleClose,handleJoin}) =>{
    return <div className="join-content">
        <div className="join-content__message">
            Once you press the participation button,
            <br/>
            cancellation is not possible.
            <br/>
            Are you sure you want to apply for
            <br/>
            participation?
        </div>
        <div className="join-content__btn--box">
            <button className="join-content__btn cancel" onClick={handleClose}>Cancel</button>
            <button className="join-content__btn ok" onClick={handleJoin}>OK</button>
        </div>
    </div>
}

const JoinError = ({handleClose,errorMessage}) => {
    return <div className="error-content">
        <div className="error-content__message">{errorMessage}</div>
        <button className="error-content__btn" onClick={handleClose}>OK</button>
    </div>
}