import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUnlockAlt } from "react-icons/fa";
import Center from "components/Body/Center";
import Modal from "components/Body/Modal";
import SubmitButton from "components/Body/SubmitButton";
import FieldGenerator from "components/Forms/FieldGenerator";
import FormTitle from "components/Forms/FormTitle";
import Link from "components/Navigation/Link";
import fieldValidator from "utils/fieldValidator";
import fieldUpdater from "utils/fieldUpdater";
import parseFields from "utils/parseFields";
import parseToken from "utils/parseToken";
import { signupUser } from "actions/Auth";

export class SignupForm extends Component {
	constructor(props) {
		super(props);

		const token = parseToken(props.history.location.search);

		this.state = {
			fields: [
				{
					name: "token",
					type: "text",
					label: "Authorization Key",
					tooltip:
						"The authorization key is supplied via email upon staff approval.",
					icon: "key",
					value: token || "",
					errors: "",
					disabled: !!token,
					required: true,
				},
				{
					name: "email",
					type: "email",
					label: "Authorized Email",
					tooltip: "The email below needs to match a staff approved email.",
					icon: "mail",
					value: "",
					errors: "",
					required: true,
				},
				{
					name: "firstName",
					type: "text",
					label: "First Name",
					icon: "user",
					value: "",
					errors: "",
					required: true,
				},
				{
					name: "lastName",
					type: "text",
					label: "Last Name",
					icon: "user",
					value: "",
					errors: "",
					required: true,
				},
				{
					name: "password",
					type: "password",
					label: "Password",
					icon: "lock",
					value: "",
					errors: "",
					required: true,
				},
			],
			isSubmitting: false,
		};
	}

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

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
			if (!errors) this.props.signupUser(parseFields(validatedFields));
		});
	};

	render = () => (
		<Modal maxWidth="750px">
			<FormTitle
				header="Sign Up"
				title="Sign Up"
				description="Fill out all the fields below to register."
			/>
			<form onSubmit={this.handleSubmit}>
				<FieldGenerator
					fields={this.state.fields}
					onChange={this.handleChange}
				/>
				<Link
					blue
					style={{ padding: 0, margin: 0, fontSize: 16 }}
					to="/employee/resetpassword"
				>
					<FaUnlockAlt />
					&nbsp; Forgot your password?
				</Link>
				<SubmitButton isSubmitting={this.state.isSubmitting} title="Register" />
			</form>
			<Center style={{ marginTop: 20 }}>
				Already have an account? &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/login">
					Log in
				</Link>
			</Center>
		</Modal>
	);
}

SignupForm.propTypes = {
	history: PropTypes.shape({
		action: PropTypes.string,
		block: PropTypes.func,
		createHref: PropTypes.func,
		go: PropTypes.func,
		goBack: PropTypes.func,
		goForward: PropTypes.func,
		length: PropTypes.number,
		listen: PropTypes.func,
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string,
			hash: PropTypes.string,
			state: PropTypes.oneOf(["object", "undefined"]),
		}),
		push: PropTypes.func,
		replace: PropTypes.func,
	}),
	serverMessage: PropTypes.string,
	signupUser: PropTypes.func,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
