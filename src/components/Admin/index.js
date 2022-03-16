import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../firebase/context';

// components
import LeagueTable from '../helpers/LeagueTable';

import './admin.scss';

const Constitution = () => {
	const { firebase } = useContext(FirebaseContext);
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
        getUsers();
    }, [])

	const getUsers = () => {
		// TODO orderBy timestamp including null values
        firebase.db.collection('users')
			// .where('uid', '==', true)
			// .orderBy('memberSince', 'asc')
			.orderBy('name', 'asc')
			.onSnapshot(handleSnapshot);
    }

	const handleSnapshot = (snapshot) => {
        const users = snapshot?.docs?.map(doc => {
            return { id: doc?.id, ...doc?.data() }
        });
		console.log('users', users);
		setAllUsers(users);
    }

	return (
		<div className='admin-container'>
			<div className='left-side'>
				<LeagueTable
					users={allUsers}
					page={'admin'}
				/>
			</div>
			<div className='right-side'>
				Right Side
			</div>
		</div>
	);
};

export default Constitution;
