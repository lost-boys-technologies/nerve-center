import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

// TODO Will need to setup additional validation to only allow approval voting BY the person being challenged

const BetItem = ({ bet, index, showCount }) => {
    const [open, setOpen] = useState(false);
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
            <div>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    click
                </Button>
                <Collapse in={!open}>
                    <div id="example-collapse-text">
                        {betDetails}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default BetItem;
