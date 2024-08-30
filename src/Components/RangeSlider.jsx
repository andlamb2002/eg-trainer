import React from 'react';
import { Range } from 'react-range';

const RangeSlider = ({ min, max, stagedMinMoves, stagedMaxMoves, onMinChange, onMaxChange }) => {
  // React useState to manage the local state of the range values
  const [rangeValues, setRangeValues] = React.useState([stagedMinMoves, stagedMaxMoves]);

  React.useEffect(() => {
    setRangeValues([stagedMinMoves, stagedMaxMoves]);
  }, [stagedMinMoves, stagedMaxMoves]);

  const handleRangeChange = values => {
    setRangeValues(values);
    onMinChange(values[0]);
    onMaxChange(values[1]);
  };

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <Range
        step={1}
        min={min}
        max={max}
        values={rangeValues}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
    </div>
  );
};

export default RangeSlider;
