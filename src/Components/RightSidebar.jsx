import React from 'react';

const RightSidebar = ({ solveTimes, selectedSolve, onSelectSolve, deleteSolve, clearSolves, scrambles }) => {
  const meanTime = solveTimes.length > 0 
    ? (
        solveTimes
          .map(solve => parseFloat(solve.time))
          .reduce((acc, time) => acc + time, 0) / solveTimes.length
      ).toFixed(2)
    : 0;

    const getCaseImageUrl = () => {
      if (!selectedSolve || !scrambles) return '';
      const details = selectedSolve.caseType.split(' ');
      const caseType = details[0]; // "CLL"
      const caseLabel = details[1]; // "U"
      const caseId = parseInt(details[3]); // converting "1" from "Case 1"
  
      const caseInfo = scrambles[caseType][caseLabel].find(c => c.caseId === caseId);
      return caseInfo?.url || '';
  };

  return (
    <aside className="p-4">
      {selectedSolve ? (
        <div>
          <p>Scramble: {selectedSolve.scramble}</p>
          <p>Time: {selectedSolve.time} seconds</p>
          <p>Case Type: {selectedSolve.caseType}</p>
          <img src={getCaseImageUrl()} alt={`Case ${selectedSolve.caseType}`} className="my-2"/>
          <button
            onClick={() => deleteSolve(selectedSolve)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Delete Solve
          </button>
        </div>
      ) : (
        <div>No solve selected</div>
      )}
      <hr className="my-4" />
      <div className="flex flex-col h-full">
        <h2>Solves: {solveTimes.length}</h2>
        <h2>Mean: {meanTime} seconds</h2>
        <div className="overflow-y-auto h-1/2 w-full">
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
    </aside>
  );
};

export default RightSidebar;
