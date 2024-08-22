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
  // const [caseToggles, setCaseToggles] = useState(
  //   JSON.parse(localStorage.getItem('caseToggles')) || {
  //     CLL: { U: true, T: true, L: true, P: true, H: true, S: true, A: true },
  //     EG1: { U: true, T: true, L: true, P: true, H: true, S: true, A: true },
  //   }
  // );
  const [caseToggles, setCaseToggles] = useState({
    CLL: {
      A: Array(6).fill(true),
      H: Array(4).fill(true),
      L: Array(6).fill(true),
      P: Array(6).fill(true),
      S: Array(6).fill(true),
      T: Array(6).fill(true),
      U: Array(6).fill(true)
    },
    EG1: {
      A: Array(6).fill(true),
      H: Array(4).fill(true),
      L: Array(6).fill(true),
      P: Array(6).fill(true),
      S: Array(6).fill(true),
      T: Array(6).fill(true),
      U: Array(6).fill(true)
    }
  });
  const [selectedSolve, setSelectedSolve] = useState(null);

  useEffect(() => {
    localStorage.setItem('solveTimes', JSON.stringify(solveTimes));
    localStorage.setItem('caseToggles', JSON.stringify(caseToggles));
  }, [solveTimes, caseToggles]);

  // Timer states
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Timer functions
  const startTimer = () => {
    setStartTime(performance.now());
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
      caseType: currentCase // Store the full case type (e.g., 'CLL U Case 1')
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
        event.preventDefault();  
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

  // const generateNewScramble = () => {
  //   // Get all enabled CLL and EG1 cases
  //   const enabledCLLCases = Object.keys(caseToggles.CLL).filter(key => caseToggles.CLL[key]);
  //   const enabledEG1Cases = Object.keys(caseToggles.EG1).filter(key => caseToggles.EG1[key]);
  
  //   // Combine the two arrays
  //   const combinedCases = [...enabledCLLCases.map(caseName => ({ type: 'CLL', name: caseName })),
  //                          ...enabledEG1Cases.map(caseName => ({ type: 'EG1', name: caseName }))];
  
  //   // Randomly select a case based on the proportion of toggled cases
  //   const randomCaseIndex = Math.floor(Math.random() * combinedCases.length);
  //   const selectedCase = combinedCases[randomCaseIndex];
  
  //   // Choose a random caseId from the available caseIds in that case category
  //   const caseSet = scrambles[selectedCase.type][selectedCase.name];
  //   const randomCaseIdIndex = Math.floor(Math.random() * caseSet.length);
  //   const selectedCaseId = caseSet[randomCaseIdIndex];
  
  //   // Retrieve the scramble from the algs list based on the selected caseId
  //   const newScramble = selectedCaseId.algs[Math.floor(Math.random() * selectedCaseId.algs.length)];
  
  //   // Set the current case type and scramble
  //   setCurrentCase(`${selectedCase.type}-${selectedCase.name}${selectedCaseId.caseId}`);
  //   return newScramble;
  // };

  const generateNewScramble = () => {
    // Filter cases based on toggles
    const filteredCases = Object.entries(caseToggles).flatMap(([type, cases]) =>
        Object.entries(cases).flatMap(([caseName, toggles]) =>
            toggles.map((toggle, index) => toggle ? { type, caseName, caseId: index } : null).filter(Boolean)
        )
    );

    if (filteredCases.length === 0) {
        console.log("No cases are selected for generating scrambles.");
        return "Please select at least one case to generate scrambles."; // Provide feedback if no cases are enabled
    }

    // Select a random case from the filtered list
    const selectedCase = filteredCases[Math.floor(Math.random() * filteredCases.length)];
    const caseDetails = scrambles[selectedCase.type][selectedCase.caseName][selectedCase.caseId];
    const newScramble = caseDetails.algs[Math.floor(Math.random() * caseDetails.algs.length)];
    
    setCurrentCase(`${selectedCase.type} ${selectedCase.caseName} Case ${selectedCase.caseId + 1}`);
    return newScramble;
};

  const updateScramble = () => {
    const newScramble = generateNewScramble();
    setCurrentScramble(newScramble);
  };

  const deleteSolve = (solveToDelete) => {
    const confirmed = window.confirm("Delete this solve?");
    if (confirmed) {
      setSolveTimes(prevTimes => prevTimes.filter(solve => solve !== solveToDelete));
      setSelectedSolve(null); // Clear the selected solve
    }
  };

  const clearSolves = () => {
    const confirmed = window.confirm("Clear all solves?");
    if (confirmed) {
      setSolveTimes([]);
      setSelectedSolve(null);  // Also clear the selected solve when clearing all solves
    }
  };

  useEffect(() => {
    updateScramble();  // This function now depends on caseToggles state
  }, [caseToggles]);   // Only re-run the effect if caseToggles changes

  useEffect(() => {
    setAlteredScramble(transformScramble(currentScramble));
  }, [currentScramble]);

  // const toggleCase = (caseType, caseName) => {
  //   const newToggles = { 
  //     ...caseToggles, 
  //     [caseType]: {
  //       ...caseToggles[caseType],
  //       [caseName]: !caseToggles[caseType][caseName]
  //     }
  //   };
  //   const activeCases = Object.values(newToggles.CLL).filter(val => val).length + 
  //                       Object.values(newToggles.EG1).filter(val => val).length;
  //   if (activeCases > 0) {
  //     setCaseToggles(newToggles);
  //   }
  // };
  
  const toggleCase = (caseType, caseName, caseIndex) => {
    const newToggles = { ...caseToggles, [caseType]: { ...caseToggles[caseType], [caseName]: caseToggles[caseType][caseName].map((status, index) => index === caseIndex ? !status : status) }};
    setCaseToggles(newToggles);
  };

  const toggleAllCases = (caseType, caseName) => {
    const allSelected = caseToggles[caseType][caseName].every(status => status);
    const newToggles = { 
      ...caseToggles, 
      [caseType]: { 
        ...caseToggles[caseType], 
        [caseName]: caseToggles[caseType][caseName].map(() => !allSelected)
      }
    };
    setCaseToggles(newToggles);
  };

  return (
    <div className="grid grid-rows-[10%_90%] grid-cols-3 min-h-screen overflow-hidden">
      <header className="col-span-3 bg-gray-800 text-white flex items-center justify-center p-4">
        <ScrambleDisplay 
          scramble={alteredScramble} 
        />
      </header>
      <LeftSidebar 
        scrambles={scrambles} 
        caseToggles={caseToggles} 
        toggleCase={toggleCase}
        toggleAllCases={toggleAllCases} // Pass toggleAllCases as a prop
      />   
      <main className="flex justify-center items-center font-bold text-6xl">
        <Timer 
          timer={timer} 
          isActive={isActive} 
          startTimer={startTimer} 
          stopTimer={stopTimer} 
        />
      </main>
      <RightSidebar 
        solveTimes={solveTimes}
        onSelectSolve={setSelectedSolve}
        selectedSolve={selectedSolve} 
        deleteSolve={deleteSolve}
        clearSolves={clearSolves}
      />
    </div>
  );
};

export default App;