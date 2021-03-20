import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../../firebase/context';
import { Link } from 'react-router-dom';
import BetItem from './BetItem';
// import CreateBet from './CreateBet';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import './bets.scss';

const BetsLists = (props) => {
	const { firebase, user } = useContext(FirebaseContext);
	const [bets, setBets] = useState([]);

	useEffect(() => {
		getBets();
	}, []);
	
	const getBets = () => {
		firebase.db.collection('bets').orderBy('created', 'asc').onSnapshot(handleSnapshot)
	}

	const handleSnapshot = (snapshot) => {
		const bets = snapshot.docs.map(doc => {
			return { id: doc.id, ...doc.data() }
		})
		setBets(bets);
	}

	return (
		<div className='bets-container'>
			<div className='create-bet-btn'>
				<Link className='create-bet-link' to='/create'>
					<Button variant='contained' endIcon={<AddIcon />}>Create Bet</Button>
				</Link>
			</div>
			<div className='pending-bets'>
				<h3>Pending Bets</h3>
				{bets.map((bet, index) => (
					<BetItem key={bet.id} showCount={true} bet={bet} index={index + 1} />
				))}
			</div>
			{/* //! Construction Zone */}
			<div className='active-bets'>
				<h3>Active Bets</h3>
				<span>THIS SECTION IS A WORK IN PROGRESS</span>
			</div>
			{/* //! End Construction Zone */}
		</div>
	);
};

export default BetsLists;
