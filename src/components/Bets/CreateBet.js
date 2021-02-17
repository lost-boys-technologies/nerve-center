import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateBet from '../Auth/validateCreateBet';

import './bets.scss';

// TODO
//* Finalize Submit button

//! REMOVE BEFORE DEPLOY
const betTermItems = ['Select Terms', 'Money', 'Meal', 'Other'];
const termLimits = ['1 day', '2 days', '3 days', '1 week']
//! ^^^ REMOVE BEFORE DEPLOY ^^^

const INITIAL_STATE = {
    challenger: '',
    betDetails: '',
    betTerms: '',
    cashAmount: '',
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
            const { challenger, betDetails, dateCompletion, approvalPeriod, betTerms, cashAmount } = values;
            const newBet = {
                challenger,
                betDetails,
                betTerms,
                cashAmount,
                dateCompletion,
                approvalPeriod,
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
        if (window.confirm('Are you sure?')) {
            history.push('/bets')
        }
    }

    const handleBetTerms = () => {
        switch (values.betTerms) {
            case 'Money':
                return (
                    <div className='cash-amounts'>
                        <label>Cash Amount</label>
                        <input 
                            value={values.cashAmount}
                            onChange={handleChange}
                            name='cashAmount'
                            type='number'
                            min='1.00'
                            step='any'
                            max='9999.99'
                        />
                        {errors.cashAmount && <p className='error-text'>{errors.cashAmount}</p>}
                    </div>
                );
            case 'Meal':
                return (
                    <div className='meal-price'>
                        <label>Meal Price Limit</label>
                        <input
                            onChange={handleChange}
                            value={values.mealPriceLimit}
                            name='challenger'
                            type='text'
                            className={errors.betMeal && 'error-input'}
                        />
                        <label>Restaurant (optional)</label>
                        <input
                            onChange={handleChange}
                            value={values.betRestaurant}
                            name='challenger'
                            type='text'
                            className={errors.betMeal && 'error-input'}
                        />
                    </div>
                );
            case 'Other':
                return (
                    <div className='other'>
                        <label>Other</label>
                        <input
                            onChange={handleChange}
                            value={values.betOther}
                            name='challenger'
                            type='text'
                            className={errors.betOther && 'error-input'}
                        />
                    </div>
                )
            default:
            break;
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
                <div className='bet-terms-container'>
                    <div className='bet-terms'>
                        <label>Bet Terms</label>
                        <select
                            name='betTerms'
                            value={values.betTerms} 
                            onChange={handleChange}
                        >
                            {betTermItems.map(betTermItem => <option>{betTermItem}</option>)}
                        </select>
                        
                    </div>
                    {handleBetTerms()}
                </div>
                {errors.betTerms && <p className='error-text'>{errors.betTerms}</p>}
                <label>Approval Period</label>
                <select
                    name='approvalPeriod'
                    value={values.approvalPeriod} 
                    onChange={handleChange}
                    className={errors.approvalPeriod && 'error-input'}
                >
                    {termLimits.map(termLimit => <option>{termLimit}</option>)}
                </select>
                {errors.approvalPeriod && <p className='error-text'>{errors.approvalPeriod}</p>}
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
