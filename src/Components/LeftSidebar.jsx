import React from 'react';

const LeftSidebar = ({ solveTimes, clearSolves }) => {
  const meanTime = solveTimes.length > 0 
    ? (
        solveTimes
          .map(time => parseFloat(time))  // Convert each time string back to a number
          .reduce((acc, time) => acc + time, 0) / solveTimes.length
      ).toFixed(2)
    : 0;

  return (
    <div className="flex flex-col h-full p-4">
      <h2>Total Solves: {solveTimes.length}</h2>
      <h2>Mean: {meanTime}</h2>
      <div className="overflow-y-auto h-1/2 w-full">
        <h3>Solve Times:</h3>
        <p>{solveTimes.join(', ') || 'No solves yet'}</p>
      </div>
      <button 
        onClick={clearSolves} 
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
      >
        Clear All Solves
      </button>
    </div>
  );
};

export default LeftSidebar;
