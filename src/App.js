import React, { useState } from "react";
import { requestAccess, getAddress, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "stellar-sdk";
import WalletUI from "./components/walletui";
import "./App.css";

function App() {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [txMessage, setTxMessage] = useState(""); // ✅ Transaction message state
  const [txHash, setTxHash] = useState("");  // ✅ NEW


  // Connect Wallet
  const connectWallet = async () => {
    try {
      await requestAccess();
      const addressObj = await getAddress();
      setPublicKey(addressObj.address);
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Connection failed.");
    }
  };

  // Show Balance
  const checkBalance = async () => {
    try {
      const server = new StellarSdk.Horizon.Server(
        "https://horizon-testnet.stellar.org"
      );

      const account = await server.loadAccount(publicKey);

      const xlmBalance = account.balances.find(
        (b) => b.asset_type === "native"
      );

      setBalance(xlmBalance.balance);

    } catch (error) {
      console.error("Balance error:", error);
      alert("Error loading balance.");
    }
  };

  // Disconnect Wallet
  const disconnectWallet = () => {
  setPublicKey("");
  setBalance("");
  setTxMessage("");
  setTxHash("");  // ✅ clear hash
};


  // Send 1 XLM to Yourself
  const sendPayment = async () => {
    try {
      setTxMessage(""); // ✅ Clear old message
      setLoading(true);

      const server = new StellarSdk.Horizon.Server(
        "https://horizon-testnet.stellar.org"
      );

      const sourceAccount = await server.loadAccount(publicKey);

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: publicKey,
            asset: StellarSdk.Asset.native(),
            amount: "1",
          })
        )
        .setTimeout(30)
        .build();

      const signed = await signTransaction(transaction.toXDR(), {
        networkPassphrase: StellarSdk.Networks.TESTNET,
      });

      const tx = StellarSdk.TransactionBuilder.fromXDR(
        signed.signedTxXdr,
        StellarSdk.Networks.TESTNET
      );

const response = await server.submitTransaction(tx);

setTxMessage("Transaction Successful ✅");
setTxHash(response.hash);   // ✅ Save hash

      setTxMessage("Transaction Successful ✅"); // ✅ Show success message

    } catch (error) {
      console.error("Payment failed:", error);
      setTxMessage("Transaction failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
   <WalletUI
  publicKey={publicKey}
  balance={balance}
  loading={loading}
  connectWallet={connectWallet}
  sendPayment={sendPayment}
  disconnectWallet={disconnectWallet}
  checkBalance={checkBalance}
  txMessage={txMessage}
  txHash={txHash}   // ✅ NEW
/>

  );
}

export default App;
