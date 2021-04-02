import React, { useEffect, useContext, useState } from "react";
import FirebaseContext from '../../firebase/context';

const BetCountdown = (period, bet) => {
    const { firebase, user } = useContext(FirebaseContext);

    const activateBet = () => {
        const voteRef = firebase.db.collection('bets').doc(bet.id);
        console.log('voteRef', voteRef);
        voteRef.get().then(doc => {
            if (doc.exists) {
                const previousUpvotes = doc.data().upvotes;
                // const allChallengers = doc.data().multipleSelectValue;
                // const currentTakers = previousUpvotes.map((currentUpVote) => currentUpVote.votedBy.id);
                const upVote = { votedBy: { id: user.uid, name: user.displayName, alreadyVoted: true, betId: bet.id }};
                const updatedUpvotes = [...previousUpvotes, upVote];
                voteRef.update({ upvotes: updatedUpvotes });
            }
        })
    }

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
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
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
        <span className='timer'>
            <span className='number'>{timeLeft[interval]}</span> <span className='time'>{interval}</span>
        </span>
        );
    });
    return (
        <span className="timer-container">
            {timerComponents.length ? 'Time Left' : ''}
            {timerComponents.length ? timerComponents : ''}
        </span>
    );
}

export default BetCountdown;
