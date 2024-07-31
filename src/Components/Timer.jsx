import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ onStop, times, setTimes }) => {
    const [displayTime, setDisplayTime] = useState(0);
    const runningRef = useRef(false);
    const startTimeRef = useRef(null);
    const frameRef = useRef(null);

    const toggleTimer = () => {
        if (!runningRef.current) {
            runningRef.current = true;
            startTimeRef.current = performance.now();
            frameRef.current = requestAnimationFrame(updateTime);
        } else {
            runningRef.current = false;
            cancelAnimationFrame(frameRef.current);
            const endTime = performance.now();
            const finalTime = endTime - startTimeRef.current;
            setDisplayTime(finalTime);
            setTimes(prevTimes => [...prevTimes, finalTime]);
            onStop();
        }
    };

    const updateTime = (timestamp) => {
        if (runningRef.current) {
            const deltaTime = timestamp - startTimeRef.current;
            setDisplayTime(Math.max(deltaTime, 0));
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

    return (
        <div>
            <div className="text-9xl">{(displayTime / 1000).toFixed(3)}</div>
        </div>
    );
};

export default Timer;
