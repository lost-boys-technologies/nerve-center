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
        firebase.db.collection('users').onSnapshot(handleSnapshot);
    }

	const handleSnapshot = (snapshot) => {
        const users = snapshot?.docs?.map(doc => {
            return { id: doc?.id, ...doc?.data() }
        });
		setAllUsers(users);
    }

	return (
		<div className='admin-container'>
			<LeagueTable
				users={allUsers}
			/>
		</div>
	);
};

export default Constitution;
