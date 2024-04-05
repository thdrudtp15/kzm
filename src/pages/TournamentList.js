import { useState,useEffect, useMemo } from 'react';
import React,{memo} from 'react';

import { useParams,useNavigate } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';

import Button from '../components/ui/Button';
import CardList from '../components/ui/CardList';
import InputComponents from '../components/ui/InputComponents';
import { gameNameArr,gameBannerArr,gameIdArr } from '../data/gameData';
import { apiURL } from '../data/EnvData';

import '../styles/TournamentList.scss';
import styles from "../styles/Common.module.scss";
import axios from 'axios';


const TournamentList = ({isLogined,setIsLoading}) =>{

    

    const navigate = useNavigate();
    const gameName = useParams().gameName.replace("-"," ");
    const [tournamentListData,setTournamentListData] = useState([]);
    const [bannerImg,setBannerImg]=useState("");
    const [selectedGrade , setSelectedGrade] = useState("All");
    const [search, setSearch] = useState("");
    const [page,setPage] = useState(1)

    
    //=======================
    //토너먼트 리스트 데이터 GET함수
    //=======================
    const getTournamentListData = async () => {
        try{
            setIsLoading(true);
            setPage(1);
            const res = await axios.get(`${apiURL}/api/game/${gameIdArr[gameName]}/tournament?grade=${selectedGrade === "All" ? "" : selectedGrade}&search=${search}&page=${1}`)
            setTournamentListData(res.data);
            setIsLoading(false);
        }catch(e){ 
            console.log(e);    
        }
    }

    //=======================
    //등급 및 페이지 변경 시 실행 시키는 useEffect
    //=======================
    useEffect(()=>{
        getTournamentListData();
    },[selectedGrade])
    


    //=======================
    //게임 배너 이미지 설정 및 URL 유효성 검사.
    //=======================
    useEffect(()=>{
        window.scrollTo({top : 0})
        if(!gameNameArr.includes(gameName)){
            navigate("/");
            return;
        }else {
            try{
            setBannerImg(gameBannerArr[gameName]);
            }
            catch(e){
                setBannerImg("");
            }
        }
    },[])
    

    //=======================
    //페이지 업 함수 (MORE 버튼)
    //=======================

    const getTournamentListDataMore = async () => {
        try{
            //setIsLoading(true)
            const res = await axios.get(`${apiURL}/api/game/${gameIdArr[gameName]}/tournament?grade=${selectedGrade === "All" ? "" : selectedGrade}&search=${search}&page=${page+1}`)
            if(res.data.length !== 0){
                setTournamentListData([...tournamentListData,...res.data]);
                setPage(page + 1)
            }
            //setIsLoading(false);
        }catch(e){ 
            console.log(e);    
        }
    }

    const moreHandler = () => {
        getTournamentListDataMore();
    }


    const CardListMemo = useMemo(()=>{
        return <div className='card-inner'> 
            <CardList data={tournamentListData} gameName={gameName} moreHandler={moreHandler}/>
            </div>
    },[tournamentListData])
    
    return <div className='TournamentList'>
        <TournamentTop  navigate={navigate} gameName={gameName} bannerImg={bannerImg} isLogined={isLogined}/>
        <InputArea selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} setSearch={setSearch} search={search} getTournamentListData={getTournamentListData}/>
        {/* 카드리스트는 컴포넌트에 위치합니다. */}
        {CardListMemo}
    </div>
}

export default  TournamentList;

//==============================
//상단 배너
//==============================


const TournamentTop = ({navigate, gameName,bannerImg,isLogined}) =>{
    return  <div className='TournamentList__banner'>
                <div className='TournamentList__banner--content-box'>
                    <div className='TournamentList__banner--game-name'>{gameName}</div>
                    <div className='TournamentList__banner--create-button'>
                        <Button width={"288px"} 
                                height={"36px"} 
                                color={"yellow"} 
                                borderRadius={"24px"} 
                                text={isLogined === false ? <ConnectWallet className={styles.connect_wallet_btn__30px}/> : "Create"} 
                                handleClick={ isLogined === false ? null : ()=>{navigate(`/tournament-create/${gameName.replace(" ","-")}`)}} />
                    </div>
                </div>
                <img src={bannerImg} alt='banner'></img>
            </div>
}

//==============================
//인풋
//==============================



const InputArea = ({selectedGrade,setSelectedGrade,setSearch,search,getTournamentListData}) => {
    const dropdownMenu = ["All","General","Premium","Platinum"];
            
    return <div className='TournamentList__input'>
    <div className='TournamentList__input-block left'>
        <div className="TournamentList__input-box">
            <InputComponents type={"dropdown"} Value={selectedGrade} Function={setSelectedGrade} dropdownMenu={dropdownMenu}/>
        </div>
    </div>
    <div className='TournamentList__input-block right'>
        <div className="TournamentList__input-box">
            <InputComponents type={"search"} placeholder={"Search a Tournament"} Function={setSearch} Value={search} searchFunction={getTournamentListData}/>
        </div>
    </div>
</div>

}