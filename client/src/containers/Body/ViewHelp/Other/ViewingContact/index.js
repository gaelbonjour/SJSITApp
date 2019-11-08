import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingContact = () => (
	<TextContainer>
		<InfoText>
			If you can&#39;t find an answer to your question, please go to the
		</InfoText>
		&nbsp;
		<Link blue style={linkStyle} to="/employee/contact-us" target="_blank">
			Contact Us
		</Link>
		&nbsp;
		<InfoText>
			page and fill out the necessary form fields to send an email to either a
			staff member or the webmaster.
		</InfoText>
	</TextContainer>
);

export default ViewingContact;
