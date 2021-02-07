import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../../firebase/context';
import { Link } from 'react-router-dom';
import BetItem from './BetItem';
// import CreateBet from './CreateBet';

import './bets.scss';

const BetsLists = (props) => {
	const { firebase } = useContext(FirebaseContext);
	const [bets, setBets] = useState([]);

	useEffect(() => {
		getBets();
	}, []);
	
	const getBets = () => {
		firebase.db.collection('bets').onSnapshot(handleSnapshot)
	}

	const handleSnapshot = (snapshot) => {
		const bets = snapshot.docs.map(doc => {
			return { id: doc.id, ...doc.data() }
		})
		setBets(bets);
	}

	return (
		<div className='bets-container'>
			<h2>Bets Lists</h2>
			<div className='create-bet-btn'>
				<Link to='/create'>
					<button>Create Bet</button>
				</Link>
			</div>
			<div>
				{bets.map((bet, index) => (
					<BetItem key={bet.id} showCount={true} bet={bet} index={index + 1} />
				))}
			</div>
		</div>
	);
};

export default BetsLists;
