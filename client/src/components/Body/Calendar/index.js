import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import moment from "moment-timezone";
import { Calendar } from "antd";
import ScheduleList from "components/Body/ScheduleList";
import ScheduleHeader from "components/Body/ScheduleHeader";
import ScheduleModal from "components/Body/ScheduleModal";

export const setValidRange = date => [
	moment(date).startOf("month"),
	moment(date).endOf("month"),
];

class CustomCalendar extends Component {
	constructor(props) {
		super(props);

		const id = get(props, ["match", "params", "id"]);

		this.state = {
			id: props.id || id,
			isVisible: false,
			modalChildren: null,
			months: moment.monthsShort(),
			years: [
				...Array(11)
					.fill()
					.map(
						(_, key) =>
							parseInt(
								moment()
									.subtract(5, "year")
									.format("YYYY"),
								10,
							) + key,
					),
			],
			validRange: setValidRange(Date.now()),
			value: moment(Date.now()),
			selectedGames: id ? "My Games" : "All Games",
			selectedMonth: moment().format("MMM"),
			selectedYear: parseInt(moment().format("YYYY"), 10),
		};
	}

	componentDidMount = () => {
		const { id, selectedGames } = this.state;
		this.props.fetchAction({ id, selectedGames });
	};

	handleShowModal = modalChildren => {
		this.setState({
			isVisible: true,
			modalChildren: [modalChildren],
		});
	};

	handleCloseModal = () => {
		this.setState({
			isVisible: false,
			modalChildren: null,
		});
	};

	handleSelection = ({ name, value, calendarDate, updateCalendarDate }) => {
		let newCalendarDate = calendarDate;

		switch (name) {
			case "selectedMonth": {
				newCalendarDate = calendarDate.clone().month(value);
				break;
			}
			case "selectedYear": {
				newCalendarDate = calendarDate.clone().year(value);
				break;
			}
		}

		updateCalendarDate(newCalendarDate);

		this.setState(
			{ [name]: value, validRange: setValidRange(newCalendarDate) },
			() => {
				this.props.fetchAction({
					id: this.state.id,
					selectedDate: moment(
						`${this.state.selectedMonth} ${this.state.selectedYear}`,
						"MMM YYYY",
					).format(),
					selectedGames: this.state.selectedGames,
				});
			},
		);
	};

	handleRenderHeader = props => (
		<ScheduleHeader
			{...this.state}
			{...props}
			role={this.props.role}
			handleSelection={this.handleSelection}
		/>
	);

	handlePanelChange = value => this.setState({ value });

	handleDateCellRender = value => {
		const { scheduleEvents } = this.props;

		const calanderDate = value.format("l");
		const content = !isEmpty(scheduleEvents)
			? scheduleEvents.filter(
					event => moment(event.eventDate).format("l") === calanderDate,
			  )
			: [];

		return (
			<ScheduleList
				date={moment(calanderDate, "l").format("ddd")}
				loggedinUserId={this.props.loggedinUserId}
				content={content}
				handleShowModal={this.handleShowModal}
				padding="0 6%"
				btnStyle={{ maxWidth: 165 }}
				innerStyle={{ padding: "3px 0" }}
				height="30"
				width="30"
			/>
		);
	};

	render = () => (
		<Fragment>
			<Calendar
				mode="month"
				validRange={this.state.validRange}
				onPanelChange={this.handlePanelChange}
				value={this.state.value}
				headerRender={this.handleRenderHeader}
				dateCellRender={this.handleDateCellRender}
			/>
			<ScheduleModal
				{...this.state}
				loggedinUserId={this.props.loggedinUserId}
				handleCloseModal={this.handleCloseModal}
			/>
		</Fragment>
	);
}

CustomCalendar.propTypes = {
	id: PropTypes.string,
	fetchAction: PropTypes.func.isRequired,
	loggedinUserId: PropTypes.string,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	role: PropTypes.string,
	scheduleEvents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			employeeResponse: PropTypes.string,
			employeeNotes: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					title: PropTypes.string,
					employeeIds: PropTypes.arrayOf(
						PropTypes.shape({
							_id: PropTypes.string,
							firstName: PropTypes.string,
							lastName: PropTypes.string,
						}),
					),
				}),
			),
		}),
	),
};

export default CustomCalendar;
