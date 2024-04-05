import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import { apiURL } from '../data/EnvData';
import InputComponent from "../components/ui/InputComponents";

import '../styles/GameList.scss';
import swordIcon from '../assets/images/GameList/sword.svg';
import axios from 'axios';
import ErrorModal from '../components/modal/ErrorModal';
import Cookies from 'js-cookie';

const GameList = ({isLogined,setIsLoading}) => {


    const [gameListData, setGameListData] = useState([])
    const [toggle, setToggle] = useState('All');
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    
    //=========================
    //핸들 조작 함수
    //=========================

    const handleSwitch = (parameter) =>{
        if(parameter === "All") setToggle("All");
        else setToggle("Connected");
    }


    //=========================
    //게임 리스트 데이터 GET 함수
    //=========================
    const getGameList = async () => {
        try{
             setIsLoading(true);
             const res = await axios.get(`${apiURL}/api/game/list?search=${search}`)
             setGameListData(res.data);
             setIsLoading(false);
        }
        catch(e){
            console.log("error",e);
        }
    }

    //=========================
    //커넥트 된 게임 리스트 데이터 GET 함수
    //=========================

    const getConnectedGameList = async ()=>{
        if(isLogined){
            try{
                const res = await axios.get(`${apiURL}/api/user/game/connection`,        
                {
                    headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
                )
                setGameListData(res.data);
        }
        catch(e){
            console.log("error",e);
            setGameListData([]);
        }
        }
        else {
            setGameListData([]);
        }
    }

    //=========================
    //스위치 조작 시 실행 함수
    //=========================

    useEffect(()=>{
        if(toggle === 'All') getGameList();
        else getConnectedGameList();
    },[toggle])


    return (
        <div className="game-list">
            <div className="game-list-inner">
                <div className="game-list-inner__title">
                    GAME LIST
                    <img src={swordIcon} alt="gamelist icon" />
                </div>
                <SwitchAndSearch toggle={toggle} handleSwitch={handleSwitch} setSearch={setSearch} search={search} getGameList={getGameList}/>
                <GameCircle gameData={gameListData} navigate={navigate} isLogined={isLogined}/>
            </div>
        </div>
    );
};

export default GameList;





const SwitchAndSearch = ({toggle,handleSwitch,setSearch,search,getGameList}) => {
    return (
        <div className="game-list-inner__switch-search-container">
            <div className="game-list-inner__switch-block">
                <div className="game-list-inner__switch-container">
                <div className="game-list-inner__switch-box">
                    <div className="game-list-inner__switch-text" onClick={()=>{handleSwitch("All")}}>All</div>
                    <div className="game-list-inner__switch-text" onClick={()=>{handleSwitch("Connected")}}>Connected</div>
                    <Button position={"absolute"} 
                            color={"yellow"} 
                            borderRadius={"86px"} 
                            addClass={toggle} 
                            padding={"4px"}
                            custom1={{width : "50%",height : "100%" , transition : "all 0.3s"}}
                            />
                </div>
                </div>
            </div>
            <div className="game-list-inner__search-block">
                <div className="game-list-inner__search-box">
                    <InputComponent type={"search"} Function={setSearch} placeholder={"Game search"} Value={search} searchFunction={getGameList}/>
                </div>
            </div>
        </div>
    );
};

const GameCircle = ({ gameData,navigate,isLogined }) => {
    return (
        <>
        {gameData.length > 0  ? <div className="game-list-inner__list-container">
            {gameData.map((item, index) => (
                <div className="game-list-inner__game-circle" key={item.id}>
                    <div className="game-list-inner__game-circle--overlay" onClick={()=>{navigate(`/tournament-list/${(item.name).replace(" ","-")}`)}}>
                        <span className="overlay-text">{item.name}</span>
                    </div>
                    <img src={item.image} alt="game" />
                </div>
            ))}
        </div> : isLogined === true && gameData.length === 0 ?
        <div className='game-list-inner__no-list-container'>
                No data available for the connected game
        </div> : <div className='game-list-inner__no-list-container'>
                Connect your account
        </div>
        }
        </>
    );
};
