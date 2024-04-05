import React, { useState, useEffect } from "react";

import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  TOKEN_CONTRACT,
  KOZMO_NFT,
  FOUNDERS_STAKING,
  COMPACT_STAKING,
  KOZMO_DAO,
} from "../contract/contract";
import { compactAbi } from "../contract/compactAbi";
import { foundersAbi } from "../contract/foundersAbi";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import Button from "../components/Button.js";

import "../styles/KozmoStaking.scss";
import detailUp from "../assets/images/btn-detail-up.png";
import kozCompact from "../assets/images/koz2.mp4";
import headerTopLogo from "../assets/images/headerTopLogo.svg";
import founders from "../assets/images/koz1.mp4";

const KozmoStaking = () => {
  const address = useAddress(); // 계정 연결 상태 undefined or 지갑주소값
  // abi 넣어줘야함 founders, kozCompact
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT);
  const { contract: nftContract } = useContract(KOZMO_NFT);
  // const { contract: foundersStaking } = useContract(FOUNDERS_STAKING);
  const { contract: foundersStaking } = useContract(
    FOUNDERS_STAKING,
    foundersAbi
  );
  // const { contract: compactStaking } = useContract(COMPACT_STAKING);
  const { contract: compactStaking } = useContract(COMPACT_STAKING, compactAbi);

  // 소유한 KOZ 수량
  const { data: kozData, kozIsLoading } = useContractRead(
    tokenContract,
    "balanceOf",
    [address]
  );

  const kozBalance = kozData
    ? (parseInt(kozData._hex, 16) / 10 ** 18).toFixed(2)
    : 0;

  //---- 여기서부터는 NFT 각각에 대한 내용-----
  //--------------파운더스 컨트랙트 토큰ID 0-------------------

  // 현재 스테이킹 된 갯수
  const { data, isLoading } = useContractRead(foundersStaking, "StakePlayer", [
    address,
  ]);

  const currentAmountFounders = data ? parseInt(data[2]._hex, 16) : 0;

  // 언스테이킹 파운더스 NFT 수 토큰ID 0
  const { data: unstakingNftBalance, unstakingNftBalanceIsLoading } =
    useContractRead(nftContract, "balanceOf", [address, 0]);

  const unStakingNftBalance = unstakingNftBalance
    ? parseInt(unstakingNftBalance._hex, 16)
    : 0;

  // 허락이 됐는지 확인하기 isApprovedForAll
  // founders isApprovedForAll
  const {
    data: isApprovedForAllDataFounders,
    isLoading: isApprovedForAllIsLoadingFounders,
  } = useContractRead(nftContract, "isApprovedForAll", [
    address,
    FOUNDERS_STAKING,
  ]);

  // 파운더스 approve all
  const { mutateAsync: setApprovalForAll, isLoading: foundersIsLoading } =
    useContractWrite(nftContract, "setApprovalForAll");
  const approvedCallFounders = async () => {
    try {
      const data = await setApprovalForAll({ args: [FOUNDERS_STAKING, true] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // 파운더스 deposit
  const [depositAmountFounders, setDepositAmountFounders] = useState();
  // console.log(typeof depositAmountFounders);

  const handleInputDepositFounders = (e) => {
    setDepositAmountFounders(e.target.value);
  };
  const { mutateAsync: stake, isLoading: foundersDepositLoading } =
    useContractWrite(foundersStaking, "stake");

  const foundersDepositCall = async () => {
    try {
      const data = await stake({ args: [depositAmountFounders] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("실패파운더스디파짓콜", err);
    }
  };

  // 파운더스 withdraw
  const [withrawAmountFounders, setWithdrawAmountFounders] = useState();
  const handelInputWithdrawFounders = (e) => {
    setWithdrawAmountFounders(e.target.value);
  };

  const {
    mutateAsync: foundersWithdrawFunc,
    isLoading: foundersWithdrawLoading,
  } = useContractWrite(foundersStaking, "withdraw");

  const foundersWithdrawCall = async () => {
    try {
      const data = await foundersWithdrawFunc({
        args: [withrawAmountFounders],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("파운더스 언스테이킹 오류", err);
    }
  };

  // action 버튼에 연결 어프로브 확인
  async function foundersDeposit() {
    if (!address) return;
    if (isApprovedForAllDataFounders) await foundersDepositCall();
    else {
      await approvedCallFounders();
      await foundersDepositCall();
    }

    // window.parent.location.reload();
  }

  // web3버튼 액션에 넣어야하는 함수
  async function foundersWithdraw() {
    if (!address) return;

    await foundersWithdrawCall();

    // window.parent.location.reload();
  }

  async function foundersClaimReward() {
    if (!address) return;

    await foundersStaking.call("claim");
  }

  // 리워드 정보 파운더스
  const { data: rewardDataFounders, rewardIsLoading } = useContractRead(
    foundersStaking,
    "calculateRewards",
    [address]
  );

  console.log("데이터 불러오고 있음 파운더스?", rewardDataFounders);

  // myReward는 Unclaimed 의미함 founders
  const myRewardFounders = rewardDataFounders
    ? (parseInt(rewardDataFounders[0]._hex, 16) / 10 ** 18).toFixed(2)
    : 0;

  console.log(
    "언클레임파운더스양",
    rewardDataFounders ? parseInt(rewardDataFounders[0]._hex, 16) / 10 ** 18 : 0
  );
  // =======컴펙트 컨트랙트 토큰ID 1=========================
  // 현재 스테이킹 된 갯수
  const { data: dataCompact, currentAmountCompactisLoading } = useContractRead(
    compactStaking,
    "StakePlayer",
    [address]
  );

  const currentAmountCompact = dataCompact
    ? parseInt(dataCompact[2]._hex, 16)
    : 0;

  // 언스테이킹 컴팩트 NFT 수 토큰ID 1
  const {
    data: unstakingNftBalanceCompact,
    unstakingNftBalanceIsLoadingCompact,
  } = useContractRead(nftContract, "balanceOf", [address, 1]);

  const unStakingNftBalanceCompact = unstakingNftBalanceCompact
    ? parseInt(unstakingNftBalanceCompact._hex, 16)
    : 0;

  // 허락이 됐는지 확인하기 isApprovedForAll
  // 컴펙트 isApprovedForAll
  const {
    data: isApprovedForAllDataCompact,
    isLoading: isApprovedForAllIsLoadingCompact,
  } = useContractRead(nftContract, "isApprovedForAll", [
    address,
    COMPACT_STAKING,
  ]);

  // 컴펙트 approve all
  const { mutateAsync: setApprovalForAllCompact, apporvedCompactIsLoading } =
    useContractWrite(nftContract, "setApprovalForAll");
  const approvedCallCompact = async () => {
    try {
      const data = await setApprovalForAllCompact({
        args: [COMPACT_STAKING, true],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // 컴펙트 deposit
  const [depositAmountCompact, setDepositAmountCompact] = useState();
  // console.log(typeof depositAmountCompact);

  const handleInputDepositCompact = (e) => {
    setDepositAmountCompact(e.target.value);
  };

  const { mutateAsync: stakeCompact, isLoading: CompactDepositLoading } =
    useContractWrite(compactStaking, "stake");

  const compactDepositCall = async () => {
    try {
      const data = await stakeCompact({ args: [depositAmountCompact] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure컴펙트", err);
    }
  };

  // 컴펙트 withdraw
  const [withrawAmountCompact, setWithdrawAmountCompact] = useState();
  const handelInputWithdrawCompact = (e) => {
    setWithdrawAmountCompact(e.target.value);
  };

  const {
    mutateAsync: compactWithdrawFunc,
    isLoading: compactWithdrawLoading,
  } = useContractWrite(compactStaking, "withdraw");

  const compactWithdrawCall = async () => {
    try {
      const data = await compactWithdrawFunc({ args: [withrawAmountCompact] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  async function compactDeposit() {
    if (!address) return;
    if (isApprovedForAllDataCompact) await compactDepositCall();
    else {
      await approvedCallCompact();
      await compactDepositCall();
    }

    // window.parent.location.reload();
  }

  // web3버튼 액션에 넣어야하는 함수
  async function compactWithdraw() {
    if (!address) return;

    await compactWithdrawCall();

    // window.parent.location.reload();
  }

  async function compactClaimReward() {
    if (!address) return;

    await compactStaking.call("claim");
  }

  // 리워드 정보 컴펙트
  const { data: rewardDataCompect, rewardIsLoadingCompact } = useContractRead(
    compactStaking,
    "calculateRewards",
    [address]
  );

  // console.log(rewardDataCompect);
  // myReward는 Unclaimed 의미함 컴펙트
  const myRewardCompact = rewardDataCompect
    ? (parseInt(rewardDataCompect[0]._hex, 16) / 10 ** 18).toFixed(2)
    : 0;

  // --------------------끝------------------------

  const [increaseNumFounders, setIncreaseNumberFounders] = useState(0);

  useEffect(() => {
    // 넣어놓은 nft 없으면 그냥 종료
    const interval = setInterval(() => {
      if (currentAmountFounders === 0) return;
      setIncreaseNumberFounders(
        (prev) => prev + 0.000634196 * currentAmountFounders
      );
    }, 1000);
    console.log(currentAmountFounders);
    return () => clearInterval(interval);
  }, [currentAmountFounders]);

  const [increaseNumCompact, setIncreaseNumCompact] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentAmountCompact === 0) return;
      // 대표님 확인해서 수치 변경하기
      setIncreaseNumCompact(
        (prev) => prev + 0.000126839 * currentAmountCompact
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAmountCompact]);

  //-----------------컨트랙트 끝 -------------------------------

  const [isFounders, setIsFounders] = useState(false);
  const handleFoundersToggle = () => {
    setIsFounders(!isFounders);
  };
  const [isKozCompact, setIsKozCompact] = useState(false);
  const handleKozCompactToggle = () => {
    setIsKozCompact(!isKozCompact);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsFounders(false);
        setIsKozCompact(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addKozToWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          TOKEN_CONTRACT,
          ["function symbol() view returns (string)"],
          signer
        );
        const symbol = await tokenContract.symbol();
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: TOKEN_CONTRACT,
              symbol: "KOZ",
              decimals: 18,
              // 여기만 교체
              image:
                "https://gateway.pinata.cloud/ipfs/bafybeidmxzkd77ci5qpdjvhwu73fcbd2gzrohzz6s3zwbmfrswzmcpx2hy/Token.png",
            },
          },
        });
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 아발란체 네트워크 추가
  const avalancheNetwork = {
    chainId: "0xA86A", // 아발란체 체인 ID
    chainName: "Avalanche",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"], // 아발란체 RPC 엔드포인트 (예시 엔드포인트, 동작 여부 확인 필요)
    blockExplorerUrls: ["https://cchain.explorer.avax.network"], // 아발란체 블록 탐색기 엔드포인트
  };

  // 아발란체 네트워크 추가 핸들
  const addAvalancheNetworkToWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [avalancheNetwork],
        });
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ----------- 다오 컨트랙트 내용------------

  // dao data
  const { data: daoData, isLoading: daoDataIsLoading } = useContractRead(
    tokenContract,
    "balanceOf",
    [KOZMO_DAO]
  );

  const daoBalanace = daoData
    ? (parseInt(daoData._hex, 16) / 10 ** 18).toFixed(3)
    : 0;

  return (
    <div className="koz-bg-stake">
      <div className="stake__inner">
        <div className="stake__bg-top">
          <div className="stake__header">
            <img src={headerTopLogo} alt="icon" className="header__img" />
            <span className="header__title">
              <span className="title__deco">KOZMO</span> STAKING
            </span>
            <span className="header__text">KOZMO NFT STAKING</span>
          </div>
        </div>
      </div>
      <div className="staking-main-background">
        <div className="koz-stake-main">
          <ul className="main__top-box">

            <li className="border3px__outter">
              <div className="top-box__item">
                <span className="item__title">Step1. Connect Wallet</span>


               <div className="border3px__inner">
                  <div className="item__box">
                    <p className="box__text">
                      Click the Connect Wallet button to connect to the wallet
                      installed in your browser.
                    </p>
                    <Button
                                text={<ConnectWallet className="btn-wallet-connect" />}
                                color={"black"}
                                borderRadius={"24px"}
                                custom1={{margin : "0 auto"}}
                                custom3={{ maxHeight : "50px"}}
                                width={"fit-content"}
                                height={"fit-content"}
                                padding={"0px 16px"}
                                />
                                {/* <ConnectWallet className="btn-wallet-connect" /> */}
                  </div>
               </div>

              </div>

            </li>

            <li className="border3px__outter">
              <div className="top-box__item">
                <span className="item__title">Step2. Switch Network</span>
                <div className="border3px__inner">
                  <div className="item__box">
                    <p className={!address ? "box__text" : "box__text step2"}>
                      Click the button below to connect the Metamask wallet to the
                      Avalanche network. And you can check KOZ Balance in your
                      wallet by adding KOZ tokens that you receive as rewards.
                    </p>
                    {address && (
                      <div className="box__btn-container">
                        {/* <button
                          className="btn-add-network"
                          onClick={addAvalancheNetworkToWallet}
                        >
                          Add Avalanche Network
                        </button>
                        <button className="btn-add-koz" onClick={addKozToWallet}>
                          Add KOZ to MetaMask{" "}
                        </button>  */}
                        <Button text={"Add Avalanche Network"} 
                                color={"pink"} 
                                fontSize={"12px"} 
                                fontWeight="500" 
                                borderRadius={"24px"} 
                                padding={"2px 10px"}
                                handleClick={addAvalancheNetworkToWallet}/>
                        <Button text={"Add KOZ to MetaMask"} 
                                color={"green"} 
                                fontSize={"12px"} 
                                fontWeight="500" 
                                borderRadius={"24px"} 
                                padding={"2px 10px"}
                                handleClick={addKozToWallet}/>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </li>




            <li className="border3px__outter">
              <div className="top-box__item">
                <span className="item__title">Step3. Stake your KOZMO NFT</span>
                <div className="border3px__inner">
                  <div className="item__box">
                    <p className="box__text">
                      Please deposition the KOZMO NFT you have in the Staking pool
                      below. Over time, you can click Claim to receive KOZ as a
                      reward.
                    </p>
                  </div>
                </div>
              </div>
            </li>

          </ul>

          {/* ------ 메인 부분 KOZMO STAKING POOL ------ */}
          <div className="main__stake-pool-container">
            <span className="pool-container__title">KOZMO STAKING POOL</span>
            <ul className="pool-container__box">
            
             <li className="border3px__outter mb24">
                <div className="box__item">
                  <div className="item__box">
                    <span className="box__title">
                      FOUNDERS <span className="box__sub">(25% DAO Fee)</span>
                    </span>

                   <div className="border3px__inner">
                      <div className="box__container">
                        <div className="container__video-box">
                          <video
                            src={founders}
                            className="vid-nft"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                        {!isFounders && (
                          <div className="container__right">
                            <div className="container__stake-zone">
                              <span className="stake-zone__title">
                                KOZMO Staking Zone
                              </span>
                              <Link
                                to={`https://snowtrace.io/address/${FOUNDERS_STAKING}`}
                                className="btn-view-contract"
                                target="_blank"
                              >
                               <Button text={"View Staking Contract"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
                              {currentAmountFounders === 0 &&
                              unStakingNftBalance === 0 ? (
                                <span className="stake-zone__text">
                                  Connect your wallet or Deposit Founders NFT
                                </span>
                              ) : (
                                <div className="stake-zone__input-box">
                                  <span className="input-box__title">
                                    Staking Amount : {currentAmountFounders}
                                  </span>
                                  <input
                                    type="number"
                                    className="input-box__input"
                                    onChange={handelInputWithdrawFounders}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                  {/* <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => foundersWithdraw()}
                                  >
                                    Withdraw NFT
                                  </Web3Button> */}
                                  <Button text={
                                  <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => foundersWithdraw()}
                                  >
                                    Withdraw NFT
                                  </Web3Button>
                                  } 
                                  color={"yellow"}
                                  borderRadius={"24px"}
                                  custom1={{marginTop : "auto"}}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="container__stake-zone">
                              <span className="stake-zone__title">
                                You owned KOZMO NFT
                              </span>
                              <Link
                                to={`https://snowtrace.io/address/${KOZMO_NFT}`}
                                className="btn-view-contract"
                                target="_blank"
                              >
                                <Button text={"View NFT Contract"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
                              {!address && (
                                <span className="stake-zone__text">
                                  Wallet connection is required
                                </span>
                              )}
                              {currentAmountFounders === 0 &&
                              unStakingNftBalance === 0 ? null : (
                                <div className="stake-zone__input-box">
                                  <span className="input-box__title">
                                    Owned Amount : {unStakingNftBalance}
                                  </span>
                                  <input
                                    type="number"
                                    className="input-box__input"
                                    onChange={handleInputDepositFounders}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                  
                                  <Button text={
                                  <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => foundersDeposit()}
                                  >
                                    Deposit NFT
                                  </Web3Button>
                                  } 
                                  color={"yellow"}
                                  borderRadius={"24px"}
                                  custom1={{marginTop : "auto"}}
                                  />
                              
                                  {/* // <Web3Button
                                  //   // className="btn-claim"
                                  //   contractAddress={FOUNDERS_STAKING}
                                  //   contractAbi={foundersAbi}
                                  //   action={() => foundersDeposit()}
                                  // >
                                  //   Deposit NFT
                                  // </Web3Button> */}
                                </div>
                              )}
                            </div>
                            <div className="container__stake-zone">
                              <span className="stake-zone__title">
                                Reward KOZ Token
                              </span>
                              <Link
                                to={`https://snowtrace.io/address/${TOKEN_CONTRACT}`}
                                target="_blank"
                                className="btn-view-contract"
                              >
                                 <Button text={"View Token Contract"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
                              {!address && (
                                <span className="stake-zone__text">
                                  Wallet connection is required
                                </span>
                              )}
                              {!address && (
                                <Button
                                text={<ConnectWallet className="btn-wallet-connect" />}
                                color={"black"}
                                borderRadius={"24px"}
                                height={"32px"}
                                padding={"0px 16px"}
                                custom1={{marginTop : "16px"}}
                                />
                              )}
                              {address && (
                                <div className="stake-zone__reward-box">
                                  <ul className="reward-box__list">
                                    <li className="list__item">
                                      <span className="item__title">Balance</span>
                                      <span className="item__amount">
                                        {kozBalance} KOZ
                                      </span>
                                    </li>
                                    <li className="list__item">
                                      <span className="item__title">Unclaimed</span>
                                      <span className="item__amount">
                                        {myRewardFounders} KOZ
                                      </span>
                                    </li>
                                    <li className="list__item">
                                      <span className="item__title">
                                        Earned this session
                                      </span>
                                      <span className="item__amount">
                                        {increaseNumFounders.toFixed(2)} KOZ
                                      </span>
                                    </li>
                                  </ul>
                                  {/* <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => foundersClaimReward()}
                                  >
                                    Claim
                                  </Web3Button> */}
                                  <Button text={
                                  <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => foundersClaimReward()}
                                  >
                                    Claim
                                  </Web3Button>
                                  } 
                                  color={"yellow"}
                                  borderRadius={"24px"}
                                  custom1={{marginTop : "24px"}}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <button
                          className="btn-detail"
                          onClick={handleFoundersToggle}
                        >
                          <img src={detailUp} alt="icon" className="detail__img" />
                        </button>
                      </div>
                   </div>
                  </div>
                </div> 
             </li>

              {/* -------- Compact ----------- */}

             <li className="border3px__outter mb24">
                <div className="box__item">
                  <div className="item__box">
                    <span className="box__title">
                      KOZ COMPACT <span className="box__sub">(15% DAO Fee)</span>
                    </span>
                   <div className="border3px__inner">
                      <div className="box__container">
                        <div className="container__video-box">
                          <video
                            src={kozCompact}
                            className="vid-nft"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                        {!isKozCompact && (
                          <div className="container__right">
                            <div className="container__stake-zone">
                              <span className="stake-zone__title">
                                KOZMO Staking Zone
                              </span>
                              <Link
                                to={`https://snowtrace.io/address/${COMPACT_STAKING}`}
                                className="btn-view-contract"
                                target="_blank"
                              >
                               <Button text={"View Staking Contract"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
    
                              {currentAmountCompact === 0 &&
                              unStakingNftBalanceCompact === 0 ? (
                                <span className="stake-zone__text">
                                  Connect your wallet or Deposit Founders NFT
                                </span>
                              ) : (
                                <div className="stake-zone__input-box">
                                  <span className="input-box__title">
                                    Staking Amount : {currentAmountCompact}
                                  </span>
                                  <input
                                    type="number"
                                    className="input-box__input"
                                    onChange={handelInputWithdrawCompact}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                  {/* <Web3Button
                                    className="btn-claim"
                                    contractAddress={COMPACT_STAKING}
                                    contractAbi={compactAbi}
                                    action={() => compactWithdraw()}
                                  >
                                    Withdraw NFT
                                  </Web3Button> */}
                                  <Button text={
                                  <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => compactWithdraw()}
                                  >
                                    Withdraw NFT
                                  </Web3Button>
                                  } 
                                  color={"yellow"}
                                  borderRadius={"24px"}
                                  custom1={{marginTop : "auto"}}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="container__stake-zone">
                              <span className="stake-zone__title">
                                You owned KOZMO NFT
                              </span>
                              <Link
                                to={`https://snowtrace.io/address/${KOZMO_NFT}`}
                                className="btn-view-contract"
                                target="_blank"
                              >
                                <Button text={"View NFT Contract"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
                              {!address && (
                                <span className="stake-zone__text">
                                  Wallet connection is required
                                </span>
                              )}
                              {currentAmountCompact === 0 &&
                              unStakingNftBalanceCompact === 0 ? null : (
                                <div className="stake-zone__input-box">
                                  <span className="input-box__title">
                                    Owned Amount : {unStakingNftBalanceCompact}
                                  </span>
                                  <input
                                    type="number"
                                    className="input-box__input"
                                    onChange={handleInputDepositCompact}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                  {/* <Web3Button
                                    className="btn-claim"
                                    contractAddress={COMPACT_STAKING}
                                    contractAbi={compactAbi}
                                    action={() => compactDeposit()}
                                  >
                                    Deposit NFT
                                  </Web3Button> */}
                                  <Button text={
                                  <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => compactDeposit()}
                                  >
                                    Deposit NFT
                                  </Web3Button>
                                  } 
                                  color={"yellow"}
                                  borderRadius={"24px"}
                                  custom1={{marginTop : "auto"}}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="container__stake-zone">
                              <span className="stake-zone__title">
                                Reward KOZ Token
                              </span>
                              <Link
                                to={`https://snowtrace.io/address/${TOKEN_CONTRACT}`}
                                target="_blank"
                                className="btn-view-contract"
                              >
                                 <Button text={"View Token Contract"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
                              {!address && (
                                <span className="stake-zone__text">
                                  Wallet connection is required
                                </span>
                              )}
                              {!address && (
                                 <Button
                                 text={<ConnectWallet className="btn-wallet-connect" />}
                                 color={"black"}
                                 borderRadius={"24px"}
                                 height={"32px"}
                                 padding={"0px 16px"}
                                 custom1={{marginTop : "16px"}}
                                 />
                              )}
                              {address && (
                                <div className="stake-zone__reward-box">
                                  <ul className="reward-box__list">
                                    <li className="list__item">
                                      <span className="item__title">Balance</span>
                                      <span className="item__amount">
                                        {kozBalance} KOZ
                                      </span>
                                    </li>
                                    <li className="list__item">
                                      <span className="item__title">Unclaimed</span>
                                      <span className="item__amount">
                                        {myRewardCompact} KOZ
                                      </span>
                                    </li>
                                    <li className="list__item">
                                      <span className="item__title">
                                        Earned this session
                                      </span>
                                      <span className="item__amount">
                                        {increaseNumCompact.toFixed(2)} KOZ
                                      </span>
                                    </li>
                                  </ul>
                                  {/* <Web3Button
                                    className="btn-claim"
                                    contractAddress={COMPACT_STAKING}
                                    contractAbi={compactAbi}
                                    action={() => compactClaimReward()}
                                  >
                                    Claim
                                  </Web3Button> */}
                                  <Button text={
                                  <Web3Button
                                    className="btn-claim"
                                    contractAddress={FOUNDERS_STAKING}
                                    contractAbi={foundersAbi}
                                    action={() => compactClaimReward()}
                                  >
                                    Claim
                                  </Web3Button>
                                  } 
                                  color={"yellow"}
                                  borderRadius={"24px"}
                                  custom1={{marginTop : "24px"}}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <button
                          className="btn-detail"
                          onClick={handleKozCompactToggle}
                        >
                          <img src={detailUp} alt="icon" className="detail__img" />
                        </button>
                      </div>
                   </div>
                  </div>
                </div>
             </li>

              <span className="pool-container__title koz-dao">KOZMO DAO</span>
             <li className="border3px__outter mb24">
                <div className="box__item">
                  <div className="item__box">
                    <span className="box__title">KOZMO DAO</span>
                    <div className="border3px__inner">
                      <div className="box__container dao">
                        <div className="container__right dao-center">
                          <div className="container__stake-zone dao-zone">
                            <span className="stake-zone__title">
                              Amount of KOZ in DAO
                            </span>
                            {/* <Link
                              to={`https://snowtrace.io/address/${KOZMO_DAO}`}
                              className="btn-view-contract"
                              target="_blank"
                            >
                              View DAO Wallet
                            </Link> */}
                            <Link
                                to={`https://snowtrace.io/address/${KOZMO_DAO}`}
                                className="btn-view-contract"
                                target="_blank"
                              >
                                <Button text={"View DAO Wallet"}
                                       fontSize={"12px"} 
                                       borderRadius={"24px"} 
                                       padding={"2px 16px"}
                                       color={"black"} />
                              </Link>
                            <span className="stake-zone__text dao-text">
                              {daoBalanace} KOZ
                            </span>
                            <span className="stake-zone__title-dao">
                              What does KOZMO DAO do?
                            </span>
                            <p className="stake-zone__paragraph">
                              KOZMO DAO balances the ecosystem by the system.
                              <br /> Often, if KOZ is concentrated in popular games,
                              the goods supplied to other games will be reduced. In
                              this case,
                              <br /> if a serious deflationary phenomenon could
                              occur, DAO could provide liquidity for a while to
                              addressing it.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KozmoStaking;
