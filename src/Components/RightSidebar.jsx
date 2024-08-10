import React from 'react';

const RightSidebar = ({ previousScramble, caseToggles, toggleCase }) => {
  const caseButtons = Object.keys(caseToggles);

  return (
    <aside className="p-4">
      {previousScramble && (
        <div>
          <h2>Previous Scramble</h2>
          <p>{previousScramble}</p>
        </div>
      )}
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
