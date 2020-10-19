import * as types from './ProfileConstant'

export function getProfile() { return { type: types.GET_PROFILE }}
export function getBalance() { return { type: types.GET_BALANCE }}
export function getComments() { return { type: types.GET_COMMENTS }}
export function getUserSkills() { return { type: types.GET_USER_SKILLS }}
export function getTransaction() { return { type: types.GET_TRANSACTION }}

export function editProfile(payload) { return { type: types.EDIT_PROFILE , payload }}
export function changePass(payload) { return { type: types.CHANGE_PASS , payload }}
export function onAddComment(payload) { return { type: types.ON_ADD_COMMENT, payload}}
export function onAddSkill(payload) { return { type: types.ON_ADD_SKILL, payload}}
export function onDeleteSkill(payload) { return { type: types.ON_DELETE_SKILL, payload}}