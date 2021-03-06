import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FaEdit } from "react-icons/fa";
import { fetchEvent, updateEvent } from "actions/Events";
import BackButton from "components/Body/BackButton";
import SubmitButton from "components/Body/SubmitButton";
import FormContainer from "components/Body/FormContainer";
import AddField from "components/Forms/AddField";
import FieldGenerator from "components/Forms/FieldGenerator";
import FormTitle from "components/Forms/FormTitle";
import LoadingForm from "components/Forms/LoadingForm";
import fieldValidator from "utils/fieldValidator";
import fieldUpdater from "utils/fieldUpdater";
import parseFields from "utils/parseFields";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Event";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class EditEventForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchEvent(id);
	};

	componentDidUpdate = () => {
		if (this.state.isLoading && !isEmpty(this.props.editEvent)) {
			this.setState(prevState => ({
				...prevState,
				fields: prevState.fields.reduce(
					(result, field) =>
						updateFormFields(
							result,
							field,
							this.props.editEvent,
							this.handleRemoveField,
						),
					[],
				),
				isLoading: false,
			}));
		}
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleAddField = () => {
		this.setState(prevState => ({
			...prevState,
			fields: [
				...prevState.fields,
				{
					type: "time",
					name: `callTime-${Date.now()}`,
					placeholder: "Select a call time...",
					label: "",
					value: null,
					errors: "",
					height: "auto",
					style: { width: "100%" },
					onFieldRemove: this.handleRemoveField,
				},
			],
		}));
	};

	handleRemoveField = name => {
		this.setState(prevState => ({
			...prevState,
			fields: prevState.fields.filter(field => field.name !== name),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const {
				editEvent: { _id },
				updateEvent,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(validatedFields);
				updateEvent({ _id, ...parsedFields });
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={this.props.push}
					location="/employee/events/viewall?page=1"
				/>
			}
			title={
				<Fragment>
					<FaEdit style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Edit or change any of the current event fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={9} />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<AddField
								onClick={this.handleAddField}
								text="Add Call Time Slot"
							/>
							<SubmitButton
								disabled={isEmpty(this.props.editEvent)}
								title="Update Event"
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditEventForm.propTypes = {
	editEvent: PropTypes.shape({
		_id: PropTypes.string,
		team: PropTypes.string,
		opponent: PropTypes.string,
		eventType: PropTypes.string,
		location: PropTypes.string,
		callTimes: PropTypes.arrayOf(PropTypes.string),
		uniform: PropTypes.string,
		seasonId: PropTypes.string,
		eventDate: PropTypes.string,
		notes: PropTypes.string,
	}).isRequired,
	fetchEvent: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateEvent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	editEvent: state.events.editEvent,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchEvent,
	push,
	updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEventForm);
