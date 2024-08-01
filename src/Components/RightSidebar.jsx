import React from 'react';

const RightSidebar = ({ scramble, times, setTimes }) => {
  const lastSolveTime = times.length > 0 ? (times[times.length - 1] / 1000).toFixed(3) : null;

  const removeLastSolve = () => {
    setTimes(times.slice(0, -1));
  };

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
        <div>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;
