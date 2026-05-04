import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BattleResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerPokemon, opponentPokemon } = location.state || {};

  if (!playerPokemon || !opponentPokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center">
        <button onClick={() => navigate('/battle')} className="bg-yellow-500 px-6 py-2 rounded-lg">
          Go to Battle
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Battle Complete!</h1>
        <p className="text-white/80">Your battle has been recorded!</p>
        <button onClick={() => navigate('/battle')} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
          Battle Again
        </button>
      </div>
    </div>
  );
};

export default BattleResult;
