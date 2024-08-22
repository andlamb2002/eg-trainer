import React from 'react';
import CollapsiblePanel from './CollapsiblePanel';

const LeftSidebar = ({ scrambles, caseToggles, toggleCase, toggleAllCases, toggleAllCasesByType }) => {

  // Determine if all cases are selected or not for a given case type (CLL or EG1)
  const isAllSelected = (caseType) => {
    return Object.values(caseToggles[caseType]).every(cases =>
      cases.every(status => status)
    );
  };

  // Button label and color based on the current state (All selected or not)
  const getButtonState = (caseType) => {
    const allSelected = isAllSelected(caseType);
    return {
      label: allSelected ? "None" : "All",
      color: allSelected ? "bg-red-500" : "bg-green-500"
    };
  };

  // Render the All/None button
  const renderToggleButton = (caseType) => {
    const { label, color } = getButtonState(caseType);

    return (
      <button
        className={`ml-2 px-2 py-1 rounded text-white ${color}`}
        onClick={() => toggleAllCasesByType(caseType)}
      >
        {label}
      </button>
    );
  };

  // Render the section for a given case type (CLL or EG1)
  const renderCaseSection = (caseType) => (
    <div>
      <div className="flex items-center">
        <h3 className="text-xl">{caseType}</h3>
        {renderToggleButton(caseType)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
        {createPanels(caseType)}
      </div>
    </div>
  );

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
        onToggleAllCases={(caseLabel) => toggleAllCases(caseType, caseLabel)}
      />
    ));
  };

  return (
    <aside className="p-4">
      <h1 className="mb-4 text-2xl">Toggle Cases</h1>
      {renderCaseSection('CLL')}
      {renderCaseSection('EG1')}
    </aside>
  );
};

export default LeftSidebar;
