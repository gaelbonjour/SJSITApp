import React from "react";
import { Button, InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const CreatingEvent = () => (
	<TextContainer>
		<InfoText>
			To create an event (games, promotionals, or misc.), go to the{" "}
			<Link blue style={linkStyle} to="/employee/events/create" target="_blank">
				Create Event
			</Link>{" "}
			page and fill out the <strong>New Event Form</strong> by: Selecting the{" "}
			<strong>Season ID</strong> you&#39;ve previously created, selecting the
			appropriate <strong>Event Type</strong>, <strong>Team</strong>,{" "}
			<strong>Opponent (if applicable)</strong>, <strong>Event Location</strong>
			, <strong>Event Date</strong>, <strong>Event Attire</strong>, and creating{" "}
			<strong>Scheduling Call Times</strong>. Once completed, click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="150px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Create Event
		</Button>
		&nbsp;
		<InfoText>button to add the event.</InfoText>
	</TextContainer>
);

export default CreatingEvent;
