import React, { useContext, useEffect } from 'react';
import FirebaseContext from '../../firebase/context';
import Grid from '@material-ui/core/Grid';

import './account.scss';

const Account = () => {
	const { firebase, user } = useContext(FirebaseContext);

	console.log('displayName', user.displayName);
	console.log('email', user.email);
	console.log('member since', user.metadata.creationTime);
	console.log('user', user);

	return (
		<div className='my-account-container'>
			<paper>
				<Grid container spacing={3}>
					<Grid item xs={5}>
						<div className='card left-side-bar'>
							<div className='profile-picture'>
								<img alt='user profile' src='https://fakeimg.pl/300/' />
							</div>
							<div className='player-details'>
								User: {user.displayName}<br />
								Email: {user.email}<br />
								Member Since: {user.metadata.creationTime}<br />
							</div>
						</div>
					</Grid>
					<Grid item xs={7}>
						<div className='card'>xs=12</div>
					</Grid>
				</Grid>
			</paper>
		</div>
	);
};

export default Account;
