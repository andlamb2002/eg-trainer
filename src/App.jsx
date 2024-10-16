import React, { useState, useEffect, useRef } from 'react';
import { scrambles, transformScramble } from './Components/Scrambles';
import Header from './Components/Header';
import Timer from './Components/Timer';
import RightSidebar from './Components/RightSidebar';
import LeftSidebar from './Components/LeftSidebar';

const App = () => {

    // Scramble States
    const [scramble, setScramble] = useState('');
    const [scrambleError, setScrambleError] = useState(false);

    // Toggle States
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

    // Preset States
    const [presetName, setPresetName] = useState('');
    const [presets, setPresets] = useState(() => {
        const localData = localStorage.getItem('presets');
        return localData ? JSON.parse(localData) : [];
    });

    // Solves States
    const [solveTimes, setSolveTimes] = useState(
        JSON.parse(localStorage.getItem('solveTimes')) || []
    );  
    const [currentCase, setCurrentCase] = useState('');
    const [selectedSolve, setSelectedSolve] = useState(null);

    // Timer States
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const stopTriggered = useRef(false); 

    // Apply Face States
    // const [minMoves, setMinMoves] = useState(0);
    // const [maxMoves, setMaxMoves] = useState(0);
    // const [stagedMinMoves, setStagedMinMoves] = useState(0);
    // const [stagedMaxMoves, setStagedMaxMoves] = useState(0);

    

    // Save to Local Storage 
    useEffect(() => {
        localStorage.setItem('solveTimes', JSON.stringify(solveTimes));
        localStorage.setItem('caseToggles', JSON.stringify(caseToggles));
        localStorage.setItem('presets', JSON.stringify(presets));  
    }, [solveTimes, caseToggles, presets]);

    // Update scrambles when toggles change
    useEffect(() => {
        updateScramble();  
    }, [caseToggles]);  

    // Starts timer when isActive
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

    // Handles keyboard presses for starting/stopping timer 
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (document.activeElement.tagName === 'INPUT') {
                return;
            }
            if (event.code === 'Space') {
                event.preventDefault();
                if (isActive) {
                    stopTimer();
                stopTriggered.current = true;
                }
            }
        };

        const handleKeyUp = (event) => {
            if (document.activeElement.tagName === 'INPUT') {
                return;
            }
            if (event.code === 'Space') {
                event.preventDefault();
                if (!isActive && !stopTriggered.current) {
                    startTimer();
                }
                stopTriggered.current = false;
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isActive]);



    // Update scramble based on toggled cases
    const updateScramble = () => {
        const filteredCases = Object.entries(caseToggles).flatMap(([type, cases]) =>
            Object.entries(cases).flatMap(([caseName, toggles]) =>
                toggles.map((toggle, index) => toggle ? { type, caseName, caseId: index } : null).filter(Boolean)
            )
        );
    
        if (filteredCases.length === 0) {
            setScrambleError(true);
            setScramble('');  
            return;
        }
    
        setScrambleError(false);
    
        const selectedCase = filteredCases[Math.floor(Math.random() * filteredCases.length)];
        const caseDetails = scrambles[selectedCase.type][selectedCase.caseName][selectedCase.caseId];
        const newScramble = caseDetails.algs[Math.floor(Math.random() * caseDetails.algs.length)];
    
        setCurrentCase(`${selectedCase.type} ${selectedCase.caseName} Case ${selectedCase.caseId + 1}`);
        setScramble(transformScramble(newScramble));  
    };
    

    
    // Toggle one specific case
    const toggleCase = (caseType, caseName, caseIndex) => {
        const newToggles = { 
            ...caseToggles, 
            [caseType]: { 
                ...caseToggles[caseType], 
                [caseName]: caseToggles[caseType][caseName].map((status, index) => 
                    index === caseIndex ? !status : status)
            }
        };
      
        setCaseToggles(newToggles);
    };

    // Toggle a specific case type
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
    
    // Toggle all cases
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
    


    // Save new preset
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
            newPresets[presetIndex] = newPreset; 
            setPresets(newPresets);
        } else {
            setPresets([...presets, newPreset]); 
        }
        setPresetName('');
    };
    
    // Load existing preset
    const loadPreset = (preset) => {
        setCaseToggles(preset.toggles);
        setPresetName(preset.name);
    };
    
    // Edit existing preset
    const editPreset = (preset) => {
        setPresetName(preset.name);
        setCaseToggles(preset.toggles);
    };
    
    // Delete preset
    const deletePreset = (presetName) => {
        if (window.confirm(`Are you sure you want to delete the preset '${presetName}'?`)) {
            setPresets(presets.filter(p => p.name !== presetName));
        }
    };  



    // Delete specific solve
    const deleteSolve = (solveToDelete) => {
        const confirmed = window.confirm("Delete this solve?");
        if (confirmed) {
            setSolveTimes(prevTimes => prevTimes.filter(solve => solve !== solveToDelete));
            setSelectedSolve(null); 
        }
    };
    
    // Delete all solves
    const clearSolves = () => {
        const confirmed = window.confirm("Clear all solves?");
        if (confirmed) {
            setSolveTimes([]);
            setSelectedSolve(null);  
        }
    };



    // Start timer and set active
    const startTimer = () => {
        if (!scrambleError) {
            setStartTime(performance.now());
            setIsActive(true);
        }
    };
    
    // Handle stopping the timer
    const stopTimer = () => {
        if (!isActive) return;
      
        const endTime = performance.now();
        const rawTime = (endTime - startTime) / 1000;
        const finalTime = rawTime.toFixed(2); 
      
        const newSolve = {
            time: finalTime,
            scramble: scramble,
            caseType: currentCase 
        };
      
        setIsActive(false);
        setTimer(parseFloat(finalTime)); 
        setSolveTimes(prevTimes => [...prevTimes, newSolve]);
        setSelectedSolve(newSolve); 
        updateScramble();
    };



    // Old functions for handling apply face
    // const handleMinMovesChange = (value) => {
    //     const newMin = Number(value);
    //     if (newMin <= stagedMaxMoves) {
    //         setStagedMinMoves(newMin);
    //     }
    // };

    // const handleMaxMovesChange = (value) => {
    //     const newMax = Number(value);
    //     if (newMax >= stagedMinMoves) {
    //         setStagedMaxMoves(newMax);
    //     }
    // };

    // const applyFaceMoves = () => {
    //     setMinMoves(stagedMinMoves);
    //     setMaxMoves(stagedMaxMoves);
    //     updateScramble();
    // };



    return (
        <div className="grid grid-cols-3">

            <Header 
                scramble={scrambleError ? "Select at least one case." : scramble}
                updateScramble={updateScramble}
            />
            
            <LeftSidebar 
                scrambles={scrambles} 
                caseToggles={caseToggles} 
                toggleCase={toggleCase}
                toggleAllCases={toggleAllCases} 
                toggleAllCasesByType={toggleAllCasesByType} 
                presets={presets}
                presetName={presetName}
                setPresetName={setPresetName}
                savePreset={savePreset}
                loadPreset={loadPreset}  
                editPreset={editPreset}  
                deletePreset={deletePreset}  
            />   

            <Timer 
                timer={timer} 
            />

            <RightSidebar 
                solveTimes={solveTimes}
                onSelectSolve={setSelectedSolve}
                selectedSolve={selectedSolve} 
                deleteSolve={deleteSolve}
                clearSolves={clearSolves}
                scrambles={scrambles} 
                // stagedMinMoves={stagedMinMoves}
                // stagedMaxMoves={stagedMaxMoves}
                // handleMinMovesChange={handleMinMovesChange}
                // handleMaxMovesChange={handleMaxMovesChange}
                // applyFaceMoves={applyFaceMoves}
            />

        </div>
    );
};

export default App;