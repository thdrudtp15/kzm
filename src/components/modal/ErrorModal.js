import { useEffect } from "react";

import "./ErrorModal.scss";
import close from "../../assets/images/close.svg";


const ErrorModal = ({errorMessage = "Unknown Error!!", setErrorModal}) => {
    

    const clickBackground = (e)=>{
        if(e.target === e.currentTarget)
            handleClose();

    }
    const handleClose = () => {
        setErrorModal(false);
    }



    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=>{ document.body.style.overflow = "" }
    },[])
    
    
    
    return <div className="error-modal" onClick={clickBackground}>
        <div className="error-modal__box">
            <div className="error-modal__box--close" onClick={handleClose}>
                <img src={close} alt="close"  draggable={false}/>
            </div>
            <div className="error-modal__box--message">
                {errorMessage}
            </div>
            <button className="error-modal__box--btn" onClick={handleClose}>OK</button>
        </div>
    </div>
}

export default ErrorModal;