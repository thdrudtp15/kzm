import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWalletConfig } from "@thirdweb-dev/react";
import axios from "axios";

import CardList from "../components/ui/CardList";
import InputComponents from "../components/ui/InputComponents";
import PictureUploadModal from "../components/modal/PictureUploadModal";
import { gameArr,gameIdArr, gameNameArr } from "../data/gameData";
import { apiURL } from "../data/EnvData";

import "../styles/MyProfile.scss";
import styles from "../styles/Common.module.scss";
import discordImg from "../assets/images/socialImg/Discord.svg";
import twitchImg from "../assets/images/socialImg/Twitch.svg";
import twitterImg from "../assets/images/socialImg/Twitter.svg";
import telegramImg from "../assets/images/socialImg/Telegram.svg";
import youtubeImg from "../assets/images/socialImg/Youtube.svg";
import avaxTokenImg from "../assets/images/NetworkTicker/avaxtoken.svg";
import metamaskImg from "../assets/images/walletImage/metamaskImg.svg";
import burritoImg from "../assets/images/walletImage/burritoImg.svg";
import coinbaseImg from "../assets/images/walletImage/coinbaseImg.svg";
import walletconnectImg from "../assets/images/walletImage/walletconnectImg.svg";
import arrowForwardIcon from "../assets/images/arrow-foward.svg";
import Cookies from "js-cookie";
import { TokenImgArr } from "../data/TokenDataArr";

