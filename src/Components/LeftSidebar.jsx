import React from 'react';
import CollapsiblePanel from './CollapsiblePanel';

const LeftSidebar = ({
  scrambles, caseToggles, toggleCase, toggleAllCases, toggleAllCasesByType,
  presets, presetName, setPresetName, savePreset, loadPreset, deletePreset
}) => {
  const isAllSelected = (caseType) => {
    return Object.values(caseToggles[caseType]).every(cases =>
      cases.every(status => status)
    );
  };

  const getButtonState = (caseType) => {
    const allSelected = isAllSelected(caseType);
    return {
      label: allSelected ? "None" : "All",
      color: allSelected ? "bg-red-500" : "bg-green-500"
    };
  };

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
          isSelected: caseToggles[caseType][caseLabel][index],
          ...caseDetail
        }))}
        onToggleCase={(caseLabel, caseIndex) => toggleCase(caseType, caseLabel, caseIndex)}
        onToggleAllCases={(caseLabel) => toggleAllCases(caseType, caseLabel)}
      />
    ));
  };

  const handleLoadPreset = (preset) => {
    loadPreset(preset);
  };

  const countSelectedCases = (toggles) => {
    return Object.values(toggles).flatMap(caseType => 
      Object.values(caseType).flatMap(caseArray => 
        caseArray.filter(status => status) 
      )
    ).length;
  };

  return (
    <aside className="p-4">
      <div className="flex-grow">
        {renderCaseSection('CLL')}
        {renderCaseSection('EG1')}
        <hr className="my-4" />
        <input
          type="text"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          placeholder="New Preset"
          className="mx-2 p-1 border-2 border-gray-300 rounded"
        />
        <button
          onClick={savePreset}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Save
        </button>
      </div>
      <div className="m-2 overflow-auto max-h-[200px]">
        {presets.map((preset, index) => (
          <div key={index} className="flex items-center my-2">
            <span
              onClick={() => handleLoadPreset(preset)}
              className="cursor-pointer hover:underline flex-grow"
            >
              {preset.name} ({countSelectedCases(preset.toggles)})
            </span>
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
