export default function validateCreateBet(values) {
	let errors = {};

	// TODO FIX
	//! MAKE SURE YOU HAVE VALIDATION
	// Challenger Name Errors
	// if (!multipleSelectValue) {
	// 	errors.challenger = 'Challenger\'s name required';
	// }

	// Bet Details Errors
	if (!values.betDetails) {
		errors.betDetails = 'Bet details are required'
	} else if (values.betDetails.length < 15) {
		errors.betDetails = 'Please enter in bet details - must be more than 15 characters';
	}

	// Bet Terms Errors
	if (!values.betTerms && values.betTerms !== 'Select') {
		errors.betTerms = 'Invalid term';
	}

	// Cash Amount Errors
	if (values.betTerms === 'Money' && !values.cashAmount) {
		errors.cashAmount = 'Please enter an amount';
	}

	// Bet Meal Errors
	if (values.betTerms === 'Meal' && !values.mealPriceLimit) {
		errors.mealPriceLimit = 'Please enter an amount';
	}

	// Bet Other Errors
	if (values.betTerms === 'Other' && !values.betOther) {
		errors.betOther = 'Please describe the bet';
	}

	// Date Completion Errors
	if (!values.dateCompletion) {
		errors.dateCompletion = 'Date of bet completion is required';
	}

	// Approval Period Errors
	if (!values.approvalPeriod && values.approvalPeriod !== 'Select Term Limits') {
		errors.approvalPeriod = 'Please indicate the grace period for the taker(s)';
	}

	return errors;
}
