import React, { useState, useEffect, useRef } from 'react';
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
  const initialCaseToggles = () => {
    const storedToggles = JSON.parse(localStorage.getItem('caseToggles'));
    if (storedToggles) return storedToggles;

    return {
      CLL: {
        A: Array(6).fill(true),
        F: Array(2).fill(true),
        H: Array(4).fill(true),
        L: Array(6).fill(true),
        P: Array(6).fill(true),
        S: Array(6).fill(true),
        T: Array(6).fill(true),
        U: Array(6).fill(true)
      },
      EG1: {
        A: Array(6).fill(true),
        F: Array(3).fill(true),
        H: Array(4).fill(true),
        L: Array(6).fill(true),
        P: Array(6).fill(true),
        S: Array(6).fill(true),
        T: Array(6).fill(true),
        U: Array(6).fill(true)
      }
    };
  };

  const [caseToggles, setCaseToggles] = useState(initialCaseToggles());
  const [selectedSolve, setSelectedSolve] = useState(null);
  const [scrambleError, setScrambleError] = useState(false);

  const [presetName, setPresetName] = useState('');
  const [presets, setPresets] = useState(() => {
    // Load presets from local storage or initialize to an empty array if none exist
    const localData = localStorage.getItem('presets');
    return localData ? JSON.parse(localData) : [];
  });

  const [minMoves, setMinMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(0);
  const [stagedMinMoves, setStagedMinMoves] = useState(0);
  const [stagedMaxMoves, setStagedMaxMoves] = useState(0);

  useEffect(() => {
    localStorage.setItem('solveTimes', JSON.stringify(solveTimes));
    localStorage.setItem('caseToggles', JSON.stringify(caseToggles));
    localStorage.setItem('presets', JSON.stringify(presets));  
  }, [solveTimes, caseToggles, presets]);

  // Timer states
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const stopTriggered = useRef(false); // Using useRef to hold the flag state

  // Timer functions
  const startTimer = () => {
    if (!scrambleError) {
      setStartTime(performance.now());
      setIsActive(true);
    }
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (isActive) {
          stopTimer();
          stopTriggered.current = true; // Set the flag indicating the timer was stopped
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!isActive && !stopTriggered.current) {
          startTimer();
        }
        stopTriggered.current = false; // Reset the flag on key up
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive]);
  
  const generateNewScramble = () => {
    const filteredCases = Object.entries(caseToggles).flatMap(([type, cases]) =>
      Object.entries(cases).flatMap(([caseName, toggles]) =>
        toggles.map((toggle, index) => toggle ? { type, caseName, caseId: index } : null).filter(Boolean)
      )
    );
  
    if (filteredCases.length === 0) {
      setScrambleError(true);
      return;
    }
  
    setScrambleError(false);
  
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
    setAlteredScramble(transformScramble(currentScramble, minMoves, maxMoves));
  }, [currentScramble, maxMoves, minMoves]);
  
  const toggleCase = (caseType, caseName, caseIndex) => {
    const newToggles = { 
      ...caseToggles, 
      [caseType]: { 
        ...caseToggles[caseType], 
        [caseName]: caseToggles[caseType][caseName].map((status, index) => 
          index === caseIndex ? !status : status
        )
      }
    };
  
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

  const toggleAllCasesByType = (caseType) => {
    const allSelected = Object.values(caseToggles[caseType]).every(cases =>
      cases.every(status => status)
    );

    const newToggles = {
      ...caseToggles,
      [caseType]: Object.fromEntries(
        Object.entries(caseToggles[caseType]).map(([caseName, statuses]) => [
          caseName,
          statuses.map(() => !allSelected)
        ])
      )
    };

    setCaseToggles(newToggles);
  };

  const savePreset = () => {
    if (!presetName.trim()) {
      alert("Please enter a valid preset name.");
      return;
    }
    const presetIndex = presets.findIndex(p => p.name === presetName);
    const newPreset = {
      name: presetName,
      toggles: { ...caseToggles }
    };
  
    if (presetIndex > -1) {
      const newPresets = [...presets];
      newPresets[presetIndex] = newPreset; // Replace existing preset
      setPresets(newPresets);
    } else {
      setPresets([...presets, newPreset]); // Add new preset
    }
    setPresetName(''); // Clear input after saving
  };

  const loadPreset = (preset) => {
    setCaseToggles(preset.toggles);
    setPresetName(preset.name);
  };

  const editPreset = (preset) => {
    setPresetName(preset.name);
    setCaseToggles(preset.toggles);
    // Optionally, keep track of editing state if needed
  };

  const deletePreset = (presetName) => {
    if (window.confirm(`Are you sure you want to delete the preset '${presetName}'?`)) {
      setPresets(presets.filter(p => p.name !== presetName));
    }
  };  

  const handleMinMovesChange = (value) => {
    const newMin = Number(value);
    if (newMin <= stagedMaxMoves) {
      setStagedMinMoves(newMin);
    }
  };

  const handleMaxMovesChange = (value) => {
    const newMax = Number(value);
    if (newMax >= stagedMinMoves) {
      setStagedMaxMoves(newMax);
    }
  };

  const applyFaceMoves = () => {
    setMinMoves(stagedMinMoves);
    setMaxMoves(stagedMaxMoves);
    updateScramble();
  };

  return (
    <div className="grid grid-cols-3">
      <header className="col-span-3 bg-gray-800 text-white flex items-center justify-center p-4 h-24">
        <ScrambleDisplay 
          scramble={scrambleError ? "Select at least one case." : alteredScramble}
          updateScramble={updateScramble}
        />
      </header>
      <LeftSidebar 
        scrambles={scrambles} 
        caseToggles={caseToggles} 
        toggleCase={toggleCase}
        toggleAllCases={toggleAllCases} // Pass toggleAllCases as a prop
        toggleAllCasesByType={toggleAllCasesByType} // Pass toggleAllCasesByType as a prop
        presets={presets}
        presetName={presetName}
        setPresetName={setPresetName}
        savePreset={savePreset}
        loadPreset={loadPreset}  // Pass the function as a prop
        editPreset={editPreset}  // Pass the function as a prop
        deletePreset={deletePreset}  // Pass the function
      />   
      <main className="flex justify-center font-bold text-6xl">
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
        scrambles={scrambles} 
        stagedMinMoves={stagedMinMoves}
        stagedMaxMoves={stagedMaxMoves}
        handleMinMovesChange={handleMinMovesChange}
        handleMaxMovesChange={handleMaxMovesChange}
        applyFaceMoves={applyFaceMoves}
      />
    </div>
  );
};

export default App;