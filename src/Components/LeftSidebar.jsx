import React from 'react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
          <CollapsiblePanel label="A" totalCases={6} />
          <CollapsiblePanel label="H" totalCases={4} />
          <CollapsiblePanel label="L" totalCases={6} />
          <CollapsiblePanel label="P" totalCases={6} />
          <CollapsiblePanel label="S" totalCases={6} />
          <CollapsiblePanel label="T" totalCases={6} />
          <CollapsiblePanel label="U" totalCases={6} />
      </div>
    </aside>
  );
};

export default LeftSidebar;
