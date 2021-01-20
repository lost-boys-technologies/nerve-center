import React, { useState } from 'react'
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateBet from '../Auth/validateCreateBet';

import './bets.scss';

// TODO
//* Add 'Go back' button
//* Finalize Submit button

//! REMOVE BEFORE DEPLOY
const betTerms = ['money', 'meal', 'other'];
const termLimits = ['1 day', '2 days', '3 days', '1 week']
//! ^^^ REMOVE BEFORE DEPLOY ^^^

const INITIAL_STATE = {
    challenger: '',
    betDetails: '',
    betTerms: '',
    betAmount: '',
    dateCompletion: '',
    approvalPeriod: '',
}

const CreateBet = () => {
    useFormValidation(INITIAL_STATE, validateCreateBet);
    const {firebase, user} = React.useContext(FirebaseContext);
    const [betTypes, setBetTypes] = useState('');

    return (
        <div className='create-bet-container'>
            <h2>Create Your Bet</h2>
            <form className='create-bet form'>
                <label>{user.displayName ? `${user.displayName}, who` : `Who`} do you want to challenge?</label>
                {/* // TODO Switch over to <select /> */}
                <input
                    name='challenger'
                    type='text'
                />
                <label>Bet Details</label>
                <textarea
                    name='betDetails'
                    rows='5'
                />
                {/* // TODO Will need to handle logic for bet terms and bet amount */}
                <label>Bet Terms</label>
                <select name="betTerms">
                    {betTerms.map(betTerm => <option >{betTerm}</option>)}
                </select>
                {/* //!See Above */}
                <label>Bet Amount</label>
                <input name='betAmount' type="number" min="0.01" step="0.01" max="2500" />
                <label>Bet Completion</label>
                <input
                    name='dateCompletion'
                    type='date'
                />
                <label>Approval Period</label>
                <select name='approvalPeriod' >
                    {termLimits.map(termLimit => <option>{termLimit}</option>)}
                </select>
            </form>
        </div>
    );
}

export default CreateBet
