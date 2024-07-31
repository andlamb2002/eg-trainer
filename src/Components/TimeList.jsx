import React from 'react';

const TimeList = ({ times, setTimes }) => {
    const calculateAverage = (times) => {
        if (times.length === 0) return 0;
        const sum = times.reduce((acc, curr) => acc + curr, 0);
        return sum / times.length;
    };

    const removeTime = (index) => {
        const newTimes = times.filter((_, idx) => idx !== index);
        setTimes(newTimes);
    };

    const clearTimes = () => {
        setTimes([]);
    };

    const averageTime = calculateAverage(times);

    return (
        <div>
            <div>Total Solves: {times.length}</div>
            <div>Mean: {(averageTime / 1000).toFixed(3)} seconds</div>
            <button onClick={clearTimes}>Clear All Times</button>
            <div>Times List:</div>
            <div>
                {times.map((time, index) => (
                    <span key={index} onClick={() => removeTime(index)} style={{ cursor: 'pointer' }}>
                        {(time / 1000).toFixed(3)}{index < times.length - 1 && ', '}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TimeList;
