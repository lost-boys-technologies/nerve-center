import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';

import './auth.scss';

const ForgotPassword = () => {
	const { firebase } = useContext(FirebaseContext);
	const [resetPasswordEmail, setResetPasswordEmail] = useState('');
	const [isPasswordReset, setIsPasswordReset] = useState(false);
	const [passwordResetError, setPasswordResetError] = useState(null);

	async function handleResetPassword() {
		try {
			await firebase.resetPassword(resetPasswordEmail);
			setIsPasswordReset(true);
			setPasswordResetError(null);
		} catch (err) {
			console.error('Error sending email', err);
			setPasswordResetError(err.message);
			setIsPasswordReset(false);
		}
	}

	return (
		<div className='forgot-password-container'>
			<h2>Forgot Password?</h2>
			<input
				type='email'
				className='input'
				placeholder='Provide your email'
				onChange={event => setResetPasswordEmail(event.target.value)}
			/>
			<div>
				<button className='unique-button' onClick={handleResetPassword}>
					Reset Password
				</button>
			</div>
			{isPasswordReset && <p className='success-text'>Check your email to reset password</p> }
			{passwordResetError && <p className='error-text'>{passwordResetError}</p>}
		</div>
	);
};

export default ForgotPassword;
