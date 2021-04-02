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
	const [activeBets, setActiveBets] = useState([]);

	useEffect(() => {
		getBets();
	}, []);
	
	const getBets = () => {
		firebase.db.collection('bets').orderBy('approvalPeriod', 'asc').onSnapshot(handleSnapshot)
	}

	const handleSnapshot = (snapshot) => {
		// for (var i = 0; i < snapshot.docs.length; i++) {
		// 	const doc = snapshot.docs[i].data();
		// 	let away;
		// 	switch (doc.approvalPeriod) {
		// 		case '1 day':
		// 			away = 1;
		// 			break;
		// 		case '2 days':
		// 			away = 2;
		// 			break;
		// 		case '3 days':
		// 			away = 3;
		// 			break;
		// 		case '1 week':
		// 			away = 7;
		// 			break;
		// 		default:
		// 			break;
		// 	}
			
		// 	if (doc.created + away * 24 * 60 * 60 * 1000 < new Date()) {
		// 		setActiveBets({ id: doc.id, ...doc });
		// 		// console.log('hit');
		// 	} else {
		// 		setBets({ id: doc.id, ...doc });
		// 	}
		// }

		// const bets = snapshot.docs.map(doc => {
		// 	let away;
		// 	switch (doc.data().approvalPeriod) {
		// 		case '1 day':
		// 			away = 1;
		// 			break;
		// 		case '2 days':
		// 			away = 2;
		// 			break;
		// 		case '3 days':
		// 			away = 3;
		// 			break;
		// 		case '1 week':
		// 			away = 7;
		// 			break;
		// 		default:
		// 			break;
		// 	}

		// 	if (doc.data().created + away * 24 * 60 * 60 * 1000 < new Date()) {
		// 		// return setActiveBets({ id: doc.id, ...doc.data() });
		// 		console.log('hit');
		// 	}
		// 	return { id: doc.id, ...doc.data() }
		// })
		// console.log('bets', bets);
		// setBets(bets);
		const bets = snapshot.docs.map(doc => {
			return { id: doc.id, ...doc.data() }
		})
		setBets(bets);
	}

	console.log('activeBets', typeof activeBets);
	return (
		<div className='bets-container'>
			<div className='create-bet-btn'>
				<Link className='create-bet-link' to='/create'>
					<Button variant='contained' endIcon={<AddIcon />}>Create Bet</Button>
				</Link>
			</div>
			<div className='pending-bets'>
				<h3>Pending Bets</h3>
				{/* //! HERE */}
				{/* // TODO put back in the for loop code that sets these to state and figure out the errors from there */}
				{bets.map((bet, index) => (
					<BetItem key={bet.id} showCount={true} bet={bet} index={index + 1} />
				))}
			</div>
			{/* //! Construction Zone */}
			<div className='active-bets'>
				<h3>Active Bets</h3>
				{/* <span>THIS SECTION IS A WORK IN PROGRESS</span> */}
				{/* {activeBets.map((bet, index) => (
					<BetItem key={bet.id} showCount={true} bet={bet} index={index + 1} />
				))} */}
			</div>
			{/* //! End Construction Zone */}
		</div>
	);
};

export default BetsLists;
