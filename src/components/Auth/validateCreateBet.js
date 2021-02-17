export default function validateCreateLink(values) {
	let errors = {};
	const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test;

	// Challenger Name Errors
	if (!values.challenger) {
		errors.challenger = 'Challenger\'s name required.';
	}

	// Bet Details Errors
	if (!values.betDetails) {
		errors.betDetails = 'Bet details are required'
	} else if (values.betDetails.length < 15) {
		errors.betDetails = 'Please enter in bet details - must be more than 15 characters.';
	}

	// Bet Terms Errors
	if (!values.betTerms && values.betTerms !== 'Select Terms') {
		errors.betTerms = 'Please select a valid bet term.';
	}

	// TODO 
	// Cash Amount Errors
	if (values.betTerms === 'Money' && !values.cashAmount) {
		errors.cashAmount = 'Please enter an amount.'
	}

	// Bet Meal Errors
	// Bet Other Errors

	// Date Completion Errors
	if (!values.dateCompletion) {
		errors.dateCompletion = 'Date of bet completion is required.';
	}

	// Approval Period Errors
	if (!values.approvalPeriod) {
		errors.approvalPeriod = 'Please indicate the grace period for the taker(s).';
	}

	return errors;
}
