import { useEffect, useState } from "react";

import { Await, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useConnectionStatus,ConnectWallet, walletConnect, useAddress } from "@thirdweb-dev/react";

import Button from "../components/ui/Button";
import GradeBadge from "../components/ui/GradeBadge";
import { gameBannerArr, gameIdArr, gameNameArr } from "../data/gameData";
import { gameRuleObject } from "../data/gameRuleData";

import "../styles/TournamentDetail.scss";
import styles from "../styles/Common.module.scss";
import progress_beforeImg from "../assets/images/TournamentDetail/progress_before.svg"
import progress_ingImg from "../assets/images/TournamentDetail/progress_ing.svg"
import progress_endImg from "../assets/images/TournamentDetail/progress_end.svg"
import progress_cancelImg from "../assets/images/TournamentDetail/progress_game-cancel.svg"
import progress_gameIngImg from "../assets/images/TournamentDetail/progress_game-ing.svg"
import 더미토큰이미지 from "../assets/images/NetworkTicker/koz-token.svg";
import smileIcon from "../assets/images/TournamentDetail/smile-icon.svg"
import coinbaseImg from "../assets/images/NetworkTicker/coinbase-Ticker.svg";
import axios from "axios";
import { apiURL } from "../data/EnvData";
import Cookies from "js-cookie";
import JoinModal from "../components/modal/JoinModal";
import AddGameIdModal from "../components/modal/AddGameIdModal";
import { TokenImgArr } from "../data/TokenDataArr";


