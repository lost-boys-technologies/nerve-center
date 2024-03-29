import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateBet from '../Auth/validateCreateBet';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    const [minDateCalc, setMinDateCalc] = useState('');

    let history = useHistory();

    const betTermItems = ['Select', 'Money', 'Meal', 'Other'];
    const termLimits = ['Select Term Limits', '1 day', '2 days', '3 days', '1 week'];

    useEffect(() => {
        getUsers();
        getMinDate();
    }, []);

    //TODO Move to utils folder
    const getMinDate = () => {
        const cleanDate = new Date().toISOString().replace(/T.*/,'');
        setMinDateCalc(cleanDate);        
    }

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
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                history.push('/bets')
            }
        })
    }

    const handleBetTerms = () => {
        switch (values.betTerms) {
            case 'Money':
                return (
                    <div className='cash-amounts'>
                        <span className='dollar-bill'></span>
                        <TextField
                            id={errors.cashAmount ? 'outline-number' : 'outlined-error-helper-text'}
                            label={errors.cashAmount ? 'error' : 'Amount'}
                            error={errors.cashAmount && true}
                            helperText={errors.cashAmount}
                            type='number'
                            onChange={handleChange}
                            className='text-fields'
                            name='cashAmount'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    min: '1.00',
                                    max: '1000.00',
                                    step: 'any',
                                }
                            }}
                            variant='outlined'
                            size='small'
                        />
                    </div>
                );
            case 'Meal':
                return (
                    <div className='meal-price'>
                        <div className='meal-price-limit'>
                        <span className='dollar-bill'></span>
                            <TextField
                                id={errors.mealPriceLimit ? 'outlined-number' : 'outlined-error-helper-text'}
                                label={errors.mealPriceLimit ? 'error' : 'Amount'}
                                error={errors.mealPriceLimit && true}
                                helperText={errors.mealPriceLimit}
                                type='number'
                                onChange={handleChange}
                                className='text-fields'
                                name='mealPriceLimit'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: '1.00',
                                        max: '1000.00',
                                        step: 'any',
                                    }
                                }}
                                variant='outlined'
                                size='small'
                            />
                        </div>
                        <div className='restaurant'>
                            <TextField
                                id='outlined-basic'
                                label='Restaurant'
                                type='text'
                                name='betRestaurant'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                                value={values.betRestaurant}
                                variant='outlined'
                                size='small'
                            />
                        </div>
                    </div>
                );
            case 'Other':
                return (
                    <div className='other-bet'>
                        <TextField
                            id={errors.betOther ? 'outlined-basic' : 'outlined-error-helper-text'}
                            label={errors.betOther ? 'error' : 'Other Type Of Bet'}
                            error={errors.betOther && true}
                            helperText={errors.betOther}
                            type='text'
                            name='betOther'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.betOther}
                            variant='outlined'
                            size='small'
                        />
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
            <form onSubmit={handleSubmit} className='create-bet form' autoComplete='off'>
            <h2>Create Your Bet</h2>
                <span className='title'>{user.displayName ? `${user.displayName}, who` : `Who`} do you want to challenge?</span>
                <Autocomplete
                    multiple
                    limitTags={3}
                    filterSelectedOptions
                    disableCloseOnSelect
                    name='challenger'
                    onChange={handleMultiSelect}
                    className='text-fields challenger'
                    id='tags-standard'
                    options={allUsers.map(user => user.name)}
                    renderInput={(params) => (
                    <TextField
                        variant='outlined'
                        id='outlined-multiline-flexible'
                        {...params}
                        label={'Challenger(s)'}
                        //! for when I figure out validation
                        // id={errors.betDetails ? 'outlined-multiline-flexible' : 'outlined-error-helper-text'}
                        // label={errors.betDetails ? 'error' : 'Challenger(s)'}
                        // error={errors.betDetails && true}
                        // helperText={errors.betDetails}
                    />
                    )}
                />
                <TextField
                    id={errors.betDetails ? 'outlined-multiline-flexible' : 'outlined-error-helper-text'}
                    label={errors.betDetails ? 'error' : 'Bet Details'}
                    error={errors.betDetails && true}
                    helperText={errors.betDetails}
                    multiline
                    rows={3}
                    onChange={handleChange}
                    className='text-fields'
                    value={values.betDetails}
                    name='betDetails'
                    variant='outlined'
                />
                <div className='bet-terms-container'>
                    <div className='bet-completion'>
                        <TextField
                            select
                            name='betTerms'
                            id={errors.betTerms ? 'outlined-select' : 'outlined-error-helper-text'}
                            label={errors.betTerms ? 'error' : 'Terms'}
                            error={errors.betTerms && true}
                            helperText={errors.betTerms}
                            className='text-fields bet-terms-select'
                            value={values.betTerms}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant='outlined'
                            size='small'
                            >
                                {betTermItems.map(betTermItem => <option>{betTermItem}</option>)}
                        </TextField>
                    </div>
                    {handleBetTerms()}
                </div>
                <div className='bet-timelines'>
                    <div className='bet-completion'>
                        <form>
                            <TextField
                                id={errors.dateCompletion ? 'date' : 'outlined-error-helper-text'}
                                label={errors.dateCompletion ? 'error' : 'Bet Completion'}
                                error={errors.dateCompletion && true}
                                helperText={errors.dateCompletion}
                                type='date'
                                disablePast
                                className='text-fields'
                                onChange={handleChange}
                                name='dateCompletion'
                                value={values.dateCompletion}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: minDateCalc
                                    }
                                }}
                                variant='outlined'
                                size='small'
                            />
                        </form>
                    </div>
                    <div className='approval-period'>
                        <TextField
                            id={errors.approvalPeriod ? 'date' : 'outlined-select'}
                            label={errors.approvalPeriod ? 'error' : 'Approval Period'}
                            error={errors.approvalPeriod && true}
                            helperText={errors.approvalPeriod}
                            select
                            name='approvalPeriod'
                            className='text-fields bet-terms-select'
                            value={values.approvalPeriod}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant='outlined'
                            size='small'
                            >
                                {termLimits.map(termLimit => <option>{termLimit}</option>)}
                        </TextField>
                    </div>
                </div>
                <div className='button-container'>
                    <Button className='button submit' size='small' variant='contained' color='primary' type='submit'>
                        Submit
                    </Button>
                    <Button className='button cancel' size='small' variant='outlined' onClick={handleCancelBtn}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateBet
