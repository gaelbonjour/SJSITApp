/* istanbul ignore file */
import {
	FaClock,
	FaFileSignature,
	FaCogs,
	FaCalendarAlt,
	FaCalendarPlus,
	FaUsers,
	FaEnvelope,
	FaMailBulk,
	FaQuestionCircle,
	FaConciergeBell,
	FaUserPlus,
	FaUserFriends,
	FaListAlt,
	FaKey,
} from "react-icons/fa";
import { MdEvent, MdNoteAdd, MdEventNote, MdDashboard } from "react-icons/md";
import { GoCalendar } from "react-icons/go";

export default [
	{ component: MdDashboard, key: "dashboard", tab: "dashboard" },
	{
		component: MdEvent,
		key: "events",
		tab: "events",
		submenu: [
			{ key: "events/create", component: MdNoteAdd, tab: "Create Event" },
			{ key: "events/viewall", component: MdEventNote, tab: "View Events" },
		],
	},
	{
		component: FaFileSignature,
		key: "forms",
		tab: "forms",
		submenu: [
			{ key: "forms/create", component: MdNoteAdd, tab: "Create Form" },
			{ key: "forms/viewall", component: FaListAlt, tab: "View Forms" },
		],
	},
	{
		component: FaUserFriends,
		key: "members",
		tab: "members",
		submenu: [
			{ key: "members/create", component: FaUserPlus, tab: "Create Member" },
			{
				key: "members/authorizations/viewall",
				component: FaKey,
				tab: "View Authorizations",
			},
			{ key: "members/viewall", component: FaUsers, tab: "View Members" },
		],
	},
	{ component: FaClock, key: "schedule", tab: "schedule" },
	{
		component: FaCalendarAlt,
		key: "seasons",
		tab: "seasons",
		submenu: [
			{
				key: "seasons/create",
				component: FaCalendarPlus,
				tab: "Create Season",
			},
			{ key: "seasons/viewall", component: GoCalendar, tab: "View Seasons" },
		],
	},
	{
		component: FaEnvelope,
		key: "templates",
		tab: "templates",
		submenu: [
			{ key: "templates/create", component: MdNoteAdd, tab: "Create Template" },
			{
				key: "templates/viewall",
				component: FaMailBulk,
				tab: "View Templates",
			},
		],
	},
	{ divider: true, key: "accounting" },
	{ component: FaCogs, key: "settings", tab: "settings" },
	{ component: FaQuestionCircle, key: "help", tab: "help" },
	{ component: FaConciergeBell, key: "contact", tab: "contact us" },
];