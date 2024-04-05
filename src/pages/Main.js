import { useState, useEffect } from "react";

import BuyNftModalCompact from "../components/modal/BuyNftModalCompact";
import {
  TOKEN_CONTRACT,
  KOZMO_NFT,
  FOUNDERS_STAKING,
  COMPACT_STAKING,
} from "../contract/contract";
import { compactAbi } from "../contract/compactAbi";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { kozNftAbi } from "../contract/kozNftAbi";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button.js";
import { apiURL } from "../data/EnvData.js";

import ProgressBar from "react-bootstrap/ProgressBar";
import mainGameDummyData from "../data/mainGameDummyData";

import "../styles/Main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ptnersavalanche from "../assets/images/Partners/logo_avalanche.png";
import ptnermeta from "../assets/images/Partners/logo_metamask.png";
import ptnercoinbase from "../assets/images/Partners/logo_coinbasewallet.png";
import ptnerwalletconnect from "../assets/images/Partners/logo_walletconnect.png";
import welcomKozmo from "../assets/images/image 129.png";
import todaytourimg from "../assets/images/todaytourimg.svg";
import gameListSord from "../assets/images/gameListSord.svg";
import wintrophy from "../assets/images/wintrophy.png";
import avaxIconRound from "../assets/images/avax-token-round.svg";
import avaxIcon from "../assets/images/NetworkTicker/avaxtoken.svg";
import tCoinIcon from "../assets/images/t-coin-icon.svg";
import kozCoinIcon from "../assets/images/koztoken.svg";
import axios from "axios";

