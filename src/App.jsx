import React, { useState, useEffect } from 'react';
import ScrambleDisplay from './Components/ScrambleDisplay';
import Timer from './Components/Timer';
import RightSidebar from './Components/RightSidebar';
import LeftSidebar from './Components/LeftSidebar';

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
    "R' U' R' F2 U' R U2 F2 R",
    "R' F R F' R' F R2 U R' U' R U' R'",
    "F R U' R' F R U2 R' U F'",
    "F R' F' R U R U R' U' R' F' R2 U R'"
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
    "F' U R U' R' U F R U R'",
    "R2 F U' R U' R U' F2",
    "R U' R' U R U' R' U F R U' R'",
    "R2 F U' R U' R U' F2",
    "R' F R2 U' R2 F U R F' U F R'",
    "R' F R2 U' R' U R U' R' F",
    "R' F R2 U' R2 F U R F' U F R'"
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
  const [currentCase, setCurrentCase] = useState(''); // State to track the current case type
  const [solveTimes, setSolveTimes] = useState([]);
  const [caseToggles, setCaseToggles] = useState({
    U: true, T: true, L: true, P: true, H: true, S: true, A: true,
  });
  const [selectedSolve, setSelectedSolve] = useState(null);

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

  // Timer states
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer functions
  const startTimer = () => {
    setStartTime(performance.now());
    setElapsedTime(0);
    setIsActive(true);
  };

  const stopTimer = () => {
    if (!isActive) return;
  
    const endTime = performance.now();
    const rawTime = (endTime - startTime) / 1000;
    const finalTime = rawTime.toFixed(2); // Round the time here for consistency
  
    setIsActive(false);
    setTimer(parseFloat(finalTime)); // Convert string back to number for consistent display
    setSolveTimes(prevTimes => [
      ...prevTimes,
      { time: finalTime, scramble: alteredScramble, caseType: currentCase }
    ]); // Store the rounded time as a string for consistency in display and calculations
    updateScramble();
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((performance.now() - startTime) / 1000);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  // Handle keypress
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        if (!isActive) {
          startTimer();
        } else {
          stopTimer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, currentScramble]);


  const generateNewScramble = () => {
    const enabledCases = Object.keys(caseToggles).filter(key => caseToggles[key]);
    const randomCase = enabledCases[Math.floor(Math.random() * enabledCases.length)];
    const newScramble = scrambles[randomCase][Math.floor(Math.random() * scrambles[randomCase].length)];
    setCurrentCase(randomCase); // Set the current case when generating a new scramble
    return newScramble;
  };

  const updateScramble = () => {
    const newScramble = generateNewScramble();
    setPreviousScramble(alteredScramble);
    setCurrentScramble(newScramble);
  };

  const deleteSolve = solveToDelete => {
    setSolveTimes(prevTimes => prevTimes.filter(solve => solve !== solveToDelete));
    setSelectedSolve(null); // Clear the selected solve
  };

  const clearSolves = () => {
    setSolveTimes([]);
  };

  useEffect(() => {
    updateScramble();  // This function now depends on caseToggles state
  }, [caseToggles]);   // Only re-run the effect if caseToggles changes

  useEffect(() => {
    setAlteredScramble(transformScramble(currentScramble));
  }, [currentScramble]);

  const toggleCase = (caseName) => {
    const newToggles = { ...caseToggles, [caseName]: !caseToggles[caseName] };
    const activeCases = Object.values(newToggles).filter(val => val).length;
    if (activeCases > 0) {
      setCaseToggles(newToggles);
    }
  };

  return (
    <div className="grid grid-rows-[10%_90%] grid-cols-4 h-screen">
      <header className="col-span-4 bg-gray-800 text-white flex items-center justify-center p-4">
        <ScrambleDisplay scramble={alteredScramble} />
      </header>
      <LeftSidebar 
        elapsedTime={elapsedTime.toFixed(2)}
        solveTimes={solveTimes}
        clearSolves={clearSolves}
        onSelectSolve={setSelectedSolve}
      />   
      <Timer timer={timer} isActive={isActive} startTimer={startTimer} stopTimer={stopTimer} />
      <RightSidebar 
        selectedSolve={selectedSolve} 
        deleteSolve={deleteSolve} 
        caseToggles={caseToggles} 
        toggleCase={toggleCase} />
    </div>
  );
};

export default App;