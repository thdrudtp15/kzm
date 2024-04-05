import { useEffect } from "react";

import { ConnectWallet,useAddress } from "@thirdweb-dev/react";

import Button from "../ui/Button.js";

import "./ConnectWalletModal.scss";
import closeIcon from "../../assets/images/close.svg";

const ConnectWalletModal = ({setConnectWalletModal,setKozCompactNFTModal}) =>{

    const address = useAddress();


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
    const handleClose = () =>{
        setConnectWalletModal((prev) => !prev);
    }
    const bgClose =(e)=>{
        if(e.target === e.currentTarget)
        handleClose();
    }


    //=======================
    //web3 커넥트 시 실행 되는 useEffect
    //=======================
    useEffect(()=>{
        if(address){
            setConnectWalletModal(false);
            setKozCompactNFTModal(true);    
        }
    },[address])



    return <div className="connect-wallet-modal" onClick={(e)=>bgClose(e)}>
        <div className="connect-wallet__box">
            <div className="connect-wallet__close mb16" onClick={()=>{handleClose()}}>
                <img src={closeIcon} alt="close"/>
            </div>
            <div className="explanation--title mb16">
                Connect Wallet
                </div>
            <div className="explanation--content mb16">
                    Click the Connect Wallet button to<br/>
                    connect to the wallet installed in your browser
            </div>
            <Button color={"blue"} 
                    width={"131px"} 
                    borderRadius={"24px"} 
                    // text={"Connect Wallet"}
                    text={<ConnectWallet className="btn-connect"/>}
                    fontSize={"14px"}
                    fontWeight="400"
                    height={"36px"}
                    padding={"11px 11px"}
                    custom1={{width : "fit-content",height : "fit-content",margin : "0 auto"}}
                    />
        </div>
    </div> 
}
export default ConnectWalletModal;