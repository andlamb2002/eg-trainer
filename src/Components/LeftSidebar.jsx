import React from 'react';

const LeftSidebar = ({ solveTimes, clearSolves, onSelectSolve }) => {
  const meanTime = solveTimes.length > 0 
    ? (
        solveTimes
          .map(solve => parseFloat(solve.time))
          .reduce((acc, time) => acc + time, 0) / solveTimes.length
      ).toFixed(2)
    : 0;

  return (
    <div className="flex flex-col h-full p-4">
      <h2>Total Solves: {solveTimes.length}</h2>
      <h2>Mean: {meanTime} seconds</h2>
      <div className="overflow-y-auto h-1/2 w-full">
        <h3>Solve Times:</h3>
        <p>
          {solveTimes.map((solve, index) => (
            <span key={index} onClick={() => onSelectSolve(solve)} style={{ cursor: 'pointer', color: 'blue' }}>
              {solve.time}
              {index < solveTimes.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
      <button onClick={clearSolves} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
        Clear All Solves
      </button>
    </div>
  );
};

export default LeftSidebar;
