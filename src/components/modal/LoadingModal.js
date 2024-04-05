import { useEffect } from "react";

import "./LoadingModal.scss";



const LoadingModal = () => {

    useEffect(()=>{
        document.body.style.overflow = "hidden"
        return () => {document.body.style.overflow = ""}
    },[])

    return <div className="loading-modal">
        <div className="cube">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
}

export default LoadingModal;
