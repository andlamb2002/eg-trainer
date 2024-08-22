import React, { useState, useEffect } from 'react';

const CollapsiblePanel = ({ label, totalCases }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const initialCases = Array.from({ length: totalCases }, (_, i) => ({
            caseId: i + 1,
            isSelected: true
        }));
        setCases(initialCases);
    }, [totalCases]);

    const togglePanel = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const handleToggleCase = (caseId) => {
        setCases(prevCases => prevCases.map(c =>
          c.caseId === caseId ? { ...c, isSelected: !c.isSelected } : c
        ));
    };

    const toggleAllCases = () => {
        const allSelected = cases.every(caseItem => caseItem.isSelected);
        setCases(prevCases => prevCases.map(c => ({
            ...c,
            isSelected: !allSelected
        })));
    };

    const selectedCount = cases.filter(c => c.isSelected).length;
    const headerColor = selectedCount === totalCases ? 'bg-green-500' :
                        selectedCount === 0 ? 'bg-red-500' : 'bg-yellow-500';

    return (
        <div className={`${headerColor} rounded-lg overflow-hidden m-2`}>
            <div className="flex justify-between items-center p-2">
                <div onClick={toggleAllCases} className="flex-1 cursor-pointer">
                    <span className="font-bold text-white">{label} ({selectedCount}/{totalCases})</span>
                </div>
                <div className="cursor-pointer bg-gray-300 p-2" onClick={togglePanel}>
                    {isOpen ? '/\\' : '\\/'}
                </div>
            </div>
            {isOpen && (
                <div className="bg-gray-200 p-2">
                    {cases.map((caseItem, index) => (
                        <button
                            key={index}
                            onClick={() => handleToggleCase(caseItem.caseId)}
                            className={`block mb-2 p-2 rounded ${caseItem.isSelected ? 'bg-green-500' : 'bg-gray-300'} text-white`}
                        >
                            Case {caseItem.caseId}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollapsiblePanel;
