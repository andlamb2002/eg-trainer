import React, { useState, useEffect } from 'react';
import ScrambleDisplay from './Components/ScrambleDisplay';
import RightSidebar from './Components/RightSidebar';

const scrambles = {
  U: [
    "R U R' U R U R2 F R2 U' R'",
    "F2 U' F' U' F U' F' U F'",
    "F U2 F U2 F U F2",
    "R U R' F' U' R U R' U' F R' F' R",
    "F' R2 F' R2 F' U' F2 R2",
    "F R U' R' F U' F' R' F' R",
    "F' U2 R U2 R' U2 F",
    "R U R' U F' R U R' U' R U R2 F2 R",
    "F' U' F R' F2 R F' U F",
    "R U' R' F R U' R2 F R",
    "R' F R F' R' F R2 U' R'",
    "R U' R' F R U' R2 F R",
    "R' F R F' U R U' R' F R U' R'",
    "F U' R' F2 R F' U2 F'",
    "F2 R U2 R' U' F2 U2 F'",
    "R' F R U' R' F R U' R U R' F'",
    "R' F R2 U' R' U F U F'",
    "F' U R U2 R' F U2 F"
  ],
  T: [
    "R2 U R U' R2 F R U2 R' F",
    "R U2 R' U' R' F' R F R' F' R",
    "R2 U R U' R2 F R U2 R' F",
    "R U2 R' F R U' R' F' R U R'",
    "R U' R' F R U' R' F R U R' F'",
    "F' R' F R2 U R' U' R U R'",
    "R U2 R' U' R' F' R2 U R'",
    "R' F R2 U' R' U' R' F2 R",
    "R U' R2 F R U R U2 R'",
    "R' F R F' U R U' R' U F R U' R'",
    "R' U F R2 U' R2 U' F U' R",
    "R' F R F' U R U' R' U F R U' R'",
    "R' F' R2 U R' F' R U R'",
    "R U R2 F' R F R' F' R",
    "R' F' R2 U R' F' R U R'",
    "R' U' R U F2 U' F2 R U R",
    "R U R' F R U R' F U' R U' R'",
    "R U' R' U2 F R U2 R' F"
  ],
  L: [
    "R U' R' U R U' R2 F' R F",
    "R U R' F' R U2 R' U2 R U R'",
    "F R U' R' F' R U R' F' R U R'",
    "R' F R U' R' F R2 U R' F'",
    "R' F R F' R' F R U R U2 R'",
    "R' F' R F' R' F' R F' R' F2 R",
    "R' U R2 U' R2 U' F R2 U' R'",
    "R U R2 F' R2 U' R2 U' R2 U' R2 U2 R",
    "R' U' R U' R' U2 F R2 U' R' U' R' F2 R",
    "R U2 R' F R U' R2 F' R",
    "R' F R2 U R' F' R U2 R'",
    "R U2 R' F R U' R2 F' R",
    "R U R' F' R U R' U' F R' F' R",
    "F' R' F R U' R U R' U' R U R'",
    "R' F R F U2 F U' F2",
    "F R U' R' U R' F' R U R' F' R",
    "R' U2 F R U2 R U' R2 F",
    "R' F' R F U' R' F' R U R' F' R"
  ],
  P: [
    "F U' R' F R U' F2 R U R'",
    "F2 R U R' U2 R U R' U' F",
    "F U' R' F R U' F2 R U R'",
    "R' F R2 U' R2 F R",
    "F U F' U' F U2 F U' F2",
    "R U' R2 F R2 U' R'",
    "F' R U2 R' F' U2 F R' F' R",
    "F R' F U' F2 R U R",
    "F' R U2 R' F' U2 F R' F' R",
    "F' R U R' U' R U R' F' R U R'",
    "R U' R' U R U' R' F R U' R'",
    "F' R U R' U' R U R' F' R U R'",
    "R U' R2 F R U R U' R' U' R' F R F'",
    "F U' R U2 R' F' R U R' F'",
    "R' U' R' F2 U' R U2 F2 R"
  ],
  H: [
    "R U' R2 F R F' R' F' R F",
    "F' R' F R F R' F' R2 U R'",
    "F' R2 F' R F R' U R'",
    "F2 U' F U' F' U F' U' F U' F2",
    "F R U' R2 F U' F2 U R",
    "R U' R' U' R U' R2 F2 R U R U R'",
    "R' U' R' F2 U F' R F'",
    "F U2 R U' R' F2 R' F2 R F'",
    "R U' R' F U2 F' R' F2 R F'",
    "F' U R' F R F' U F2",
    "R' F R F' R' F R U' R' F R F'",
    "F' U2 F' U R' F' R F'"
  ],
  S: [
    "R U' R2 F' R F U R' F R",
    "R U R' U F R U' R2 F' R",
    "R U' R2 F' R F U R' F R",
    "R' F R F U F2 R' F R",
    "F R' F' R F R U' R' U R' F' R",
    "R U R' F2 U F R U R'",
    "R' F R U2 R U' R2 F2 R F'",
    "F R' F' R U R' F' R2 U R'",
    "R' F R U2 R U' R2 F2 R F'",
    "F' U R U' R' U F R U R'",
    "F' R' F R2 U R' U' F R' F' R",
    "F' U R U' R' U F R U R'"
  ],
  A: [
    "R' F' R U' F' R' F R2 U R'",
    "R' F R2 U R' F' U' R U' R'",
    "R' F' R U' F' R' F R2 U R'",
    "R U' F2 R U2 R U' F",
    "F R U' R' U R' F' R U F' R U R'",
    "R U' R' F' U' F2 R U' R'",
    "R U' R' U2 R' F R2 U2 R' F",
    "F' R U R' U' R U R2 F' R",
    "R U' R' U2 R' F R2 U2 R' F",
    "R' F R F' U R U' R2 F' R F",
    "R U R' U2 R' F' R F R' F R",
    "R U' R' F' U' R U R' U' F",
    "R' F R U' R' F R U R U R' F'",
    "R' F2 R U' R U R' F' R U' R'",
    "F' R' F R U R U R' U' R U R'",
    "R F' U' F R' U' F' R2 U R2 F' R",
    "R U' R2 F R U' R' F R F'",
    "R F' U' F R' U' F' R2 U R2 F' R"
  ]
};



