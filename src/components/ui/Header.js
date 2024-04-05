import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ConnectWallet,useConnectionStatus,useAddress } from '@thirdweb-dev/react';
//import Swap from '../pages/Swap';
import GameList from '../../pages/GameList';
import TournamentList from '../../pages/TournamentList';
import TournamentDetail from '../../pages/TournamentDetail';
import MyProfile from "../../pages/MyProfile.js";
import AccountSettings from '../../pages/AccountSettings.js';
import TournamentCreate from '../../pages/TournamentCreate';
import ConnectWalletModal from '../modal/ConnectWalletModal.js';
import KozCompactNFTModal from '../modal/KozCompactNFTModal.js';
import LoadingModal from '../modal/LoadingModal';
import Main from '../../pages/Main';
import Footer from './Footer';
import PreparingModal from '../modal/PreparingModal';
import { apiURL } from '../../data/EnvData.js';
// import TokenStaking from '../pages/TokenStaking';
// import KozmoStaking from '../pages/KozmoStaking';
import './Header.scss';
import logo from '../../assets/images/header-logo.svg';
import alarmIcon from '../../assets/images/alarm-icon.svg';
import avaxIcon from '../../assets/images/NetworkTicker/avaxtoken.svg';
import tCoinIcon from '../../assets/images/t-coin-icon.svg';
import slgCoinIcon from '../../assets/images/koztoken.svg';
import SignUp from '../../pages/SignUp.js';
import axios from 'axios';
import Cookies from 'js-cookie';
const Header = () => {
    
    const navigate = useNavigate();
    const walletAddress = useAddress();
    const connectedStatus = useConnectionStatus();
    const location = useLocation();
    const mMainMenu = document.querySelector('.m-main-menu');
    const [connectWalletModal, setConnectWalletModal] = useState(false);
    const [kozCompactNFTModal, setKozCompactNFTModal] = useState(false);
    const [preparingModal, setPreparingModal] = useState(false);
    const [isLogined, setIsLogined] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [mMenuOnOff, setMmenuOnOff] = useState(false);
    const [PCMode,setPCMode] = useState(null);
    const [userImage,setUserImage] = useState("");
    // 준비중 모달
    
    const handlePreparingModal = () => {
        setPreparingModal((prev) => {
            document.body.style.overflow = 'hidden';
            return !prev;
        });
    };
    // wallet staus 상태
    const [isWallet, setIsWallet] = useState(false);
    const handleWallet = () => {
        setIsWallet((prev) => {
            return !prev;
        });
    };
    const [isUser, setIsUser] = useState(false);
    const [isEarn,setIsEarn] =useState(false);
    // 로그인 상태 
  
    useEffect(() => {
        if(window.innerWidth >= 1024) {
            setPCMode(true);
        }else {
            setPCMode(false);
        }
        function handleResize() {
            if(window.innerWidth >= 1024){
                setPCMode(true);
            }
            if (window.innerWidth >= 1280) {
                setMmenuOnOff(() => {
                    document.body.style.overflow = '';
                    return false;
                });
            }else {
                setPCMode(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
            Cookies.remove("token");
        };
    }, []);
    //====================
    //지갑 연결 시 토큰 발행 및 로그인.
    //====================
    const getTokenAndCheckSignUp = async () =>  {
        try{   
            const tokenData =  await axios.post(`${apiURL}/api/token?wallet_address=${walletAddress}`)
            const userData = await axios.get(`${apiURL}/api/user/`, 
            {
                  headers: {
                  Authorization: `Bearer ${tokenData.data.token}`,
                  },
            })
            Cookies.set("token",tokenData.data.token);
            if(userData.data.name === null) {
                navigate("/sign-up");
                if(location.pathname !== "/sign-up"){
                    navigate("/sign-up")
                }
                setIsLogined(false);
            }else {
                setUserImage(userData.data.picture);
                setIsLogined(true)
            }
        }
        catch(e){
            console.log(e);
        }
    }
    //====================
    //지갑 연결 회원가입 검사
    //====================

    useEffect(()=>{
        const token = Cookies.get("token")
        if(connectedStatus === "connected"  && walletAddress && (isLogined === false || token === undefined ) && location.pathname !== "/sign-up" ){
            getTokenAndCheckSignUp(); 
        }
        else if(connectedStatus === "disconnected"){
            setIsLogined(false);
            Cookies.remove("token");      
        }
    },[walletAddress,location,connectedStatus])

    const handleMmenuOnOff = () => {
        setMmenuOnOff((prevMmenuOnOff) => {
            const newMmenuOnOff = !prevMmenuOnOff;
            if (newMmenuOnOff) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return newMmenuOnOff;
        });
    };
    // const handleMenuClicked = () => {
    //     setMmenuOnOff(() => {
    //         document.body.style.overflow = '';
    //         return false;
    //     });
    // };
    const handleMmenuBackground = (e) => {
        if (e.target === e.currentTarget) {
            console.log(e.target);
            console.log(e.currentTarget);
            setMmenuOnOff((prevMmenuOnOff) => {
                const newMmenuOnOff = !prevMmenuOnOff;
                if (newMmenuOnOff) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
                return newMmenuOnOff;
            });
        }
    };
    return (
        <>
            <div className="header">
                <div className="header-inner">
                    <Link to="/" className="logo">
                        <img src={logo} alt="logo" width={116} height={40} draggable={false} />
                    </Link>
                    <div className="pc-menu">
                        <ul className="main-menu">
                            <li className="main-menu__item">
                                <Link to="game-list" className="menu">
                                    GAME
                                </Link>
                            </li>
                            <li className="main-menu__item">
                                <Link to="#" className="menu" onClick={handlePreparingModal}>
                                    MARKET
                                </Link>
                            </li>
                            {/* <li className="main-menu__item">
                                <Link to="/kozmo-staking" className="menu">
                                    EARN
                                </Link>
                            </li> */}
                            <li className="main-menu__item">
                                <a
                                    href="https://app.uniswap.org/#/?chain=avalanche"
                                    className="menu"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    SWAP
                                </a>
                                {/* <Link to="/swap" className="menu">
                  SWAP
                </Link> */}
                            </li>
                            <li className="main-menu__item">
                                <Link to="#" className="menu" onClick={handlePreparingModal}>
                                    SCAN
                                </Link>
                            </li>
                        </ul>
                        <div className="sub-menu-container">
                            <ul className="sub-menu">
                                <li className="sub-menu__item">
                                    <ConnectWallet className='connect-wallet-button'/>
                                </li>
                                {isLogined && <><li className="logged-in__item">
                                    <button className="alarm">
                                        <span className="material-symbols-outlined">notifications</span>
                                    </button>
                                </li>
                                <li className="logged-in__item">
                                    <button className="profile">
                                        {/* <span className="material-symbols-outlined">account_circle</span> */}
                                        <img src={userImage} alt='user'/>
                                        <ul className='logged-in__item--category'>
                                            <Link to="my-profile" className='category__box page'>My Profile</Link>
                                            <Link to="account-settings" className='category__box page'>Account Settings</Link>
                                        </ul>
                                    </button>
                                </li></>}
                                <li className="sub-menu__item">
                                    <button className="btn-nation">EN</button>
                                </li>
                                {isLogined ? (
                                    <ul className="logged-in-menu">
                                        <li className="logged-in__item">
                                            <button className="btn-wallet-status">
                                                WALLET STATUS
                                                <span className="material-symbols-outlined">expand_more</span>
                                                {/* <ul className='wallet-category'></ul> */}
                                            </button>
                                        </li>
                                    </ul>
                                ) : (
                                    // <ul className="logged-out-menu">
                                    //     <li>
                                    //         <button className="btn--login">Log in</button>
                                    //     </li>
                                    //     <li>
                                    //         <button className="btn--signup">Sign Up</button>
                                    //     </li>
                                    // </ul>
                                    null
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="m-menu">
                        <div className={mMenuOnOff ? 'm-main-menu active' : 'm-main-menu'} onClick={handleMmenuOnOff}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div
                        className={mMenuOnOff ? 'm-main-menu__background active-menu' : 'm-main-menu__background'}
                        onClick={handleMmenuBackground}
                    >
                        <ul className="m-menu-list">
                            <li className="item1 list">
                                <img className="alarm-icon" src={alarmIcon} alt="alarm" />
                                <div className="flag-img"></div>
                                <option name="USA" value="USA">
                                    EN
                                </option>
                            </li>
                            <li className="item2 list">
                                <ConnectWallet className='connect-wallet-button'/>
                            </li>
                            {isWallet ? (
                                <>
                                    <li className="item5 list" onClick={handleWallet}>
                                        <div className="div-flex">
                                            <button className="wallet-status">Wallet Status</button>
                                        </div>
                                        <span className="material-symbols-outlined">expand_less</span>
                                    </li>
                                    <li className="item3 list">
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
                                                <img src={slgCoinIcon} alt="coin" />
                                                <span className="info__number-text">0</span>
                                            </div>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="item5 list" onClick={handleWallet}>
                                        <div className="div-flex">
                                            <button className="wallet-status">Wallet Status</button>
                                        </div>
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </li>
                                </>
                            )}
                            {isLogined && 
                             <>
                                 <li className='item5 list' onClick={()=>{setIsUser((prev)=>!prev)}}>
                                    <div className='div-flex'>
                                            <span className="material-symbols-outlined" style={{marginRight : "4px"}}>account_circle</span>
                                            <span className=''>USER</span>                                 
                                    </div>
                                    <span className="material-symbols-outlined">expand_{isUser ? "less" : "more"}</span>
                                </li>
                                {isUser && 
                                <>
                                    <Link className='item9 list' 
                                          to="/my-profile"
                                          onClick={()=>{ setMmenuOnOff(!mMenuOnOff);
                                            setIsUser((prev)=>!prev)
                                            document.body.style.overflow = '';}}
                                          >
                                            My Profile
                                    </Link>
                                    <Link className='item9 list' 
                                          to="account-settings"
                                          onClick={()=>{ setMmenuOnOff(!mMenuOnOff);
                                            setIsUser((prev)=>!prev)
                                            document.body.style.overflow = '';}}
                                          >
                                            Account
                                    </Link>
                                </>}
                             </>
                            }
                            <li className="item4 list">
                                <Link to="/game-list" 
                                 onClick={() => {
                                    setMmenuOnOff(!mMenuOnOff);
                                    document.body.style.overflow = '';
                                }}>
                                    GAME
                                </Link>
                            </li>
                            <li className="item8 list" onClick={handlePreparingModal}>
                                MARKET
                            </li>
                            {/* <li className='item5 list' onClick={()=>{setIsEarn((prev)=>!prev)}}>
                                    <div className='div-flex'>
                                            EARN                           
                                    </div>
                                    <span className="material-symbols-outlined">expand_{isUser ? "less" : "more"}</span>
                                </li> */}
                            {isEarn && <>
                                <Link className='item9 list' 
                                          to="/kozmo-staking"
                                          onClick={()=>{ setMmenuOnOff(!mMenuOnOff);
                                            setIsEarn((prev)=>!prev)
                                            document.body.style.overflow = '';}}
                                          >
                                            KOZMO Staking
                                    </Link>
                                    <Link className='item9 list' 
                                          to="/token-staking"
                                          onClick={()=>{ setMmenuOnOff(!mMenuOnOff);
                                            setIsEarn((prev)=>!prev)
                                            document.body.style.overflow = '';}}
                                          >
                                            TOKEN Staking
                                    </Link>
                            </>}
                            <li className="item7 list">
                                <a href="https://app.uniswap.org/#/?chain=avalanche" target="_blank" rel="noreferrer">
                                    SWAP
                                </a>
                                {/* <Link to>SWAP</Link> */}
                            </li>
                            <li className="item8 list" onClick={handlePreparingModal}>
                                <Link to>SCAN</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {preparingModal ? (
                <PreparingModal
                    mMainMenu={mMainMenu}
                    preparingModal={preparingModal}
                    setPreparingModal={setPreparingModal}
                />
            ) : null}
                {/* 커넥트 월렛 모달  */}
                {connectWalletModal && <ConnectWalletModal setConnectWalletModal={setConnectWalletModal} setKozCompactNFTModal={setKozCompactNFTModal}/>}
                {/* KOZ COMPACT NFT 모달  */}
                {kozCompactNFTModal &&  <KozCompactNFTModal setKozCompactNFTModal={setKozCompactNFTModal}/>}
                {/*로딩 모달 */}
                {isLoading && <LoadingModal />}
            <Routes>
                <Route path="/" element={<Main handlePreparingModal={handlePreparingModal} 
                                               setConnectWalletModal={setConnectWalletModal}
                                               setKozCompactNFTModal={setKozCompactNFTModal}
                                        />}
                                        >    
                                        </Route>
                {/* <Route
                    path="/kozmo-staking"
                    element={<KozmoStaking isLogined={isLogined} setIsLogined={setIsLogined} />}
                ></Route> */}
                {/* <Route path="/token-staking" element={<TokenStaking PCMode={PCMode}/>}></Route> */}
                <Route path="/game-list" element={<GameList isLogined={isLogined} setIsLoading={setIsLoading}/>}></Route>
                <Route path="/tournament-list/:gameName" element={<TournamentList isLogined={isLogined} setIsLoading={setIsLoading}/>}/>
                <Route path="/tournament/:gameName/:itemId" element={<TournamentDetail isLogined={isLogined} setIsLoading={setIsLoading}/>} />
                <Route path="/account-settings" element={<AccountSettings isLogined={isLogined} setIsLoading={setIsLoading}/>} />
                <Route path="/tournament-create/:gameName" element={<TournamentCreate isLogined={isLogined} setIsLoading={setIsLoading}/>}/>
                <Route path="/sign-up" element={<SignUp isLogined={isLogined}/>}/>
                <Route path="/my-profile" element={<MyProfile mode="profile" isLogined={isLogined} setIsLoading={setIsLoading} setUserImage={setUserImage}/>}/>
                <Route path="/statistics" element={<MyProfile mode="statistics" />}/>
                {/* <Route path="/swap" element={<Swap />}></Route> */}
            </Routes>
            <Footer handlePreparingModal={handlePreparingModal} />
        </>
    );
};
export default Header;