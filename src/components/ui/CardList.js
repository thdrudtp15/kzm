import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { TokenImgArr } from "../../data/TokenDataArr"
import GradeBadge from "./GradeBadge";

import "./CardList.scss";
import coin from "../../assets/images/CardList/coin.svg";
import kozmoCoinImg from "../../assets/images/NetworkTicker/koz-token.svg"

const CardList =({data,padding,gameName,moreHandler})=>{  
    const [oneSecondsRender,setOneSecondsRender] = useState(true)

    //======================
    //남은 시간 랜더링을 위한 useEffect
    //======================
    useEffect(()=>{
        let interval = setInterval(()=>{
            setOneSecondsRender((prev)=>!prev)
        },1000)
        return ()=>{clearInterval(interval)}
    },[])

    if(data?.length > 0){
        return <div className="cardlist__container">
                    <div className="cardlist__inner" style={{padding : padding}}>
                        {data?.map((item,index)=> <GameCard key={item.id} item={item} gameName={gameName.replace(" ","-")}/>)}
                    </div>
                    <div className="cardlist__more--container">
                        <button className="cardlist__more-button" onClick={moreHandler}>
                            MORE
                            <span className="material-symbols-outlined expand">expand_more</span>   
                        </button>
                    </div>
                </div> 
    }else {
        return <div className="cardlist__none-data">
            No game activity is present
        </div>
    }
}

export default CardList



