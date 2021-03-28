import React, { useEffect, useState } from "react";

const Countdown = (period, bet) => {
  const calculateTimeLeft = () => {
    // let daysAway = 0;
    //     switch (period) {
    //         case '1 day':
    //             daysAway = 1;
    //             break;
    //         case '2 days':
    //             daysAway = 2;
    //             break;
    //         case '3 days':
    //             daysAway = 3;
    //             break;
    //         case '1 week':
    //             daysAway = 7;
    //             break;
    //         default:
    //             break;
    //     }

    //     // let endDate = new Date();
    //     // const compareDate = endDate.setDate(endDate.getDate() + daysAway);
    //     const secondsInADay = 86400;
	// 	const compareDate = secondsInADay * daysAway;
    //     const difference = compareDate - bet.created;
    //     let timeLeft = {};

    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-10-1`) - +new Date();
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
