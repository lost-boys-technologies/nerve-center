import React from 'react';

const Login = () => {
	// const [login, setLogin] = useState();

	return (
		<div className='login'>
			<h2>Create Account</h2>
			<form className='login-form'>
				<input type='text' placeholder='Your Name' autoComplete='off' />
				<input type='email' placeholder='Your Email' autoComplete='off' />
				<input type='password' placeholder='Choose a secure password' />
				<div className='submit-button'>
					<button type='submit' className='button'>
						Submit
					</button>
					<button type='submit' className='submit-button'>
						Already have an account?
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
