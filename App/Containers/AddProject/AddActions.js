import * as types from './AddConstant'

export function addProject(payload) { return { type: types.ADD_PROJECT , payload}}
export function getProjectTypes() { return { type: types.GET_PROJECT_TYPES}}