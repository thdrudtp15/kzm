import { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import { apiURL } from "../../data/EnvData";
import InputComponents from "../ui/InputComponents";

import "./AddGameIdModal.scss";
import close from "../../assets/images/close.svg";
import successImg from "../../assets/images/success.svg";



const AddGameIdModal = ({gameName,gameId,getGameIDsData,setAddGameIdModal}) =>{

    //-----
    //입력 STATE
    //-----
    const [nickname,setNickname] = useState("");
    const [username,setUsername] = useState("");
    
    //-----
    //유효성 STATE
    //-----
    const [check,setCheck] = useState(true);

    const [usernameMessage,setUsernameMessage] = useState("");

    //-----
    //모달 내용 STATE
    //-----
    const [content,setContent] = useState("enterID")

    //=======================
    //입력 함수
    //=======================
    const handleNickname = (e) => {
        setNickname(e.target.value);
    }

    const handleGameIds = (e) => {
        setUsername(e.target.value)
    }


    //=======================
    //커넥트 요청
    //=======================
    const requestConnect = async () => {

        const data = {
            username  : username,
            nickname : nickname,
            game_id : gameId,
        }

        try {
            const res = await axios.post(`${apiURL}/api/user/game/id`,data,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            setContent("success");
            getGameIDsData();
            console.log(res);

        }catch(e){
            const errMessage = e.response.data.detail;
            if(errMessage === "No Game UserName"){
                //아이디 없을 때
                setCheck(false);
                setUsernameMessage("This is not a valid game ID");
            }
            else if (errMessage === "Game UserName already exist"){
                //중복
                setCheck(false);
                setUsernameMessage("Game uesrname already exist");
            }
            console.log(e);
        }
    }

    //=======================
    //모달 조작
    //=======================
    const clickBackground =(e) => {
        if(e.target === e.currentTarget)
            handleClose();
    }

    const handleClose = () => {
        setAddGameIdModal(false);
    }


    //=======================
    //overflow useEffect
    //=======================
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=> {
        document.body.style.overflow = "";
        }
    },[])

    return <div className="add-game-id-modal" onClick={clickBackground}>
        <div className="add-modal__content-box">
            <div className="add-modal-box__close" onClick={handleClose}>
                <img src={close} alt="close"/>
            </div>
            
            {content === "enterID" ? 
                <>
                        <div className="add-modal-box__header">
                            <div className="white fs16 fw500 mb12">{gameName}</div>
                            <div className="gray fs14 fw400">Connect your account</div>
                        </div>
                        {/*================================== */}
                        <div className="add-modal-box__explanation mb16">
                            <div className="white fs14 fw500 mb12">Only one account can be registered per id</div>
                            <ul className="explanation-list">
                                <li className="gray fs14 fw400 mb12">Connected to {gameName}</li>
                                <li className="gray fs14 fw400 mb12">Check the ID at the top left of the main screen</li>
                                <li className="gray fs14 fw400">Enter the ID below</li>
                            </ul>
                        </div>
                        {/*================================== */}
                        <div className="add-modal-box__input mb24">
                        <div className="mb16">
                                <div className="gray fs14 fw500 mb8">Nickname</div>
                                <InputComponents type="input" valid={check} placeholder="Enter the Game Nickname" Value={nickname} Function={(e)=>{handleNickname(e)}}/>
                        </div>
                        <div>
                        <div className="gray fs14 fw500 mb8">Nickname</div>
                                <InputComponents type="input" valid={check} placeholder="Enter the Game ID" Value={username} Function={(e)=>{handleGameIds(e)}}/>
                                {check=== false && <span className="reds fs12 mt8">{usernameMessage}</span>}
                        </div>
                        </div>
                        {/*================================== */}
                        <button className="add-modal-box__button" onClick={()=>{requestConnect()}}>Connect</button>
                </> :  
                <div className="add-modal-succ">
                    <div className="succ__image mb16">
                        <img src={successImg} alt="success"/>
                    </div>
                    <div className="white fs16 fw600 mb16">GAME CONNECTED!</div>
                    <div className="gray fs14 fw400 mb24">{gameName}</div>
                    <button className="add-modal-box__button" onClick={handleClose}>OK</button>
                </div>
                }
        </div>
    </div>
}

export default AddGameIdModal;