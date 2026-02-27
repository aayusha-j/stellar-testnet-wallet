// import React, { useState } from "react";
// import { getAddress, requestAccess } from "@stellar/freighter-api";
// import { Horizon } from "stellar-sdk";

// function Freighter() {
//   const [address, setAddress] = useState("");
//   const [balance, setBalance] = useState("");

//   const connectWallet = async () => {
//     try {
//       await requestAccess();

//       const result = await getAddress();
//       const userAddress = result.address;
//       setAddress(userAddress);

//       const server = new Horizon.Server(
//         "https://horizon-testnet.stellar.org"
//       );

//       const account = await server.loadAccount(userAddress);

//       const xlmBalance = account.balances.find(
//         (bal) => bal.asset_type === "native"
//       );

//       setBalance(xlmBalance.balance);

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Stellar Wallet Connect</h2>
//       <button onClick={connectWallet}>
//         Connect Wallet
//       </button>

//       {address && (
//         <>
//           <p><strong>Wallet Address:</strong> {address}</p>
//           <p><strong>XLM Balance:</strong> {balance}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default Freighter;




import React, { useState } from "react";
import { getAddress, requestAccess } from "@stellar/freighter-api";
import { Server } from "stellar-sdk"; // ✅ Correct import

function Wallet({ address, setAddress }) {
  const [balance, setBalance] = useState("");

  // const connectWallet = async () => {
  //   try {
  //     await requestAccess();
  //     const { address: userAddress } = await getAddress();
  //     setAddress(userAddress);

  //     const server = new Server("https://horizon-testnet.stellar.org"); // ✅

  //     const account = await server.loadAccount(userAddress);
  //     const xlmBalance = account.balances.find(b => b.asset_type === "native")?.balance || "0";

  //     setBalance(xlmBalance);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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


  const disconnectWallet = () => {
    setAddress("");
    setBalance("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Stellar Wallet Connect</h2>
      {!address ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p><strong>Wallet Address:</strong> {address}</p>
          <p><strong>XLM Balance:</strong> {balance}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      )}
    </div>
  );
}

// // export default Wallet;
// import React, { useState } from "react";
// import { requestAccess, getAddress, signTransaction } from "@stellar/freighter-api";
// import * as StellarSdk from "stellar-sdk";
// import WalletUI from "./components/WalletUI";

// function App() {
//   const [publicKey, setPublicKey] = useState("");
//   const [balance, setBalance] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Connect Wallet
//   const connectWallet = async () => {
//     try {
//       await requestAccess();
//       const addressObj = await getAddress();
//       setPublicKey(addressObj.address);
//     } catch (error) {
//       console.error("Connection Error:", error);
//       alert("Connection failed.");
//     }
//   };

//   // Check Balance
//   const checkBalance = async () => {
//     try {
//       const server = new StellarSdk.Horizon.Server(
//         "https://horizon-testnet.stellar.org"
//       );

//       const account = await server.loadAccount(publicKey);

//       const xlmBalance = account.balances.find(
//         (b) => b.asset_type === "native"
//       );

//       setBalance(xlmBalance.balance);
//     } catch (error) {
//       console.error("Balance error:", error);
//       alert("Error loading balance.");
//     }
//   };

//   // Send 1 XLM to Yourself
//   const sendPayment = async () => {
//     try {
//       setLoading(true);

//       const server = new StellarSdk.Horizon.Server(
//         "https://horizon-testnet.stellar.org"
//       );

//       const sourceAccount = await server.loadAccount(publicKey);

//       const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
//         fee: StellarSdk.BASE_FEE,
//         networkPassphrase: StellarSdk.Networks.TESTNET,
//       })
//         .addOperation(
//           StellarSdk.Operation.payment({
//             destination: publicKey,
//             asset: StellarSdk.Asset.native(),
//             amount: "1",
//           })
//         )
//         .setTimeout(30)
//         .build();

//       const signed = await signTransaction(transaction.toXDR(), {
//         networkPassphrase: StellarSdk.Networks.TESTNET,
//       });

//       const tx = StellarSdk.TransactionBuilder.fromXDR(
//         signed.signedTxXdr,
//         StellarSdk.Networks.TESTNET
//       );

//       await server.submitTransaction(tx);

//       alert("Payment Successful!");
//       checkBalance();

//     } catch (error) {
//       console.error("Payment failed:", error);
//       alert("Transaction failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <WalletUI
//       publicKey={publicKey}
//       balance={balance}
//       loading={loading}
//       connectWallet={connectWallet}
//       checkBalance={checkBalance}
//       sendPayment={sendPayment}
//     />
//   );
// }

// export default App;
