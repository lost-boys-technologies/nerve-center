import React, { useState } from 'react'
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import { Form } from 'react-bootstrap';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';

import './bets.scss';

const INITIAL_STATE = {

}

//! REMOVE BEFORE DEPLOY
const betTerms = ['money', 'meal', 'other'];

//! REMOVE BEFORE DEPLOY
const leagueMembers = [
    {id: 1, name: 'Evan'},
    {id: 2, name: 'Kyle'},
    {id: 3, name: 'Simon'},
    {id: 3, name: 'Sean'}
];


const CreateBet = () => {
    const {firebase, user} = React.useContext(FirebaseContext);
    const [betTypes, setBetTypes] = useState('');

    // const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateBet, handleCreateBet)

    // const handleCreateBet = () => {
    //     if (!user) {
    //         props.history.push('/login');
    //     }
    // }

    return (
        <div className='create-bet-container'>
            <h2>Create Your Bet</h2>
            {user && <Form>
                <Form.Group>
                    <Form.Label className='label'>{user.displayName ? `${user.displayName}, who` : `Who `} do you want to challenge?</Form.Label>
                    <Form.Control className='challenger control' as='select'>
                        {leagueMembers.map(leagueMember => <option>{leagueMember.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>What's the bet?</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Form.Group className='side-by-side'>
                    <Form.Label>Bet Terms:</Form.Label>
                    <Form.Control as='select'>
                        {betTerms.map(betTerm => <option onChange>{betTerm}</option>)}
                    </Form.Control>
                    <Form.Label>amount:</Form.Label>
                    <Form.Control 
                        placeholder="amount"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bet Completion Date:</Form.Label>
                    <Form.Control as='select'>
                        {betTerms.map(betTerm => <option>{betTerm}</option>)}
                    </Form.Control>
                    <Form.Label>Acceptance Window:</Form.Label>
                    <Form.Control as='select'>
                        {betTerms.map(betTerm => <option>{betTerm}</option>)}
                    </Form.Control>
                </Form.Group>
            </Form>}
        </div>
    );
}

export default CreateBet
