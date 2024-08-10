import React from 'react';

const LeftSidebar = ({ solveCount, elapsedTime }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2>Total Solves: {solveCount}</h2>
    <h2>Average Time: {elapsedTime} seconds</h2>
    {/* Add more stats as needed */}
  </div>
);

export default LeftSidebar;
