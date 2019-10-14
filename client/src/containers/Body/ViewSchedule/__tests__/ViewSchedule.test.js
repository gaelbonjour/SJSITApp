import { ViewSchedule } from "../index";

const initProps = {
	fetchScheduleEvents: jest.fn(),
	loggedinUserId: "88",
	match: {
		params: {
			id: "",
		},
	},
	scheduleEvents: [],
};

const wrapper = shallow(<ViewSchedule {...initProps} />);

describe("View Schedule", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
