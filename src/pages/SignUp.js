import { useState,useEffect } from "react";

import InputComponents from "../components/ui/InputComponents";

import countryList from "country-list";
import { useAddress,useConnectionStatus,ConnectWallet } from "@thirdweb-dev/react";

import "../styles/SignUp.scss";
import axios from "axios";
import { apiURL } from "../data/EnvData";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SignUpCompltModal from "../components/modal/SignUpCompltModal";

const SignUp = ({isLogined}) => {

    //----------
    //url이동
    //----------
    const navigate = useNavigate();


    //----------
    //입력 관련 STATE
    //----------
    const [email,setEmail] = useState("");
    const [country,setCountry] = useState({code : "", name: "Choose Your Country"});
    const [birth,setBirth] = useState("");    
    const [userName,setUserName] = useState("");
   
    //----------
    //체킹 관련 STATE
    //----------
    const [birthCheck,setBirthCheck] =  useState("");
    const [emailCheck,setEmailCheck] = useState("");
    const [userNameCheck,setUserNameCheck] = useState("")
    const [termsOfService,setTermsOfService] = useState(false);
    const [privacyPolicy,setPrivacyPolicy] = useState(false);
    const [refundPolicy,setRefundPolicy] = useState(false);
    const [allCheck,setAllcheck] = useState(false);

    //----------
    //에라 메시지
    //----------
    const [userNameErrMessage, setUserNameErrMessage] = useState("");


    //----------
    //지갑 주소 관련
    //----------
    const connectedStatus = useConnectionStatus();
    const walletAddress = useAddress();

    //----------
    //모달 
    //----------

    const [signUpCompltModal,setSignUpCompltModal]= useState(false);

    //%%%%%%%%%
    //콘솔
    //%%%%%%%%%
    console.log("================================")
    console.log("이메일 email===>",email);
    console.log("국가 country===>",country);
    console.log("생일 birth===>",birth);
    console.log("유저 이름 userName===>",userName);
    console.log("생일 유효성 검사 birthCheck===>",birthCheck);
    console.log("이메일 유효성 검사 emailCheck===>",emailCheck);
    console.log("유저 이름 유효성 검사 userName===>",userNameCheck);
    console.log("체크박스 검사 ===>",termsOfService,privacyPolicy,refundPolicy);
    console.log("모든 유효성 통과 여부 allCheck===>",allCheck);
    console.log("================================")


    //=======================
    //로그인 한 상태로 들어오면 킥
    //=======================
    useEffect(()=>{ 
        if(isLogined === true)
            navigate("/")
    },[isLogined])



    //=======================
    //전체 유효성 검사 
    //=======================

    useEffect(()=>{
        if(birthCheck && 
            userNameCheck && 
            termsOfService === true && 
            privacyPolicy === true && 
            refundPolicy === true && 
            (emailCheck === "" || emailCheck === true) 
            && country.code !== ""){
             setAllcheck(true);
        }
        else {
            setAllcheck(false);
        }
        },[birthCheck,userNameCheck,termsOfService,privacyPolicy,refundPolicy])

    
    useEffect(()=>{
        if(connectedStatus !== "connected")
            navigate("/");
    },[connectedStatus])


    //=======================
    //전체 동의 함수 
    //=======================

    const allAgree = () => {
        if(termsOfService && privacyPolicy && refundPolicy){
            setTermsOfService(false);
            setPrivacyPolicy(false);
            setRefundPolicy(false);
        }else {
            setTermsOfService(true);
            setPrivacyPolicy(true);
            setRefundPolicy(true);
        }
    }

    //=======================
    //email 유효성 
    //=======================

    const handleEmail =(e)=>{
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if(value === "")
            setEmailCheck(true);
        else if (emailRegex.test(value))
            setEmailCheck(true);
        else 
            setEmailCheck(false);
    }

    //=======================
    //username 유효성 
    //=======================

    const handleUserName = (e) => {
        const userNameRegex = /^[^\s]{1,10}$/;
        const value = e.target.value;
        setUserName(value);
        if(value === ""){
            setUserNameCheck("");
        }
        else if(userNameRegex.test(value)){
            setUserNameCheck(true);
        }else{
            setUserNameErrMessage("Usernames must be concise, with a maximum length of 10 characters and no spaces allowed.")
            setUserNameCheck(false);
        }
    }


    //=======================
    //birth유효성
    //=======================

   useEffect(()=>{
        const birthTime = new Date(birth).getFullYear();
        const now = new Date().getFullYear();
        if(now - birthTime < 18){
            setBirthCheck(false);
        }
        else {
            setBirthCheck(true);
        }
   },[birth])


   //========================
   //회원가입
   //========================
  
   const handleSignUp = async () => {

        const data = {
                name : userName,
                country : country.code.toLocaleLowerCase(),
                birth : birth,
                email : email,
        }

        try {
            const res = await axios.post(`${apiURL}/api/user/`,data,
            {
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            }
            )
            setSignUpCompltModal(true);
        }
        catch(e){
            console.log(e,"회원가입 실패");
        }
   }



    const allCountry = countryList.getData()

    return <div className="sign-up">
        <div className="fs20 color-white mb12 text-center">COMPLETE SIGN UP</div>
        <div className="fs14 color-gray mb12 text-center">
            If you do not provide your date of birth, participation in
            <br/>
            the tournament will be restricted.
        </div>
        <div className="fs14 color-gray mb16 text-center">
            Date of birth is required to participate in the
            <br/>
            tournament.
        </div>
        <div className="sign-up__enter--box">
            <div className="fs14 color-gray mb8">Email (optional)</div>
            <div className="mb16">
                <InputComponents type={"input"} Value={email} valid={emailCheck} Function={handleEmail}/>
                {emailCheck === false && <div className="color-red fs12 mt4">Please enter a valid email address.</div>}
            </div>
            <div className="fs14 color-gray mb8">Select Country</div>
            <div className="mb16">
                <InputComponents type={"dropdownScroll"} dropdownMenu={allCountry} Function={setCountry} Value={country.name} dropObjectOption={"country"}/>
            </div>
            <div className="fs14 color-gray mb8">Date of Birth</div>
            <div className="mb16">
                <InputComponents type={"date-no-time"} Value={birth} valid={birthCheck} Function={setBirth}/>
                {birthCheck === false && <div className="color-red fs12 mt4">Only those 18 years of age or older can join</div> }
            </div>
            <div className="fs14 color-gray mb8">User name (within 10 characters)</div>
            <div className="mb16">
                <InputComponents type={"input"} Value={userName} Function={(e)=>{handleUserName(e)}} valid={userNameCheck}/>
                {userNameCheck === false && <div className="color-red fs12 mt4">{userNameErrMessage}</div> }
            </div>
            <div className="mb16">
                <ConnectWallet className="btn-wallet"/>
            </div>
            {connectedStatus === "connected" && <div className="color-gray fs14 wallet-area mb24">{walletAddress}</div>}
            <div className="sign-up__checkbox mb12">
                <div className="flex-checkbox">
                    <input type="checkbox" id="all-agree" checked={termsOfService && privacyPolicy && refundPolicy} onChange={allAgree}/>
                    <label htmlFor="all-agree" className="color-white fs12">All agree</label>
                </div>
            </div>
            <div className="section-line mb12"></div>
            <div className="sign-up__checkbox mb12">
                <div className="flex-checkbox">
                    <input type="checkbox" id="terms-of-service" checked={termsOfService} onChange={()=>setTermsOfService((prev)=>!prev)}/>
                    <label htmlFor="terms-of-service" className="color-white fs12">Terms of Service {" "}
                    <span className="color-gray fs12">(essential)</span>
                    </label>
                </div>
            </div>
            <div className="sign-up__checkbox mb12">
                <div className="flex-checkbox">
                    <input type="checkbox" id="privacy-policy" checked={privacyPolicy} onChange={()=>setPrivacyPolicy((prev)=>!prev)}/>
                    <label htmlFor="privacy-policy" className="color-white fs12">Privacy Policy {" "}
                    <span className="color-gray fs12">(essential)</span>
                    </label>
                </div>
            </div>
            <div className="sign-up__checkbox mb24">
                <div className="flex-checkbox">
                    <input type="checkbox" id="refund-policy" checked={refundPolicy} onChange={()=>setRefundPolicy((prev)=>!prev)}/>
                    <label htmlFor="refund-policy" className="color-white fs12">Refund Policy {" "}
                    <span className="color-gray fs12">(essential)</span>
                    </label>
                </div>
            </div>
            <button className={`sign-up__btn ${!allCheck && "disabled-btn"}`} disabled={!allCheck} onClick={allCheck === false ? null : ()=>{handleSignUp()}}>
                Sign Up
            </button>
        </div>
       {signUpCompltModal && <SignUpCompltModal/>}
    </div>
}

export default SignUp;