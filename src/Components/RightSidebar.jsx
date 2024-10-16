import React from 'react';
// import RangeSlider from './RangeSlider';

const RightSidebar = ({
    solveTimes, selectedSolve, onSelectSolve, deleteSolve, clearSolves, 
    scrambles, 
    // stagedMinMoves, stagedMaxMoves, handleMinMovesChange, handleMaxMovesChange, applyFaceMoves
}) => {
    const meanTime = solveTimes.length > 0 
        ? (
            solveTimes
                .map(solve => parseFloat(solve.time))
                .reduce((acc, time) => acc + time, 0) / solveTimes.length
        ).toFixed(2) : 0;
  
    const getCaseImageUrl = () => {
        if (!selectedSolve || !scrambles) return '';
        const details = selectedSolve.caseType.split(' ');
        const caseType = details[0]; 
        const caseLabel = details[1]; 
        const caseId = parseInt(details[3]);
        const caseInfo = scrambles[caseType][caseLabel].find(c => c.caseId === caseId);
        return caseInfo?.url || '';
    };

    return (
        <aside className="p-4">

            {/* <RangeSlider
                min={0}
                max={5}
                stagedMinMoves={stagedMinMoves}
                stagedMaxMoves={stagedMaxMoves}
                onMinChange={handleMinMovesChange}
                onMaxChange={handleMaxMovesChange}
            />
            <div className="flex justify-between space-x-2 my-2">
                <input
                type="number"
                value={stagedMinMoves}
                onChange={(e) => handleMinMovesChange(parseInt(e.target.value))}
                className="w-full text-center border border-gray-400 rounded p-1"
                />
                <input
                type="number"
                value={stagedMaxMoves}
                onChange={(e) => handleMaxMovesChange(parseInt(e.target.value))}
                className="w-full text-center border border-gray-400 rounded p-1"
                />
            </div>
            <button
                onClick={applyFaceMoves}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
            >
                Apply Face
            </button>
            <hr className="my-4" /> */}

            {selectedSolve ? (
                <div>
                    <p>Scramble: {selectedSolve.scramble}</p>
                    <p>Time: {selectedSolve.time} seconds</p>
                    <p>Case Type: {selectedSolve.caseType}</p>
                    <img src={getCaseImageUrl()} alt={`Case ${selectedSolve.caseType}`} className="my-2"/>
                    <button onClick={() => deleteSolve(selectedSolve)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                        Delete Solve
                    </button>
                </div>
            ) : (
                <div>No solve selected</div>
            )}
            <hr className="my-4" />
            
            <div className="flex flex-col">
                <h2>Solves: {solveTimes.length}</h2>
                <h2>Mean: {meanTime} seconds</h2>
                <div className="overflow-y-auto h-1/2 w-full">
                    <p>
                        {solveTimes.map((solve, index) => (
                        <span key={index} onClick={() => onSelectSolve(solve)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {solve.time}{index < solveTimes.length - 1 ? ', ' : ''}
                        </span>
                        ))}
                    </p>
                </div>
                <button onClick={clearSolves} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                    Clear All Solves
                </button>
            </div>
        </aside>
    );
};

export default RightSidebar;
