import React, { useState } from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    const [toggle, setToggle] = useState(false);
    const { challenger, betDetails, dateCompletion, postedBy } = bet;

    console.log('bet', bet);

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
                        Bet Terms:
                    </div>
                    <div>
                        
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
