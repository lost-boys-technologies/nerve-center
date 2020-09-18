import React, { useState } from 'react';
import Modal from 'react-modal';
import CreateBet from './CreateBet';

const BetsLists = () => {
	const [modalIsOpen, setmodalIsOpen] = useState(false);

	return (
		<div className='bets-container'>
			<button onClick={() => setmodalIsOpen(true)}>Create Bet</button>
			<Modal isOpen={modalIsOpen}><CreateBet /></Modal>
			<div>Bets Lists</div>
		</div>
	);
};

export default BetsLists;
