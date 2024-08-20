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
  const [solveTimes, setSolveTimes] = useState(
    JSON.parse(localStorage.getItem('solveTimes')) || []
  );  
  const [caseToggles, setCaseToggles] = useState(
    JSON.parse(localStorage.getItem('caseToggles')) || {
      CLL: { U: true, T: true, L: true, P: true, H: true, S: true, A: true },
      EG1: { U: true, T: true, L: true, P: true, H: true, S: true, A: true },
    }
  );
  const [selectedSolve, setSelectedSolve] = useState(null);

  useEffect(() => {
    localStorage.setItem('solveTimes', JSON.stringify(solveTimes));
    localStorage.setItem('caseToggles', JSON.stringify(caseToggles));
  }, [solveTimes, caseToggles]);

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
      caseType: `${currentCase.split(' ')[0]} ${currentCase.split(' ')[1]}` // e.g., 'CLL U'
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
    // Get all enabled CLL and EG1 cases
    const enabledCLLCases = Object.keys(caseToggles.CLL).filter(key => caseToggles.CLL[key]);
    const enabledEG1Cases = Object.keys(caseToggles.EG1).filter(key => caseToggles.EG1[key]);
  
    // Combine the two arrays
    const combinedCases = [...enabledCLLCases.map(caseName => ({ type: 'CLL', name: caseName })),
                           ...enabledEG1Cases.map(caseName => ({ type: 'EG1', name: caseName }))];
  
    // Randomly select a case based on the proportion of toggled cases
    const randomCaseIndex = Math.floor(Math.random() * combinedCases.length);
    const selectedCase = combinedCases[randomCaseIndex];
  
    // Retrieve the scramble based on the selected case type and name
    const newScramble = scrambles[selectedCase.type][selectedCase.name][Math.floor(Math.random() * scrambles[selectedCase.type][selectedCase.name].length)];
    
    // Set the current case type and scramble
    setCurrentCase(`${selectedCase.type} ${selectedCase.name}`);
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

  const toggleCase = (caseType, caseName) => {
    const newToggles = { 
      ...caseToggles, 
      [caseType]: {
        ...caseToggles[caseType],
        [caseName]: !caseToggles[caseType][caseName]
      }
    };
    const activeCases = Object.values(newToggles.CLL).filter(val => val).length + 
                        Object.values(newToggles.EG1).filter(val => val).length;
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