import React, { useState, useEffect } from 'react';

import './homepage.scss';

const HPCountdown = () => {
	const difference = new Date('09/09/2021') - new Date();
	
	const timeLeft = {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / 1000 / 60) % 60),
		seconds: Math.floor((difference / 1000) % 60),
	};
	return timeLeft;
	
}

const Homepage = () => {
	const [timeLeft, setTimeLeft] = useState(HPCountdown())

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(HPCountdown());
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
		<div className='homepage-container'>
			<h2>Homepage</h2>
			<div className='countdown-container'>
				{timerComponents}
			</div>
		</div>
	);
};

export default Homepage;
