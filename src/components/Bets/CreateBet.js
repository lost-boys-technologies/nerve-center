import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateBet from '../Auth/validateCreateBet';

import './bets.scss';

// TODO
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

const CreateBet = (props) => {
    const { handleSubmit, handleChange, values, errors} = useFormValidation(INITIAL_STATE, validateCreateBet, handleCreateBet);
    const {firebase, user} = React.useContext(FirebaseContext);

    let history = useHistory();

    function handleCreateBet() {
        if (!user) {
            props.history.push('/login');
        } else {
            const { challenger, betDetails, dateCompletion } = values;
            const newBet = {
                challenger,
                betDetails,
                dateCompletion,
                postedBy: {
                    id: user.uid,
                    name: user.displayName
                },
                votes: [],
                comments: [],
                created: Date.now(),
                pending: false,
                established: false,
            }
            firebase.db.collection('bets').add(newBet);
            props.history.push('/bets');
        }
    }

    const handleCancelBtn = () => {
        if (window.confirm("Are you sure?")) {
            history.push('/bets')
        }
    }

    return (
        <div className='create-bet-container'>
            <form onSubmit={handleSubmit} className='create-bet form'>
            <h2>Create Your Bet</h2>
                <label>{user.displayName ? `${user.displayName}, who` : `Who`} do you want to challenge?</label>
                {/* // TODO Switch over to <select /> */}
                <input
                    onChange={handleChange}
                    value={values.challenger}
                    name='challenger'
                    type='text'
                    className={errors.challenger && 'error-input'}
                />
                {errors.challenger && <p className='error-text'>{errors.challenger}</p>}
                <label>Bet Details</label>
                <textarea
                    onChange={handleChange}
                    value={values.betDetails}
                    name='betDetails'
                    rows='5'
                    className={errors.betDetails && 'error-input'}
                />
                {errors.betDetails && <p className='error-text'>{errors.betDetails}</p>}
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
                    onChange={handleChange}
                    value={values.dateCompletion}
                    name='dateCompletion'
                    type='date'
                    className={errors.dateCompletion && 'error-input'}
                />
                {errors.dateCompletion && <p className='error-text'>{errors.dateCompletion}</p>}
                {/* // TODO Work through this */}
                <label>Approval Period</label>
                <select name='approvalPeriod' >
                    {termLimits.map(termLimit => <option value={values.approvalPeriod}>{termLimit}</option>)}
                </select>
                <div className='button-container'>
                    <button className='button submit' type='submit'>
                        Submit
                    </button>
                    <button className='button cancel' onClick={handleCancelBtn} type='button'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateBet
