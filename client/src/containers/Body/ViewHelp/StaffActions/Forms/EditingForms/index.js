import React from "react";
import { FaEdit } from "react-icons/fa";
import { Button, InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const EditingForms = () => (
	<TextContainer>
		<InfoText>
			To edit a form (A/P form), go to the{" "}
			<Link blue style={linkStyle} to="/employee/forms/viewall" target="_blank">
				View Forms
			</Link>{" "}
			page and click on one of the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="50px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaEdit style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(edit) buttons located under the <strong>Table Actions</strong> column.
			Edit any of the fields and click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="140px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Form
		</Button>
		&nbsp;
		<InfoText>
			button to update the A/P form. By design, A/P forms will automatically
			aggregate events within the <strong>Enrollment Month</strong> dates,
			therefore, as long as an event&#39;s date is between this date range,
			they&#39;ll be automatically added to the A/P Form.
		</InfoText>
	</TextContainer>
);

export default EditingForms;
