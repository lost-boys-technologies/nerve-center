export default function validateLogin(values) {
	let errors = {};
	const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test;

	// Email Errors
	if (!values.email) {
		errors.email = 'Email required';
	} else if (!validEmail) {
		errors.email = 'Invalid email address';
	}

	// Password Errors
	if (!values.password) {
		errors.password = 'Password required';
	} else if (values.password.length < 6) {
		errors.password = 'Password must be at least 6 characters long';
	}

	return errors;
}
