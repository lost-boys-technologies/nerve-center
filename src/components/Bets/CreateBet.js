import React from 'react'
import { Form } from 'react-bootstrap';

import './bets.scss';

//! REMOVE BEFORE DEPLOY
const leagueMembers = [
    {id: 1, name: 'Evan'},
    {id: 2, name: 'Kyle'},
    {id: 3, name: 'Simon'},
    {id: 3, name: 'Sean'}
];

const CreateBet = () => {
    const betTerms = ['money', 'meal', 'other'];

    return (
        <div className='create-bet-container'>
            <h2>Create Your Bet</h2>
            <Form>
                <Form.Group>
                    <Form.Label>USER, who do you want to challenge?</Form.Label>
                    <Form.Control as='select'>
                        {leagueMembers.map(leagueMember => <option>{leagueMember.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>What's the bet?</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bet Terms:</Form.Label>
                    <Form.Control as='select'>
                        {betTerms.map(betTerm => <option>{betTerm}</option>)}
                    </Form.Control>
                </Form.Group>                                           
            </Form>
        </div>
    );
}

export default CreateBet
