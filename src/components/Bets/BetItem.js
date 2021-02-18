import React, { useState } from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    const [toggle, setToggle] = useState(false);
    const { challenger, betDetails, dateCompletion, postedBy, betTerms, approvalPeriod } = bet;

    console.log('bet', bet.betTerms);

    const displayBetTerms = () => {
        switch (betTerms) {
            case 'Money':
                return (
                    <div>Money</div>
                );
            case 'Meal': 
                return (
                    <div>Meal</div>
                );
            case 'Other':
                return (
                    <div>Other</div>
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
                    <div className='bet-details'>
                        {betDetails}
                    </div>
                    <div className='bet-terms'>
                        Bet Terms: {displayBetTerms()}
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
