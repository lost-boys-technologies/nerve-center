export default function validateCreateLink(values) {
	let errors = {};
	const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test;

	// Challenger Name Errors
	if (!values.challenger) {
		errors.challenger = 'Challenger\'s name require';
	}

	// Bet Details Errors
	if (!values.betDetails) {
		errors.betDetails = 'Bet details are required'
	} else if (values.betDetails.length < 20) {
		errors.betDetails = 'Please enter in bet details - must be more than 20 characters';
	}

	// Bet Terms Errors
	if (!values.betTerms) {
		errors.betTerms = 'Please indicate an approval time limit';
	}

	// Bet Amount Errors

	// Date Completion Errors
	if (!values.dateCompletion) {
		errors.dateCompletion = 'Date of completion is required';
	}

	// Approval Period Errors
	if (!values.approvalPeriod) {
		errors.approvalPeriod = 'Please indicate an approval time limit';
	}

	return errors;
}
