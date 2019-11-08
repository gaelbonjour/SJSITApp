/* istanbul ignore file */
export default [
	{
		name: "sendTo",
		type: "transfer",
		label: "Send To",
		tooltip:
			"Select and transfer one or multiple members from the left box to the right box to include them on the mailing list.",
		value: [],
		errors: "",
		required: true,
		disabled: true,
		dataSource: [],
		showSearch: true,
		listStyle: {
			width: 277,
			height: 300,
		},
		rowKey: record => record.email,
		render: item => item.email.replace(/ <.*?>/g, ""),
	},
	{
		name: "sendFrom",
		type: "text",
		label: "Send From",
		placeholder: "An email address to send from...",
		tooltip:
			"Include your own email if you wish to override the default below. You can also include a custom email title by following this same pattern: First Last <email@example.com>",
		icon: "id",
		value: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
		errors: "",
		required: true,
		disabled: true,
	},
	{
		type: "date",
		name: "sendDate",
		label: "Send Date",
		placeholder: "*Optional* Select a send date and time to send this email...",
		tooltip:
			"Select a date and time below if you wish to send this email at a later date.",
		value: null,
		errors: "",
		required: false,
		disabled: true,
		format: "MM/DD/YYYY",
		style: { width: "100%" },
	},
	{
		name: "subject",
		type: "text",
		label: "Subject",
		icon: "mail",
		value: "",
		errors: "",
		placeholder: "The subject of the email...",
		required: true,
		disabled: true,
	},
	{
		name: "message",
		type: "editor",
		label: "Message",
		value: "",
		errors: "",
		placeholder: "Type a message...",
		tooltip:
			"The message created below will make up the body of a pre-defined email template. That said, you can still copy/paste, and/or create stylized and formatted text and links within the body.",
		required: true,
		disabled: true,
	},
];
