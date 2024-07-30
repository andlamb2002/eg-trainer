import React, { useState, useEffect } from 'react';

const ScrambleDisplay = ({ scramble }) => {
  const [displayScramble, setDisplayScramble] = useState('');

  useEffect(() => {
    // Function to inverse the scramble
    const invertScramble = (scramble) => {
      if (!scramble) return ''; // Return empty string if scramble is undefined or empty
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

    // Function to add random U moves at the start and end
    const addRandomU = (moveSet) => {
      const options = ["", "U", "U'", "U2"];
      const start = options[Math.floor(Math.random() * options.length)];
      const end = options[Math.floor(Math.random() * options.length)];
      return `${start} ${moveSet} ${end}`.trim();
    };

    // Apply the transformations
    const inversed = invertScramble(scramble);
    const newScramble = addRandomU(inversed);
    setDisplayScramble(newScramble);

  }, [scramble]);  // Depend on the scramble prop

  return (
    <div>
      <div>Current Scramble: {displayScramble}</div>
    </div>
  );
};

export default ScrambleDisplay;
