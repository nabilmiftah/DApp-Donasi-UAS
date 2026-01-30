import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contractConfig';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionList from './components/TransactionList';

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert("Silakan instal MetaMask!");
    }
  };

  const handleDonate = async () => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.donate({ value: ethers.utils.parseEther("0.01") });
      await tx.wait();
      alert("Donasi Berhasil! Terima kasih orang baik.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Transaksi Gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center px-8">
        <h1 className="text-xl font-black text-indigo-600 tracking-tighter">DONATE.DAPP</h1>
        {account ? (
          <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-indigo-700">{account.substring(0, 6)}...{account.substring(38)}</span>
          </div>
        ) : (
          <button onClick={connectWallet} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg">
            Connect Wallet
          </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-12 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Interaction */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-white">
            <h2 className="text-2xl font-bold mb-2">Salurkan Kebaikan</h2>
            <p className="text-gray-500 text-sm mb-6">Setiap donasi Anda akan tercatat selamanya di Blockchain.</p>
            
            <BalanceDisplay />

            <button 
              onClick={handleDonate}
              disabled={!account || loading}
              className={`w-full py-4 rounded-2xl font-black text-white text-lg transition-all shadow-xl active:scale-95 ${
                loading || !account ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 to-purple-600 hover:bg-green-300'
              }`}
            >
              {loading ? "Memproses Transaksi..." : "KIRIM DONASI"}
            </button>
            {!account && <p className="text-center text-red-400 text-xs mt-3 italic">Hubungkan wallet untuk berdonasi</p>}
          </div>
        </div>

        {/* Right Side: History */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-inner overflow-hidden">
          <TransactionList />
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs mt-12 pb-8">
        Blockchain &copy; 2026 - Powered by Nabilmiftah
      </footer>
    </div>
  );
}

export default App;