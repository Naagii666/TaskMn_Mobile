import * as types from './ProfileConstant'

export function getProfile() { return { type: types.GET_PROFILE }}
export function editProfile(payload) { return { type: types.EDIT_PROFILE , payload }}
export function changePass(payload) { return { type: types.CHANGE_PASS , payload }}