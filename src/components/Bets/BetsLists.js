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

		//! Works
		// const bets = snapshot.docs.map(doc => {
		// 	console.log('dock', doc); // contains a doc.id
		// 	console.log('doc.id', doc.id); // 
		// 	return { id: doc.id, ...doc.data() }
		// })
		setBets(bets);
		//! /Works

		//! Approach I want
		let actives = [];
		let pending = [];

		for (var i = 0; i < snapshot.docs.length; i++) {
			const docu = snapshot.docs[i];
			let away;
			switch (docu.data().approvalPeriod) {
				case '1 day':
					away = 1;
					break;
				case '2 days':
					away = 2;
					break;
				case '3 days':
					away = 3;
					break;
				case '1 week':
					away = 7;
					break;
				default:
					break;
			}

			if (docu.data().created + away * 24 * 60 * 60 * 1000 < new Date()) {
				actives.push({ id: docu.id, ...docu.data() });
			} else {
				pending.push({ id: docu.id, ...docu.data() });
			}
		}
		//! /Approach I want

		//! One approach
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
		//! /One approach

		setActiveBets(actives);
		setBets(pending);
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
			<div className='active-bets'>
				<h3>Active Bets</h3>
				{/* <span>THIS SECTION IS A WORK IN PROGRESS</span> */}
				{activeBets.map((bet, index) => (
					<BetItem key={bet.id} showCount={true} bet={bet} index={index + 1} />
				))}
			</div>
		</div>
	);
};

export default BetsLists;