const Main = ({ handlePreparingModal,setConnectWalletModal,setKozCompactNFTModal }) => {

  const navigate = useNavigate();

  const [accumulatedData, setAccumulatedData] = useState({})
  const [todayTournamentData,setTodayTournamentData] = useState([]);
  const [winnerData,setWinnerData] = useState([]);
  const [gameListData,setGameListData] = useState([]);




  const address = useAddress(); // 계정 연결 상태 undefined or 지갑주소값
  const [isBuyCompact, setIsBuyCompact] = useState(false);
  
  // 컨트랙트
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT);
  const { contract: nftContract } = useContract(KOZMO_NFT);
  // const { contract: nftContract } = useContract(KOZMO_NFT, kozNftAbi);
  const { contract: compactStaking } = useContract(COMPACT_STAKING);
  // const { contract: compactStaking } = useContract(COMPACT_STAKING, compactAbi);

  // 소유한 KOZ 수량
  const { data: kozData, kozIsLoading } = useContractRead(
    tokenContract,
    "balanceOf",
    [address]
  );

  const kozBalance = kozData
    ? (parseInt(kozData._hex, 16) / 10 ** 18).toFixed(2)
    : 0;

  // 프로그래스바 이용 TOKEN ID 0 = founders, 1 = compact
  const { data: claimConditionCompact } = useActiveClaimCondition(
    nftContract,
    1
  );

  console.log(claimConditionCompact);

  const nftPriceCompact = claimConditionCompact
    ? parseInt(claimConditionCompact.price._hex, 16) / 10 ** 18
    : 0;

  console.log(nftPriceCompact);

  const claimCurrentDataCompact = claimConditionCompact
    ? claimConditionCompact.currentMintSupply
    : 0;

  console.log("현재 팔려있는 컴포트양", claimCurrentDataCompact);
  console.log("현재 팔려있는 컴포트양 타입", typeof claimCurrentDataCompact);

  const claimMaxDataCompact = claimConditionCompact
    ? claimConditionCompact.maxClaimableSupply
    : 0;

  console.log("최대공급량컴팩트", claimMaxDataCompact);
  console.log("최대공급량컴팩트 타입", typeof claimMaxDataCompact);

  const claimPercentCompact = claimConditionCompact
    ? (
        (parseInt(claimCurrentDataCompact) / parseInt(claimMaxDataCompact)) *
        100
      ).toFixed(2)
    : 0;

      //=========================
      //누적데이터 GET함수
      //=========================

      const getKozmoGameCount = () => {
          axios
            .get(`${apiURL}/api/game/info`)
            .then((res)=>{
              setAccumulatedData(res.data);
            })
            .catch((e)=>{
              console.log(e);
            })
          }

      //=========================
      //당일 개설된 게임 GET함수
      //=========================


      const getTodayTournament = () => {
        axios
          .get(`${apiURL}/api/game/today/play/tournament`)
          .then((res)=>{
            setTodayTournamentData(res.data);
            console.log(res.data);
          })
          .catch((e)=>{
            console.log(e);
          })
      }

      //=========================
      //게임리스트 GET함수
      //=========================


      const getGameList = () =>{
        axios
          .get(`${apiURL}/api/game/list`)
          .then((res)=>{
            setGameListData(res.data);
          })
          .catch((e)=>{
            console.log(e);
          })
      }

      //=========================
      //최근 4인의 우승자 GET함수
      //=========================

      const getWinnerData =() => {
        axios
        .get(`${apiURL}/api/game/tournament/latest/winner`)
        .then((res)=>{
          setWinnerData(res.data);
        })
        .catch((e)=>{
          console.log(e);
        })
      }



      useEffect(()=>{
        getKozmoGameCount();
        getTodayTournament();
        getGameList();
        getWinnerData();
      },[])


  return (
    <> 
      <div className="main">
        {/* 메인 컨테이너 시작  */}
        <div className="main-inner">
          <div className="main-container">
            {/* 첫화면 시작 */}
            <div className="main-container__main">
              <div className="main_description">
                <p>Collect. Battle. Play</p>
                <p>with your NFTs</p>
              </div>
              <div className="circle">
                <img src={welcomKozmo} alt="welcomImg" draggable={false} />
              </div>
            </div>
            {/* 첫화면 끝 */}

            {/* 현재재 상황 인포 띠 시작 */}
            <ul className="current-info">
              <li className="current-info__item--border3px">
                <div className="current-info__item">
                  <div className="current-info__item-box--border3px">
                    <div className="current-info__item-box">
                      <div className="info__number-text">{accumulatedData.total_cumulative_players}</div>
                      <span className="info__text">Participant</span>
                    </div>
                  </div>
                </div>
              </li> <li className="current-info__item--border3px">
                <div className="current-info__item">
                  <div className="current-info__item-box--border3px">
                    <div className="current-info__item-box">
                      <div className="info__number-text">{accumulatedData.in_progress_games}</div>
                      <span className="info__text">Current Tournament</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="current-info__item--border3px">
                <div className="current-info__item">
                  <div className="current-info__item-box--border3px">
                    <div className="current-info__item-box">
                      <div className="info__number-text">{accumulatedData.completed_games}</div>
                      <span className="info__text">Finished Tournament</span>
                    </div>
                  </div>
                </div>
              </li>
              <div className="current-info__item--border3px">
              <div className="current-info__item">
                <div className="current-info__item-box--border3px">
                  <div className="current-info__item-box special">
                    <div className="number-text__box">
                      <div className="coin-box">
                        <img src={tCoinIcon} alt="t-coin" />
                        <span className="info__number-text">0</span>
                      </div>
                      <div className="coin-box">
                        <img src={avaxIcon} alt="coin" />
                        <span className="info__number-text">0</span>
                      </div>
                      <div className="coin-box">
                        <img src={kozCoinIcon} alt="coin" />
                        <span className="info__number-text">0</span>
                      </div>
                    </div>
                      <span className="info__text">
                        Accumulated
                        <br />
                        prize money
                      </span>
                  </div>
                </div>
               </div>
              </div>
            </ul>
            {/* 현재재 상황 인포 띠 끝*/}

            {/* Today Tournament 시작 */}
            <div className="today-tournament">
              <span></span>
              Today Tournament &nbsp;
              <img src={todaytourimg} alt="todaytourimg" />
            </div>

             {todayTournamentData.length > 0 ?  
             <div className="tt-container-grid"> 
                  {todayTournamentData.map((item)=> 
                  <div className="tt-container_cell">
                    <div className="black"></div>
                    <img src={item?.thumbnail} alt="tt1" className="ttimg" />
                    <div className="title">
                      <span className="title__text">
                      {item?.game_name} <span className="text__sample">{item?.kind}</span>
                      </span>
                      <Button width={"144px"} 
                              height={"48px"} 
                              color={"yellow"} 
                              fontSize={"25px"} 
                              text={"JOIN"} 
                              borderRadius={"24px"} 
                              padding={"0px"}
                              handleClick={()=>{navigate(`/tournament-list/${item.game_name.replace(" ","-")}`)}}
                              />
                    </div>
                  </div>
              )}</div> : 
              <div className="no-data__today-game">
                  no data
              </div>
              }
           
            {/* Today Tournament 끝 */}

            {/* RECENT WINNERS start */}
            <div className="recentWin-container">
              <div className="win-intro-box">
                <div className="title">
                  RECENT WINNERS
                  <img src={wintrophy} alt="wintrophy" />
                </div>
                <div className="title-sub">
                  <p>
                    We update our site regularly; more and more winners are
                    added every day! To locate the most recent winner's
                    information
                  </p>
                </div>
              </div>
             

                {winnerData.length > 0 ?  <div className="grid-win-user-info-box"> 
                  {winnerData.map((item) => <div className="cell-border3px">
                  <div className="cell">
                    <div className="cell__userInfo">
                      <div className="cell__userName">USER1</div>
                      <div className="cell__wallet">#5747e7541</div>
                    </div>
                    <div className="cell__date">04.28.2023</div>
                    <div className="winer-amount">
                      <div>1.299 AVAX</div>
                      <img src={avaxIconRound} alt="icon" />
                    </div>
                  </div>
                </div>)}
                </div> : 

                <div className="no-data__winner">
                    no data
                </div>
                }
               
              
                     
            </div>
            {/* RECENT WINNERS end */}

            {/* Game List 시작 */}
            <Link className="today-tournament" to="/game-list">
              <span></span>
              GAMELIST &nbsp;
              <img src={gameListSord} alt="todaytourimg" />
            </Link>
               {gameListData.length > 0 ? 
               <div className="main__game-list">
                {gameListData.map((item) => (
                   <ul className="list">
                  <Link className="list__item" key={item?.id} to={`/tournament-list/${item.name.replace(" ","-")}`}>
                    <img className="game-img" src={item?.image} alt="game" />
                    <div className="item__sample-box">
                      <span className="sample-box__text">{item?.name}</span>
                    </div>
                  </Link>
                  </ul>))}
                </div>
                : <div className="no-data__game-list">
                  no data
                  </div>}
        
            {/* Game List 끝 */}
          </div>
        </div>
        {/* 메인 컨테이너 끝 */}
        {/* 파트너 시작 */}
        <div className="partners">
          <div className="partners__main">
            <img src={ptnersavalanche} alt="partner" />
            <img src={ptnermeta} alt="partner" />
            <img src={ptnercoinbase} alt="partner" />
            <img src={ptnerwalletconnect} alt="partner" />
          </div>
        </div>
        {/* 파트너 끝 */}

        {/* class main end */}
      </div>
      {isBuyCompact ? (
        <BuyNftModalCompact
          isBuyCompact={isBuyCompact}
          setIsBuyCompact={setIsBuyCompact}
          claimMaxDataCompact={claimMaxDataCompact}
          kozBalance={kozBalance}
        />
      ) : null}
    </>
  );
};
export default Main;
