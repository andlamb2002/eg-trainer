import React from 'react';

const ScrambleDisplay = ({ scramble, updateScramble }) => (
  <div className="flex items-center space-x-4">
    <div className="text-3xl">Scramble: {scramble}</div>
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={updateScramble}
    >
      New
    </button>
  </div>
);

export default ScrambleDisplay;
