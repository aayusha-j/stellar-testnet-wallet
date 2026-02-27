// src/components/WalletUI.js
import React from "react";

function WalletUI({
  publicKey,
  balance,
  loading,
  connectWallet,
  sendPayment,
  disconnectWallet,
  checkBalance,
  txMessage,
  txHash   // ✅ NEW
})


 {
  return (
    <div className="container">
      <h1>Stellar Testnet Wallet</h1>

      {publicKey ? (
        <div>
          <p><b>Wallet Connected:</b></p>
          <div className="wallet-address">{publicKey}</div>

          

          <div style={{ marginTop: "20px" }}>
  <button
    className="secondary-btn"
    onClick={disconnectWallet}
  >
    Disconnect
  </button>

  <button
    className="secondary-btn"
    onClick={checkBalance}
    style={{ marginLeft: 10 }}
  >
    Show Balance
  </button>

  <button
    className="primary-btn"
    onClick={sendPayment}
    disabled={loading}
    style={{ marginLeft: 10 }}
  >
    {loading ? "Sending..." : "Send 1 XLM"}
  </button>
</div>

{balance && (
  <p style={{ marginTop: "15px", fontWeight: "bold" }}>
    Balance: {balance} XLM
  </p>
)}

{txMessage && (
  <div style={{ 
    marginTop: "15px",
    textAlign: "center"
  }}>
    <p style={{
      color: "green",
      fontWeight: "bold",
      fontSize: "16px"
    }}>
      {txMessage}
    </p>
  </div>
)}


{txHash && (
  <div style={{
    textAlign: "center",
    marginTop: "8px",
    fontSize: "12px",
    wordBreak: "break-all"
  }}>
    Tx Hash: {txHash}
  </div>
)}



        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <button
            className="primary-btn"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletUI;
