import React from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    console.log('bet', bet);
    const { challenger, betDetails, dateCompletion, pending } = bet;

    return (
        <div className='bet-item-container'>
            {pending ? (
                <div className='pending-bets'>
                    <div className='bet-timelimit'>
                        {dateCompletion}
                    </div>
                    <div className='bet-challenger'>
                        {challenger}
                    </div>
                    <div className='bet-details'>
                        {betDetails}
                    </div>
                    <div className='bet-voting'>
                        {showCount && <span>{index}</span>}
                        <div className='bet-approval'><i class='far fa-thumbs-up'></i></div>
                        <div className='bet-rejection'><i class='far fa-thumbs-down'></i></div>
                    </div>                    
                </div>
            ) : (
                <div className='established-bets'>
                    {betDetails}
                    {showCount && <span>{index}</span>}
                </div>
            )}
        </div>
    )
}

export default BetItem;
