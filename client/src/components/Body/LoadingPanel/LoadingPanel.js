import React from "react";
import PropTypes from "prop-types";
import FadeIn from "components/Body/FadeIn";

const LoadingPanel = ({ className, style }) => (
	<FadeIn timing="0.6s">
		<div className={className} style={style} />
	</FadeIn>
);

LoadingPanel.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default LoadingPanel;
