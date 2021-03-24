import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FirebaseContext from '../../firebase/context';

import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';

import Swal from 'sweetalert2';

const BetItem = ({ bet, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [toggle, setToggle] = useState(false);
    const [disableVote, setDisableVote] = useState(false);
    const { multipleSelectValue, dateCompletion, created, betDetails, postedBy, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther, upvotes } = bet;

    const postedByAuthUser = user && user.uid === bet.postedBy.id;
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
        console.log('bets', bet.id);
        if (!user) {
            history.push('/login')
        } else {
            const voteRef = firebase.db.collection('bets').doc(bet.id); // <--- you're already getting the bet deets, homie
            voteRef.get().then(doc => {
                if (doc.exists) {
                    //! Attempt 32,392
                    const votedDudes = [];
                    const previousUpvotes = doc.data().upvotes;

                    if (Boolean(previousUpvotes.length)) {
                        console.log('there are previous upvotes');
                        // ? NOTES: below is what i need to figure out. I need to map previousUpvotes but it breaks - go line by line to fix
                        // ? Possibly use for loop
                        for (let i = 0; i < previousUpvotes.length; i++) {
                            let hasVoted = previousUpvotes[i].votedBy.alreadyVoted;
                            console.log('has voted', hasVoted);
                            if (hasVoted !== undefined && hasVoted) {
                                console.log('you have VOTED');
                            } else {
                                console.log('else inside hasVoted');
                                // const upVote = { votedBy: { id: user.uid, name: user.displayName, alreadyVoted: true, betId: bet.id }};
                                // const updatedUpvotes = [...previousUpvotes, upVote]
                                // voteRef.update({ upvotes: updatedUpvotes });
                            }
                        }
                    } else {
                        console.log('else to no previous votes');
                        const upVote = { votedBy: { id: user.uid, name: user.displayName, alreadyVoted: true, betId: bet.id }};
                        const updatedUpvotes = [...previousUpvotes, upVote]
                        voteRef.update({ upvotes: updatedUpvotes });
                    }

                    //! End Attempt 32,392
                }
            })
        }
    }

    //* IMPORTANT: this updates the vote
    // const upVote = { votedBy: { id: user.uid, name: user.displayName, alreadyVoted: true, betId: bet.id }};
    // const updatedUpvotes = [...previousUpvotes, upVote]
    // voteRef.update({ upvotes: updatedUpvotes })
    //* /IMPORTANT
    
    const handleDownvote = () => {
        console.log('downvote');
    }

    const splitChallengers = (challengers) => {
        if (challengers.length > 1) {
            let names = challengers.map((challenger) => challenger);
            let finalName = names.pop();
            return names.length ? names.join(', ') + ' and ' + finalName : finalName
        }

        return challengers;
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
                Swal.fire('Deleted!', '', 'success')
            }
        })
    }

    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className={`bet-card ${postedByAuthUser && 'no-vote'}`}>
                    <div className='bet-time-limit'>
                        {/* {formatDate(dateCompletion)} */}
                        <span>Upvotes: {upvotes.length}</span>
                    </div>
                    <span className='divider' />
                    <div className='bet-challenger'>
                        <p>
                            <span>{postedBy.name}</span> is challenging <span>{splitChallengers(multipleSelectValue)}</span>
                        </p>
                    </div>
                    {!postedByAuthUser ? (
                        <div className='bet-voting'>
                            <div className={`voting bet-approval ${disableVote && 'disabled'}`} onClick={handleUpvote}><i className='far fa-thumbs-up fa-2x'></i></div>
                            <div className='voting bet-rejection' onClick={handleDownvote}><i className='far fa-thumbs-down fa-2x'></i></div>
                        </div>
                    ) : (
                        <div className='non-bet-voting'>
                            <Button
                                variant='contained'
                                className='cancel-bet-area'
                                color='secondary'
                                onClick={handleDeleteBet}
                                // startIcon={<BlockIcon />}
                            >
                                Cancel Bet
                            </Button>
                        </div>
                    )}
                </div>
                <div
                    className='more-details'
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
