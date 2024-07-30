import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ onStop }) => {
    const [displayTime, setDisplayTime] = useState(0);
    const [times, setTimes] = useState([]);  // State to hold recorded times
    const runningRef = useRef(false);
    const startTimeRef = useRef(null);
    const frameRef = useRef(null);

    // Calculate the average of times
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

    const toggleTimer = () => {
        if (!runningRef.current) {
            setDisplayTime(0);
            runningRef.current = true;
            startTimeRef.current = performance.now();
            frameRef.current = requestAnimationFrame(updateTime);
        } else {
            runningRef.current = false;
            cancelAnimationFrame(frameRef.current);
            const endTime = performance.now();
            const finalTime = endTime - startTimeRef.current;
            setDisplayTime(finalTime);  // Update display time for the final time
            setTimes(prevTimes => [...prevTimes, finalTime]);  // Record time into the list
            onStop();  // Optionally handle additional logic on stop
        }
    };

    const updateTime = (timestamp) => {
        if (runningRef.current) {
            const deltaTime = timestamp - startTimeRef.current;
            setDisplayTime(deltaTime);
            frameRef.current = requestAnimationFrame(updateTime);
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Space') {
                toggleTimer();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Calculate average time
    const averageTime = calculateAverage(times);

    return (
        <div>
            <div>Timer: {(displayTime / 1000).toFixed(3)} seconds</div>
            <div>Average Time: {(averageTime / 1000).toFixed(3)} seconds</div>
            <div>Times List:</div>
            {times.map((time, index) => (
                <div key={index} onClick={() => removeTime(index)} style={{cursor: 'pointer'}}>
                    {index + 1}. {(time / 1000).toFixed(3)} seconds
                </div>
            ))}
        </div>
    );
};

export default Timer;
