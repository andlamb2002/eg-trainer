import React from 'react';
import CollapsiblePanel from './CollapsiblePanel';

const LeftSidebar = ({
  scrambles, caseToggles, toggleCase, toggleAllCases, toggleAllCasesByType,
  presets, presetName, setPresetName, savePreset, loadPreset, editPreset, deletePreset
}) => {
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
      <input
        type="text"
        value={presetName}
        onChange={(e) => setPresetName(e.target.value)}
        placeholder="New Preset"
        className="m-2 p-2 border-2 border-gray-300 rounded"
      />
      <button
        onClick={savePreset}
        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save
      </button>
      <div className="mt-4">
        {presets.map((preset, index) => (
          <div key={index} className="flex items-center my-2">
            <span
              onClick={() => loadPreset(preset)}
              className="cursor-pointer hover:text-blue-900 mx-2"
            >
              {preset.name}
            </span>
            <button
              onClick={() => editPreset(preset)}
              className="bg-blue-500 hover:bg-blue-600 text-white  mr-2 py-1 px-2 rounded focus:outline-none"
            >
              Edit
            </button>
            <button
              onClick={() => deletePreset(preset.name)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
