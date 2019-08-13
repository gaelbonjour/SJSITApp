import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new member.
 *
 * @function createMember
 * @param {object} props - props contain seasonId, role and authorized email fields.
 * @returns {object}
 */
export const createMember = props => ({
	type: types.MEMBERS_CREATE,
	props,
});

/**
 * Deletes a new member.
 *
 * @function deleteMember
 * @param {string} memberId
 * @returns {object}
 */
export const deleteMember = memberId => ({
	type: types.MEMBERS_DELETE,
	memberId,
});

/**
 * Deletes a new member.
 *
 * @function deleteToken
 * @param {string} tokenId
 * @returns {object}
 */
export const deleteToken = tokenId => ({
	type: types.MEMBERS_DELETE_TOKEN,
	tokenId,
});

/**
 * Fetches a single member.
 *
 * @function fetchMember
 * @param {string} memberId
 * @returns {object}
 */
export const fetchMember = memberId => ({
	type: types.MEMBERS_REVIEW,
	memberId,
});

/**
 * Fetches all members.
 *
 * @function fetchMembers
 * @returns {object}
 */
export const fetchMembers = () => ({
	type: types.MEMBERS_FETCH,
});

/**
 * Fetches a single token for editing.
 *
 * @function fetchToken
 * @param {string} tokenId
 * @returns {object}
 */
export const fetchToken = tokenId => ({
	type: types.MEMBERS_FETCH_TOKEN,
	tokenId,
});

/**
 * Fetches all tokens.
 *
 * @function fetchTokens
 * @returns {object}
 */
export const fetchTokens = () => ({
	type: types.MEMBERS_FETCH_TOKENS,
});

/**
 * Sets any members from API to redux state
 *
 * @function setMembers
 * @param {object} data - contains member data ([id, memberId, members, startDate, endDate]).
 * @returns {object}
 */
export const setMembers = data => ({
	type: types.MEMBERS_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single member to redux state for reviewing.
 *
 * @function setMemberToReview
 * @param {object} data - memberId and member duration fields
 * @returns {object}
 */
export const setMemberToReview = data => ({
	type: types.MEMBERS_SET_REVIEW,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets token from API to redux state.
 *
 * @function setToken
 * @param {object} data - contains token data ([id, authorizedEmail, role, seasonId, token]).
 * @returns {object}
 */
export const setToken = data => ({
	type: types.MEMBERS_SET_TOKEN,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets all tokens from API to redux state.
 *
 * @function setTokens
 * @param {object} data - contains token data ([id, authorizedEmail, role, seasonId, token]).
 * @returns {object}
 */
export const setTokens = data => ({
	type: types.MEMBERS_SET_TOKENS,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Updates a single member.
 *
 * @function updateMember
 * @param {object} data - id, email, firstName, lastName and role.
 * @returns {object}
 */
export const updateMember = props => ({
	type: types.MEMBERS_UPDATE,
	props,
});

/**
 * Updates a single member status.
 *
 * @function updateMemberStatus
 * @param {object} props - contains id and status.
 * @returns {object}
 */
export const updateMemberStatus = props => ({
	type: types.MEMBERS_UPDATE_STATUS,
	props,
});

/**
 * Updates a single member status.
 *
 * @function updateMemberToken
 * @param {object} props - contains id, seasonId, role and authorizedEmail.
 * @returns {object}
 */
export const updateMemberToken = props => ({
	type: types.MEMBERS_UPDATE_TOKEN,
	props,
});