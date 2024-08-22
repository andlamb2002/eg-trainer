import React from 'react';
import CollapsiblePanel from './CollapsiblePanel';

const LeftSidebar = ({ scrambles, caseToggles, toggleCase, toggleAllCases }) => {
  const createPanels = (caseType) => {
    return Object.keys(scrambles[caseType]).map(caseLabel => (
      <CollapsiblePanel
        key={`${caseType}-${caseLabel}`}
        label={caseLabel}
        cases={scrambles[caseType][caseLabel].map((caseDetail, index) => ({
          ...caseDetail,
          isSelected: caseToggles[caseType][caseLabel][index]
        }))}
        onToggleCase={(caseLabel, caseIndex) => toggleCase(caseType, caseLabel, caseIndex)}
        onToggleAllCases={(caseLabel) => toggleAllCases(caseType, caseLabel)} // Pass toggleAllCases as a prop
      />
    ));
  };

  return (
    <aside className="p-4">
      <h1 className="mb-4 text-2xl">Toggle Cases</h1>
      <div>
        <h3 className="text-xl">CLL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
          {createPanels('CLL')}
        </div>
      </div>
      <div>
        <h3 className="text-xl">EG1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
          {createPanels('EG1')}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
