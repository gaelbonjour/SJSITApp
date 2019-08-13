import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	BackButton,
	FormContainer,
	Spinner,
	SubmitButton,
} from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { fetchToken, updateMemberToken } from "actions/Members";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Authorization Form";

export class EditAuthorizationForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchToken(id);
	};

	static getDerivedStateFromProps = ({ editToken, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(editToken)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, editToken)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const {
				hideServerMessage,
				serverMessage,
				editToken: { _id },
				updateMemberToken,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => updateMemberToken({ _id, ...parsedFields }), 350);
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={this.props.push}
					location="/employee/members/authorizations/viewall"
				/>
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Select a different season, role, and/or enter another valid email address."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<Spinner />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<SubmitButton
								disabled={isEmpty(this.props.seasonIds)}
								title="Update Authorization"
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditAuthorizationForm.propTypes = {
	editToken: PropTypes.shape({
		_id: PropTypes.string,
		authorizedEmail: PropTypes.string,
		role: PropTypes.string,
		seasonId: PropTypes.string,
	}).isRequired,
	fetchToken: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	seasonIds: PropTypes.arrayOf(PropTypes.string),
	serverMessage: PropTypes.string,
	updateMemberToken: PropTypes.func.isRequired,
};

EditAuthorizationForm.defaultProps = {
	editToken: {},
};

const mapStateToProps = state => ({
	editToken: state.members.editToken,
	serverMessage: state.server.message,
	seasonIds: state.seasons.ids,
});

const mapDispatchToProps = {
	fetchToken,
	hideServerMessage,
	push,
	updateMemberToken,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditAuthorizationForm);