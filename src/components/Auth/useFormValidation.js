import React, { useState } from 'react';

const useFormValidation = initialState => {
	const [values, setValues] = useState(initialState);

	const handleChange = event => {
		setValues(previousValues => ({
			...previousValues,
			[event.target.name]: event.target.value,
		}));
	};

	return { handleChange };
};

export default useFormValidation;
