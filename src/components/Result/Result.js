import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ result }) => {
	// Check if result and result.codeResult are defined before accessing properties
	if (result) {
		return (
			<li>
				{result}
			</li>
		);
	}
};

Result.propTypes = {
	result: PropTypes.string
};

export default Result;
