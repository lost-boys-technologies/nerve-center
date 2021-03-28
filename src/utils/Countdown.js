import React, { useEffect, useState } from "react";

const Countdown = (period, bet) => {
    const calculateTimeLeft = () => {
    let daysAway;
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
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
        timeLeft = {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60),
        };
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
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
            );
        });
        return (
            <>
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </>
        );
}

export default Countdown;
