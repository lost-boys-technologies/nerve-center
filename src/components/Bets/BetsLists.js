import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import CreateBet from './CreateBet';

import './bets.scss';

const BetsLists = () => {
	return (
		<div className='bets-container'>
			<h2>Bets Lists</h2>
			<div className='create-bet-btn'>
				<Link to='/create'>
					<button>Create Bet</button>
				</Link>
			</div>
		</div>
	);
};

export default BetsLists;
