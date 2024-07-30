import React from 'react';

const TimeList = ({ times, setTimes }) => {
    // Function to calculate the average of times
    const calculateAverage = (times) => {
        if (times.length === 0) return 0;
        const sum = times.reduce((acc, curr) => acc + curr, 0);
        return sum / times.length;
    };

    // Function to remove a time at a specific index
    const removeTime = (index) => {
        const newTimes = times.filter((_, idx) => idx !== index);
        setTimes(newTimes);
    };

    // Calculate the average time
    const averageTime = calculateAverage(times);

    return (
        <div>
            <div>Average Time: {averageTime.toFixed(3)} seconds</div>
            {times.map((time, index) => (
                <div key={index} onClick={() => removeTime(index)}>
                    {index + 1}. {(time / 1000).toFixed(3)} seconds
                </div>
            ))}
        </div>
    );
};

export default TimeList;
