import React, { useState } from 'react';

import './auth.scss';

const Login = () => {
	const [login, setLogin] = useState(true);

	return (
		<div className='login'>
			<h2>{login ? 'Login' : 'Create An Account'}</h2>
			<form className='login-form'>
				{!login && (
					<input type='text' placeholder='please enter your name' autoComplete='off' />
				)}
				<input type='email' placeholder='Please enter your email' autoComplete='off' />
				<input type='password' placeholder='Password' autoComplete='off' />
				<div className='login-buttons'>
					<button type='submit'>Submit</button>
					<button type='button' onClick={() => setLogin(prevLogin => !prevLogin)}>
						{login ? 'Need to create and account?' : 'Already have an account?'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
