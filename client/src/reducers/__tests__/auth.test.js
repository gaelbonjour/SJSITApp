import * as types from "types";
import authReducer, { initialState } from "reducers/Auth";
import * as mocks from "reducers/__mocks__/reducers.mocks";

describe("Auth Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(authReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("updates a signed in user", () => {
		const state = authReducer(undefined, {
			type: types.USER_UPDATE,
			payload: { ...mocks.userSession, firstName: "Alan" },
		});
		expect(state).toEqual({ ...mocks.userSession, firstName: "Alan" });
	});

	it("stores a signed in user", () => {
		const state = authReducer(undefined, {
			type: types.USER_SIGNIN,
			payload: mocks.userSession,
		});
		expect(state).toEqual(mocks.userSession);
	});

	it("removes a signed in user", () => {
		let state = authReducer(undefined, {
			type: types.USER_SIGNIN,
			payload: mocks.userSession,
		});
		expect(state).toEqual(mocks.userSession);

		state = authReducer(state, { type: types.USER_SIGNOUT });

		expect(state).toEqual(initialState);
	});
});
