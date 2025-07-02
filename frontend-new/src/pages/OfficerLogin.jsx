import React from 'react';
import { useNavigate } from 'react-router-dom';

const OfficerLoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const wallet = prompt("Enter your wallet address:");
    if (wallet && wallet.trim() !== "") {
      localStorage.setItem('walletAddress', wallet.trim());
      navigate('/register');
    } else {
      alert("Wallet address is required!");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4 font-bold">Officer Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Connect Wallet (Manual Entry)
      </button>
    </div>
  );
};

export default OfficerLoginPage;
