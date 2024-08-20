import React from 'react';

const RightSidebar = ({ selectedSolve, deleteSolve, caseToggles, toggleCase }) => {
  const renderCaseButtons = (caseType) => {
    return Object.keys(caseToggles[caseType]).map((caseName) => (
      <button
        key={caseType + caseName}
        onClick={() => toggleCase(caseType, caseName)}
        className={`p-2 m-1 ${caseToggles[caseType][caseName] ? 'bg-green-500' : 'bg-red-500'} text-white rounded hover:opacity-90`}
      >
        {caseType} {caseName} Cases
      </button>
    ));
  };

  return (
    <aside className="p-4">
      {selectedSolve ? (
        <div>
          <h2>Selected Solve Details</h2>
          <p>Scramble: {selectedSolve.scramble}</p>
          <p>Time: {selectedSolve.time} seconds</p>
          <p>Case Type: {selectedSolve.caseType}</p>
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
      <div>
        <h2>Toggle Cases</h2>
        <div className="mb-4">
          <h3>CLL Cases</h3>
          <div className="flex flex-wrap">
            {renderCaseButtons('CLL')}
          </div>
        </div>
        <div>
          <h3>EG1 Cases</h3>
          <div className="flex flex-wrap">
            {renderCaseButtons('EG1')}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
