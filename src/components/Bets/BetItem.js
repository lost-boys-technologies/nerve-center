import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FirebaseContext from '../../firebase/context';
import Countdown from '../../utils/Countdown';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import Swal from 'sweetalert2';

const BetItem = ({ bet, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [toggle, setToggle] = useState(false);
    const { multipleSelectValue, dateCompletion, approvalPeriod, created, betDetails, postedBy, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther, upvotes } = bet;

    const postedByAuthUser = user && user.uid === bet.postedBy.id;
    const acceptedTakers = upvotes.map((acceptedTaker) => acceptedTaker.votedBy.name);
    const acceptedTakerThresholdReached = acceptedTakers.length > 0;

    // TODO Move this to a utils
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

    const handleUpvote = () => {
        if (!user) {
            history.push('/login')
        } else {
            const voteRef = firebase.db.collection('bets').doc(bet.id);
            voteRef.get().then(doc => {
                if (doc.exists) {
                    const previousUpvotes = doc.data().upvotes;
                    const allChallengers = doc.data().multipleSelectValue;
                    const currentTakers = previousUpvotes.map((currentUpVote) => currentUpVote.votedBy.id);

                    if (Boolean(currentTakers.length)) {
                        if (currentTakers.includes(user.uid)) {
                            Swal.fire({
                                imageUrl: 'https://media.giphy.com/media/TkCyizr5RDDyyvDk3a/giphy.gif',
                                title: `you can only vote once, ${user.displayName}!`,
                                showConfirmButton: false,
                                timer: 3500
                            });
                            return;
                        } else if (previousUpvotes.length < allChallengers.length) {
                            const upVote = { votedBy: { id: user.uid, name: user.displayName, alreadyVoted: true, betId: bet.id }};
                            const updatedUpvotes = [...previousUpvotes, upVote]
                            voteRef.update({ upvotes: updatedUpvotes });
                        }
                    } else {
                        const upVote = { votedBy: { id: user.uid, name: user.displayName, alreadyVoted: true, betId: bet.id }};
                        const updatedUpvotes = [...previousUpvotes, upVote]
                        voteRef.update({ upvotes: updatedUpvotes });
                    }
                }
            })
        }
    }

    const handleDeleteBet = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: `Delete`,
            denyButtonText: `Cancel`,
            confirmButtonColor: '#244F7B',
            denyButtonColor: '#95A5A6',
          }).then((result) => {
            if (result.isConfirmed) {
                const betRef = firebase.db.collection('bets').doc(bet.id);
                betRef.delete().then(() => {
                console.log(`Document with ID ${bet.id} deleted`);
                }).catch(err => {
                console.error('Error deleting document:', err);
                })
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    const splitChallengers = (challengers) => {
        if (challengers.length > 1) {
            let names = challengers.map((challenger) => challenger);
            let finalName = names.pop();
            return names.length ? names.join(', ') + ' and ' + finalName : finalName
        }

        return challengers;
    }

    const shouldRenderCancelButton = () => {
        if (acceptedTakerThresholdReached) {
            return null;
        }

        return (
            <div className='non-bet-voting'>
                <Button
                    variant='contained'
                    className='cancel-bet-area'
                    color='secondary'
                    onClick={handleDeleteBet}
                >
                    Cancel Bet
                </Button>
            </div>
        );
    }

    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className={`bet-card ${postedByAuthUser && 'no-vote'}`}>
                    <div className='bet-time-limit'>
                        {Countdown(approvalPeriod, bet)}
                    </div>
                    <span className='divider' />
                    <div className='bet-challenger'>
                        <p>
                            <span>{postedBy.name}</span> is challenging <span>{splitChallengers(multipleSelectValue)}</span>
                        </p>
                    </div>
                    {!postedByAuthUser ? (
                        <div className={`bet-voting ${!multipleSelectValue.includes(user.displayName) && 'disabled'}`}>
                            <div className='voting bet-approval' onClick={handleUpvote}>{acceptedTakers.includes(user.displayName) ? <i className="fas fa-check fa-2x"></i> : <i className='far fa-thumbs-up fa-2x'></i>}</div>
                        </div>
                    ) : (
                        shouldRenderCancelButton()
                    )}
                </div>
                <div
                    className={`more-details ${!multipleSelectValue.includes(user.displayName) && 'adjusted-more-details'}`}
                    onClick={() => setToggle(!toggle)}
                >
                    More Details
                </div>
                <Collapse in={toggle}>
                    <div className={`more-details-container ${!multipleSelectValue.includes(user.displayName) && 'adjusted-more-details-container'}`}>
                        <div className='created-date'>
                            created: {formatDate(created)}
                        </div>
                        <div className='bet-takers-container'>
                            <span className='bet-title'>Agreed Takers</span>
                            {acceptedTakers.length > 0 ? (
                                <span className='bet-details'>{splitChallengers(acceptedTakers)}</span>
                            ) : (
                                <span className='bet-details'>No Takers Yet!</span>
                            )}
                        </div>
                        <div className='bet-terms-container'>
                            <span className='bet-title'>Bet Terms</span>
                            <span className='bet-details'>{displayBetTerms()}</span>
                        </div>
                        <div className='bet-summary-container'>
                            <span className='bet-title'>Summary of Bet</span>
                            <span className='bet-details'>{betDetails}</span>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default withRouter(BetItem);
