import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import FirebaseContext from '../../firebase/context';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [toggle, setToggle] = useState(false);
    const { challenger, dateCompletion, created, betDetails, postedBy, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther } = bet;

    const formatDate = (date) => {
        let cleanDate = new Date(date).toISOString().replace(/T.*/,'').split('-')
        const extractYear = cleanDate.shift(cleanDate);
        cleanDate.push(extractYear.toString());
        const perfectDate = cleanDate.join('/');
        return perfectDate
    }

    const displayBetTerms = () => {
        switch (betTerms) {
            case 'Money':
                return (
                    <div className='bet-stmt'>Money, in the amount of <strong>${cashAmount}</strong></div>
                );
            case 'Meal': 
                return (
                    <div className='bet-stmt'>A meal that will be less than <strong>${mealPriceLimit}</strong> at <strong>{betRestaurant ? `${betRestaurant}` : 'a restaurant picked later'}</strong></div>
                );
            case 'Other':
                return (
                    <div className='bet-stmt'>{betOther}</div>
                )
            default:
            break;
        }
    }

    const handleVote = () => {
        if (!user) {
            history.push('/login')
        } else {
            const voteRef = firebase.db.collection('bets').doc(bet.id);
            voteRef.get().then(doc => {
                if (doc.exists) {
                    const previousVotes = doc.data().votes;
                    const vote = { votedBy: { id: user.uid, name: user.displayName }};
                    const updatedVotes = [...previousVotes, vote];
                    console.log('updatedVotes', updatedVotes);
                    voteRef.update({ votes: updatedVotes });
                }
            })
        }
    }

    console.log('bets', bet);
    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className='bet-card'>
                    <div className='bet-time-limit'>
                        {formatDate(dateCompletion)}
                    </div>
                    <span className='divider' />
                    <div className='bet-challenger'>
                        <p>
                            <span>{postedBy.name}</span> is challenging <span>{challenger}</span>
                        </p>
                    </div>
                    <div className='bet-voting'>
                        <div className='voting bet-approval' onClick={handleVote}><i className='far fa-thumbs-up fa-2x'></i></div>
                        <div className='voting bet-rejection'><i className='far fa-thumbs-down fa-2x'></i></div>
                    </div>
                </div>
                <div
                    className="more-details"
                    onClick={() => setToggle(!toggle)}
                >
                    More Details
                </div>
                <div className={`more-details-container ${toggle ? 'show' : ''}`}>
                    <div className='created-date'>
                        created: {formatDate(created)}
                    </div>
                    <div className='bet-summary-container'>
                        <span className='bet-title'>Summary of Bet</span>
                        <span className='bet-details'>{betDetails}</span>
                    </div>
                    <div className='bet-terms-container'>
                        <span className='bet-title'>Bet Terms</span>
                        <span className='bet-details'>{displayBetTerms()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(BetItem);