const App = () => {
  const [currentScramble, setCurrentScramble] = useState('');
  const [alteredScramble, setAlteredScramble] = useState('');
  const [previousScramble, setPreviousScramble] = useState('');
  const [solveCount, setSolveCount] = useState(0);
  const [caseToggles, setCaseToggles] = useState({
    U: true,
    T: true,
    L: true,
    P: true,
    H: true,
    S: true,
    A: true,
  });

  const transformScramble = (scramble) => {
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
    return newScramble;
  };

  const updateScramble = () => {
    const enabledCases = Object.keys(caseToggles).filter(key => caseToggles[key]);
    if (enabledCases.length === 0) return;
    const randomCase = enabledCases[Math.floor(Math.random() * enabledCases.length)];
    const newScramble = scrambles[randomCase][Math.floor(Math.random() * scrambles[randomCase].length)];
    setPreviousScramble(currentScramble);
    setCurrentScramble(newScramble);
    setSolveCount(solveCount + 1);
  };

  useEffect(() => {
    updateScramble(); // Update scramble on page load
  }, []);

  useEffect(() => {
    setAlteredScramble(transformScramble(currentScramble));
  }, [currentScramble]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        updateScramble();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentScramble, solveCount]);

  const toggleCase = (caseName) => {
    setCaseToggles(prevToggles => {
      const newToggles = { ...prevToggles, [caseName]: !prevToggles[caseName] };
      if (Object.values(newToggles).every(val => !val)) {
        return prevToggles; // Prevent all cases from being toggled off
      }
      setPreviousScramble(currentScramble); // Update previous scramble on case toggle
      const enabledCases = Object.keys(newToggles).filter(key => newToggles[key]);
      const randomCase = enabledCases[Math.floor(Math.random() * enabledCases.length)];
      const newScramble = scrambles[randomCase][Math.floor(Math.random() * scrambles[randomCase].length)];
      setCurrentScramble(newScramble); // Update current scramble after toggle
      return newToggles;
    });
  };

  return (
    <div className="grid grid-rows-[10%_90%] grid-cols-4 h-screen">
      <header className="col-span-4 bg-gray-800 text-white">
        <ScrambleDisplay scramble={alteredScramble} />
      </header>
      <aside className="col-span-1 bg-gray-200 flex items-center justify-center">
        <div>
          <h2>Total Solves: {solveCount}</h2>
        </div>
      </aside>
      <main className="col-span-2 flex justify-center items-center">
        {/* Main area could be used for something else in the future */}
      </main>
      <aside className="col-span-1 bg-gray-200">
        <RightSidebar 
          scramble={previousScramble} 
          caseToggles={caseToggles}
          toggleCase={toggleCase}
        />
      </aside>
    </div>
  );
};

export default App;