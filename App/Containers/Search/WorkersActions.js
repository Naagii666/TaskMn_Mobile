import * as types from './WorkersConstant'

export function getAllProjects() { return { type: types.GET_ALL_PROJECTS }}
export function getAllWorkers() { return { type: types.GET_ALL_WORKERS }}
export function onBidProject(payload) { return { type: types.ON_BID_PROJECT , payload }}