import React from 'react';

const RightSidebar = ({ scramble, caseToggles, toggleCase }) => {
  const caseButtons = Object.keys(caseToggles);

  return (
    <aside>
      {scramble ? (
        <div>
          <h2>Previous Scramble</h2>
          <p>{scramble}</p>
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <h2>Toggle Cases</h2>
        {caseButtons.map(caseName => (
          <button
            key={caseName}
            onClick={() => toggleCase(caseName)}
            style={{ backgroundColor: caseToggles[caseName] ? 'lightgreen' : 'lightcoral' }}
          >
            {caseName} Cases
          </button>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
