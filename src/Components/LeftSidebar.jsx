import React, { useState } from 'react';
import CollapsiblePanel from './CollapsiblePanel';

const LeftSidebar = ({ caseToggles, toggleCase }) => {
  const renderCaseButtons = (caseType) => {
    return Object.keys(caseToggles[caseType]).map((caseName) => (
      <button
        key={caseType + caseName}
        onClick={() => toggleCase(caseType, caseName)}
        className={`p-2 m-1 ${caseToggles[caseType][caseName] ? 'bg-green-500' : 'bg-red-500'} text-white rounded hover:opacity-90`}
      >
        {caseName} Cases
      </button>
    ));
  };

  return (
    <aside className="p-4">
      <h1 className="mb-4 text-2xl">Toggle Cases</h1>
      <div className="mb-4">
        <h3 className="text-xl">CLL</h3>
        <div className="flex flex-wrap">
          {renderCaseButtons('CLL')}
        </div>
      </div>
      <div>
        <h3 className="text-xl">EG1</h3>
        <div className="flex flex-wrap">
          {renderCaseButtons('EG1')}
        </div>
      </div>
      <CollapsiblePanel label="U" totalCases={6} />
      <CollapsiblePanel label="H" totalCases={4} />
    </aside>
  );
};

export default LeftSidebar;
