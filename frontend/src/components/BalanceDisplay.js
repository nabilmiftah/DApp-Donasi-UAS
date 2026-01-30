import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contractConfig';

const BalanceDisplay = () => {
  const [total, setTotal] = useState("0");

  const fetchBalance = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const balance = await contract.totalDonations();
        setTotal(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Gagal ambil saldo:", error);
      }
    }
  };

  useEffect(() => { fetchBalance(); }, []);

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center my-4">
      <h3 className="text-sm font-bold text-blue-800 uppercase">Total Donasi</h3>
      <p className="text-2xl font-black text-blue-600">{total} SepoliaETH</p>
    </div>
  );
};

export default BalanceDisplay;