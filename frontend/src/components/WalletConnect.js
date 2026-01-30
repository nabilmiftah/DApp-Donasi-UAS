import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Gagal konek wallet:", error);
      }
    } else {
      alert("Silakan instal MetaMask!");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <button 
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Connect MetaMask
      </button>
    </div>
  );
};

export default WalletConnect;