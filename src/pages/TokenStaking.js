import { useState } from "react";

//import { useAcceptDirectListingOffer } from "@thirdweb-dev/react";

import Button from "../components/Button.js";
import InputComponents from "../components/InputComponents";

import "../styles/TokenStaking.scss";
import bannerImg from "../assets/images/token-staking-banner.png";
import kozmoIcon from "../assets/images/NetworkTicker/koz-token.svg";


const TokenStaking = ({PCMode}) => {

    const [dropDown , setDropDown] = useState(0);
    const handleDropDown = (index) =>{
            setDropDown(index);
    }
    console.log(dropDown);
    return <div className="TokenStaking">
        <div className="token-staking__banner--container" style={{background : `url(${bannerImg})`}}>
            <div className="banner__title mb40 fs30">TOKEN STAKING</div>
            <div className="banner__balance fs18 mb12">Your Balance</div>
            <div className="banner__token fs24 color-yellow">1318.89 KOZ</div>
        </div>
        <div className="token-staking__inner--container">
            {[1,2,3].map((item,index)=>
            {return PCMode ? 
            //======================
            // PC 버전에서의 랜더링
            //======================
            <div className="token__information--box">             
                <div className="preview__box--PC">
                    <div className="preview__box--info">
                        <div className="token__name-image">
                            <img src={kozmoIcon} alt="img"/>
                            <span className="fs14 fw500">KOZ TOKEN</span>
                        </div>
                        <div className="token__value">
                            <div className="fs14 fw400 color-gray">Staking Pool Size</div>
                            <div>
                                <span className="fs16 fw500">1,736.532</span>
                                &nbsp;&nbsp;
                                <span className="fs16 fw500 color-purple">KOZ</span>
                            </div>
                        </div>
                        <div className="token__value">
                            <div className="fs14 fw400 color-gray">Reward Rate</div>
                            <div>
                                <span className="fs16 fw500">250%</span>
                            </div>
                        </div>
                        <div className="token__value">
                            <div className="fs14 fw400 color-gray">Your Staked</div>
                            <div>
                                <span className="fs16 fw500">1,736.532</span>
                                &nbsp;&nbsp;
                                <span className="fs16 fw500 color-purple">KOZ</span>
                            </div>
                        </div>
                        <div className="token__value">
                            <div className="fs14 fw400 color-gray">My KZTO</div>
                            <div>
                                <span className="fs16 fw500 color-gray2">980</span>
                                &nbsp;&nbsp;
                                <span className="fs16 fw500 color-green">KOZ</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button  color={"yellow"} 
                                 borderRadius={"21.6px"} 
                                 width={"108px"} height={"36px"} 
                                 text={<span className="fs14 fw500 token-staking__dropdown-button">
                                            Detail 
                                            <span className={`material-symbols-outlined ${dropDown === index && "expended"}`}>expand_more</span>
                                       </span>}  
                                 handleClick={()=>{handleDropDown(index)}}/>
                    </div>
                </div>
                <div className={`token__information--drop ${dropDown === index && "drop-unfold"}`}>
                    <div className="token__amount--box flex-column">
                        <div className="fs14 fw500 color-gray mb16">KOZ Amount</div>
                        <div className="mb16 input__box">
                            <InputComponents type={"inputB"} width={"276px"} placeholder={"insert KOZ Amount"}/>
                        </div>
                        <div className="buttons__box">
                            <Button  color={"blue"} borderRadius={"21.6px"} width={"130px"} height={"36px"} text={"Deposit KOZ"}fontSize={"14px"}/>
                            <Button  color={"blue"} borderRadius={"21.6px"} width={"130px"} height={"36px"} text={"Withdraw KOZ"}fontSize={"14px"}/>
                        </div>
                    </div>
                    <div className="token__reward--box flex-column">
                        <div className="fs14 fw500 color-gray mb16">Your Reward</div>
                        <div className="mb16 reward__box">
                            <div className="fs14 color-gray fw400">Unclaimed Reward</div>
                                <div className="reward__value--box">
                                    <div className="fs16 fw500 color-white">123,23.455</div>
                                    <div className="fs16 fw500 color-green">KOZ</div>
                                </div>
                        </div>
                        <div className="buttons__box">
                            <Button  color={"purple"} borderRadius={"21.6px"} width={"130px"} height={"36px"} text={"Deposit KOZ"}fontSize={"14px"}/>
                        </div>
                    </div>
                </div>
            </div>
             : 
            //======================
            // 모바일 버전에서의 랜더링
            //======================

             <div className="token__information--box">
                <div className="preview__box--mobile">
                    <div className="preveiw__box--info-mobile">
                        <div className="token__name-image--mobile">
                            <img src={kozmoIcon} alt="img"/>
                            <span className="fs14 fw500">KOZ TOKEN</span>
                        </div>
                        <div className="token__value--mobile-preview">
                            <div className="fs14 fw400 color-gray">Staking Pool Size</div>
                            <div className="fs14">
                                <span className="fs16 fw500">1,736.532</span>
                                <span className="fs16 fw500 color-purple">KOZ</span>
                            </div>
                        </div>
                    </div>
                </div>   
                {dropDown === index && 
                <div className="token__information--drop-mobile">
                    <div className="token__value--mobile-container mb24">
                        <div className="token__value--mobile">
                            <div className="fs14 fw400 color-gray">Staking Pool Size</div>
                            <div>
                                <span className="fs16 fw500">1,736.532</span>
                                <span className="fs16 fw500 color-purple">KOZ</span>
                            </div>
                        </div>
                        <div className="token__value--mobile">
                            <div className="fs14 fw400 color-gray">Reward Rate</div>
                            <div>
                                <span className="fs16 fw500">250%</span>
                            </div>
                        </div>
                        <div className="token__value--mobile">
                            <div className="fs14 fw400 color-gray">Your Staked</div>
                            <div>
                                <span className="fs16 fw500">1,736.532</span>
                                <span className="fs16 fw500 color-purple">KOZ</span>
                            </div>
                        </div>
                        <div className="token__value--mobile">
                            <div className="fs14 fw400 color-gray">My KZTO</div>
                            <div>
                                <span className="fs16 fw500 color-gray2">980</span>
                                <span className="fs16 fw500 color-green">KOZ</span>
                            </div>
                        </div>
                    </div>
                    <div className="token__amount--box-mobile mb42">
                        <div className="fs14 fw500 color-gray">KOZ Amount</div>
                        <InputComponents type={"inputB"} placeholder={"insert KOZ Amount"} />
                        <div className="buttons__box--mobile">
                            <Button color={"blue"} text={"Deposit KOZ"} borderRadius={"24px"} fontSize={"14px"} custom1={{width : "50%"}} height={"36px"}/>
                            <Button color={"blue"} text={"Withdraw KOZ"} borderRadius={"24px"} fontSize={"14px"} custom1={{width : "50%"}} height={"36px"}/>
                        </div>
                    </div>
                    <div className="token__reward--box-mobile mb24">
                        <div className="fs14 fw500 color-gray">Your Reward</div>
                        <div className="reward__box--mobile">
                            <div className="fs14 fw400 color-gray">Unclaimed Reward</div>
                            <div className="reward__value--box--mobile">
                                <div className="fs16 fw500">1,763.532</div>
                                <div className="fs16 fw500 color-green">KOZ</div>
                            </div>
                        </div>
                        <div className="buttons__box--mobile">
                            <Button width={"100%"} color={"purple"} text={"Claim Reward"} borderRadius={"24px"} fontSize={"14px"} custom1={{width :"100%"}} height={"36px"}/>
                        </div>
                    </div>
                </div>}
                <div className="close-btn__box">
                <Button  color={"yellow"} 
                                 borderRadius={"24px"} 
                                 width={"100%"} 
                                 text={<span className="fs14 fw500 token-staking__dropdown-button">
                                            Detail 
                                            <span className={`material-symbols-outlined ${dropDown === index && "expended"}`}>expand_more</span>
                                       </span>}  
                                 handleClick={()=>{handleDropDown(index)}}
                                 height={"36px"}/>
                </div>
            </div>}
            )}
        </div>
    </div>
}
export default TokenStaking;