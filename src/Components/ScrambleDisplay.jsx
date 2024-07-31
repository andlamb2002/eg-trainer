// components/ScrambleDisplay.jsx
import React, { useState, useEffect } from 'react';

const ScrambleDisplay = ({ scramble }) => {
  const [displayScramble, setDisplayScramble] = useState('');

  useEffect(() => {
    const invertScramble = (scramble) => {
      if (!scramble) return '';
      let moves = scramble.split(' ');
      let inversedMoves = moves.map(move => {
        if (move.includes("'")) {
          return move.replace("'", "");
        } else if (move.includes("2")) {
          return move;
        } else {
          return move + "'";
        }
      });
      return inversedMoves.reverse().join(' ');
    };

    const addRandomU = (moveSet) => {
      const options = ["", "U", "U'", "U2"];
      const start = options[Math.floor(Math.random() * options.length)];
      const end = options[Math.floor(Math.random() * options.length)];
      return `${start} ${moveSet} ${end}`.trim();
    };

    const inversed = invertScramble(scramble);
    const newScramble = addRandomU(inversed);
    setDisplayScramble(newScramble);
  }, [scramble]);

  return (
    <div>
      <div>Current Scramble: {displayScramble}</div>
    </div>
  );
};

export default ScrambleDisplay;
