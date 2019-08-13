import * as types from "types";
import * as actions from "actions/Members";

const tokenId = "0123456789";

const data = {
	_id: "1234567890",
	firstName: "Beta",
	lastName: "Tester",
	role: "member",
	email: "member@example.com",
	registered: "2000-10-06T07:00:00.000+00:00",
	events: 0,
};

const token = {
	id: "1234567890",
	authorizedEmail: "test@test.com",
	role: "employee",
	seasonId: "20002001",
	token: "0123456789",
};

const membersData = { members: [data] };

const memberData = { member: [data] };

const tokensData = { tokens: [token] };
const tokenData = { token: [token] };

const memberId = "1234567890";
describe("Member Actions", () => {
	it("returns MEMBERS_CREATE with props", () => {
		const props = {
			seasonId: "1234",
			role: "employee",
			authorizedEmail: "test@test.com",
		};

		const value = actions.createMember(props);

		expect(value).toEqual({
			type: types.MEMBERS_CREATE,
			props,
		});
	});

	it("returns MEMBERS_DELETE with a memberId", () => {
		const value = actions.deleteMember(memberId);

		expect(value).toEqual({
			type: types.MEMBERS_DELETE,
			memberId,
		});
	});

	it("returns MEMBERS_DELETE_TOKEN with a memberId", () => {
		const value = actions.deleteToken(tokenId);

		expect(value).toEqual({
			type: types.MEMBERS_DELETE_TOKEN,
			tokenId,
		});
	});

	it("returns MEMBERS_REVIEW", () => {
		const value = actions.fetchMember(memberId);

		expect(value).toEqual({
			type: types.MEMBERS_REVIEW,
			memberId,
		});
	});

	it("returns MEMBERS_FETCH", () => {
		const value = actions.fetchMembers();

		expect(value).toEqual({
			type: types.MEMBERS_FETCH,
		});
	});

	it("returns MEMBERS_FETCH_TOKEN", () => {
		const value = actions.fetchToken(tokenId);

		expect(value).toEqual({
			type: types.MEMBERS_FETCH_TOKEN,
			tokenId,
		});
	});

	it("returns MEMBERS_FETCH_TOKENS", () => {
		const value = actions.fetchTokens();

		expect(value).toEqual({
			type: types.MEMBERS_FETCH_TOKENS,
		});
	});

	it("returns MEMBERS_SET with an empty array if data is empty", () => {
		const value = actions.setMembers([]);

		expect(value).toEqual({
			type: types.MEMBERS_SET,
			payload: [],
		});
	});

	it("returns MEMBERS_SET with data", () => {
		const value = actions.setMembers(membersData);

		expect(value).toEqual({
			type: types.MEMBERS_SET,
			payload: membersData,
		});
	});

	it("returns MEMBERS_SET_REVIEW with data", () => {
		const value = actions.setMemberToReview(memberData);

		expect(value).toEqual({
			type: types.MEMBERS_SET_REVIEW,
			payload: memberData,
		});
	});

	it("returns MEMBERS_SET_REVIEW with an empty object if data is empty", () => {
		const data = {};

		const value = actions.setMemberToReview(data);

		expect(value).toEqual({
			type: types.MEMBERS_SET_REVIEW,
			payload: {},
		});
	});

	it("returns MEMBERS_SET_TOKEN with an empty object if data is empty", () => {
		const data = {};

		const value = actions.setToken(data);

		expect(value).toEqual({
			type: types.MEMBERS_SET_TOKEN,
			payload: {},
		});
	});

	it("returns MEMBERS_SET_TOKEN with data", () => {
		const value = actions.setToken(tokenData);

		expect(value).toEqual({
			type: types.MEMBERS_SET_TOKEN,
			payload: tokenData,
		});
	});

	it("returns MEMBERS_SET_TOKENS with an empty array if data is empty", () => {
		const data = {};

		const value = actions.setTokens(data);

		expect(value).toEqual({
			type: types.MEMBERS_SET_TOKENS,
			payload: [],
		});
	});

	it("returns MEMBERS_SET_TOKENS with data", () => {
		const value = actions.setTokens(tokensData);

		expect(value).toEqual({
			type: types.MEMBERS_SET_TOKENS,
			payload: tokensData,
		});
	});

	it("returns MEMBERS_UPDATE with props", () => {
		const props = {
			id: "1234567890",
			email: "beta@example.com",
			firstName: "Beta",
			lastName: "Tester",
			role: "member",
		};

		const value = actions.updateMember(props);

		expect(value).toEqual({
			type: types.MEMBERS_UPDATE,
			props,
		});
	});

	it("returns MEMBERS_UPDATE_STATUS with props", () => {
		const props = {
			id: "1234567890",
			status: "active",
		};

		const value = actions.updateMemberStatus(props);

		expect(value).toEqual({
			type: types.MEMBERS_UPDATE_STATUS,
			props,
		});
	});

	it("returns MEMBERS_UPDATE_TOKEN with props", () => {
		const props = {
			id: "0123456789",
			seasonId: "200020001",
			role: "staff",
			authorizedEmail: "test@test.com",
		};

		const value = actions.updateMemberToken(props);

		expect(value).toEqual({
			type: types.MEMBERS_UPDATE_TOKEN,
			props,
		});
	});
});