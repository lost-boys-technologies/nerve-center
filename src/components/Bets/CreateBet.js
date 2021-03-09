import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateBet from '../Auth/validateCreateBet';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Swal from 'sweetalert2';
import './bets.scss';

const INITIAL_STATE = {
    challenger: '',
    betDetails: '',
    betTerms: '',
    cashAmount: '',
    mealPriceLimit: '',
    betRestaurant: '',
    betOther: '',
    dateCompletion: '',
    approvalPeriod: '',
}

const CreateBet = (props) => {
    const { handleSubmit, handleChange, values, errors} = useFormValidation(INITIAL_STATE, validateCreateBet, handleCreateBet);
    const {firebase, user} = React.useContext(FirebaseContext);
    const [allUsers, setAllUsers] = useState([]);
    const [multipleSelectValue, setMultipleSelectValue] = useState([]);

    let history = useHistory();

    const betTermItems = ['Select Terms', 'Money', 'Meal', 'Other'];
    const termLimits = ['Select Term Limits', '1 day', '2 days', '3 days', '1 week'];

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        firebase.db.collection('users').onSnapshot(handleSnapshot);
    }

    const handleSnapshot = (snapshot) => {
        const users = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        const trimUsers = users.filter(filteredUser => filteredUser.uid !== user.uid);
        setAllUsers(trimUsers);
    }

    function handleCreateBet() {
        if (!user) {
            props.history.push('/login');
        } else {
            const { betDetails, dateCompletion, approvalPeriod, betTerms, cashAmount, mealPriceLimit, betRestaurant, betOther } = values;
            const newBet = {
                multipleSelectValue,
                betDetails,
                betTerms,
                cashAmount,
                mealPriceLimit,
                betRestaurant,
                betOther,
                dateCompletion,
                approvalPeriod,
                postedBy: {
                    id: user.uid,
                    name: user.displayName
                },
                upvotes: [],
                downVotes: [],
                comments: [],
                created: Date.now(),
                pending: false,
                established: false,
            }
            firebase.db.collection('bets').add(newBet);
            Swal.fire({
                icon: 'success',
                title: 'Bet Successfully Created!',
                showConfirmButton: false,
                timer: 1500
            })
            props.history.push('/bets');
        }
    }

    const handleCancelBtn = () => {
        Swal.fire({
            title: 'Are you sure you want to cancel?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#244F7B',
            cancelButtonColor: '#95A5A6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Bet has been cancelled',
                    icon: 'success',
                    confirmButtonColor: '#244F7B',
                })
            }
            history.push('/bets')
        })
    }

    const handleBetTerms = () => {
        switch (values.betTerms) {
            case 'Money':
                return (
                    <div className='cash-amounts'>
                        <label>Cash Amount</label>
                        <span className='dollar-bill'></span>
                        <input 
                            value={values.cashAmount}
                            onChange={handleChange}
                            className={errors.cashAmount && 'error-input'}
                            name='cashAmount'
                            type='number'
                            min='1.00'
                            step='any'
                            max='1000.00'
                            id='cashAmounts'
                        />
                        {errors.cashAmount && <p className='error-text'>{errors.cashAmount}</p>}
                    </div>
                );
            case 'Meal':
                return (
                    <div className='meal-price'>
                        <div className='meal-price-limit'>
                            <label>Price Limit</label>
                            <span className='dollar-bill'></span>
                            <input 
                                value={values.mealPriceLimit}
                                onChange={handleChange}
                                className={errors.mealPriceLimit && 'error-input'}
                                name='mealPriceLimit'
                                type='number'
                                min='1.00'
                                step='any'
                                max='1000.00'
                            />
                            {errors.mealPriceLimit && <p className='error-text'>{errors.mealPriceLimit}</p>}
                        </div>
                        <div className='restaurant'>
                            <label>Restaurant (optional)</label>
                            <input
                                onChange={handleChange}
                                value={values.betRestaurant}
                                name='betRestaurant'
                                type='text'
                            />
                        </div>
                    </div>
                );
            case 'Other':
                return (
                    <div className='other-bet'>
                        <label>Other Type Of Bet</label>
                        <input
                            onChange={handleChange}
                            value={values.betOther}
                            name='betOther'
                            type='text'
                            className={errors.betOther && 'error-input'}
                        />
                        {errors.betOther && <p className='error-text'>{errors.betOther}</p>}
                    </div>
                )
            default:
            break;
        }
    }

    const handleMultiSelect = (event, val) => {
        setMultipleSelectValue(val);
        // ! TAKE NOTE - This is causing memory leak
        // TODO Fix the leak
    }
    return (
        <div className='create-bet-container'>
            <form onSubmit={handleSubmit} className='create-bet form' autoComplete="off">
            <h2>Create Your Bet</h2>
                <label>{user.displayName ? `${user.displayName}, who` : `Who`} do you want to challenge?</label>
                <Autocomplete
                    multiple
                    limitTags={3}
                    filterSelectedOptions
                    disableCloseOnSelect
                    name='challenger'
                    onChange={handleMultiSelect}
                    className={errors.challenger && 'error-input'}
                    id='tags-standard'
                    options={allUsers.map(user => user.name)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Challengers'
                        variant='outlined'
                    />
                    )}
                />
                {errors.challenger && <p className='error-text'>{errors.challenger}</p>}
                <TextField
                    id={errors.betDetails ? 'outlined-multiline-flexible' : 'outlined-error-helper-text'}
                    label={errors.betDetails ? 'error' : 'Bet Details'}
                    multiline
                    rows={5}
                    onChange={handleChange}
                    value={values.betDetails}
                    name='betDetails'
                    variant="outlined"
                    error={errors.betDetails && true}
                    helperText={errors.betDetails}
                />
                <div className='bet-terms-container'>
                    <div className='bet-terms'>
                        <label>Bet Terms</label>
                        <select
                            name='betTerms'
                            value={values.betTerms} 
                            onChange={handleChange}
                            className={errors.betTerms && 'error-input'}
                        >
                            {betTermItems.map(betTermItem => <option>{betTermItem}</option>)}
                        </select>
                        {errors.betTerms && <p className='error-text'>{errors.betTerms}</p>}
                    </div>
                    {handleBetTerms()}
                </div>
                <div className='bet-timelines'>
                    <div className='bet-completion'>
                        <label>Bet Completion</label>
                        <input
                            onChange={handleChange}
                            value={values.dateCompletion}
                            name='dateCompletion'
                            type='date'
                            className={errors.dateCompletion && 'error-input'}
                        />
                        {errors.dateCompletion && <p className='error-text'>{errors.dateCompletion}</p>}
                    </div>
                    <div className='approval-period'>
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
                    </div>
                </div>
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
