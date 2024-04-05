import { useEffect } from "react";

import "./SignUpCompltModal.scss";
import close from "../../assets/images/close.svg";
import signUpCompltImg from "../../assets/images/signUpComplt.svg";
import { useNavigate } from "react-router-dom";


const SignUpCompltModal =({setSignUpCompltModal})=>{

    const navigate = useNavigate();

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=> {document.body.style.overflow = ""}
    },[])

    const handleClose = () => {
        navigate("/");
    }

    const clickBackground = (e) => {
        if( e.target === e.currentTarget)
            handleClose();
    }



    return <div className="sign-up-complt-modal" onClick={clickBackground}>
        <div className="complt-modal__box">
            <div className="complt-modal__box--close" onClick={handleClose}>
                <img src={close} alt="close"/>
            </div>
            <img src={signUpCompltImg} className="complt-modal__box--image" />
            <div className="complt-modal__box--text1">Congratulations!</div>
            <div className="complt-modal__box--text2">your account has been successfully registered</div>
            <button className="complt-modal__box--btn" onClick={handleClose}>OK</button>

        </div>
    </div>
}

export default SignUpCompltModal;