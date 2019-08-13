import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { BackButton, FormContainer, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { fetchSeason, updateSeason } from "actions/Seasons";
import { fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

const title = "Edit Season Form";

export class EditSeasonForm extends Component {
	state = {
		fields,
		seasonId: "",
		isSubmitting: false,
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;

		this.props.fetchSeason(id);
	};

	static getDerivedStateFromProps = ({ editSeason, serverMessage }, state) => {
		if (!state.seasonId && !isEmpty(editSeason)) {
			const { endDate, seasonId, startDate } = editSeason;
			return {
				seasonId,
				fields: state.fields.map(field =>
					field.type === "range"
						? {
								...field,
								disabled: false,
								value: [moment(startDate), moment(endDate)],
						  }
						: { ...field, value: seasonId },
				),
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	handleChange = ({ target: { name, value } }) => {
		let seasonId = "";

		if (!isEmpty(value)) {
			const [startYear, endYear] = value;
			seasonId = `${startYear.format("YYYY")}${endYear.format("YYYY")}`;
		}

		this.setState(prevState => {
			const updateFields = prevState.fields.map(field =>
				field.type === "text" ? { ...field, value: seasonId } : { ...field },
			);

			return {
				...prevState,
				seasonId,
				fields: fieldUpdater(updateFields, name, value),
			};
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.setState({ isSubmitting: true }, () => {
			const { fields: formFields } = this.state;
			const {
				editSeason: { _id },
				hideServerMessage,
				serverMessage,
				updateSeason,
			} = this.props;

			const parsedFields = parseFields(formFields);

			if (serverMessage) hideServerMessage();
			setTimeout(() => updateSeason({ ...parsedFields, _id }), 350);
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={this.props.push}
					location="/employee/seasons/viewall"
				/>
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Select a new start and end date to update the season."
				/>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						disabled={isEmpty(this.props.editSeason)}
						isSubmitting={this.state.isSubmitting}
					/>
				</form>
			</FormContainer>
		</Card>
	);
}

EditSeasonForm.propTypes = {
	editSeason: PropTypes.shape({
		_id: PropTypes.string,
		seaonId: PropTypes.string,
		startDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		endDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
	}),
	fetchSeason: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	push: PropTypes.func.isRequired,
	updateSeason: PropTypes.func.isRequired,
};

EditSeasonForm.defaultProps = {
	editSeason: {},
};

const mapStateToProps = state => ({
	isLoading: state.seasons.isLoading,
	editSeason: state.seasons.editSeason,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchSeason,
	hideServerMessage,
	push,
	updateSeason,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditSeasonForm);