import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC= () => {
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const calculateTimeRemaining = () => {
        const now = new Date();

        const target = new Date(now);
        target.setHours(24);
        target.setMinutes(0);
        target.setSeconds(0);
        target.setMilliseconds(0);
        target.setUTCHours(7);

        const difference = target.getTime() - now.getTime();
        const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
    }

    useEffect(() => {
        const timer = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(timer);
    }, []);

    const timerStyle: React.CSSProperties = {
        marginTop: '10px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '18px'
    }

    return (
        <div style={timerStyle}>
            <b>Historicle</b> refreshes in <b>{hours}</b>h <b>{minutes}</b>m <b>{seconds}</b>s.
        </div>
    );
}

export default CountdownTimer;