const TournamentDetail = ({isLogined,setIsLoading}) =>{
    
    const navigate = useNavigate();

    const walletAddress = useAddress();

    const { itemId } = useParams();
    const gameName = useParams().gameName.replace("-"," ");

    const [bannerImg,setBannerImg] = useState("");
    const [tab,setTab]=useState(0);
    const [gameStatus,setGameStatus] = useState()
    const [endTime,setEndTime] = useState("");
    const [tournamentData,setTournamentData] = useState([]);
    const [attendance,setAttendance] = useState(false);

    const [joinModal,setJoinModal] = useState(false);
    const [addGameIdModal,setAddGameIdModal] = useState(false);

    const token = Cookies.get("token");


    //=============================
    //탭 버튼 변경 함수
    //=============================
        const handleTab = (param) =>{
            setTab(param);
        }


    //=============================
    //토너먼트의 정적 데이터를 가져오는 함수
    //=============================

    const getTournamentData = async () => {
        try {
            setIsLoading(true);
            const res  = await axios.get(`${apiURL}/api/game/tournament/${itemId}`)
            await setTournamentData(res.data);
            await getTourmanetStatus();
            setIsLoading(false);
        }
        catch(e){
            console.log(e.response.data.detail);
            console.log(e);
            navigate("/");
            alert("Network Error!!!");
            setIsLoading(false);
        }
    }


    //=============================
    //토너먼트의 상태를 가져오는 함수
    //=============================

    const getTourmanetStatus = async () =>{
        try {
            const res  = await axios.get(`${apiURL}/api/game/tournament/${itemId}/status`)
            setGameStatus(res.data.status);
        } 
        catch(e){
            console.log(e);
        }
    }

    //======================
    //참여 여부 확인 함수 [GameStatus 컴포넌트]
    //======================
    const getAttendanceStatus = async () => {
        try {
            const res = await axios.get(`${apiURL}/api/game/tournament/${itemId}/join/status`,
                {
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                }
            )
            setAttendance(res.data);
        }catch(e){
            console.log(e);
            setAttendance(false);
        }
    }

    //======================
    //참가 함수 [GameStatus 컴포넌트]
    //======================
    const handleJoinCheck = async () => {
        try {
            const res = await axios.get(`${apiURL}/api/game/tournament/${itemId}/join/check?wallet_address=${walletAddress}`,{
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            }
            )
            console.log(res.data);
            setJoinModal(true);
        }   
        catch(e){
            console.log(e);
            if(e.response.data.detail === "No User Game ID"){
                setAddGameIdModal(true);
            }
        }
    }


    //=============================
    //토너먼트 배너 이미지 설정 및 데이터 GET
    //=============================

    useEffect(()=>{
        window.scroll({top : 0});
        if(!gameNameArr.includes(gameName)){
            navigate("/");
            return false;
        }else {
            setBannerImg(gameBannerArr[gameName])
            getTournamentData();
        }
    },[])

    useEffect(()=>{
        getAttendanceStatus();
    },[token])

    //=============================
    //상태에 맞는 endTime 설정하는 useEffect
    //=============================

    useEffect(()=>{
            if(gameStatus === "registration_before") setEndTime(new Date(tournamentData?.open_registration));
            else if (gameStatus === "registration_ing")  setEndTime(new Date(tournamentData?.registration_close_on)) ;
            else if (gameStatus === "game_before")  setEndTime(new Date(tournamentData?.start_of_tournament));
            else if (gameStatus === "game_ing")  setEndTime(new Date(tournamentData?.tournament_closed)); 
    },[gameStatus])


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


    return <div className="Tournament-detail">
        <div className="Tournament-detail__banner">
            <img src={bannerImg} alt="dummy" draggable={false}/>
            <div className="Tournament-detail__banner-grade-badge">
                <GradeBadge grade={tournamentData.tournament_grade}/>
            </div>
        </div>
        <div className="Tournament-detail__inner--container">
            <div className="Tournament-detail__infomation--box">
                <div className="Tournament-detail__game-name">{gameName}</div>
                <div className="Tournament-detail__game-description">{tournamentData.tournament_name}</div>
                <div className="Tournament-detail__game-prize-fee">
                    <div className="prize-fee">
                        <div className="prize-fee__text">Prize Pool</div>
                        <div className="prize-fee__number">
                            <img src={TokenImgArr[tournamentData.adminssion_type]} alt="token" draggable={false}/>{tournamentData.prize_money}
                        </div>
                    </div>
                    <div className="center-line"></div>
                    <div className="prize-fee">
                        <div className="prize-fee__text">Entry fee</div>
                        <div className="prize-fee__number">
                            <img src={TokenImgArr[tournamentData.entry_type]} alt="token" draggable={false}/>{tournamentData.entry_fee_money}
                        </div>
                    </div>
                </div>
                <Link className="Tournament-detail__TXIDSCAN" to="/#" target="_blank" rel="noopener norefer">
                    <img src={coinbaseImg} alt="image" draggable={false}/>TXID SCAN
                </Link>
                <GameStatus gameStatus={gameStatus} 
                            endTime={endTime} 
                            isLogined={isLogined} 
                            getTourmanetStatus={getTourmanetStatus}
                            gameStartDate={tournamentData.start_of_tournament}
                            formattingTime={formattingTime}
                            attendance={attendance}
                            handleJoinCheck={handleJoinCheck}
                            />
                <ul className="Tournament-detail__tab--box">
                    <li className={`Tournament-detail__tab ${tab === 0 && "tab-selected"}`}  onClick={()=>{handleTab(0)}}>Overview</li>
                    <li className={`Tournament-detail__tab ${tab === 1 && "tab-selected"}`}  onClick={()=>{handleTab(1)}}>Participants</li>
                    <li className={`Tournament-detail__tab ${tab === 2 && "tab-selected"}`}  onClick={()=>{handleTab(2)}}>Prize</li>
                </ul>
                {tab === 0 && <Overview gameStatus={gameStatus} gameName={gameName} tournamentData={tournamentData} formattingTime={formattingTime}/>}
                {tab === 1 && <Participants gameStatus={gameStatus} itemId={itemId} players={tournamentData.players}/>}
                {tab === 2 && <Prize gameStatus={gameStatus} itemId={itemId}/>}
            </div>
        </div>
      {joinModal && <JoinModal setJoinModal={setJoinModal} itemId={itemId} getAttendanceStatus={getAttendanceStatus}/>}
      {addGameIdModal && <AddGameIdModal setAddGameIdModal={setAddGameIdModal} gameName={gameName} gameId={gameIdArr[gameName]}/>}
    </div>
}
export default TournamentDetail;

