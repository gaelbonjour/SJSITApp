/* istanbul ignore file */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { withReduxStateSync } from "redux-state-sync";
import * as types from "types";
import authReducer from "./Auth";
import dashboardReducer from "./Dashboard";
import eventReducer from "./Events";
import formReducer from "./Forms";
import mailReducer from "./Mail";
import memberReducer from "./Members";
import seasonReducer from "./Seasons";
import serverMessageReducer from "./Messages";
import teamsReducer from "./Teams";

const reducers = {
	auth: authReducer,
	dashboard: dashboardReducer,
	events: eventReducer,
	forms: formReducer,
	mail: mailReducer,
	members: memberReducer,
	seasons: seasonReducer,
	server: serverMessageReducer,
	teams: teamsReducer,
};

const appReducer = history =>
	withReduxStateSync(
		combineReducers({ router: connectRouter(history), ...reducers }),
	);

export default history => (state, action) =>
	appReducer(history)(
		action.type === types.USER_SIGNOUT
			? { router: state.router, server: state.server }
			: state,
		action,
	);
