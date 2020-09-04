import React, { useState } from 'react';

import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import './auth.scss';

const INITIAL_STATE = {
	name: '',
	email: '',
	password: '',
};

const Login = props => {
	const {
		handleChange,
		handleBlur,
		handleSubmit,
		values,
		errors,
		isSubmitting,
	} = useFormValidation(INITIAL_STATE, validateLogin);
	const [login, setLogin] = useState(true);

	return (
		<div className='login'>
			<h2>{login ? 'Login' : 'Create An Account'}</h2>
			<form onSubmit={handleSubmit} className='login-form'>
				{!login && (
					<input
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
						name='name'
						type='text'
						placeholder='please enter your name'
						autoComplete='off'
					/>
				)}
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.email}
					className={errors.email && 'error-input'}
					name='email'
					type='email'
					placeholder='Please enter your email'
					autoComplete='off'
				/>
				{errors.email && <p className='error-text'>{errors.email}</p>}
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.password}
					className={errors.password && 'error-input'}
					name='password'
					type='password'
					placeholder='Password'
					autoComplete='off'
				/>
				{errors.password && <p className='error-text'>{errors.password}</p>}
				<div className='login-buttons'>
					<button
						disabled={isSubmitting}
						style={{ background: isSubmitting ? 'grey' : '#9FC7D9' }}
						type='submit'
					>
						Submit
					</button>
					<button type='button' onClick={() => setLogin(prevLogin => !prevLogin)}>
						{login ? 'Need to create and account?' : 'Already have an account?'}
					</button>
				</div>
			</form>
			{/* <div className='firebase-oauth'>
				<p>Or connect with Social Media</p>
			</div> */}
		</div>
	);
};

export default Login;