//===============================
//게임 상태에 따라 바뀌는 컴포넌트..?
//===============================


const GameStatus =({gameStatus,endTime,isLogined,getTourmanetStatus,gameStartDate,formattingTime,attendance,handleJoinCheck})=>{
    //게임 상태에 따라서 메시지가 변경 되어야 함.
    let message = "-";

         if (gameStatus === "registration_before")message = "Time left up to registration"; // Time left up to registration
    else if (gameStatus === "registration_ing")message = "Time left up to registration completion"; //Time up to registration completion
    else if (gameStatus === "game_before")message = "Time left up to the game starts"; //Time left up to the game starts
    else if (gameStatus === "game_ing")message = "Time left up to the game ends"; //Time left up to the game ends
    else if (gameStatus === "complt")message = "Completed Game";
    else if (gameStatus === "cancel")message = "Canceled Game";

    const [seconds,setSeconds] = useState("--");
    const [minutes,setMinutes] = useState("--");
    const [hours,setHours] = useState("--");
   

   //=======================
   //타이머
   //=======================
    useEffect(()=>{
        let timeInterval;
        let point;
        let count = 3;
        setSeconds("--");
        setMinutes("--");
        setHours("--");

        if(gameStatus !== "complt" && gameStatus !== "cancel"){
        timeInterval = setInterval(()=>{
            point = endTime - new Date();

            let seconds = Math.floor((point / 1000) % 60);
            let minutes = Math.floor((point / (1000 * 60)) % 60);
            let hours = Math.floor((point / (1000 * 60 * 60)));
            
            if( point  > 0 ){
                setSeconds(seconds);
                setMinutes(minutes);
                setHours(hours);
            }else {
                setSeconds("--");
                setMinutes("--");
                setHours("--");
                count++;
                if(count % 3 === 0){
                    console.log("axios")
                    getTourmanetStatus();
                }
            }
        },1000)
    }
    else {
        clearInterval(timeInterval);
    }
        return ()=>{clearInterval(timeInterval)}

},[endTime,gameStatus])
    

    //%%%%%랜더링

    if(gameStatus === "registration_before" || 
       gameStatus === "registration_ing" || 
       gameStatus === "game_before" || 
       gameStatus === "game_ing")
       {

    return <div className="game-status__box">
            <div className="game-status__text">{message}</div>
            <div className="game-status__time-left">
                    {hours.toString().padStart(2,"0")} : {" "}
                    {minutes.toString().padStart(2,"0")} : {" "}
                    {seconds.toString().padStart(2,"0")}
            </div>
            <div className="game-status__start-date">
                <span className="game-status__text">Game Start Date</span>
                <span className="game-status__text date">
                    {formattingTime(gameStartDate)}
                </span>
            </div>
                {gameStatus !== "registration_before" && 
                    <div className="button">
                       {attendance === true && gameStatus === "registration_ing"  ? 
                        <Button width={"100%"}
                                color={"gray"}
                                borderRadius={"24px"}
                                text={"Registration Completed"}
                                handleClick={null}
                                fontSize={"20px"}
                                /> : 
                        <Button width={"100%"}
                                color={gameStatus === "game_before" || gameStatus === "complt" || gameStatus === "game_ing" ? "gray" : "yellow" } 
                                borderRadius={"24px"} 
                                text={gameStatus === "registration_ing" && isLogined === true ? "Join Now" : 
                                      gameStatus === "registration_ing" && isLogined === false ? <ConnectWallet className={styles.connect_wallet_btn__30px}/> : 
                                      "Next"} 
                                handleClick={gameStatus === "registration_ing" && isLogined ? ()=>{handleJoinCheck()} : null}
                                fontSize={"20px"}/>
                        }
                    </div>}
            </div>
    }
    else if (gameStatus === "complt" || 
             gameStatus === "cancel") 
             {
        return <div className="game-status__box end-option">
                <div className="game-status__message">{message}</div>
                <div className="prize-fee">
                            <div className="prize-fee__text">Reward</div>
                            <div className="prize-fee__number">
                                <img src={더미토큰이미지} alt="token"/>1000
                            </div>
                        </div>
                <div className="button">
                <Button width={"100%"}color={"yellow"} borderRadius={"24px"} text={"Prize TXID"} fontSize={"20px"}/>
                </div>
             </div>
    }
}


