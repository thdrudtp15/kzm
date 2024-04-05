import { useEffect } from "react";

// import axios from "axios";

import "./RemoveModal.scss";
import closeIcon from "../../assets/images/close.svg";
import axios from "axios";
import { apiURL } from "../../data/EnvData";
import Cookies from "js-cookie";

const RemoveModal = ({setRemoveModal,socialID, getSocialData,deletedData = "social",getGameIDsData, gameId}) => {

    //========================
    //스크롤 기능 비활성화 useEffect
    //========================
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=> { document.body.style.overflow = ""}
    },[])


    //========================
    //삭제 요청
    //========================
    const onSubmitDelete = async () =>{

        //=-=-=-=-=-=-=-=-
        //소셜 삭제 요청
        //=-=-=-=-=-=-=-=-
        if(deletedData === "social")
        {
            try{
           const res = await axios.delete(`${apiURL}/api/user/sns/${socialID}`,
            {
                headers :{
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            }
           )
           console.log(res);
           getSocialData();
           setRemoveModal(false);
        }
        catch(e){
            console.log(e);
        }
        }
        //=-=-=-=-=-=-=-=-
        //게임 아이디 삭제 요청
        //=-=-=-=-=-=-=-=-
        else if(deletedData === "gameID") {
            try {
                const res = await axios.delete(`${apiURL}/api/user/game/id/${gameId}`,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
                )
                console.log(res);
                getGameIDsData();
                setRemoveModal(false);
            }catch(e){
                console.log(e);
            }
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
        setRemoveModal(false);
    }

    return <div className="remove-modal" onClick={(e)=>{clickBackground(e)}}>
        <div className="remove-box">
            <div className="remove-box__header" onClick={()=>{handleClose()}}>
                <img src={closeIcon} alt="close" draggable={false}/>
            </div>
            <span>Do you want to remove it?</span>
            <div className="btn__box">
                <div className="btn cancel" onClick={()=>{handleClose()}}>CANCEL</div>
                <div className="btn ok" onClick={()=>{onSubmitDelete()}}>OK</div>
            </div>
        </div>
    </div>
}

export default RemoveModal;