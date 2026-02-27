// import React, { useState } from "react";
// import { TransactionBuilder, Networks, Operation, Server, Asset, Transaction } from "stellar-sdk";
// import { signTransaction } from "@stellar/freighter-api";

// function SendPayment({ address }) {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [status, setStatus] = useState("");
//   const [txHash, setTxHash] = useState("");

//   const sendXLM = async () => {
//     if (!recipient || !amount || Number(amount) <= 0) {
//       alert("Enter valid recipient and amount");
//       return;
//     }

//     try {
//       setStatus("Processing transaction...");
//       setTxHash("");

//       const server = new Server("https://horizon-testnet.stellar.org");

//       const sourceAccount = await server.loadAccount(address);

//       const transaction = new TransactionBuilder(sourceAccount, {
//         fee: "100",
//         networkPassphrase: Networks.TESTNET,
//       })
//         .addOperation(
//           Operation.payment({
//             destination: recipient,
//             asset: Asset.native(),
//             amount: amount,
//           })
//         )
//         .setTimeout(30)
//         .build();

//       const signedTxXDR = await signTransaction(transaction.toXDR(), {
//         networkPassphrase: Networks.TESTNET,
//       });

//       const signedTransaction = Transaction.fromXDR(signedTxXDR, Networks.TESTNET);

//       const txResult = await server.submitTransaction(signedTransaction);

//       setStatus("Transaction Successful");
//       setTxHash(txResult.hash);

//     } catch (error) {
//       console.error(error);
//       setStatus("Transaction Failed");
//     }
//   };

//   return (
//     <div style={{ marginTop: "40px" }}>
//       <h3>Send XLM</h3>

//       <input
//         type="text"
//         placeholder="Recipient Address"
//         value={recipient}
//         onChange={(e) => setRecipient(e.target.value)}
//         style={{ width: "300px", marginBottom: "10px" }}
//       />
//       <br />

//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         style={{ width: "300px", marginBottom: "10px" }}
//       />
//       <br />

//       <button onClick={sendXLM}>Send XLM</button>

//       {status && <p><strong>{status}</strong></p>}
//       {txHash && <p>Transaction Hash: {txHash}</p>}
//     </div>
//   );
// }

// export default SendPayment;