const GameCard = ({item}) => {
    const navigate = useNavigate();
    // const item = {"id": 1663,
    //         "tournament_name": "Weekly Regular Competition - Ranked Top Score",
    //         "tx_id": "0xd488286d368a38ac33aec0fd4b277f1fd0d073d3fc7a64c214cec24622a4937c",
    //         "description": "Maximum 30 Players",
    //         "thumbnail": "https://imagedelivery.net/4PX95f69rbnt9ok_BnJEAA/f40b2fd9-b0c7-4599-006b-dd0e71686c00/public",
    //         "players": 30,
    //         "tournament_type": "Elimination",
    //         "score_method": "Average Score",
    //         "status": "registration_ing",
    //         "open_registration": "2023-12-30T16:33:00",
    //         "registration_close_on": "2023-12-30T16:55:00",
    //         "start_of_tournament": "2023-12-30T17:00:00",
    //         "tournament_closed": "2023-12-30T17:45:00",
    //         "score_range_setting": false,
    //         "minimum_score": null,
    //         "maximum_score": null,
    //         "team_type": null,
    //         "hole_type": "all",
    //         "game_name": "MIRACLE GOLF",
    //         "secret_room": "Normal",
    //         "team_select_type": "Random",
    //         "prize_money": 700,
    //         "adminssion_type": "MPT",
    //         "participant_cnt": 14,
    //         "entry_fee_money": 0,
    //         "entry_type": "MPT",
    //         "tournament_grade": "general"}
    
        const [prizeMoneyImg , setPrizeMoneyImg] = useState("");
        const [entryMoneyImg , setEntryMoneyImg] = useState("");
        const [endTime , setEndTime] = useState("");
        const [statusMessage,setStatusMessage] = useState("");
        let hours = "--"
        let minutes = "--"
        let seconds = "--"
        useEffect(()=>{
            
            switch(item.adminssion_type){
                case "KozmoToken" :
                    setPrizeMoneyImg(coin)
                    break;
                case "KOZ" : 
                    setPrizeMoneyImg(coin)
                    break;
                // default : 
                //     navigate("/")
            }

            switch(item.entry_type){
                case "KozmoToken" :
                    setEntryMoneyImg(kozmoCoinImg)
                    break;
                case "KOZ" :
                    setEntryMoneyImg(kozmoCoinImg)
                    break;
                default : 
            }
            switch(item.status){
                case "registration_before" : 
                    setStatusMessage("Time left up to registration");  
                    setEndTime(item.open_registration);        
                    break;
                case "registration_ing" : 
                    setStatusMessage("Time left up to registration completion");  
                    setEndTime(item.registration_close_on);          
                    break;
                case "game_before" : 
                    setStatusMessage("Time left up to the game starts");      
                    setEndTime(item.start_of_tournament);       
                    break;
                case "game_ing" : 
                    setStatusMessage("Time left up to the game ends"); 
                    setEndTime(item.tournament_closed);             
                    break;
                case "game_after" : 
                    setStatusMessage("Finishing");                
                        break;
                case "complt" : 
                    setStatusMessage("Completed Game");                 
                        break;
                case "cancel" : 
                    setStatusMessage("Canceled");                 
                        break;
                case "cancel_ing" : 
                    setStatusMessage("Canceling");                  
                        break;
                case "complt_ing" : 
                    setStatusMessage("Finishing");
                        break;
              }
        },[])

        //======================
        //남은 시간 계산
        //======================

        if(item.status === "registration_before" ||
           item.status === "registration_ing" ||
           item.status === "game_before" || 
           item.status === "game_ing" ){   
            const remainingTime = new Date(endTime) - new Date();
            if(remainingTime > 0 && typeof remainingTime === "number"){
                seconds = Math.floor((remainingTime / 1000) % 60);
                minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                hours = Math.floor((remainingTime / (1000 * 60 * 60))); 
            }
            else {
                hours = "00";
                minutes = "00";
                seconds = "00";
            }
        }
       
    return <div className="cardlist__inner--card-border-3px" onClick={()=>{navigate(`/tournament/${item.game_name.replace(" ","-")}/${item.id}`)}}>
    <div className="cardlist__content-card-border-9px">
        <div className="cardlist__content-box">
            <div className="cardlist__content top">
                <div className="cardlist__content--image">
                    <div className="cardlist__type-text game-type">{item.tournament_type}</div>
                    <div className="cardlist__type-text score-type">{item.score_method}</div>
                    <img src={item.thumbnail} alt="thumbnail" draggable={false}/>
                </div>
                <div className="cardlist__content--prize">
                    <div className="cardlist__content--prize-content prizepool">
                        <div className="prizepool-text">Prize Pool</div>
                        <div className="usdt-text">
                            <img src={TokenImgArr[item.adminssion_type]} alt="img"></img> {item.prize_money} {item.adminssion_type}
                        </div>
                    </div>
                    <div className="cardlist__content--prize-content grade">
                        <GradeBadge grade={item.tournament_grade}/>
                    </div>
                </div>
            </div>
            <div className="cardlist__content middle">
                <div className="cardlist__content--title">
                    <div className="title-text">
                       {item.tournament_name}
                    </div>
                </div>
                <div className="cardlist__content--playerAndEntry">
                    <div className="content__player-entry">
                        <div className="content__title-text">Player</div>
                        <div className="content__value-text">
                            {item.participant_cnt} / {item.players}
                        </div>
                    </div>
                    <div className="content__player-entry">
                        <div className="content__title-text">Entry Fee</div>
                        <div className="content__value-text">
                          {item.entry_fee_money > 0 ? <>
                                <img src={entryMoneyImg} alt="coin" draggable={false}/>
                                    {item.entry_fee_money}  {item.entry_type}
                           </> : 
                           "Free" 
                           //프리에도 이미지가 하나 있으면 더 좋을 것 같다.
                           }
                        </div>
                    </div>
                </div>
            </div>
            <div className="cardlist__content bottom">
               <div className="content__status-text">{statusMessage}</div>
               {item.status === "registration_before" ||
                item.status === "registration_ing" ||
                item.status === "game_before" ||
                item.status === "game_ing" ?
                <div className="content__time-text">
                    {hours.toString().padStart(2,"0")} : {" "}
                    {minutes.toString().padStart(2,"0")} : {" "}
                    {seconds.toString().padStart(2,"0")}
               </div> : ""}
            </div>
        </div>
    </div>
</div>
}