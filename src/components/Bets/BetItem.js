import React from 'react';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    return (
        <div className='bet-item-container'>
            <div>
                {showCount && <span>{index}</span>}
                <div className='bet-approval'><i class="far fa-thumbs-up"></i></div>
                <div className='bet-rejection'><i class="far fa-thumbs-down"></i></div>
            </div>
        </div>
    )
}

export default BetItem;
