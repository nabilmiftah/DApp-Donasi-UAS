import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contractConfig';

const TransactionList = () => {
  const [list, setList] = useState([]);

  const getTransactions = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const count = await contract.getDonorCount();
        const donorCount = count.toNumber();

        let tempArr = [];
        for (let i = 0; i < donorCount; i++) {
          const data = await contract.donors(i);
          tempArr.push({ addr: data.addr, amount: ethers.utils.formatEther(data.amount) });
        }
        setList(tempArr);
      } catch (error) {
        console.error("Gagal ambil daftar donatur:", error);
      }
    }
  };

  useEffect(() => { getTransactions(); }, []);

  return (
    <div className="mt-6 border-t-2 border-blue-300 pt-4">
      <h3 className="font-bold text-gray-700 mb-3 text-center">Riwayat Transaksi</h3>
      {list.length > 0 ? (
        <ul className="space-y-2">
          {list.map((item, idx) => (
            <li key={idx} className="text-[10px] p-2 bg-gray-50 rounded border flex justify-between">
              <span className="font-mono text-red-600">{item.addr.substring(0,20)}...</span>
              <span className="font-bold text-green-700">{item.amount} ETH</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xs text-gray-400 italic">Belum ada donasi.</p>
      )}
    </div>
  );
};

export default TransactionList;