import React from 'react';
import { Range } from 'react-range';

const RangeSlider = ({ min, max, stagedMinMoves, stagedMaxMoves, onMinChange, onMaxChange }) => {
  const [rangeValues, setRangeValues] = React.useState([stagedMinMoves, stagedMaxMoves]);

  React.useEffect(() => {
    setRangeValues([stagedMinMoves, stagedMaxMoves]);
  }, [stagedMinMoves, stagedMaxMoves]);

  const handleRangeChange = (values) => {
    setRangeValues(values);
    onMinChange(values[0]);
    onMaxChange(values[1]);
  };

  return (
    <div className="p-5 w-full">
      <div className="flex justify-between text-sm mb-2">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(value => (
          <span key={value} className="text-xs">{value}</span>
        ))}
      </div>
      <Range
        step={1}
        min={min}
        max={max}
        values={rangeValues}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full bg-gray-300 rounded-md relative"
          >
            {/* Highlight the range between the two thumbs */}
            <div
              className="bg-blue-500 h-2 rounded-md absolute"
              style={{
                left: `${100 * ((rangeValues[0] - min) / (max - min))}%`,
                right: `${100 - (100 * ((rangeValues[1] - min) / (max - min)))}%`
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            className="h-5 w-5 bg-gray-700 rounded-full border-2 border-white flex items-center justify-center text-white"
          >
            <span className="text-xs font-medium">{rangeValues[index]}</span>
          </div>
        )}
      />
    </div>
  );
};

export default RangeSlider;
