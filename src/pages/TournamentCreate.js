import { useEffect,useState } from "react";

import { useNavigate,useParams } from "react-router-dom";

import InputComponents from "../components/ui/InputComponents";
import Button from "../components/ui/Button.js";
import GradeBadge from "../components/ui/GradeBadge.js";
import { gameNameArr,gameIdArr,gameArr } from "../data/gameData";
import {NetworkDataArr} from "../data/NetworkDataArr";
import { TokenDataArr, TokenNameDataArr } from "../data/TokenDataArr.js";
import ErrorModal from "../components/modal/ErrorModal.js";

import "../styles/TournamentCreate.scss";
import questionIcon from "../assets/images/question-icon.png";
import arrowForwardIcon from "../assets/images/arrow-foward.svg";
import walletIcon from "../assets/images/wallet-icon.png";
import avaxIcon from "../assets/images/NetworkTicker/avaxtoken.svg" 
import kozmoIcon from "../assets/images/NetworkTicker/koz-token.svg";
import addIcon from "../assets/images/add_icon.svg";
import subtractIcon from "../assets/images/subtract_icon.svg";
import add_a_photo from "../assets/images/add_a_photo.svg";
import arrowRight from "../assets/images/arrow_right.png";
import Cookies from "js-cookie";
import axios from "axios";
import { apiURL } from "../data/EnvData.js";

const TournamentCreate = ({isLogined}) =>{
    const gameName = useParams().gameName.replace("-"," "); 
    const navigate = useNavigate();
    const [page,setPage] = useState(0);
    const now = new Date().getFullYear() + "-" +
                String(new Date().getMonth() + 1).padStart(2, "0") + "-" +
                String(new Date().getDate()).padStart(2, "0") + "T" +
                String(new Date().getHours()).padStart(2, "0") + ":" +
                String(new Date().getMinutes()).padStart(2, "0")

    useEffect(()=>{
        if(!gameNameArr.includes(gameName) || !isLogined){
            navigate("/");
        }
    },[isLogined])


    return <div className="Tournament-create">
            <div className="Tournament-create__inner">

               <div className="create__header">
                    <div className="main-title__box">
                        <div className="main-title__text">
                            <div className="color-bar"></div>
                            Create Game
                        </div>
                        {/* =======PC버전 사이즈 가이드 30~36 line*/}
                        <div className="guide__box--pc">
                            <img src={questionIcon} alt="icon"/>
                            Prize money setting
                            <br/>
                            information
                        </div>
    
                    </div>
                    {/* 태블릿,모바일 사이즈 가이드 해당 파일 하단 Components*/}
                    <TabletVersionGuide />
    
               </div>

                <div className="create__container">
                    {/* 좌측 정보 입력 부분 해당 파일 하단 Components*/}
                     <EnterInformation page={page} gameName={gameName} navigate={navigate} setPage={setPage} now={now}/>

                    {/* 우측 WalletStatus 해당 파일 하단 Components*/}
                    <WalletStatus />

                </div>
            </div>
    </div>
}

export default TournamentCreate;

 // 태블릿,모바일 사이즈 가이드 Components
