import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Mumbai, AvalancheFuji } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  smartWallet,
  embeddedWallet
} from "@thirdweb-dev/react";
// import { WalletConnectV1 } from "@thirdweb-dev/wallets";

const root = ReactDOM.createRoot(document.getElementById("root"));
// 부리또 커스텀 내용
// const walletWithOptions = new WalletConnectV1({
//   chains: [Mumbai],
//   dappMetadata: {
//     name: "thirdweb powered dApp",
//     url: "https://thirdweb.com",
//     description: "thirdweb powered dApp",
//     logoUrl: "https://thirdweb.com/favicon.ico",
//   },
// });

// const customWallet = {
//   id: "walletConnect",
//   meta: {
//     name: "부리또",
//     iconURL: "https://klayswap.com/img/icon/ic-service-burrito.svg",
//   },
//   create: async () => {
//     walletWithOptions.connect();
//     const walletAddress = await walletWithOptions.connect();
//     const signer = await walletWithOptions.getSigner();
//   },
// };

// walletWithOptions.addListener("connect", (data) => console.log(data));

const config = {
  factoryAddress: "",
  gasless: true,
};

root.render(
  <ThirdwebProvider
    supportedWallets={[
      //metamaskWallet(), // 메타마스크
      //coinbaseWallet(), // 코인베이스
      // customWallet, // 커스텀월렛 (부리또)
      //walletConnect({ projectId: "7ece9936b5023911c26f0ca73cf49f4f" }), // 월렛커넥트 v2
      // safeWallet(),
      // paperWallet({
      //   clientId: "YOUR_CLIENT_ID", // required
      // }),
      // walletConnect({
      //   projectId: "YOUR_PROJECT_ID", // optional
      // }),
      smartWallet(coinbaseWallet(),config),
      smartWallet(metamaskWallet(),config),
      smartWallet(
        embeddedWallet({
          auth: {
            options: ["email", "google"],
          },
        }),
        config
      ), // 이메일 로그인
    ]}  
    //activeChain="base"
    clientId=""
    activeChain={AvalancheFuji}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThirdwebProvider>
);

reportWebVitals();
