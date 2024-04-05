import React, { useState } from "react";

import {
  useAddress,
  useContract,
  useActiveClaimCondition,
  Web3Button,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { KOZMO_NFT, TOKEN_CONTRACT } from "../../contract/contract";

import "./BuyNftModal.scss";
import kozIcon from "../../assets/images/NetworkTicker/koz-token.svg";

const BuyNftModalCompact = ({
  setIsBuyCompact,
  claimMaxDataCompact,
  kozBalance,
}) => {
  const [amount, setAmount] = useState(0);
  const address = useAddress();
  const { contract } = useContract(TOKEN_CONTRACT);
  const { contract: nftContract } = useContract(KOZMO_NFT);

  // 모달 클로즈
  const handleCloseModal = () => {
    setIsBuyCompact((prev) => {
      if (window.innerWidth > 1480) {
        document.body.style.overflow = "";
        return !prev;
      } else {
        document.body.style.overflow = "";
        return !prev;
      }
    });
  };

  // 모달
  const handleMmenuBackground = (e) => {
    if (e.target === e.currentTarget) {
      console.log(e.target);
      console.log(e.currentTarget);
      setIsBuyCompact((prevMmenuOnOff) => {
        const newMmenuOnOff = !prevMmenuOnOff;
        if (newMmenuOnOff) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
        return newMmenuOnOff;
      });
    }
  };

  // Compact 토크ID : 1
  const { data: claimConditionCompact } = useActiveClaimCondition(
    nftContract,
    1
  );

  console.log("컴팩트claimCondition", claimConditionCompact);

  const nftPriceCompact = claimConditionCompact
    ? parseInt(claimConditionCompact.price._hex, 16) / 10 ** 18
    : 0;

  console.log(nftPriceCompact, "컴팩트 nft가격");
  console.log(
    "컴팩트 nft가격나눗셈안하고",
    claimConditionCompact
      ? parseInt(claimConditionCompact.price._hex, 16)
      : undefined
  );

  const claimCurrentData = claimConditionCompact
    ? claimConditionCompact.currentMintSupply
    : 0;

  console.log(claimCurrentData);

  const claimMaxData = claimConditionCompact
    ? claimConditionCompact.maxClaimableSupply
    : 0;

  const claimPercent = claimConditionCompact
    ? ((parseInt(claimCurrentData) / parseInt(claimMaxData)) * 100).toFixed(2)
    : 0;

  // allowance confirm

  const { data: allowanceConfirmData, isLoading: allowanceConfirmIsLoading } =
    useContractRead(contract, "allowance", [address, KOZMO_NFT]);

  console.log(
    allowanceConfirmData
      ? parseInt(allowanceConfirmData._hex, 16) / 10 ** 18
      : 0
  );

  const allowanceData = allowanceConfirmData
    ? parseInt(allowanceConfirmData._hex, 16) / 10 ** 18
    : 0;

  console.log(allowanceData);

  const { mutateAsync: increaseAllowance, isLoading: allowanceIsLoading } =
    useContractWrite(contract, "increaseAllowance");

  const increaseAllowanceCall = async () => {
    try {
      const data = await increaseAllowance({
        args: [KOZMO_NFT, "1000000000000000000000000"],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { contract: editionDrop } = useContract(KOZMO_NFT);
  const compactClaimCall = async () => {
    try {
      // 여기에 컴팩트에 맞는 토큰 아이디 넣어서 해야함
      const data = await editionDrop.erc1155.claim(1, amount);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // nft 구매 함수
  async function buyNftCompact() {
    if (amount < allowanceData) {
      await compactClaimCall();
      console.log("check1");
    } else {
      await increaseAllowanceCall();
      console.log("check2");
      await compactClaimCall();
      console.log("check3");
    }
    // Refresh the page
    window.location.reload();
    // window.parent.location.reload();
  }

  // price onChange
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // input 입력한 amount 양과
  const calculatedValue = amount * nftPriceCompact.toFixed(2);
  console.log(amount);

  return (
    <>
      <div className="buy-modal" onClick={handleMmenuBackground}>
        <div className="buy-box">
          <span>KOZ COMPACT NFT</span>
          <div className="between">
            <div>Number of Issues</div>
            <div>{claimMaxDataCompact}</div>
          </div>
          <div className="between">
            <div>Allocation Quantity</div>
            <div>1,000,000,000</div>
          </div>
          <div className="between">
            <div>Staking Reward</div>
            <div>850,000,000</div>
          </div>
          <div className="between">
            <div>Accrual of DAO</div>
            <div>15%</div>
          </div>
          <div className="koz-box">
            <img src={kozIcon} alt="kozIcon" />
            <div>KOZ</div>
          </div>
          <div className="koz-box amount">
            <input
              type="number"
              defaultValue={amount}
              onChange={handleAmountChange}
            />
            <div>EA</div>
          </div>
          <div className="total-decript">
            <div className="total-amount">Total Amount</div>
            <div className="total-price">{calculatedValue} KOZ</div>
          </div>

          <div className="btn-box">
            <button className="btn-x" onClick={handleCloseModal}>
              CANCLE
            </button>
            <Web3Button
              className="btn-ok"
              contractAddress={KOZMO_NFT}
              action={() => buyNftCompact()}
              style={{ minWidth: "132px" }}
              onClick={() => (document.body.style.overflow = "")}
            >
              OK
            </Web3Button>
          </div>

          <div className="balance-box">
            <div>Your Balance</div>
            <div>{kozBalance} KOZ</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNftModalCompact;
