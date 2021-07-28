import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../firebase/context';
import Grid from '@material-ui/core/Grid';

import './account.scss';

const Account = () => {
	const { firebase, user } = useContext(FirebaseContext);
	const [currentUser, setCurrentUser] = useState([])

	useEffect(() => {
        getUsers();
    }, [])

	const getUsers = () => {
        firebase.db.collection('users').onSnapshot(handleSnapshot);
    }

	// TODO Cleanup with CreateBet.js `handleSnapshot` very similar
	const handleSnapshot = (snapshot) => {
        const users = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        const currentUser = users.filter(filteredUser => filteredUser.uid === user.uid);
        setCurrentUser(currentUser[0]);
    }

	// TODO Create admin portal to update user details
	const { admin } = currentUser
	console.log('admin', admin);

	return (
		<div className='my-account-container'>
			<div className='card left-side-bar' >
				<div className='profile-picture'>
					<img alt='user profile' src='https://fakeimg.pl/300/' />
				</div>
				<div className='player-details'>
					<div className='user'>
						User: {user.displayName}<br />
					</div>
					<div className='email'>
						Email: {user.email}<br />
					</div>
					<div className='member-since'>
						Member Since: {user.metadata.creationTime}<br />
					</div>
				</div>
			</div>
			<div className='card right-side-bar'>
				<h2>Right Side</h2>
			</div>
		</div>
	);
};

export default Account;
