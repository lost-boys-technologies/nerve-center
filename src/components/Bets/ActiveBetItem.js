import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FirebaseContext from '../../firebase/context';
import Countdown from '../../utils/Countdown';

import Collapse from '@material-ui/core/Collapse';

import Swal from 'sweetalert2';

const ActiveBetItem = ({ bet, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [toggle, setToggle] = useState(false);
    const { multipleSelectValue, dateCompletion, approvalPeriod, created, betDetails, postedBy, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther, upvotes } = bet;

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

    const splitChallengers = (challengers) => {
        if (challengers.length > 1) {
            let names = challengers.map((challenger) => challenger);
            let finalName = names.pop();
            return names.length ? names.join(', ') + ' and ' + finalName : finalName
        }

        return challengers;
    }

    const acceptedTakers = upvotes.map((acceptedTaker) => acceptedTaker.votedBy.name)

    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className={`bet-card ${postedByAuthUser && 'no-vote'}`}>
                    <div className='bet-status'>
                        {new Date() < +new Date(dateCompletion) ? <span className='completed'>Completed</span> : <span className='in-progress'>In Progress</span>}
                    </div>
                    <span className='divider' />
                    <div className='bet-challenger accepted'>
                        <p>
                            {splitChallengers(acceptedTakers)} accepted {postedBy.name}'s bet.
                        </p>
                    </div>
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
                        <div className='bet-summary-container'>
                            <span className='bet-title'>Summary of Bet</span>
                            <span className='bet-details'>{betDetails}</span>
                        </div>
                        <div className='bet-terms-container'>
                            <span className='bet-title'>Bet Terms</span>
                            <span className='bet-details'>{displayBetTerms()}</span>
                        </div>
                        <div className='bet-takers-container'>
                            <span className='bet-title'>Agreed Takers</span>
                            {acceptedTakers.length > 0 ? (
                                <span className='bet-details'>{splitChallengers(acceptedTakers)}</span>
                            ) : (
                                <span className='bet-details'>No Takers Yet!</span>
                            )}
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default withRouter(ActiveBetItem);
