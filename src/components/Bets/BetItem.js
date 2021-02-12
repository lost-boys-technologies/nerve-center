import React, { useState } from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    const [toggle, setToggle] = useState(false);
    const { challenger, betDetails, dateCompletion } = bet;

    return (
        <div className='bet-item-container'>
            <div className='full-bet-card'>
                <div className='bet-card'>
                    <div className='bet-timelimit'>
                        {dateCompletion}
                    </div>
                    <div className='bet-challenger'>
                        {challenger}
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
                <div className={`bet-details-toggle ${toggle ? 'show' : ''}`}>
                    <div className='bet-details'>
                        {betDetails}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BetItem;
