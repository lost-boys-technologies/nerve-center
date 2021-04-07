import React, { useEffect, useState } from "react";

const Countdown = (period, bet) => {
    const calculateTimeLeft = () => {
        let daysAway;
        let timeLeft = {};
        let difference;

        if (!period) {
            difference = +new Date(bet.dateCompletion) - +new Date();

            if (difference > 0) {
                timeLeft = {
                    months: Math.floor(difference / (1000 * 60 * 60 * 24 * 31)),
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    // seconds: Math.floor((difference / 1000) % 60),
                };
            }
        } else {
            switch (period) {
                case '1 day':
                    daysAway = 1;
                    break;
                case '2 days':
                    daysAway = 2;
                    break;
                case '3 days':
                    daysAway = 3;
                    break;
                case '1 week':
                    daysAway = 7;
                    break;
                default:
                    break;
            }

            const date = new Date(bet.created);
            const endDate = new Date(date.getTime() + (daysAway * 24 * 60 * 60 * 1000));
            difference = +new Date(endDate) - +new Date();

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
        }
    return timeLeft;
};

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
        <span className='timer'>
            <span className='number'>{timeLeft[interval]}</span> <span className='time'>{interval}</span>
        </span>
        );
    });
    return (
        <span className="timer-container">
            {period && 'Time Left'}
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </span>
    );
}

export default Countdown;
