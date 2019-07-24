import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as types from "types";
import * as actions from "actions/Members";
import { setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Members";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import memberReducer from "reducers/Members";
import { parseData, parseMessage } from "utils/parseResponse";

const seasonId = "124567890";

describe("Season Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	// describe("Create Season", () => {
	// 	let message;
	// 	let props;
	// 	beforeEach(() => {
	// 		message = "Successfully created a new season!";
	// 		props = mocks.newSeason;
	// 	});

	// 	it("logical flow matches pattern for a create season request", () => {
	// 		const res = { data: { message } };

	// 		testSaga(sagas.createSeason, { props })
	// 			.next()
	// 			.call(app.post, "season/create", { ...props })
	// 			.next(res)
	// 			.call(parseMessage, res)
	// 			.next(res.data.message)
	// 			.put(setServerMessage({ type: "success", message: res.data.message }))
	// 			.next()
	// 			.put(push("/employee/seasons/viewall"))
	// 			.next()
	// 			.isDone();
	// 	});

	// 	it("successfully creates a new season", async () => {
	// 		mockApp.onPost("season/create").reply(200, { message });

	// 		return expectSaga(sagas.createSeason, { props })
	// 			.dispatch(actions.createSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message,
	// 				show: true,
	// 				type: "success",
	// 			})
	// 			.run();
	// 	});

	// 	it("if API call fails, it displays a message", async () => {
	// 		const err = "Unable to create a new season.";
	// 		mockApp.onPost("season/create").reply(404, { err });

	// 		return expectSaga(sagas.createSeason, { props })
	// 			.dispatch(actions.createSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message: err,
	// 				show: true,
	// 				type: "error",
	// 			})
	// 			.run();
	// 	});
	// });

	// describe("Delete Season", () => {
	// 	it("logical flow matches pattern for delete season requests", () => {
	// 		const message = "Successfully deleted season.";
	// 		const res = { data: { message } };

	// 		testSaga(sagas.deleteSeason, { seasonId })
	// 			.next()
	// 			.call(app.delete, `season/delete/${seasonId}`)
	// 			.next(res)
	// 			.call(parseMessage, res)
	// 			.next(res.data.message)
	// 			.put(setServerMessage({ type: "success", message: res.data.message }))
	// 			.next()
	// 			.put({ type: types.SEASONS_FETCH })
	// 			.next()
	// 			.isDone();
	// 	});

	// 	it("successfully deletes a season", async () => {
	// 		const message = "Successfully deleted the season.";
	// 		mockApp.onDelete(`season/delete/${seasonId}`).reply(200, { message });

	// 		return expectSaga(sagas.deleteSeason, { seasonId })
	// 			.dispatch(actions.deleteSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message,
	// 				show: true,
	// 				type: "success",
	// 			})
	// 			.run();
	// 	});

	// 	it("if API call fails, it displays a message", async () => {
	// 		const err = "Unable to delete the season.";
	// 		mockApp.onDelete(`season/delete/${seasonId}`).reply(404, { err });

	// 		return expectSaga(sagas.deleteSeason, { seasonId })
	// 			.dispatch(actions.deleteSeason)setMembers
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message: err,
	// 				show: true,
	// 				type: "error",
	// 			})
	// 			.run();
	// 	});
	// });

	// describe("Fetch Season", () => {
	// 	let data;
	// 	beforeEach(() => {
	// 		data = { season: mocks.seasonsData };
	// 	});

	// 	it("logical flow matches pattern for fetch season requests", () => {
	// 		const res = { data };

	// 		testSaga(sagas.fetchSeason, { seasonId })
	// 			.next()
	// 			.call(app.get, `season/edit/${seasonId}`)
	// 			.next(res)
	// 			.call(parseData, res)
	// 			.next(res.data)
	// 			.put(actions.setSeasonToEdit(res.data))
	// 			.next()
	// 			.isDone();
	// 	});

	// 	it("successfully creates a new season", async () => {
	// 		mockApp.onGet(`season/edit/${seasonId}`).reply(200, data);

	// 		return expectSaga(sagas.fetchSeason, { seasonId })
	// 			.dispatch(actions.fetchSeason)
	// 			.withReducer(seasonReducer)
	// 			.hasFinalState({
	// 				data: [],
	// 				editSeason: mocks.seasonsData,
	// 				isLoading: false,
	// 			})
	// 			.run();
	// 	});

	// 	it("if API call fails, it displays a message", setMembersasync () => {
	// 		const err = "Unable to fetch that season.";
	// 		mockApp.onGet(`season/edit/${seasonId}`).reply(404, { err });

	// 		return expectSaga(sagas.fetchSeason, { seasonId })
	// 			.dispatch(actions.fetchSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message: err,
	// 				show: true,
	// 				type: "error",
	// 			})
	// 			.run();
	// 	});
	// });

	describe("Fetch Members", () => {
		let data;
		beforeEach(() => {
			data = { members: mocks.membersData };
		});

		it("logical flow matches pattern for fetch members requests", () => {
			const res = { data };

			testSaga(sagas.fetchMembers)
				.next()
				.call(app.get, "members/all")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMembers(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a season for editing", async () => {
			mockApp.onGet("members/all").reply(200, data);

			return expectSaga(sagas.fetchMembers)
				.dispatch(actions.fetchMembers)
				.withReducer(memberReducer)
				.hasFinalState({
					data: mocks.membersData,
					viewMember: [],
					isLoading: false,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch members.";
			mockApp.onGet("members/all").reply(404, { err });

			return expectSaga(sagas.fetchMembers)
				.dispatch(actions.fetchMembers)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	// describe("Update Season", () => {
	// 	let message;
	// 	let props;
	// 	beforeEach(() => {
	// 		message = "Successfully updated the season!";
	// 		props = mocks.newSeason;
	// 	});

	// 	it("logical flow matches pattern for update season requests", () => {
	// 		const res = { data: { message } };

	// 		testSaga(sagas.updateSeason, { props })
	// 			.next()
	// 			.call(app.put, "season/update", { ...props })
	// 			.next(res)
	// 			.call(parseMessage, res)
	// 			.next(res.data.message)
	// 			.put(setServerMessage({ type: "success", message: res.data.message }))
	// 			.next()
	// 			.put(push("/employee/seasons/viewall"))
	// 			.next()
	// 			.isDone();
	// 	});

	// 	it("successfully updates a season", async () => {
	// 		mockApp.onPut("season/update").reply(200, { message });

	// 		return expectSaga(sagas.updateSeason, { props })
	// 			.dispatch(actions.updateSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message,
	// 				show: true,
	// 				type: "success",
	// 			})
	// 			.run();
	// 	});

	// 	it("if API call fails, it displays a message", async () => {
	// 		const err = "Unable to delete the season.";
	// 		mockApp.onPut("season/update").reply(404, { err });

	// 		return expectSaga(sagas.updateSeason, { seasonId })
	// 			.dispatch(actions.updateSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message: err,
	// 				show: true,
	// 				type: "error",
	// 			})
	// 			.run();
	// 	});
	// });
});
