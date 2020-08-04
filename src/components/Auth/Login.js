import React, { useState } from 'react';

import useFormValidation from './useFormValidation';

import './auth.scss';

const INITIAL_STATE = {
	name: '',
	email: '',
	password: '',
};

const Login = props => {
	const { handleChange } = useFormValidation(INITIAL_STATE);
	const [login, setLogin] = useState(true);

	return (
		<div className='login'>
			<h2>{login ? 'Login' : 'Create An Account'}</h2>
			<form className='login-form'>
				{!login && (
					<input
						onChange={handleChange}
						name='name'
						type='text'
						placeholder='please enter your name'
						autoComplete='off'
					/>
				)}
				<input
					onChange={handleChange}
					name='email'
					type='email'
					placeholder='Please enter your email'
					autoComplete='off'
				/>
				<input
					onChange={handleChange}
					name='password'
					type='password'
					placeholder='Password'
					autoComplete='off'
				/>
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
