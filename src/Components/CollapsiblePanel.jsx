import React, { useState } from 'react';

const CollapsiblePanel = ({ label, cases, onToggleCase, onToggleAllCases }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => setIsOpen(!isOpen);

    // Toggle individual case
    const handleToggleCase = (index) => {
        onToggleCase(label, index);
    };

    // Call the onToggleAllCases prop passed from the App.jsx
    const handleToggleAllCases = () => {
        onToggleAllCases(label);
    };

    const selectedCount = cases.filter(caseItem => caseItem.isSelected).length;
    const totalCases = cases.length;
    const headerColor = selectedCount === totalCases ? 'bg-green-500' :
                        selectedCount === 0 ? 'bg-red-500' : 'bg-yellow-500';

    return (
        <div className={`${headerColor} rounded-lg overflow-hidden m-2`}>
            <div className="flex justify-between items-center p-2">
                <div onClick={handleToggleAllCases} className="flex-1 cursor-pointer">
                    <span className="font-bold text-white">{label} ({selectedCount}/{totalCases})</span>
                </div>
                <div className="cursor-pointer bg-gray-300 p-2" onClick={togglePanel}>
                    {isOpen ? '▼' : '▲'}
                </div>
            </div>
            {isOpen && (
                <div className="bg-gray-200 p-2">
                    {cases.map((caseItem, index) => (
                        <div key={index} className="mb-2">
                            <img src={caseItem.url} alt={`Case ${label} ${index + 1}`} className="w-full"/>
                            <button
                                onClick={() => handleToggleCase(index)}
                                className={`block w-full text-center p-2 mt-1 rounded ${caseItem.isSelected ? 'bg-green-500' : 'bg-gray-300'} text-white`}
                            >
                                {index + 1}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollapsiblePanel;
