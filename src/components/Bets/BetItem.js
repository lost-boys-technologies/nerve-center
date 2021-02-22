import React, { useState } from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    const [toggle, setToggle] = useState(false);
    const { challenger, dateCompletion, created, betDetails, postedBy, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther, approvalPeriod } = bet;

    const formatedDate = () => {
        //! I really don't like this
        let cleanDate = new Date(created).toISOString().replace(/T.*/,'').split('-')
        const year = cleanDate.shift(cleanDate);
        cleanDate.push(year.toString());
        const perfectDate = cleanDate.join('/');
        return perfectDate
    }

    const displayBetTerms = () => {
        // console.log('bet', bet);

        switch (betTerms) {
            case 'Money':
                return (
                    <div className='money-terms-container'>
                        <span className='money-stmt'>{betTerms} in the amount of ${cashAmount}</span>
                    </div>
                );
            case 'Meal': 
                return (
                    <div className='meal-terms-container'>
                        <span className='meal-stmt'>{betTerms} that will be less than ${mealPriceLimit} at {betRestaurant ? `${betRestaurant}` : 'a restaurant picked later'}</span>
                    </div>
                );
            case 'Other':
                return (
                    <div className='other-terms-container'>
                        <span className='other-stmt'>{betTerms}: {betOther}</span>
                    </div>
                )
            default:
            break;
        }
    }

    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className='bet-card'>
                    <div className='bet-time-limit'>
                        {dateCompletion}
                    </div>
                    <span className='divider' />
                    <div className='bet-challenger'>
                        <p>
                            <span>{postedBy.name}</span> is challenging <span>{challenger}</span>
                        </p>
                    </div>
                    <div className='bet-voting'>
                        <div className='voting bet-approval'><i className='far fa-thumbs-up fa-2x'></i></div>
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
                    <div className=''>
                        {formatedDate()}
                    </div>
                    <div className='bet-summary-container'>
                        <span className='bet-summary'>Summary of Bet</span> {betDetails}
                    </div>
                    <div className='bet-terms-container'>
                        Bet Terms:<br /> {displayBetTerms()}
                    </div>
                    <div className='approval-period'>
                        Approval Period: {approvalPeriod}
                    </div>
                    <div className='takers'>
                        Takers: Simon, Evan, Kyle
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BetItem;
