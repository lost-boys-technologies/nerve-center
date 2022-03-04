import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../firebase/context';

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
		console.log('users', users);
		setAllUsers(users);
    }

	return (
		<div className='admin-container'>
			<div className='league-members'>
				{allUsers.map(user => {
					return (
						<div className='name'>
							{user.name}
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Constitution;
