import ScheduleModal from "../index";

const handleCloseModal = jest.fn();

const initProps = {
	id: "",
	loggedinUserId: "87",
	handleCloseModal,
	isVisible: false,
	modalChildren: [],
};

const gameSchedule = [
	{
		_id: "0123456789",
		eventDate: "2019-08-10T02:30:31.834+00:00",
		eventNotes: "",
		eventType: "Game",
		employeeResponse: "",
		employeeNotes: "",
		location: "SAP Center at San Jose",
		notes: "Parking will be crowded.",
		opponent: "Anaheim Ducks",
		response: "",
		team: "San Jose Sharks",
		schedule: [
			{
				_id: "2019-08-09T17:45:26-07:00",
				employeeIds: [
					{
						_id: "88",
						firstName: "John",
						lastName: "Smith",
					},
				],
			},
		],
	},
];

const unscheduledGame = [
	{
		_id: "0123456789",
		eventDate: "2019-08-10T02:30:31.834+00:00",
		eventNotes: "",
		eventType: "Game",
		employeeResponse: "",
		employeeNotes: "",
		location: "SAP Center at San Jose",
		notes: "Parking will be crowded.",
		opponent: "Anaheim Ducks",
		response: "",
		team: "San Jose Sharks",
		schedule: [
			{
				_id: "2019-08-09T17:45:26-07:00",
				employeeIds: [],
			},
			{
				_id: "2019-08-09T18:45:26-07:00",
				employeeIds: [],
			},
			{
				_id: "2019-08-09T19:45:26-07:00",
				employeeIds: [],
			},
		],
	},
];

const employeeEventResponse = [
	{
		_id: "0123456789",
		eventDate: "2019-08-10T02:30:31.834+00:00",
		eventNotes: "Parking will be crowded.",
		eventType: "Game",
		employeeResponse: "Not available.",
		employeeNotes: "I will be out of town.",
		notes: "",
		location: "SAP Center at San Jose",
		opponent: "Anaheim Ducks",
		response: "",
		team: "San Jose Sharks",
		schedule: [],
	},
];

describe("Schedule Modal", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ScheduleModal {...initProps} />);
	});

	it("initially renders null", () => {
		expect(wrapper.find("Modal").exists()).toBeFalsy();
	});

	it("renders a List of ListItems for a scheduled game", () => {
		wrapper.setProps({ isVisible: true, modalChildren: gameSchedule });
		expect(wrapper.find("List").exists()).toBeTruthy();
		expect(wrapper.find("ListItem")).toHaveLength(7);
	});

	it("renders a List of ListItems for an unscheduled game", () => {
		wrapper.setProps({ isVisible: true, modalChildren: unscheduledGame });
		expect(wrapper.find("List").exists()).toBeTruthy();
		expect(wrapper.find("ListItem")).toHaveLength(9);
		expect(wrapper.find(".none-scheduled")).toHaveLength(3);
	});

	it("renders a List of ListItems for an employee response to an upcoming event", () => {
		wrapper.setProps({ isVisible: true, modalChildren: employeeEventResponse });
		expect(wrapper.find("List").exists()).toBeTruthy();
		expect(wrapper.find("ListItem")).toHaveLength(6);
	});

	it("highlights a member's name if an 'id' prop is present", () => {
		wrapper.setProps({
			id: "88",
			isVisible: true,
			modalChildren: gameSchedule,
		});

		expect(wrapper.find(".employee").prop("style")).toHaveProperty(
			"backgroundColor",
			"#006d75",
		);
		expect(wrapper.find(".employee").prop("style")).toHaveProperty(
			"color",
			"#fff",
		);
	});

	it("highlights a member's name if the loggedinUser matches the 'id'", () => {
		wrapper.setProps({
			isVisible: true,
			loggedinUserId: "88",
			modalChildren: gameSchedule,
		});

		expect(wrapper.find(".employee").prop("style")).toHaveProperty(
			"backgroundColor",
			"#006d75",
		);
		expect(wrapper.find(".employee").prop("style")).toHaveProperty(
			"color",
			"#fff",
		);
	});
});