const MyProfile =({mode,isLogined,setIsLoading,setUserImage})=>{
    

    const walletConfig = useWalletConfig();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");

    const [tab,setTab] = useState(0);
    const [pictureUploadModal,setPictureUploadModal] = useState(false);
    const [userData,setUserData] = useState()
    const [socialArr,setSocialArr] = useState([]);
    

    //=====================
    //탭 버튼 변경 함수
    //=====================

    const handleTab = (parameter) => {
        setTab(parameter);
    }

    //=====================
    //토큰이 삭제 되었을 때
    //=====================
    useEffect(()=>{
        const token = Cookies.get("token");
        if(!token) {
            alert("Token has expired!");
            setIsLoading(false);
            navigate("/");
        }
    },[tab])


    //=====================
    //유저 데이터 가져오는 함수
    //=====================

    const getUserDataUsername = async () => {
        try{
            console.log("로그인 상태 변경으로 인한 실행")
            setIsLoading(true);
            const res = await axios.get(`${apiURL}/api/user/`,
            {
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            }
            )
            setUserData(res.data);
            setUserImage(res.data.picture); //헤더의 프로필 이미지를 변경하기 위한 함수입니다. 
            const snsList = res.data.sns_list;
            const Discord = snsList.filter((item)=>item.sort === "Discord")[0]
            const Twitch = snsList.filter((item)=>item.sort === "Twitch")[0]
            const Twitter = snsList.filter((item)=>item.sort === "Twitter")[0]
            const Telegram = snsList.filter((item)=>item.sort === "Telegram")[0]
            const YouTube = snsList.filter((item)=>item.sort === "YouTube")[0]

            setSocialArr( [    {name : "Discord", img : discordImg , value : Discord?.address},
                               {name : "Twitch", img : twitchImg , value : Twitch?.address},
                               {name : "Twitter", img : twitterImg , value : Twitter?.address},
                               {name : "Telegram", img : telegramImg , value : Telegram?.address},
                               {name : "YouTube", img : youtubeImg , value : YouTube?.address},
                               {name : "metamask", img : metamaskImg , value : "metamask" === walletConfig?.id },
                               {name : "burrito", img : burritoImg , value : "burrito" === walletConfig?.id},
                               {name : "coinbase", img : coinbaseImg , value : "coinbase" === walletConfig?.id },
                               {name : "walletconnect", img : walletconnectImg , value : "walletconnect" === walletConfig?.id }
                            ])
            setIsLoading(false);
        }catch(e){      
            console.log(e);
            alert("Error")
            setIsLoading(false);
            navigate("/");
        }
    }    
  
    //=====================
    //my-profile로 접속 시 로그인 여부에 따른 검사.
    //=====================

    useEffect(() =>{
        if( mode === "profile" ){
            if(!isLogined){
                navigate("/");
            } 
            else if(isLogined === true) {
                getUserDataUsername();
            }
        }
        else {
            
        }
       
    },[isLogined])



    return <div className="MyProfile">
        <div className="profile__top--container">
            <div className="top__img">
                <img src={userData?.picture} alt="img" draggable={false}/>
                {mode === "profile" && isLogined === true &&
                    <div className="top__img--modify-btn" htmlFor="profileImg" onClick={()=>{setPictureUploadModal(true)}}>
                        <span className="plus x"></span>
                        <span className="plus"></span>
                    </div>
                }
            </div>
            <div className="top__username">{userData?.name}
                <img src={userData?.national_flag} alt="nation" draggable={false}/>
            </div>
            <div className="top__social--box">
                {socialArr.map((item,index) => <a className="social__circle" 
                                                     target={item.value ? "_blank" : null} 
                                                     rel="noopener noreferer" 
                                                     key={index} 
                                                     href={item.value === true || !item.value ? null : item.value} 
                                                     >
                   {!item?.value && <div className="social__circle--overlay"></div>}
                    <img src={item.img} alt={item.name} draggable={false}/>
                </a>
                )}
            </div>
        </div>
        <div className="profile__tab--container">
                <div className={`tab__box ${tab === 0 && "tab-selected"}`} onClick={()=>{handleTab(0)}}>Statistics</div>

               { mode === "profile" &&  <>
                    <div className={`tab__box ${tab === 1 && "tab-selected"}`} onClick={()=>{handleTab(1)}} >Participation</div>
                    <div className={`tab__box ${tab === 2 && "tab-selected"}`} onClick={()=>{handleTab(2)}}>Host</div>
                    <div className={`tab__box ${tab === 3 && "tab-selected"}`} onClick={()=>{handleTab(3)}} >Reward</div>
                    <div className={`tab__box ${tab === 4 && "tab-selected"}`} onClick={()=>{handleTab(4)}}>Refund</div>
                </>
                }

        </div>
                {tab === 0 && <Statistics />}
                {tab === 1 && mode === "profile" ? <ParticipationAndHost tab={tab} navigate={navigate} setIsLoading={setIsLoading}/> : null}
                {tab === 2 && mode === "profile" ? <ParticipationAndHost tab={tab} navigate={navigate} setIsLoading={setIsLoading}/>  : null}
                {tab === 3 && mode === "profile" ? <RewardAndRefund tab={tab} setIsLoading={setIsLoading} navigate={navigate}/>  : null}
                {tab === 4 && mode === "profile" ?  <RewardAndRefund tab={tab} setIsLoading={setIsLoading} navigate={navigate}/>  : null}

                {pictureUploadModal && <PictureUploadModal setPictureUploadModal={setPictureUploadModal} 
                                                            getUserDataUsername={getUserDataUsername}
                                                            />}
    </div>
}

