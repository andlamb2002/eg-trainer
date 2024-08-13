import React from 'react';

const RightSidebar = ({ selectedSolve, deleteSolve, caseToggles, toggleCase }) => {
  const caseButtons = Object.keys(caseToggles);

  return (
    <aside className="p-4">
      {selectedSolve ? (
        <div>
          <h2>Selected Solve Details</h2>
          <p>Scramble: {selectedSolve.scramble}</p>
          <p>Time: {selectedSolve.time} seconds</p>
          <p>Case Type: {selectedSolve.caseType}</p>
          <button onClick={() => deleteSolve(selectedSolve)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Delete Solve
          </button>
        </div>
      ) : (
        <div>No solve selected</div>
      )}
      <hr className="my-4"/>
      <div>
        <h2>Toggle Cases</h2>
        {caseButtons.map(caseName => (
          <button
            key={caseName}
            onClick={() => toggleCase(caseName)}
            className={`p-2 m-1 ${caseToggles[caseName] ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {caseName} Cases
          </button>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
