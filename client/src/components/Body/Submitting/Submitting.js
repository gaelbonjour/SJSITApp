import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ className }) => (
	<div className={className}>
		<div className="bar1" />
		<div className="bar2" />
		<div className="bar3" />
	</div>
);

Spinner.propTypes = {
	className: PropTypes.string.isRequired,
};

export default Spinner;
