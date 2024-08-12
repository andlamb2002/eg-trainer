import React from 'react';

const Timer = ({ timer }) => {
  return (
    <div className="col-span-2 flex justify-center items-center font-bold text-8xl">
      {timer.toFixed(2)}
    </div>
  );
};

export default Timer;
