import { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie"

import { apiURL } from "../../data/EnvData";


import "./PictureUploadModal.scss";
import closeIcon from "../../assets/images/close.svg";
import loadingImg from "../../assets/images/Loading/Kozmo-loading.svg";

const PictureUploadModal = ({setPictureUploadModal,getUserDataUsername}) => {

    const [imageFile, setImageFile] = useState("");
    const [commsStatus,setCommsStatus] = useState("before");
    const [errorMessage, setErrorMessage] = useState("");
    //****통신 상태값****
    // before : API 통신 이전
    // error : API 오류 시
    // complt : API 요청 성공 시
    // loading : API 요청 로딩 시

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=> {document.body.style.overflow = ""}
    },[])

    //========================
    //이미지 업로드
    //========================

    const handleImage = (e) => {
        setImageFile(e.target.files[0]);
    }

    //========================
    //모달 조작 함수
    //========================

    const clickBackground =(e) => {
        if(e.target === e.currentTarget)
            handleClose();
    }

    const handleClose = () =>{
        setPictureUploadModal(false);
    }

    //========================
    //에러 발생 시 재시도 함수
    //========================

    const handleRetry = () => {
        setImageFile("");
        setCommsStatus("before");
        setErrorMessage("");
    }



    //========================
    //이미지 업로드 시 API 요청
    //========================

    useEffect(()=>{
        if(imageFile !== ""){
            if(imageFile.size > 3 * 1024 * 1024){
                setCommsStatus("error");
                setErrorMessage("The image file size is too large");
                return;
            }else {
                handleChangeImage();
            }
        }
    },[imageFile])


    //========================
    //이미지 업로드 함수
    //========================


    const handleChangeImage = async () => {
        setCommsStatus("loading")
        const formData = new FormData();
        formData.append("file",imageFile)
        try { 
            const res = await axios.post(`${apiURL}/api/user/picture/change`,formData,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
                setCommsStatus("complt")
                getUserDataUsername();
        }
        catch(e){
            console.log(e);
            setCommsStatus("error");
            setErrorMessage("Network Error");
        }
    }


    return <div className="picture-upload-modal" onClick={clickBackground}>
        <div className="upload-box">
            <div className="upload-box__close" onClick={handleClose}>
                <img src={closeIcon} alt="close"/>
            </div>
            <div className="upload-box__title-text">UPLOAD YOUR PICTURE</div>
            <div className="upload-box__restrictions-text">
              { commsStatus === "before" &&  
               <>
                    The Avatar dimensions are 120px X 120px 
                    <br/>
                    Max file size : 3MB
               </>
            }
            {commsStatus === "error" && errorMessage}
            {commsStatus === "complt" && "Your profile image has been successfully changed"}
            {commsStatus === "loading" && "Please wait for a moment"}
            </div>
            <input type="file" accept="image/*" id="upload-image" style={{display : "none"}} onChange={(e)=>{handleImage(e)}}/>

            
            {commsStatus === "before" && 
                <label className="upload-box__button" htmlFor="upload-image">
                    Upload Image
                </label>
            }
            {commsStatus === "error" && 
                <button className="upload-box__button" onClick={handleRetry}>
                    Retry
                </button>
            }
            {commsStatus === "complt" && 
                <button className="upload-box__button" onClick={handleClose}>
                    Close
                </button>
            }
        </div>
    </div>
}

export default PictureUploadModal;