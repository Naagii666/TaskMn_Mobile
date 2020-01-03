import * as types from './ProjectsConstant'

export function getAllProjects() { return { type: types.GET_ALL_PROJECTS }}
export function getUserProjects() { return { type: types.GET_USER_PROJECTS }}
export function getMilestones(payload) { return { type: types.GET_MILESTONES ,payload }}
export function getProgressProjects() { return { type: types.GET_PROGRESS_PROJECTS }}
export function getBidListHire() { return { type: types.GET_BID_LIST_HIRE }}
export function getBidListLancer() { return { type: types.GET_BID_LIST_LANCER }}
export function onBidProject(payload) { return { type: types.ON_BID_PROJECT , payload }}
export function onDeleteProject(payload) { return { type: types.ON_DELETE_PROJECT , payload }}
export function onChooseBid(payload) { return { type: types.ON_CHOOSE_BID , payload }}
