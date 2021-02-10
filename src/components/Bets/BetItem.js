import React, { useState } from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    const [toggle, setToggle] = useState(false);
    const { challenger, betDetails, dateCompletion } = bet;

    return (
        <div className='bet-item-container'>
            <div className='bet-timelimit'>
                {dateCompletion}
            </div>
            <div className='bet-challenger'>
                {challenger}
            </div>
            <div className='bet-voting'>
                {showCount && <span>{index}</span>}
                <div className='bet-approval'><i className='far fa-thumbs-up'></i></div>
                <div className='bet-rejection'><i className='far fa-thumbs-down'></i></div>
            </div>
            <div
                className="btn navbar-toggler"
                onClick={() => setToggle(!toggle)}
            >
                Click
            </div>
            <div className={`bet-details-toggle ${toggle ? 'show' : ''}`}>
                <div className='bet-details'>
                    {betDetails}
                </div>
            </div>
        </div>
    )
}

export default BetItem;
