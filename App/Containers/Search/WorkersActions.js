import * as types from './WorkersConstant'

export function getAllProjects() { return { type: types.GET_ALL_PROJECTS }}
export function getAllWorkers() { return { type: types.GET_ALL_WORKERS }}
export function getWorkerComments(payload) { return { type: types.GET_WORKER_COMMENTS , payload}}
export function getWorkerSkills(payload) { return { type: types.GET_WORKER_SKILLS , payload}}
export function onBidProject(payload) { return { type: types.ON_BID_PROJECT , payload }}
export function onAddComment(payload) { return { type: types.ON_ADD_COMMENT2, payload}}