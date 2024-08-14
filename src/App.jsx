import React, { useState, useEffect } from 'react';
import { scrambles, transformScramble } from './Components/Scrambles';
import ScrambleDisplay from './Components/ScrambleDisplay';
import Timer from './Components/Timer';
import RightSidebar from './Components/RightSidebar';
import LeftSidebar from './Components/LeftSidebar';

const App = () => {
  const [currentScramble, setCurrentScramble] = useState('');
  const [alteredScramble, setAlteredScramble] = useState('');
  const [currentCase, setCurrentCase] = useState(''); // State to track the current case type
  const [solveTimes, setSolveTimes] = useState([]);
  const [caseToggles, setCaseToggles] = useState({
    U: true, T: true, L: true, P: true, H: true, S: true, A: true,
  });
  const [selectedSolve, setSelectedSolve] = useState(null);

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

    const newSolve = {
      time: finalTime,
      scramble: alteredScramble,
      caseType: currentCase
    };

    setIsActive(false);
    setTimer(parseFloat(finalTime)); // Convert string back to number for consistent display
    setSolveTimes(prevTimes => [...prevTimes, newSolve]);
    setSelectedSolve(newSolve); // Set the new solve as the selected solve
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
    setCurrentScramble(newScramble);
  };

  const deleteSolve = solveToDelete => {
    setSolveTimes(prevTimes => prevTimes.filter(solve => solve !== solveToDelete));
    setSelectedSolve(null); // Clear the selected solve
  };

  const clearSolves = () => {
    setSolveTimes([]);
    setSelectedSolve(null);  // Also clear the selected solve when clearing all solves
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