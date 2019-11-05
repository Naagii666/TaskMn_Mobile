import * as types from './ProjectsConstant'

export function getAllProjects() { return { type: types.GET_ALL_PROJECTS }}
export function getUserProjects() { return { type: types.GET_USER_PROJECTS }}