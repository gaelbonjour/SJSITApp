import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { setServerMessage } from "actions/Messages";
import { setEvents } from "actions/Dashboard";
import { parseData } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to get event for editing.
 *
 * @generator
 * @function selectedEvent
 * @param {string} eventId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEvents({ selectedEvent }) {
	try {
		const res = yield call(app.get, `dashboard/events/${selectedEvent}`);
		const data = yield call(parseData, res);

		yield put(setEvents(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function dashboardSagas
 * @yields {watchers}
 */
export default function* dashboardSagas() {
	yield all([takeLatest(types.DASHBOARD_FETCH_EVENTS, fetchEvents)]);
}