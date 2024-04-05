import { useEffect, useState } from "react";

//import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import InputComponents from "../components/ui/InputComponents";
import Button from "../components/ui/Button.js";
import { gameArr, gameIdArr, gameNameArr } from "../data/gameData";
import RemoveModal from "../components/modal/RemoveModal.js";
import SnsURLSettingModal from "../components/modal/SnsURLSettingModal.js";
import AddGameIdModal from "../components/modal/AddGameIdModal.js";

import "../styles/AccountSettings.scss";
import styles from "../styles/Common.module.scss";
import discordImg from "../assets/images/socialImg/Discord.svg";
import twitchImg from "../assets/images/socialImg/Twitch.svg";
import twitterImg from "../assets/images/socialImg/Twitter.svg";
import telegramImg from "../assets/images/socialImg/Telegram.svg";
import youtubeImg from "../assets/images/socialImg/Youtube.svg";
import arrowForwardIcon from "../assets/images/arrow-foward.svg";
import { apiURL } from "../data/EnvData.js";



const AccountSettings = ({isLogined}) =>{
    const navigate = useNavigate();
    const [tab,setTab] = useState(0);

    //=====================
    //토큰이 삭제 되었을 때
    //=====================
    useEffect(()=>{
     const token = Cookies.get("token");
        if(!token) {
            alert("Token has expired!");
            navigate("/");
        }
    },[tab])

    //=====================
    //로그인 여부에 따른 킥
    //=====================
    useEffect(()=>{
        if(isLogined === false)
            navigate("/");
    },[isLogined])


    
    return <div className="account-settings">
                <div className="accoubt-settings__inner">
                    <div className="tab__container">
                        <ul className="tab__box">
                            <li className={`tab__button ${tab === 0 && "tab__selected"}`} onClick={()=>{setTab(0)}}>Account</li>
                            <li className={`tab__button ${tab === 1 && "tab__selected"}`} onClick={()=>{setTab(1)}}>Purchases</li>
                            <li className={`tab__button ${tab === 2 && "tab__selected"}`} onClick={()=>{setTab(2)}}>Game IDs</li>
                            <li className={`tab__button ${tab === 3 && "tab__selected"}`} onClick={()=>{setTab(3)}}>Social Accounts</li>
                            <li className={`tab__button ${tab === 4 && "tab__selected"}`} onClick={()=>{setTab(4)}}>Social Link</li>
                        </ul>
                    </div>
                    {tab === 0 && <Account />}
                    {tab === 1 && <Purchase />}
                    {tab === 2 && <GameIDs />}
                    {tab === 3 && <SocialAccounts />}
                    {tab === 4 && <SocialLink />}
                </div>
           </div>
}

export default AccountSettings;



