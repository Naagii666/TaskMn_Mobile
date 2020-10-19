import * as types from './ProjectsConstant'

export function getAllProjects() { return { type: types.GET_ALL_PROJECTS }}
export function getUserProjects() { return { type: types.GET_USER_PROJECTS }}

export function getMilestones(payload) { return { type: types.GET_MILESTONES ,payload }}
export function onDeleteTask(payload , payload2) { return { type: types.ON_DELETE_TASK , payload , payload2 }}
export function onAddTask(payload) { return { type: types.ON_ADD_TASK , payload }}
export function onApplyTask(payload , payload2) { return { type: types.ON_APPLY_TASK , payload , payload2 }}
export function onApplyFinish(payload) { return { type: types.ON_APPLY_FINISH , payload }}

export function onComfirmTask(payload , payload2) { return { type: types.ON_COMFIRM_TASK , payload , payload2 }}
export function onComfirmFinish(payload) { return { type: types.ON_COMFIRM_FINISH , payload }}


export function addProject(payload) { return { type: types.ADD_PROJECT , payload}}

export function getProgressProjects() { return { type: types.GET_PROGRESS_PROJECTS }}


export function getContract(payload) { return { type: types.GET_CONTRACT , payload}}
export function getBidListHire() { return { type: types.GET_BID_LIST_HIRE }}
export function getBidListLancer() { return { type: types.GET_BID_LIST_LANCER }}


export function onCancelContract(payload) { return { type: types.ON_CANCEL_CONTRACT , payload }}
export function onComfirmContract(payload , payload2) { return { type: types.ON_CONFIRM_CONTRACT , payload , payload2}}

export function onBidProject(payload) { return { type: types.ON_BID_PROJECT , payload }}
export function onDeleteBid(payload) { return { type: types.ON_DELETE_BID , payload }}
export function onDeleteProject(payload) { return { type: types.ON_DELETE_PROJECT , payload }}
export function onChooseBid(payload) { return { type: types.ON_CHOOSE_BID , payload }}

export function onCheckPayment(payload) { return { type: types.ON_CHECK_PAYMENT , payload }}
export function onSubmitPayment(payload , payload2) { return { type: types.ON_SUBMIT_PAYMENT , payload ,payload2}}

