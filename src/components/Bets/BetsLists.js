import React from 'react';
import useAuth from '../Auth/useAuth';

const BetsLists = () => {
	const user = useAuth();
	//TODO need to implement useAuth everywhere not just here
	console.log('user is', {user});

	return (
		<div className='bets-lists'>
			<h2>Bets</h2>
		</div>
	);
};

export default BetsLists;
