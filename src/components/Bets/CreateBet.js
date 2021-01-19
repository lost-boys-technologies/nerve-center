import React, { useState } from 'react'
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';

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
    const {firebase, user} = React.useContext(FirebaseContext);
    const [betTypes, setBetTypes] = useState('');

    // const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateBet, handleCreateBet)

    // const handleCreateBet = () => {
    //     if (!user) {
    //         props.history.push('/login');
    //     }
    // }
    console.log('user info', user);

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
                <label>Bet Terms</label>
                <select name="betTerms">
                    {betTerms.map(betTerm => <option >{betTerm}</option>)}
                </select>
                <label>Bet Amount</label>
                <input name='betAmount' />
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
