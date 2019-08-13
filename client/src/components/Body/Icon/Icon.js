import React from "react";
import PropTypes from "prop-types";
import {
	FaUserCircle,
	FaLock,
	FaBug,
	FaEnvelope,
	FaKey,
	FaCalendarAlt,
	FaIdCard,
	FaIdBadge,
	FaHockeyPuck,
	FaStreetView,
	FaMinusCircle,
	FaTshirt,
	FaStickyNote,
} from "react-icons/fa";

const icons = type => {
	switch (type) {
		case "calander":
			return <FaCalendarAlt />;
		case "id":
			return <FaIdCard />;
		case "key":
			return <FaKey />;
		case "location":
			return <FaStreetView />;
		case "lock":
			return <FaLock />;
		case "mail":
			return <FaEnvelope />;
		case "note":
			return <FaStickyNote />;
		case "puck":
			return <FaHockeyPuck />;
		case "remove":
			return <FaMinusCircle />;
		case "tshirt":
			return <FaTshirt />;
		case "user":
			return <FaUserCircle />;
		case "usertag":
			return <FaIdBadge />;
		default:
			return <FaBug />;
	}
};

const Icon = ({ className, onClick, style, type }) => (
	<i className={className} onClick={onClick} style={style}>
		{icons(type)}
	</i>
);

Icon.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	type: PropTypes.string,
};

export default Icon;