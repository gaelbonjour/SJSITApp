import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	Button,
	BackButton,
	EmailPreview,
	FormContainer,
} from "components/Body";
import { FieldGenerator, FormTitle, LoadingForm } from "components/Forms";
import { fieldUpdater, fieldValidator, parseFields } from "utils";
import { fetchMail, updateMail } from "actions/Mail";
import updateFormFields from "./UpdateFormFields";
import fields from "./Fields";

const title = "Edit Mail";

export class EditMailForm extends Component {
	constructor(props) {
		super(props);

		const { id } = this.props.match.params;

		this.state = {
			id,
			fields,
			errors: "",
			isLoading: true,
			isSubmitting: false,
		};
	}

	static getDerivedStateFromProps = ({ editMail, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(editMail)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, editMail)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false, showPreview: false };

		return null;
	};

	componentDidMount = () => {
		this.props.fetchMail(this.state.id);
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handlePreview = () =>
		this.setState(prevState => ({ showPreview: !prevState.showPreview }));

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState(
			{ fields: validatedFields, isSubmitting: !errors, showPreview: !errors },
			() => {
				if (!errors)
					this.props.updateMail({
						...parseFields(validatedFields),
						_id: this.state.id,
					});
			},
		);
	};

	render = () => (
		<Card
			extra={
				<BackButton push={this.props.push} location="/employee/mail/viewall" />
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Edit and update the email below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={5} />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<Button className="preview" primary onClick={this.handlePreview}>
								Preview
							</Button>
							{this.state.showPreview && (
								<EmailPreview
									fields={parseFields(this.state.fields)}
									isSubmitting={this.state.isSubmitting}
									handleCloseModal={this.handlePreview}
									submitTitle="Update"
								/>
							)}
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditMailForm.propTypes = {
	fetchMail: PropTypes.func.isRequired,
	editMail: PropTypes.shape({
		dataSource: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string,
				email: PropTypes.string,
			}),
		),
		sendFrom: PropTypes.string,
		message: PropTypes.string,
		sendTo: PropTypes.arrayOf(PropTypes.string),
	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	editMail: state.mail.editMail,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchMail,
	push,
	updateMail,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditMailForm);