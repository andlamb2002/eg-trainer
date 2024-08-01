import React from 'react';

const RightSidebar = ({ scramble, times, setTimes, caseToggles, toggleCase }) => {
  const lastSolveTime = times.length > 0 ? (times[times.length - 1] / 1000).toFixed(3) : null;

  const removeLastSolve = () => {
    setTimes(times.slice(0, -1));
  };

  const caseButtons = ["U", "T", "L", "P", "H", "S", "A"];

  return (
    <aside>
      {times.length > 0 ? (
        <div>
          <h2>Last Solve</h2>
          <p>Time: {lastSolveTime} seconds</p>
          <button onClick={removeLastSolve}>Delete</button>
          <p>Scramble: {scramble}</p>
        </div>
      ) : (
        <div></div>
      )}
      <div>
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