//##################################
//Overview 컴포넌트
//##################################

const Overview = ({gameStatus,gameName,tournamentData,formattingTime}) => {

    const 게임데이터 = [{title : "Game" ,content : tournamentData.game_name},
                     {title : "Grade" ,content :<GradeBadge grade={tournamentData.tournament_grade} />},
                     {title : "Type" ,content : tournamentData.tournament_type},
                     {title : "Score calculation method" ,content : tournamentData.score_method},
                     {title : "Registations Close On" ,content : formattingTime(tournamentData.registration_close_on)},
                     {title : "Games Close On" ,content : formattingTime(tournamentData.tournament_closed)},
                    ]
    
    return <div>
    <div className="game-scenario__progress">
        <div className="box__border--3px">
            <div className="box__content">
                <div className="box__content--title">Progress Phases</div>
                <div className="box__content--content-border">
                    <div className="box__content--content content__progress-option">
                        {gameStatus === "registration_before" && <img src={progress_beforeImg} alt="progress" draggable={false}/>}
                        {gameStatus === "registration_ing" && <img src={progress_ingImg} alt="progress" draggable={false}/>}
                        {gameStatus === "game_before" && <img src={progress_endImg} alt="progress" draggable={false}/>}
                        {gameStatus === "game_ing" && <img src={progress_gameIngImg} alt="progress" draggable={false}/>}
                        {gameStatus === "complt" && <img src={progress_cancelImg} alt="progress" draggable={false}/>}
                        {gameStatus === "cancel" && <img src={progress_cancelImg} alt="progress" draggable={false}/>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="game-scenario__details-rules">
    <div className="box__border--3px">
            <div className="box__content">
                <div className="box__content--title">Details</div>
                <div className="box__content--content-border">
                    <div className="box__content--content content__details-rules-option">
                        <div className="box__content--user">
                            <div className="user__img">
                                <img src={tournamentData.host?.picture} alt="img" draggable={false}/>
                            </div>
                            <div className="host-box">
                                <div className="text-host">HOSTED BY</div>
                                <div className="user-name">
                                    {tournamentData.host?.name}
                                    <img src={tournamentData.host?.national_flag} alt="" draggable={false}/>
                                </div>
                            </div>
                        </div>
                        {게임데이터.map((item,index) => <div key={index}>
                            <div className="category-text">{item.title}</div>
                            <div className="content-text">{item.content}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
        <div className="box__border--3px">
            <div className="box__content">
                <div className="box__content--title">Rules</div>
                <div className="box__content--content-border">
                    <div className="box__content--content  content__details-rules-option rules-second-option">
                        <div className="rules__content-box">
                        {gameRuleObject[gameName].map((item,index)=>
                        <div className="rules-list" key={index}>
                                <div className="rules-list__text">{index + 1}.</div>
                                <div className="rules-list__text">{item}</div>
                        </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}


//##################################
//Participants 컴포넌트
//##################################

const Participants = ({gameStatus,itemId,players}) => {

    const navigate = useNavigate();

    const [participantsData,setParticipantsData] = useState([])
    const [loading,setLoading] = useState(true);
    const [networkErr,setNetworkErr] = useState(false);

    //========================
    //참가자 정보 불러오는 useEffect 이거..10초 폴링 해야 하나?
    //========================

    useEffect(()=>{
        const getParticipant = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${apiURL}/api/game/tournament/${itemId}/participant`)
                if(gameStatus === "game_ing" || gameStatus === "complt"){
                    setParticipantsData(res.data.sort((a,b)=> b.score - a.score))
                }
                else {
                    setParticipantsData(res.data);
                }
                setLoading(false)
                }
            catch(e){
                console.log(e);
                setNetworkErr(true);
                setLoading(false)
            }
        }
        getParticipant();
    },[gameStatus])


    return <div className="box__border--3px">
    <div className="box__content">
        <div className="box__content--title"><img src={smileIcon} alt="smile"/>{participantsData.length} / {players}</div>
        <div className="box__content--content-border">
            <div className="box__content--content content__participants-prize-option">
                {/* <div className="participants-prize__content-box box-option__participants"> */}
                {loading ? <div className="participants-prize__content-box box-option__no-data">
                                Loading...
                            </div> : 
                participantsData.length > 0 ? 
                <div className="participants-prize__content-box box-option__participants">
                    {participantsData.map((item,index)=>
                    <div className="participants__user" key={index.id}>
                        <div className="user__img">
                            <img src={item?.picture} alt="img" draggable={false}/>
                        </div>
                        <div className="user__name-score--box">
                            <div className="user__name">{item?.name} <img src={item?.national_flag} width={"13px"} height={"13px"}/></div>
                            {gameStatus === "game_ing" || gameStatus === "complt" ? <div className="user__score">{item?.score}</div> : null}
                        </div>
                    </div>)}
                </div> : 
                participantsData.length === 0 && !networkErr ?
                <div className="participants-prize__content-box box-option__no-data">
                  { gameStatus === "registration_before" ?  `It's before the contestants are recruited` : "There are no participants"}
                </div> :
                <div className="participants-prize__content-box box-option__no-data">
                    Network Error
                </div>
                }
                </div>
            </div>
        </div>
    </div>
}


//##################################
//Prize 컴포넌트
//##################################

const Prize = ({gameStatus,itemId}) => {

    const [prizeRanking,setPrizeRanking] = useState([]);

    const [networkErr,setNetworkErr] = useState(false);

    const [loading,setLoading] = useState(false);

    //==========================
    //상금 순위 가져오는 useEffect
    //==========================
    useEffect(()=>{
        const getPrizeRanking = async () => {
            try{
                setLoading(true)
                const res = await axios.get(`${apiURL}/api/game/tournament/${itemId}/ranking`);
                setPrizeRanking(res.data);
                setLoading(false)
            }
            catch(e){
                console.log(e);
                setNetworkErr(true);
                setLoading(false)
            }
        }
        getPrizeRanking();
    },[gameStatus])


    return <div className="box__border--3px">
    <div className="box__content">
        <div className="box__content--title">Prize Pool</div>
        <div className="box__content--content-border">
            <div className="box__content--content content__participants-prize-option">
                {loading ? <div className="participants-prize__content-box box-option__no-data">
                                Loading...
                            </div>  : 
                prizeRanking.length > 0 && !networkErr ? 
                <div className="participants-prize__content-box box-option__prize">
                    {prizeRanking.sort((a,b)=> a.ranking - b.ranking).map((item,index)=>
                        <div className="prize__rank" key={item.ranking}>
                            <div className="rank__number">
                                <div className="rank">
                                    {item.ranking === 1 && item.ranking + "st" }
                                    {item.ranking === 2 && item.ranking + "nd" }
                                    {item.ranking === 3 && item.ranking + "rd" }
                                    {item.ranking > 3 && item.ranking + "th" }
                                </div> 
                              {gameStatus === "complt" && <div className="user">
                                   <img src={item.picture} alt="profile" className="profile-image"/>
                                   <span className="user-name--text">{item.name}</span>
                                   <img src={item.national_flag} alt="country" className="country-image"/>
                                </div>}
                            </div>

                            <div className="prize__number-per--box">
                                <div className="rank__prize-num">{item.prize_money}</div>
                                {/* 넣으면 더 좋을 거 같은 디자인
                                    - 토큰?코인?이미지 */}
                            </div>

                        </div> )}
                 </div> : 
                 prizeRanking.length === 0 && !networkErr ? 
                 <div className="participants-prize__content-box box-option__no-data">No prize money</div> : 
                 <div className="participants-prize__content-box box-option__no-data">Network Error</div>
                }
            </div>
        </div>
    </div>
</div>
}