const TabletVersionGuide = () =>{
    return <div className="guide__box--tablet">
    <div className="tablet__content--box">
        <div className="tablet__content--icon-text">
            <img src={questionIcon} alt="icon"/> Prize money setting information
        </div>
        <div>
            <img src={arrowForwardIcon} alt="forward" className="arrow"/>
        </div>
    </div>
    <div className="tablet__content--box">
        <div className="tablet__content--icon-text">
            <img src={walletIcon} alt="icon"/> Wallet Status
        </div>
        <div className="arrow">
            <img src={arrowForwardIcon} alt="forward" className="arrow"/>
        </div>
    </div>
</div>
}

 //좌측 정보 입력 부분 Components
    const EnterInformation = ({page,gameName,navigate,setPage,now}) =>{


                            //==========================
                            //입력 정보 state
                            //==========================

                            //----page 1
                            const [gameType,setGameType] = useState("Ranked");
                            const [scoreCalculation,setScoreCalculation] = useState("Top Score")
                            const [gameTitle,setGameTitle] = useState("");
                            const [gameNetwork,setGameNetwork] = useState(NetworkDataArr[0]); 
                            const [playersNumber,setPlayersNumber] = useState(4);
                            const [registOpenDate,setRegistOpenDate] = useState(now);
                            const [registCloseDate,setRegistCloseDate] = useState("");
                            const [tournamentStartDate,setTournamentStartDate] = useState("");
                            const [tournamentEndDate,setTournamentEndDate] = useState("");
                            const [roundTime,setRoundTime] = useState(0);
                            const [breakTime,setBreakTime] = useState(0);
                            const [roundMin,setRoundMin] = useState(0);
                            const [roundHour,setRoundHour] = useState(0);
                            const [roundDay,setRoundDay] = useState(0);
                            const [breakMin,setBreakMin] = useState(0);
                            const [breakHour,setBreakHour] = useState(0);
                            const [breakDay,setBreakDay] = useState(0);
                            const [thumbnailPreview , setThumbnailPreview] = useState(gameArr.filter((item)=>item.gameName === gameName)[0]?.thumbnail);
                            const [thumbnailFile,setThumbnailFile] = useState("");
                            const [gameTitleCheck , setGameTitleCheck] = useState(false);
                            const [playersNumberCheck,setPlayersNumberCheck] = useState(true);
                            const [registDateCheck,setRegistDateCheck] = useState(false);
                            const [tournamentDateCheck,setTournamentDateCheck] = useState(false);
                
                            const [breakAndRoundTimeCheck, setBreakAndRoundTimeCheck] = useState(true);

                            //----------
                            //첫 번째 페이지 유효성 검사.
                            //----------
                            useEffect(()=>{
                                if(gameTitleCheck &&
                                    playersNumberCheck &&
                                    registDateCheck &&                                  
                                    tournamentDateCheck &&
                                    breakAndRoundTimeCheck
                                   ){
                                    setStepOne(true);
                                    }else{
                                    setStepOne(false);
                                    }
                            },[gameTitleCheck,
                               playersNumberCheck,
                               registDateCheck,
                               tournamentDateCheck,
                               breakAndRoundTimeCheck,
                            ])

                            const [stepOne,setStepOne] = useState(true);

                        
                            //----page 2
                            const [prizePool, setPrizePool] = useState("Fee");
                            const [prizeMoney,setPrizeMoney] = useState("");
                            const [entryFee,setEntryFee] = useState("Fee")
                            const [entryFeeMoney,setEntryFeeMoney] = useState("");
                            const [convertedDollarPrize,setConvertedDollarPrize] = useState(0)
                            const [convertedDollarEntry,setConvertedDollarEntry] = useState(0);
                            const [prizeNFT , setPrizeNFT] = useState(TokenDataArr[0]); 
                            const [entryFeeNFT, setEntryNFT] = useState(TokenDataArr[0]);
                            const [gradeLevel,setGradeLevel] = useState(0);
                            const [minimumParticipant, setMinimumParticipant] = useState(4);
                            const [balance,setBalance] = useState(0);
                            const [rankingPrizePool,setRankinPrizePool] = useState([{prize_money : "0", percent : "0.00"}]);

                            const [prizeMoneyCheck, setPrizeMoneyCheck] = useState(false);
                            const [entryFeeMoneyCheck,setEntryFeeMoneyCheck] = useState(false);
                            const [minimumParticipantCheck,setMinimumParticipantCheck] = useState(true);
                            const [balanceCheck,setBalanceCheck] = useState(false);
                            const [rankingPrizePoolCheck,setRankinPrizePoolCheck] = useState(false);
                        


                            //----------
                            //두 번째 페이지 유효성 검사.
                            //----------
                            useEffect(()=>{
                                if(prizeMoneyCheck && 
                                   entryFeeMoneyCheck &&
                                   minimumParticipantCheck && 
                                   balanceCheck && 
                                   rankingPrizePoolCheck
                                   ){
                                    setStepTwo(true);
                                    }
                                    else {
                                    setStepTwo(false);
                                    }
                            },[prizeMoneyCheck,
                               entryFeeMoneyCheck,
                               minimumParticipantCheck,
                               balanceCheck,
                               rankingPrizePoolCheck
                            ])


                            const [stepTwo,setStepTwo] = useState(true);
                            console.log("=======================================");
                            console.log(prizeMoneyCheck , "상금 체크");
                            console.log(entryFeeMoneyCheck , "입장료 체크");
                            console.log(minimumParticipantCheck , "최소 플레이어 수 체크");
                            console.log(balanceCheck, "발란스 체크1");
                            console.log(rankingPrizePoolCheck, "랭킹 퍼센트 체크");
                            console.log("=======================================");

                            console.log("===============게임 입력 정보")
                            console.log("게임 타입 gameType===>",gameType); //OK
                            console.log("스코어 타입 scoreCalculation===>", scoreCalculation); //OK
                            console.log("게임 이름 gameName===>",gameName); //Ok
                            console.log("토너먼트 썸네일 thumbnailFile===>",thumbnailFile);
                            console.log("토너먼트 이름 gameTitle===>", gameTitle) //OK
                            console.log("게임 네트워크 gameNetwork===>",gameNetwork.name); //OK
                            console.log("플레이어 수 playersNumber===>",playersNumber) 
                            console.log("등록 시작 일자 registOpenDate===>" ,registOpenDate); //OK
                            console.log("등록 마감 일자 registCloseDate===>" ,registCloseDate); //OK
                            console.log("게임 시작 일자 tournamentStartDate===>", tournamentStartDate); //OK
                            console.log("게임 마감 일자 tournamentEndDate===>", tournamentEndDate); //OK
                            console.log("상금 수여 방식 prizeNFT===>",prizeNFT.name) //상금 수여 방식의 경우 name속성을 사용하셔야 합니다. //OK
                            console.log("상금 여부 prizePool===>" , prizePool); //OK
                            console.log("상금 금액 prizeMoney===>", prizeMoney , prizeNFT.name); //OK
                            console.log("입장 금액 방식 entryFeeNFT===>",entryFeeNFT.name) //입장 금액 방식의 경우 name속성을 사용하셔야 합니다. //OK
                            console.log("입장 금액 설정 여부 entryFee===>", entryFee); //OK
                            console.log("입장 금액 entryFeeMoney===>", entryFeeMoney , entryFeeNFT.name); //OK
                            console.log("최소 참가 인원 minimumParticipant===>",minimumParticipant);
                            console.log("상금 순위별 상금 rankingPrizePool===>",rankingPrizePool);
                            console.log("남은 금액 balance===>",balance);
                            if(gameType === "Single"){
                            console.log("라운드 타임 roundTime===>", roundTime);
                            console.log("브레이크 타임 breakTime===>", breakTime);
                            }
                            console.log("===========================");
                            
                            //-----에러 모달
                            const [errorModal,setErrorModal] = useState(false);
                            const [errorMessage,setErrorMessage] = useState("");


                            ////----기타 변수
                            //  플레이어 수 최대 및 최소
                            const playersMax = 60; 
                            const playersMin = 4;
                            //  순위별 지정 상금 퍼센트 최대 및 최소
                            const prizePerMax = 70;
                            const prizePerMin = 10;


    //======================
    //라디오 버튼 함수 - 게임 타입 [1페이지]
    //======================   
    
    const handleGameType = (value) => {
        if(value === "Ranked" || value === "Single"){
            if(value === "Ranked"){
                setRoundTime(0);
                setBreakTime(0);
                setRoundMin(0);
                setRoundHour(0);
                setRoundDay(0);
                setBreakMin(0);
                setBreakHour(0);
                setBreakDay(0);
            }
            else if (value === "Single"){
                setRoundTime(3);
                setBreakTime(3);
                setRoundMin(3);
                setRoundHour(0);
                setRoundDay(0);
                setBreakMin(3);
                setBreakHour(0);
                setBreakDay(0);
            }
            setGameType(value);
        }
            
    }

    //======================
    //라디오 버튼 함수 - 스코어 메소드 [1페이지]
    //======================   

    const handleScoreMethod = (value) => {
        if (value === "Top Score" || value === "Total Score" || value === "Average Score"){
            setScoreCalculation(value);
    }
    }


    //======================
    //라디오 버튼 함수 - 상금 [2페이지]
    //======================   

    const handlePrizePool = (value) => {
        if (value === "Fee" || value === "Free"){
            if(value === "Free") {
                setPrizeMoneyCheck(true);
                setBalanceCheck(true);
                setRankinPrizePoolCheck(true);
                setPrizeMoney(0);
            }
            else{
                setBalanceCheck(false);
                setPrizeMoneyCheck(false)
            }
            setPrizeMoney("");
            setBalance(0);
            setRankinPrizePool([{prize_money : "",percent : "0.00"}]);
            setPrizePool(value);    
            }

    }


    //======================
    //라디오 버튼 함수 - 입장료 [2페이지]
    //======================   

    const handleEntryFee =(value)=> {
        if (value === "Fee" || value === "Free"){
            if(value === "Free") {
                setEntryFeeMoneyCheck(true);
                setEntryFeeMoney(0);
            }else {
                setEntryFeeMoneyCheck(false);
            }
                setEntryFeeMoney("");
                setEntryFee(value)
            }  
    }
 
    //======================
    //썸네일 변경 함수
    //======================   
    
    const  handleThumbnailImg = (e) => {
        const file = e.target.files[0]
        if(file){
            const fileSizeLimit = 3 * 1024 * 1024;
            const fileSize = file.size;
            if(fileSizeLimit < fileSize){
                e.target.value = null;
                setThumbnailPreview(gameArr.filter((item)=>item.gameName === gameName)[0].thumbnail);
                setThumbnailFile("");
                return false;
            }
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload =(event)=>{
                const fileData = event.target.result;
                setThumbnailPreview(fileData);
                setThumbnailFile(file);
            }

            reader.onerror =(error)=> {
                e.target.value = null;
                setThumbnailPreview(gameArr.filter((item)=>item.gameName === gameName)[0].thumbnail);
                setThumbnailFile("");
                console.log("파일 읽기 오류",error);

            }
        }
       
    }


    //======================
    //게임 타이틀 setter 함수 [1페이지]
    //====================== 
    const handleGameTitle = (e) =>{
        if(e.target.value.length >= 60){
            alert("Tournament name cannot exceed 60 characters.");
            return false;
        }
        setGameTitleCheck(true);
        setGameTitle(e.target.value);
    }

    //======================
    //게임 참여 인원 설정 setter 함수 [1페이지]
    //====================== 
    const handleGamePlayers =(e) => {
        const regexNumber =/^(?:[1-9]\d*|)$/;
        const value = e.target.value;
        if(regexNumber.test(value)){
            if(value > playersMax) {
                alert(`The maximum number of participants for the tournament is ${playersMax}`)
                setPlayersNumber("");
                return false;
        }
            setPlayersNumber(value);
            if(value >= playersMin) setPlayersNumberCheck(true);
            else setPlayersNumberCheck(false);
        }
    }

    //======================
    //날짜 입력 함수 [1페이지]
    //====================== 
    const handleOpenRegistDate = (e) => {
        //--- 등록 오픈 날짜
        if(new Date() <= new Date(e) && (new Date(registCloseDate) > new Date(e) || registCloseDate === "")){
            setRegistOpenDate(e);
        }else {
            setRegistOpenDate(now);
            alert("The registration start date can be set for a time in the future from the current time")
        }
    }
    const handleCloseRegistDate = (e) => {
        //--- 등록 종료 날짜
        if(registOpenDate && new Date(registOpenDate) < new Date(e) && (new Date(e) < new Date(tournamentStartDate) || tournamentStartDate === "")){
            setRegistCloseDate(e);
            setRegistDateCheck(true);
        }else {
            setRegistDateCheck(false);
            setRegistCloseDate("");
            alert("The registration end date can be set after the registration start date")
        }
    }
    const handleStartTNMTDate = (e) => {
        //--- 토너먼트 시작 날짜
        if(registCloseDate && new Date(registCloseDate) < new Date(e) && (new Date(e) < new Date(tournamentEndDate) || tournamentEndDate === "")){
            setTournamentStartDate(e);
        }else if ((!registCloseDate || registCloseDate ==="")){
            alert("The tournament start date should be set after the registration end date")
            setTournamentStartDate("");
        }else {
            setTournamentStartDate("");
            alert("Please set the tournament registration end date")
        }
    }
    const handleEndTNMTDate = (e) => {
        //--- 토너먼트 종료 날짜
        if(tournamentStartDate && new Date(tournamentStartDate) < new Date(e) && new Date(e) > new Date(tournamentStartDate)){
            setTournamentEndDate(e);
            setTournamentDateCheck(true);
        }else if (!tournamentStartDate || tournamentStartDate === ""){
            setTournamentDateCheck(false);
            setTournamentEndDate("");
            alert("Please set the tournament end date")
        }else {
            setTournamentDateCheck(false);
            alert("The tournament end time should be set after the tournament start time")
        }
    }
    
    //======================
    //라운드 타임 및 브레이크 타임 변환 함수 [1페이지]
    //====================== 

    const handleTimeCalc = (type) => {
        let time = 0; 
        if(type ==="round"){
            time += roundMin;
            time += roundHour * 60;
            time += roundDay * 60 * 24;    
            setRoundTime(time);
        }
        else {
            time += breakMin;
            time += breakHour * 60;
            time += breakDay * 60 * 24;    
            setBreakTime(time);
        }
    }

    useEffect(()=>{
        if((roundTime >= 3 && breakTime >= 3 && gameType === "Single") || gameType === "Ranked"){
            setBreakAndRoundTimeCheck(true);
        }else {
            setBreakAndRoundTimeCheck(false);
        }

    },[roundTime,breakTime])




    //======================
    //NFT? 가격 변환? [2페이지]
    //====================== 
    useEffect(()=>{
        let dollar;
        if(prizeNFT.name === TokenNameDataArr[0]) {
            dollar = prizeMoney * 0.75
            setConvertedDollarPrize(dollar);
            }
        else if (prizeNFT.name === TokenNameDataArr[1])  {
            dollar = prizeMoney * 0.90
            setConvertedDollarPrize(dollar);
        }
        if(dollar <= 500) setGradeLevel(0);
        else if(dollar > 500 && dollar <= 2000) setGradeLevel(1);
        else if (dollar > 2000) setGradeLevel(2)
    },[prizeMoney,prizeNFT])

    useEffect(()=>{
        if(entryFeeNFT.name === TokenNameDataArr[0]) setConvertedDollarEntry(entryFeeMoney * 0.75);
        else if (entryFeeNFT.name === TokenNameDataArr[1]) setConvertedDollarEntry(entryFeeMoney * 0.90);
    },[entryFeeMoney,entryFeeNFT])         



    //======================
    //상금 입력 함수 [2페이지]
    //====================== 
    const handlePrizeMoney = (e) =>{
        const regexNumber =/^(?:[0-9]\d*|)$/;
        const value = e.target.value;
        if(regexNumber.test(value)){
            setPrizeMoney(value);
            setBalance(value);
            //!!! 지갑에서 화폐를 가져오는 경우 조건문 추가될 가능성이 있습니다.
            if(value !== 0)
            setPrizeMoneyCheck(true);
            else 
            setPrizeMoneyCheck(false);
        }
    }

    //=======================
    //입장 금액 입력 함수 [2페이지]
    //=======================
    const handleEntryFeeMoney = (e) =>{
        const regexNumber =/^(?:[0-9]\d*|)$/;
        const value = e.target.value;
        if(regexNumber.test(value)){
            setEntryFeeMoneyCheck(true);
            setEntryFeeMoney(value);
            if(!value){
                setEntryFeeMoneyCheck(false);
            }
        }
    }
    
    //=======================
    //최소 인원 입력 함수 [2페이지]
    //=======================
    const handleMinimumParticipant = (e) =>{
        const regexNumber =/^(?:[1-9]\d*|)$/; 
        const value = e.target.value;
         if(playersNumber < value){
            setMinimumParticipant("");
            setMinimumParticipantCheck(false);
            alert("The minimum number of players cannot be less than the number of game players.")
            return false;
        }else if (!regexNumber.test(value)){
            setMinimumParticipantCheck(false);
            setMinimumParticipant("");
            alert("Please enter a number.")
            return false;
        }
        setMinimumParticipantCheck(true);
        setMinimumParticipant(e.target.value);
    }
    //=======================
    //상금 인원 추가 함수 [2페이지]
    //=======================
    const handleAddPrizeMoney = () =>{
        let copy = [...rankingPrizePool];
        copy.push( {prize_money : "",percent : "0.00"})
        setRankinPrizePool(copy);
    }


    //=======================
    //상금 인원 제거 함수 [2페이지]
    //=======================
    const handleSubtractPrizeMoney = (item) =>{
        let copy = [...rankingPrizePool];
        let index = copy.indexOf(item);
        if(index !== -1){
            copy.splice(index,1);
        }
        setRankinPrizePool(copy);
    }

    //=======================
    //랭킹 별 상금 입력 함수 [2페이지]
    //=======================
    const handleEnterPrizeMoney = (e,index) => {
        if( prizeMoney === "" || prizeMoney === "0" || prizeMoney === 0)
            return false;

        const regexNumber =/^(?:[0-9]\d*|)$/;
        const per = (e.target.value / prizeMoney * 100).toFixed(2);
        const value = e.target.value; 

        if(regexNumber.test(value)){ 
            let copy = [...rankingPrizePool];
            let total = prizeMoney;
            for(let i = 0; i < rankingPrizePool.length; i++){
                if(rankingPrizePool[i].prize_money !== "" && i !== index){
                    total = total - parseInt(rankingPrizePool[i].prize_money);
                }
            }
            if(parseInt(value) > total){
                copy[index].prize_money =  total.toString();
                copy[index].percent = (total / prizeMoney * 100).toFixed(2);
                setRankinPrizePool(copy);
            }
            else {
                copy[index].prize_money =  value;
                copy[index].percent = per;
                setRankinPrizePool(copy);
            }
        }
    }
   

    //=======================
    //밸런스 계산하는 useEffect [2페이지]
    //=======================
    useEffect(()=>{
        let total = prizeMoney;
        for(let i = 0; i < rankingPrizePool.length; i++){
            if(rankingPrizePool[i].prize_money !== ""){
                total = total - parseInt(rankingPrizePool[i].prize_money);
            }
        }
        if(total !== "")
        setBalance(total);
        else
        setBalance(0);

        setRankinPrizePoolCheck(true);
        if(prizePool === "Fee"){
            for (let i = 0; i <rankingPrizePool.length; i++){
                if(!(parseFloat(rankingPrizePool[i].percent) >= prizePerMin && rankingPrizePool[i].percent <= prizePerMax)){
                    setRankinPrizePoolCheck(false);
                }
            }
        }
    },[rankingPrizePool])

    useEffect(()=>{
        if(balance === 0){
            setBalanceCheck(true);
        }else {
            setBalanceCheck(false);
        }
    },[balance])

   

    //=======================
    //페이지 이동 함수 [2페이지]
    //=======================
    const handlePage = (page) => {
        window.scrollTo({top: 0});
        setPage(page);
    }



    if(page === 0){
    //==============================
    //토너먼트 생성 첫 번째 페이지
    //==============================
    return <div className="create__enter--box">
                <div className="mb24">
                    <div className="enter__title mb8">Current available number of hosting</div>
                        <InputComponents type="readOnly" Value={2}/>   
                </div>
                <div className="mb24">
                    <div className="enter__title mb8">Game</div>
                        <InputComponents type="readOnly" Value={gameName}/>    
                </div>
                <div className="mb24">
                    <div className="enter__title mb12">Type</div>
                        <div className="content__radio-option">
                            {["Ranked","Single"].map((item,index) => 
                                <div className="radio__box" key={index}>
                                <label className="radio__circle"  onClick={(e)=>{handleGameType(item)}}>
                                    {gameType === item && <div className="radio__inner"></div>}
                                </label>
                                <label className="label__text"  onClick={(e)=>{handleGameType(item)}}>{item}</label>
                            </div>
                            )}
                        </div>
                </div>
                <div className="mb24">
                    <div className="enter__title mb12">Score calculation method</div>
                        <div className="content__radio-option">
                            {["Top Score","Total Score","Average Score"].map((item,index)=>
                                <div className="radio__box" key={index}>
                                <label className="radio__circle"  onClick={(e)=>{handleScoreMethod(item)}}>
                                    {scoreCalculation === item && <div className="radio__inner"></div>}
                                </label>
                                <label className="label__text"  onClick={(e)=>{handleScoreMethod(item)}}>{item}</label>
                            </div>
                            )}
                    </div>
                </div>
                <div className="mb24">
                    <div className="enter__title mb8">Select Network</div>                   
                        <InputComponents type="dropdownV2" Value={gameNetwork} Function={setGameNetwork}/>
                </div>
                <div className="mb24">
                    <div className="enter__title mb8">Title</div>
                        <InputComponents type="input" Value={gameTitle} placeholder={"Enter tournament name"} Function={handleGameTitle} />  
                </div> 
                <div className="mb24">
                    <div className="enter__title mb8">Thumbnail</div>
                    <img src={thumbnailPreview} alt="thumbnail" className="thumbnail__img"/>
                    <input type="file" style={{display : "none"}} id="imgupload" onChange={(e)=>{handleThumbnailImg(e)}} accept="image/*"/>
                    <label htmlFor="imgupload" className="image-upload"><img src={add_a_photo} alt="add"/>Image Upload</label>
                </div>
                <div className="mb24">
                    <div className="enter__title mb8">Players (Minimum 4)</div> 
                    <InputComponents type="input" Value={playersNumber} placeholder={"Enter the number of players"} Function={handleGamePlayers} />     
                </div>
                {gameType === "Single" && 
                <div className="time-settings mb24">
                    <div className="">
                        <div className="enter__title mb8"> Round time (at least 3 minutes)</div>
                        <div className="settings-input__container">
                            <div className="settings-input__box">
                                <div className="input__block">
                                {[{index : 1 , length : 59, Function : setRoundMin , value : roundMin , text : "min"},
                                  {index : 2 , length : 24, Function : setRoundHour, value : roundHour , text : "hr"},
                                  {index : 3 , length : 30, Function : setRoundDay, value : roundDay , text : "day"}].map((item,index)=>
                                <div className="settings-input" key={index}>
                                    <InputComponents type="dropdownScroll" Value={item.value} width="80px" 
                                                     dropdownMenu={Array.from({length : item.length},( _ , index)=> index)} 
                                                     inputNumber={item.index} Function={item.Function}/> 
                                    <span className="color-gray fs14 fw400">{item.text}</span>
                                </div>)}
                                </div>
                                <div className={`color-red fw400 fs12 h12`}>
                                    {roundTime < 3 && "at least 3 minutes"}
                                </div>
                            </div>
                            <div className="settings-done__box">
                                <button className="settings-done__btn" onClick={()=>{handleTimeCalc("round")}}>Done</button>
                                {roundTime} min                
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="enter__title mb8"> Break time (at least 3 minutes)</div>
                        <div className="settings-input__container">
                        <div className="settings-input__box">
                                <div className="input__block">
                                {[{index : 4 , length : 60, Function : setBreakMin , value : breakMin , text : "min"},
                                  {index : 5 , length : 24, Function : setBreakHour, value : breakHour , text : "hr"},
                                  {index : 6 , length : 31, Function : setBreakDay, value : breakDay , text : "day"}].map((item,index)=>
                                <div className="settings-input" key={index}>
                                    <InputComponents type="dropdownScroll" Value={item.value} width="80px" 
                                                     dropdownMenu={Array.from({length : item.length},( _ , index)=> index)} 
                                                     inputNumber={item.index} Function={item.Function}/> 
                                    <span className="color-gray fs14 fw400">{item.text}</span>
                                </div>)}
                                </div>
                                <div className={`color-red fw400 fs12 h12`}>
                                    {breakTime < 3 && "at least 3 minutes"}
                                </div>
                            </div>
                            <div className="settings-done__box">
                                <button className="settings-done__btn" onClick={()=>{handleTimeCalc("break")}}>Done</button>
                                {breakTime} min                
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="date-setting__block mb24">
                    <div className="date-setting__box">
                        <div className="enter__title mb8">Open Registration</div>
                        <InputComponents type="date" Value={registOpenDate} Function={(e)=>{handleOpenRegistDate(e)}} />
                    </div>
                    <img src={arrowRight}alt="" style={{width:"12px", height:"8px",position : "relative", top : "37px"}}/>
                    <div className="date-setting__box">
                        <div className="enter__title mb8">Registration Close</div>
                        <InputComponents type="date" Value={registCloseDate} Function={(e)=>{handleCloseRegistDate(e)}}/>       
                    </div>
                </div>
                <div className="date-setting__block mb24">
                    <div className="date-setting__box">
                        <div className="enter__title mb8">Start of Tournament</div>
                        <InputComponents type="date" Value={tournamentStartDate} Function={(e)=>{handleStartTNMTDate(e)}} />
                    </div>
                    <img src={arrowRight}alt="" style={{width:"12px", height:"8px",position : "relative", top : "37px"}}/>
                    <div className="date-setting__box">
                        <div className="enter__title mb8">End of Tournament</div>
                        <InputComponents type="date" Value={tournamentEndDate} Function={(e)=>{handleEndTNMTDate(e)}}/>
                    </div>
                </div>
                <div className="next-button__container">
                    <Button width={"120px"} height={"40px"} color={"yellow"} text={"BACK"} borderRadius={"24px"} handleClick={()=>navigate(-1)}/>
                    <Button width={"120px"} height={"40px"} color={stepOne ? "yellow" : "gray"} text={"NEXT"} borderRadius={"24px"} handleClick={()=>{handlePage(1)}}/>
                </div>
           </div>
    }else if (page === 1){
    //==============================
    //토너먼트 생성 두 번째 페이지
    //==============================
           return <div className="create__enter--box">
                    <div className="enter__section">
                          <div className="title__font mb24">Prize Setting</div>
                          <div className="mb24">
                            <div className="enter__title mb8">Network</div>                       
                                <InputComponents type={"dropdownV2"} Value={prizeNFT} dropdownMenu={TokenDataArr} Function={setPrizeNFT} inputNumber={0}/>                            
                          </div>
                          <div className="mb24">
                            <div className="enter__title mb12 ">Prize Pool</div>
                                <div className="content__radio-option mb8">
                                    {["Fee","Free"].map((item,index) => 
                                        <div className="radio__box" key={index}>
                                        <label className="radio__circle" onClick={(e)=>{handlePrizePool(item)}}>
                                            {prizePool === item && <div className="radio__inner"></div>}
                                        </label>
                                        <label className="label__text" onClick={(e)=>{handlePrizePool(item)}}>{item}</label>
                                    </div>
                                    )}
                                </div>
                                <div className="enter__NFT--box">
                                    {/* {prizePool === "Free" && <div className="disable-overlay"></div>} */}
                                    <input type="number" className="NFT__input" value={prizeMoney} onChange={handlePrizeMoney} disabled={prizePool === "Free" ? true : false} placeholder="0"/>
                                    <span className="NFT__dollar">${convertedDollarPrize.toFixed(2)}</span>
                                </div>
                        </div>
                        <div className="mb0">
                            <div className="enter__title mb8">Grade</div>
                            <div className="grade-section__container">
                                {["GENERAL","PREMIUM","PLATINUM"].map((item,index)=>
                                <div className={`grade-section__box ${(gradeLevel === index && prizePool === "Fee") && "grade__selected"}`} key={index}>
                                    <GradeBadge grade={item}/>
                                    <span className="NFT__dollar grade__dollar">
                                        {item === "GENERAL" && "$0 ~ $500"}
                                        {item === "PREMIUM" && "$500 ~ $2000"}
                                        {item === "PLATINUM" && "Over $2000"}
                                    </span>
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="enter__section">
                        <div className="title__font mb24">Entry Setting</div>
                            <div className="mb0">
                                <div className="enter__title mb12">Entry Fee</div>
                                <div className="content__radio-option mb8">
                                    {["Fee","Free"].map((item,index) => 
                                        <div className="radio__box" key={index}>
                                            <label className="radio__circle" onClick={(e)=>{handleEntryFee(item)}}>
                                                    {entryFee === item && <div className="radio__inner"></div>}
                                            </label>
                                            <label className="label__text" onClick={(e)=>{handleEntryFee(item)}}>{item}</label>
                                        </div>
                                    )}
                                </div>
                                <div className="enter__content mb8">
                                    <InputComponents type={"dropdownV2"} Value={entryFeeNFT} dropdownMenu={TokenDataArr} Function={setEntryNFT} inputNumber={1}/>
                                </div>
                                <div className="enter__NFT--box entry-setting-option-NFT">
                                    {/* {entryFee === "Free" && <div className="disable-overlay"></div>} */}
                                    <input type="number" className="NFT__input" value={entryFeeMoney} onChange={handleEntryFeeMoney} disabled={entryFee === "Free" ? true : false} placeholder="0"/>
                                    <span className="NFT__dollar">${convertedDollarEntry.toFixed(2)}</span>
                                </div>
                            </div>
                    </div>
                    <div className="enter__section">
                        <div className="title__font mb8">Ranking Prize Pool</div>
                        <div className="title__font-sub mb24">Set 30% to 70% for first place only</div>
                        <div className="mb24">
                            <div className="enter__title mb8">Minimum Participant</div>
                            <div className="enter__title--explanation mb8">
                                Players : {playersNumber === "" ? "error" : playersNumber}
                                <br/>
                                Calculate your expected return
                            </div>
                            <div className="calc__return">
                                <InputComponents type={"input"} Value={minimumParticipant} width="80px" Function={handleMinimumParticipant}/>
                                {entryFee === "Fee" && 
                                <span className="calc__text">
                                    {!isNaN(convertedDollarEntry * parseInt(minimumParticipant).toFixed(2)) ? 
                                    "$" + convertedDollarEntry * parseInt(minimumParticipant).toFixed(2) :
                                    "$0"
                                    }
                                </span>
                                }
                                </div>
                        </div>
                        {prizePool === "Fee" && 
                        <>
                        <div className="mb16">
                            <div className="enter__title mb8">Balance</div>
                            <InputComponents type={"readOnly"} Value={balance} width="250px" textColor={"#FFF"}/>
                            {(balance !== 0 && prizeMoney !== "") && <span className="balance__warning">Prize balance must be $0</span>}
                        </div>
                        <div className="mb0">
                            {rankingPrizePool.map((item,index)=><div className="mb16" key={index}>
                                <div className="ranking__text">
                                    <span className="ranking__number">
                                    {index + 1 === 1 && `${index + 1}st`}
                                    {index + 1 === 2 && `${index + 1}nd`}
                                    {index + 1 === 3 && `${index + 1}rd`}
                                    {index + 1 > 3 && `${index + 1}st`}
                                    </span>
                                        {prizeMoney === 0 || prizeMoney === "0" || prizeMoney === "" ? null :
                                        <>
                                            {item.percent === "0.00" || item.percent === 0  ?  
                                            <span className="prize__per--satisfy">0.00%</span> 
                                            : item.percent >= prizePerMin && item.percent <= prizePerMax ? 
                                            <span className="prize__per--satisfy">
                                                {item.percent}%
                                            </span>
                                            :
                                            <span className="prize__per--insufficient">
                                                {item.percent}%
                                            </span>
                                            }
                                        </>
                                        }
                                    
                                </div>
                                    <div className="ranking__input">
                                        <InputComponents type={"bottomLineInput"} Value={item.prize_money} width="250px" 
                                                         placeholder={index === 0 ? prizeMoney !== "" ? "Please enter between 30% and 70%" : "Please set the prize money" : ""} 
                                                         Function={balance !== "" ? (e)=>{handleEnterPrizeMoney(e,index)} : null}
                                                         />
                                        {index !== 0 && <img src={subtractIcon} onClick={()=>{handleSubtractPrizeMoney(item)}} alt="subtract"/>}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb0">
                            <button className="prize-money-add__button" onClick={(balance > 0)? handleAddPrizeMoney : null }>
                               <img src={addIcon} alt="img"/><span className="add__button--text">Add Prize Money</span>
                            </button>
                        </div> 
                        </>
                        }
                    </div>
                    <div className="next-button__container">
                    <Button width={"120px"} height={"40px"} color={"yellow"} text={"BACK"} borderRadius={"24px"} handleClick={()=>handlePage(0)}/>
                    <Button width={"120px"} height={"40px"} color={stepTwo ? "yellow" : "gray"} text={"NEXT"} borderRadius={"24px"} handleClick={()=>{handlePage(2)}}/>
                </div>
                  </div>
    }else {
        //****************************
        //토너먼트 생성 세 번째 페이지
        //****************************
    
        const createTournament = async () => {
            const formData = new FormData();
            const data = {
                tournament: {
                  game_list_id: gameIdArr[gameName],
                  game_name: gameName,
                  tournament_type: gameType,
                  score_method: scoreCalculation,
                  select_network: "coinbase",
                  tournament_name: gameTitle,
                  players: playersNumber,
                  open_registration: new Date(registOpenDate).toISOString(),
                  registration_close_on: new Date(registCloseDate).toISOString(),
                  start_of_tournament: new Date(tournamentStartDate).toISOString(),
                  tournament_closed: new Date(tournamentEndDate).toISOString(),
                  tx_id: "",
                  description: "",
                  round_time: roundTime,
                  break_time: breakTime,
                  csv_res: "",
                  minimum_player: minimumParticipant,
                  usd: 0,
                  score_range_setting: false,
                  minimum_score: 0,
                  maximum_score: 0,
                  team_type: 0,
                  secret_room: "Normal",
                  password: "",
                  team_select_type: ""
                },
                tournament_prize: {
                  prize_pool: prizePool,
                  adminssion_type: prizeNFT.name,
                  prize_money: prizeMoney === "" ? 0 : prizeMoney,
                  tournament_grade: gradeLevel === 0 ? "General" : gradeLevel === 1 ? "Premium" : "Platinum",
                  entry_fee: entryFee,
                  entry_type: entryFeeNFT.name,
                  entry_fee_money: entryFeeMoney === "" ? 0 : entryFeeMoney
                },
                ranking_prize_pool: prizePool !== "Free" ? rankingPrizePool.map((item,index)=>{
                    const { prize_money } = item;
                    return {prize_money : parseFloat(prize_money) , ranking : index + 1}
                }) : [],
              }
              console.log(data);
              formData.append("payload",JSON.stringify(data));
              formData.append("file",thumbnailFile)

             
                try{
                    const token = Cookies.get("token")
                    const res = await axios.post(`${apiURL}/api/game/tournament`,
                    formData,
                        {
                            headers: {
                            Authorization: "Bearer " + token,
                            },
                         })
                    console.log(res);
                    navigate(`/tournament-list/${gameName}`)
                    
                }catch(e){
                    console.log(e,"토너먼트 생성 오류")
                    setErrorModal(true);
                    let errMessage = e.response.data.detail;
                    //에러 메시지 정리 되면 메시지 별로 처리하기
                    if(errMessage === "Tournament Creation Exceeded")
                        setErrorMessage(errMessage);   
                    else if (errMessage === "Token has expired")
                        setErrorMessage(errMessage);
                    else
                        setErrorMessage("Network Error")
                }
            }
                  
        


        //---map 함수를 사용하기 위한 어레이
        const firstContentArr = [{name : "Game" , content : gameName},
                                 {name : "Type" , content : gameType},
                                 {name : "Score calculation method" , content : scoreCalculation},
                                 {name : "Select Network" , content : gameNetwork.name},
                                 {name : "Title" , content : gameTitle},
                                 {name : "Players" , content : playersNumber},   
                                ]

        const secondContentArr = [{name : "Prize Pool" ,content : prizePool === "Fee" ? prizeMoney + " " + prizeNFT.name : "Free"},
                                  {name : "Grade" , content : gradeLevel === 0 ? "General" : gradeLevel === 1 ? "Preminm" : "Platinum"},
                                  {name : "Entry Fee", content : entryFee === "Fee" ? entryFeeMoney + " " + entryFeeNFT.name : "Free"}
                                ]


        return <div className="create__enter--box">
            {errorModal && <ErrorModal errorMessage={errorMessage} setErrorModal={setErrorModal} />}
            <div className="third-page__box mb24">
                <div className="title__font mb24">Check Information</div>
                {firstContentArr.map((item,index)=>
                    <div className="mb24" key={index}>
                        <div className="enter__title mb12">{item.name}</div>
                        <div className="confirm__font">{item.content}</div>
                    </div>
                    )}
                {gameType === "Single" && 
                <>
                    <div className="mb24">
                        <div className="enter__title mb12">Round time</div>
                        <div className="confirm__font">{roundTime} minutes</div>
                    </div>
                    <div className="mb24">
                        <div className="enter__title mb12">Break time</div>
                        <div className="confirm__font">{breakTime} minutes</div>
                    </div>
                </>}
            </div>
            <div className="third-page__box mb24">
                    <div className="third-page__date--container mb24">
                        <div className="third-page__date--box">
                            <div className="enter__title mb12">Open Registration</div>
                            <div className="confirm__font">{registOpenDate.replace("T"," ")}</div>
                        </div>
                        <img src={arrowRight} alt="img"/>
                        <div className="third-page__date--box">
                            <div className="enter__title mb12">Registration Close</div>
                            <div className="confirm__font">{registCloseDate.replace("T"," ")}</div>
                        </div>
                    </div>
                    <div className="third-page__date--container mb24">
                        <div className="third-page__date--box">
                            <div className="enter__title mb12">Start of Game</div>
                            <div className="confirm__font">{tournamentStartDate.replace("T"," ")}</div>
                        </div>
                        <img src={arrowRight} alt="img"/>
                        <div className="third-page__date--box">
                            <div className="enter__title mb12">Game Closed</div>
                            <div className="confirm__font">{tournamentEndDate.replace("T"," ")}</div>
                        </div>
                    </div>
                    {secondContentArr.map((item,index)=>
                    <div className="mb24" key={index}>
                        <div className="enter__title mb12">{item.name}</div>
                        <div className="confirm__font">{item.content}</div>
                    </div>
                    )}
            </div>
            {prizePool === "Fee" && 
             <div>
                <div className="title__font mb8">Ranking Prize Pool</div>
                <div className="title__font-sub mb24">Set 30% to 70% for first place only</div>
                <div className="mb24">
                    {rankingPrizePool.map((item,index)=>
                        <div className="third__ranking--box mb12" key={index}>
                            <span className="enter__title">
                            {index + 1 === 1 && `${index + 1}st`}
                            {index + 1 === 2 && `${index + 1}nd`}
                            {index + 1 === 3 && `${index + 1}rd`}
                            {index + 1 > 3 && `${index + 1}st`}
                            </span>
                            <span className="third__ranking--font">
                                {item.prize_money}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            }
            <div className="next-button__container">
                    <Button width={"120px"} height={"40px"} color={"yellow"} text={"BACK"} borderRadius={"24px"} handleClick={()=>handlePage(1)}/>
                    <Button width={"120px"} height={"40px"} color={"yellow"} text={"Create"} borderRadius={"24px"} handleClick={()=>{createTournament()}}/>
                </div>            
        </div>
    }
}
    
//우측 WalletStatus Components
const WalletStatus =()=>{

    const status_textArr = [
        {title : <span>KOZMO NFT</span> , value : 0},
        {title : <span>Maximum number of <br/>hosting per day</span> , value : 0},    
        {title : <span>Prize limit</span> , value : 0},
        {title : <span>Participant limit</span> , value : 0},
        ]      

    return <div className="create__wallet--box">
    <div className="box__border--3px">
        <div className="box__content">
            <div className="box__content--title">Wallet Status</div>
            <div className="box__content--content-border">
                <div className="box__content--content">
                    <div className="status__text--container">
                        {status_textArr.map((item,index)=>
                            <div className="status__text--box" key={index}>
                                <div className="status__text">{item?.title}</div>
                                <div className="status__text">{item?.value}</div>
                            </div>
                        )}
                    </div>
                    <div className="nft__information--container">
                        <div>
                            <div className="nft__information--title">
                                <img src={avaxIcon} alt="img"/>AVAX
                            </div>
                            <div className="nft__information--value-box">
                                <div className="nft__information--value-numbers">
                                    <div className="nft__value">1000</div>
                                        <div className="dollar__value">$1,000.51</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="nft__information--title">
                                <img src={kozmoIcon} alt="img"/>KOZMO
                            </div>
                            <div className="nft__information--value-box">
                                <div className="nft__information--value-numbers">
                                    <div className="nft__value">1000</div>
                                    <div className="dollar__value">$1,000.51</div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</div>
}
    