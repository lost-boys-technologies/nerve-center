import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import FirebaseContext from '../../firebase/context';

import Swal from 'sweetalert2';

const BetItem = ({ bet, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [toggle, setToggle] = useState(false);
    const [disableVote, setDisableVote] = useState(false);
    const { multipleSelectValue, dateCompletion, created, betDetails, postedBy, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther, upvotes } = bet;

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
                    // let whoVoted = 
                    // TODO Tidy this up
                    //! This is just wrong on so many levels - I need the user ID or else this is dangerous but I'm tired and going with it for now
                    if (user.uid !== postedBy.id && multipleSelectValue.includes(user.displayName)) {
                        // const previousUpvotes = doc.data().upvotes;
                        // const haveYouVoted = previousUpvotes.find(previousUpvote => previousUpvote && previousUpvote.votedBy && previousUpvote.votedBy.id ? previousUpvote.votedBy.id : 'nope')
                        console.log('haveyouvoted');
                        //! This doesn't work - all sorts of broken
                        // if (user.uid !== haveYouVoted && haveYouVoted !== 'nope') {
                        //     const upvote = { votedBy: { id: user.uid, name: user.displayName }};
                        //     const updatedUpvotes = [...previousUpvotes, upvote];
                        //     voteRef.update({ upvotes: updatedUpvotes });
                        // } 
                        // else {
                        //     Swal.fire({
                        //         imageUrl: 'https://media.giphy.com/media/TkCyizr5RDDyyvDk3a/giphy.gif',
                        //         title: `you can only vote once, ${user.displayName}!`,
                        //         showConfirmButton: false,
                        //         timer: 3500
                        //     })
                        // }
                    } else {
                        // TODO Tidy this up
                        //* Add popover or something
                        setDisableVote(true);
                    }
                }
            })
        }
    }

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

    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className='bet-card'>
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
                    <div className='bet-voting'>
                        <div className={`voting bet-approval ${disableVote && 'disabled'}`} onClick={handleUpvote}><i className='far fa-thumbs-up fa-2x'></i></div>
                        <div className='voting bet-rejection' onClick={handleDownvote}><i className='far fa-thumbs-down fa-2x'></i></div>
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