const Account = () => {

    // const walletAddress = useAddress();

    const [accountData , setAccountData] = useState({});

    //========================
    //Account 탭 데이터 GET useEffect
    //========================
    useEffect(()=>{
        getAccountData();
    
    },[])


    //========================
    //Account 탭 데이터 GET 함수
    //========================
    const getAccountData = async () => {
        try {
            const res = await axios.get(`${apiURL}/api/user`,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            setAccountData(res.data);
        }
        catch(e){
            console.log(e)
        }
    }


    return <div className="account__content">
                <div className="account__content--title">Date of Birth</div>
                <div className="account__content--data">{accountData?.birth}</div>
                <div className="account__content--title">UserName</div>
                <div className="account__content--data">{accountData?.name}</div>
                {accountData?.email !== "" &&   
               <>
                    <div className="account__content--title">Current Email</div>
                    <div className="account__content--data">{accountData?.email}</div>
               </>
                }
                <div className="account__content--title">County</div>
                <div className="account__content--data">{accountData?.country}</div>
                <div className="account__content--title">Wallet Address</div>
                <div className="account__content--data wallet">
                    <textarea className="address-text" readOnly value={useAddress()}>
                    </textarea>
                </div>
            </div>
}

const Purchase =()=>{
    return <div className="purchases__content">
                 No Purchase history
            </div>
}
const GameIDs =() =>{
   
    const [selectGame,setSelecteGame] = useState(gameNameArr[0]);
    const [gameIdsData,setGameIdsData] = useState();
    const [existData,setExistData] = useState("");

    const [addGameIdModal,setAddGameIdModal] = useState(false);

    const [removeGameIdModal,setRemoveGameIdModal] = useState(false);


    //========================
    //GameIDs Get useEffect
    //========================
    useEffect(()=>{
        getGameIDsData();
    },[selectGame])


    //========================
    //GameIDs Get 함수
    //========================
    const getGameIDsData = async () => {
        try{
            const res = await axios.get(`${apiURL}/api/user/game/id/${gameIdArr[selectGame]}`,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            setGameIdsData(res.data)
            setExistData(true)
        }
        catch(e){
            console.log(e);
            setGameIdsData({username : "-",nickname : "-"})
            setExistData(false);
        }
    }

    return <div className={`${styles.bluebox__border3px}`}>
        {addGameIdModal && <AddGameIdModal gameName={selectGame} 
                                           gameId={gameIdArr[selectGame]} 
                                           getGameIDsData={getGameIDsData}
                                           setAddGameIdModal={setAddGameIdModal}
                                           />}
        {removeGameIdModal && <RemoveModal setRemoveModal={setRemoveGameIdModal}
                                           getGameIDsData={getGameIDsData}
                                           gameId={gameIdArr[selectGame]} 
                                           deletedData="gameID"
                        />}
    <div className={`${styles.bluebox__border9px}`}>
        <div className={`${styles.bluebox__content}`}>
            <div className="gameid__dropdown--box">
                <div className="gameid__dropdown">
                 <InputComponents type={"dropdownScroll"} dropdownMenu={gameNameArr} Value={selectGame} Function={setSelecteGame}/>
                </div>
            </div>
            <div className="gameid__title">Nickname</div>
            <div className="gameid__content">{gameIdsData?.nickname}</div>
            <div className="gameid__title">Game Id</div>
            <div className="gameid__content">{gameIdsData?.username}</div>
            <div className="gameid__btn--box">
                    <Button color={!existData ? "yellow" : "red"}
                            text={!existData ? "Add" : "Delete"}
                            borderRadius={"20px"}
                            height={"36px"}
                            width={"89px"} 
                            handleClick={!existData ? ()=>{setAddGameIdModal(true)} : ()=>{setRemoveGameIdModal(true)}}
                            />
            </div>
        </div>
    </div>
  </div>
}
const SocialAccounts =() => {

    //-----
    //디스코드
    //-----
    const [discordId,setDiscordId] = useState();
    const [discordEmail,setDiscordEmail] = useState();

    useEffect(()=>{

    },[])

    //========================
    //Discord Add
    //========================

    const handleAddDiscord = async () =>{
        
    }

    //========================
    //Discord Delete
    //========================

    const handleDeleteDiscord = async () =>{
        
    }


    return <div className="social__container">
            {discordId  ? <div className={`social__content--box`}>
                    <div className="social__social">
                        <img src={discordImg} alt="img"/>
                        <div className="social__text--box">
                            <div className="social-name">Discord</div>
                            <div className="social-email">thdrudtp15@naver.com</div>
                        </div>
                    </div>
                        <button className="delete-button" onClick={()=>{handleAddDiscord()}}>Delete</button>
            </div> : 
            <div className="social__content--box please__add" onClick={()=>{handleDeleteDiscord()}}>
                Add Discord Account
            </div>}
        </div>
}
const SocialLink = () =>{

    //-----
    //모달 STATE
    //-----
    const [removeModal,setRemoveModal] = useState(false);
    const [snsUrlSettingModal,setSnsUrlSettingModal] = useState(false);


    //-----
    //모달에 전달할 데이터 STATE
    //-----
    const [socialID,setSocialID] = useState("");
    const [socialName,setSocialName] = useState("");
    const [socialImg, setSocialImg] = useState("");
    const [socialType,setSocialType] = useState("");
    const [prevAddress,setPrevAddress] = useState("");

    //-----
    //뿌려주는 데이터 STATE
    //-----
    const [socialArr,setSocialArr] = useState([]);


    
    //========================
    //소셜 데이터 GET 함수
    //========================
    const getSocialData = async () => {
        try {
            const res = await axios.get(`${apiURL}/api/user/sns`,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            console.log(res.data);
            const discordData = res.data.filter((item)=>item.sort === "Discord")[0]
            const twitchData = res.data.filter((item)=>item.sort === "Twitch")[0]
            const twitterData = res.data.filter((item)=>item.sort === "Twitter")[0]
            const telegramData = res.data.filter((item)=>item.sort === "Telegram")[0]
            const youtubeData = res.data.filter((item)=>item.sort === "YouTube")[0]
                console.log(discordData);
                console.log(twitchData);
            setSocialArr([{socialName : "Discord" ,socialImg : discordImg, socialURL : discordData?.address ,id : discordData?.id},
                        {socialName : "Twitch" , socialImg : twitchImg , socialURL : twitchData?.address, id : twitchData?.id},
                        {socialName : "Twitter" , socialImg : twitterImg , socialURL : twitterData?.address, id : twitterData?.id},
                        {socialName : "Telegram" , socialImg : telegramImg ,socialURL : telegramData?.address, id : telegramData?.id},
                        {socialName : "YouTube" , socialImg : youtubeImg ,socialURL : youtubeData?.address, id : youtubeData?.id}])

        }
        catch(e){
            console.log(e);
        }
    }



    //========================
    //Edit 모달 띄우는 함수
    //========================
    const handleEditModal = (name,image,type,address) => {
        setSocialName(name);
        setSocialImg(image);
        setSocialType(type);
        setPrevAddress(address);
        setSnsUrlSettingModal((prev)=>!prev);
    }


    //========================
    //Delete 모달 띄우는 함수
    //========================
    const handleRemoveModal =(id)=>{
        setSocialID(id);
        setRemoveModal((prev)=>!prev);
    }


    console.log(socialArr);

    useEffect(()=>{
        getSocialData();
    },[])


    return <div className="social__container">
            {socialArr.map((item,index)=>
                <div className="social__content--box" key={index}>
                    <div className="social__social">
                    <img src={item.socialImg} alt="icon"/>
                        <div className="social__text--box">
                            <div className="social-name">{item.socialName}</div>
                        </div>
                    </div>
                   <div className="social__button--box">
                    {item.socialURL !== undefined ?
                    <>
                     <button className="edit-button" onClick={()=>{handleEditModal(item?.socialName,item?.socialImg,"Edit",item?.socialURL)}}>Edit</button>    
                     <button className="delete-button" onClick={()=>{handleRemoveModal(item?.id)}}>Delete</button>
                    </> : 
                     <button className="add-button" onClick={()=>{handleEditModal(item.socialName,item.socialImg,"Add")}}>
                        <img src={arrowForwardIcon} alt="add"/>
                     </button>
                    }
                   
                   </div>
                </div>
            )} 
             {removeModal && <RemoveModal setRemoveModal={setRemoveModal} socialID={socialID}   getSocialData={getSocialData} />}
             {snsUrlSettingModal && <SnsURLSettingModal setSnsUrlSettingModal={setSnsUrlSettingModal} 
                                                        socialName={socialName} 
                                                        socialImg={socialImg}
                                                        socialType={socialType}
                                                        prevAddress={prevAddress}
                                                        getSocialData={getSocialData}
                                                        />}
        </div>
}
