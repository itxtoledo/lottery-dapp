import React, { useRef } from "react";
import bsc, {
  useWallet,
  UseWalletProvider,
} from "@binance-chain/bsc-use-wallet";
import Web3 from "web3";

function App() {
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber();

  // @ts-ignore
  const { current: web3 } = useRef(new Web3(window.ethereum));

  return (
    <>
      <h1>Wallet</h1>
      {wallet.status === "connected" ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>
            Balance: {wallet.balance === "-1" ? "…" : `${wallet.balance} BNB`}
          </div>
          <div>Block: {blockNumber || "…"}</div>
          <button onClick={() => wallet.reset()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect("bsc")}>MetaMask</button>
          <button onClick={() => wallet.connect("frame")}>Frame</button>
          <button onClick={() => wallet.connect("portis")}>Portis</button>
        </div>
      )}
    </>
  );
}

export default () => (
  <UseWalletProvider connectors={{ bsc }} chainId={56}>
    <App />
  </UseWalletProvider>
);