export default MyProfile;


    const Statistics = () => {

        const [selectStasticsGame , setSelecteStasticsGame] = useState(gameNameArr[0])
        const [userStatisticsData,setUserStatisticsData] = useState({avg_score : "-", 
                                                                     games_played : "-", 
                                                                     top_score : "-", 
                                                                     total_score : "-",
                                                                     tournaments_entered : "-"})


        //========================
        //유저 Statistics 데이터 가져오는 useEffect
        //========================

        useEffect(()=>{
            const getStatistics = async () => {
                try{
                    const res = await axios.get(`${apiURL}/api/game/list/${gameIdArr[selectStasticsGame]}/statistics`,
                    {
                        headers : {
                            Authorization : `Bearer ${Cookies.get("token")}`
                        }
                    }
                    )
                    setUserStatisticsData(res.data);
                }
                catch(e){
                    console.log(e);
                }
            }
            getStatistics();
        },[])



        //=================
        //Stastics 내용물 map함수 사용을 위한 어레이
        //=================
        const informationArr = [{text : <span>Tournaments <br/>Entered</span>, number : userStatisticsData.tournaments_entered},
                                {text : "Top Score", number : userStatisticsData.top_score},
                                {text : "Total Score", number : userStatisticsData.total_score},
                                {text : "Average Score", number : userStatisticsData.avg_score},
                                {text : "Games Played", number : userStatisticsData.games_played}
                            ]

        return  <div className={`${styles.bluebox__border3px}`}>
                    <div className={`${styles.bluebox__border9px}`}>
                        <div className={`${styles.bluebox__content}`}>
                            <div className="statistics__dropdown--box">
                                <div className="statistics__dropdown">
                                    <InputComponents type={"dropdownScroll"} dropdownMenu={gameNameArr} Value={selectStasticsGame} Function={setSelecteStasticsGame}/>
                                </div>
                            </div>
                            <div className="statistics__information--box">
                                {informationArr?.map((item,index)=> 
                                    <div className="information__block" key={index}>
                                    <div className="information__text">{item?.text}</div>
                                    <div className="information__number">{item?.number}</div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
            </div>
    }

    
    const ParticipationAndHost = ({tab,navigate,setIsLoading}) => {

        //******************
        //파티시페이션과 호스트는 컴포넌트를 공유합니다.
        //tab변수로 이를 식별하며 1은 participation, 2는 host를 뜻합니다.
        //****************** 

        const [selectGame, setSelecteGame] = useState(gameNameArr[0]);
        const [tournamentStatus,setTournamentStatus] = useState("all");
        const [page,setPage] = useState(1);
        const [search,setSearch] = useState("");
        const [tournamentListData,setTournamentListData] = useState([]);
        

        //=================
        //드롭다운 선택지 밑의 statusObject와 key값이 동일해야 합니다~
        //=================
            const TournamentStatusArr = [
                "all",
                "before registration", //토너먼트 등록 이전
                "during registration",  //토너먼트 등록 중
                "before the game starts", // 게임시작 이전
                "during the game", // 게임 중
                "completed game",
                "canceled"
                ]

            const statusObject = {
                "all" : "",
                "before registration" : "registration_before",
                "during registration" : "registration_ing",
                "before the game starts" : "game_before",
                "during the game" : "game_ing",
                "completed game" : "complt",
                "canceled" : "cancel"
                }

    
        //=================
        //파티시펀트 및 호스트 토너먼트 리스트 가져오는 함수.
        //=================


        const getTournamentListData = async () => {
           
            const query = `game_id=${gameIdArr[selectGame]}&status=${statusObject[tournamentStatus]}&search=${search}&page=${page}`
            try{
                setIsLoading(true);
                const res = await axios.get(`${apiURL}/api/game/tournament/${tab === 1 ? "participant" : "host"}/user?${query}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                    }
                )
                setTournamentListData(res.data);
                setIsLoading(false);
            }catch(e){
                console.log(e);
            }
        }


        //=================
        //파티시펀트 및 호스트 토너먼트 리스트 가져오는 함수.
        //=================


        const getTournamentListDataMore = async () => {
            try{
                //setIsLoading(true)
                const query = `game_id=${gameIdArr[selectGame]}&status=${statusObject[tournamentStatus]}&search=${search}&page=${page + 1}`
                const res = await axios.get(`${apiURL}/api/game/tournament/${tab === 1 ? "participant" : "host"}/user?${query}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                    }
                )
                if(res.data.length !== 0){
                    setTournamentListData([...tournamentListData,...res.data]);
                    setPage((prev)=>prev + 1)
                }
                //setIsLoading(false);
            }catch(e){ 
                console.log(e);    
            }
        }


        //=================
        //파티시펀트 및 호스트 토너먼트 리스트 가져오는 useEffect.
        //=================
        useEffect(()=>{
            getTournamentListData();
        },[selectGame,tournamentStatus]);


        //=================
        //페이지 업 함수 (MORE 버튼)
        //=================

        const moreHandler = () => {
            getTournamentListDataMore();
        }
    
      
        return <div className="participant-host__container">
            <div className="input__container">
                <div className="input__box short">
                    <InputComponents type={"dropdownScroll"} dropdownMenu={gameNameArr} Value={selectGame} Function={setSelecteGame} inputNumber={0} />
                </div> 
                <div  className="input__box short">
                    <InputComponents type={"dropdown"} dropdownMenu={TournamentStatusArr} Value={tournamentStatus} Function={setTournamentStatus} inputNumber={1}/>
                </div>
                <div  className="input__box long">
                    <InputComponents type={"search"} placeholder={"Search Game"} Function={setSearch} searchFunction={getTournamentListData}/>
                </div>    
            </div>  
            <CardList data={tournamentListData} gameName={selectGame.replace(" ","-")} moreHandler={moreHandler}/>
        </div>
    }




    const RewardAndRefund = ({tab,setIsLoading,navigate}) => {

        //********************
        //리워드와 리펀드는 컴포넌트를 공유합니다.
        //tab변수로 이를 식별하며 3은 Reward, 4는 Refund를 뜻합니다.
        //******************** 

        const [startDate,setStartDate] = useState(new Date().toISOString().slice(0,10) );
        const [endDate,setEndDate] = useState(new Date().toISOString().slice(0,10));

        const [listData,setListData] = useState([]);

        //======================
        //날짜에 해당하는 리워드 & 리펀드 가져오는 useEffect
        //======================

        useEffect(()=> {
            const getRewardAndRefund = async () => {
                try{
                    setIsLoading(true);
                    const query = `start_date=${startDate}&end_date=${endDate}`
                    const res = await axios.get(`${apiURL}/api/game/tournament/period/${tab === 3 ? "rewarded" : "refund"}/?${query}`,
                    {
                        headers : {
                            Authorization : `Bearer ${Cookies.get("token")}`
                        }
                    }
                    )
                    setListData(res.data);
                    setIsLoading(false);
                }catch(e){
                    console.log(e);
                }
            }
            getRewardAndRefund();
        },[startDate,endDate])


    //=============================
    //시간 포매팅 함수
    //=============================

    const formattingTime =(time)=>{
        const options = {
            weekday: "short", 
            day: "2-digit",    
            month: "short",   
            year: "numeric",   
            hour: "2-digit",   
            minute: "2-digit", 
            timeZoneName: "short" 
          };
        const formattedTime = new Date(time).toLocaleString("en-US",options).replace("GMT+9","").replaceAll(",",".") 
        return  formattedTime
    }


        return <div style={{width : "100%",maxWidth : "1200px"}}> 
                    <div className="date-input__container">
                        <div className="date__text">Date</div>
                        <div className="date__box"> 
                            <div className="date__input">
                                <InputComponents type="date-no-time" Value={startDate} Function={setStartDate}/>
                            </div>
                            &nbsp;~&nbsp;
                            <div className="date__input">
                                <InputComponents type="date-no-time" Value={endDate} Function={setEndDate}/>
                            </div>
                        </div>
                    </div>
                    <div className="reward-refund__list--box">
                        {listData.length > 0 ? listData.map((item,index)=>
                            <div className="list__box" key={index} onClick={navigate(`/tournament/${item?.game_name.replace(" ","-")}/${item?.id}`)}>
                            <div className="list__box--left">
                             <div className="box__top">{item?.user_type} | {item?.game_name}</div>
                             <div className="box__mid">Finished - {formattingTime(item?.finished_date)}</div>
                             <div className="box__bottom">
                                 <img src={TokenImgArr[item?.adminssion_type]} alt="img"/>
                                 {/* 토큰 이미지는 아직 정해진 게 없음 */}
                                 {item?.price}
                             </div>
                            </div>
                            <div className="list__box--right">
                             <img src={arrowForwardIcon} alt="forward"/>
                            </div>
                         </div>                 
                        ):<div className="list__box--none-data">No {tab === 3 ? "reward" : "refund"} history</div>}     
                    </div> 
                </div>
    }