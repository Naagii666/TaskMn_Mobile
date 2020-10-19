import { fromJS } from 'immutable'
import * as types from './ProjectsConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	project_list: {
 		loading: false,
 		data: []
	 },
	user_projects: {
		loading: false,
		data: [],
	},
	progress_projects: {
		loading: false,
		data: [],
	},
	bid_project: {
		loading: false,
		data: []
	},
	bid_list_hire: {
		loading: false,
		data: []
	},
	bid_list_lancer: {
		loading: false,
		data: []
	},
	on_delete_project: {
		loading: false,
		data: []
	},
	on_choose_bid: {
		loading: false,
		data: []
	},
	milestone_list: {
		loading: false,
		data: []
	},
	contract_list: {
		loading: false,
		data: []
	},
	apply_list: {
		loading: false,
	},
	payment_data: {
		loading: false,
		data: []
	},
	check_payment: {
		loading: false,
		data: []
	}
})

export default function ProjectsReducer(state = InitialState, action) {
	switch (action.type) {
		case types.GET_ALL_PROJECTS: {
			return state.setIn(['project_list', 'loading'], true)
		}
		case types.GET_ALL_PROJECTS_FAILED: {
			return state.setIn(['project_list', 'loading'], false)
		}
		case types.GET_ALL_PROJECTS_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['project_list', 'loading'], false)
						.setIn(['project_list', 'data'], action.payload)

			// return state.setIn(['project_list', 'loading'], false)
			// 			.setIn(['project_list', 'data'], fromJS(action.payload))
		}
		case types.GET_USER_PROJECTS:
			return state.setIn(['user_projects', 'loading'], true)
		case types.GET_USER_PROJECTS_FAILED:
			return state.setIn(['user_projects', 'loading'], false)
		case types.GET_USER_PROJECTS_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['user_projects', 'loading'], false)
						.setIn(['user_projects', 'data'], action.payload)
		}
		case types.ON_COMFIRM_FINISH:
			return state.setIn(['user_projects', 'loading'], true)
		case types.ON_COMFIRM_FINISH_FAILED:
			return state.setIn(['user_projects', 'loading'], false)
		case types.ON_COMFIRM_FINISH_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['user_projects', 'loading'], false)
						.setIn(['user_projects', 'data'], action.payload)
		}
		case types.ADD_PROJECT:
			return state.setIn(['user_projects', 'loading'], true)
		case types.ADD_PROJECT_FAILED:
			return state.setIn(['user_projects', 'loading'], false)
		case types.ADD_PROJECT_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['user_projects', 'loading'], false)
						.setIn(['user_projects', 'data'], action.payload)
		}
		case types.ON_DELETE_PROJECT:
			return state.setIn(['user_projects', 'loading'], true)
		case types.ON_DELETE_PROJECT_FAILED:
			return state.setIn(['user_projects', 'loading'], false)
		case types.ON_DELETE_PROJECT_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['user_projects', 'loading'], false)
						.setIn(['user_projects', 'data'], action.payload)
		}
		case types.GET_PROGRESS_PROJECTS:
			return state.setIn(['progress_projects', 'loading'], true)
		case types.GET_PROGRESS_PROJECTS_FAILED:
			return state.setIn(['progress_projects', 'loading'], false)
		case types.GET_PROGRESS_PROJECTS_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['progress_projects', 'loading'], false)
						.setIn(['progress_projects', 'data'], action.payload)
		}
		case types.GET_MILESTONES:
			return state.setIn(['milestone_list', 'loading'], true)
		case types.GET_MILESTONES_FAILED:
			return state.setIn(['milestone_list', 'loading'], false)
		case types.GET_MILESTONES_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['milestone_list', 'loading'], false)
						.setIn(['milestone_list', 'data'], action.payload)
		}
		case types.ON_APPLY_TASK:
			return state.setIn(['milestone_list', 'loading'], true)
		case types.ON_APPLY_TASK_FAILED:
			return state.setIn(['milestone_list', 'loading'], false)
		case types.ON_APPLY_TASK_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['milestone_list', 'loading'], false)
						.setIn(['milestone_list', 'data'], action.payload)
		}
		case types.ON_COMFIRM_TASK:
			return state.setIn(['milestone_list', 'loading'], true)
		case types.ON_COMFIRM_TASK_FAILED:
			return state.setIn(['milestone_list', 'loading'], false)
		case types.ON_COMFIRM_TASK_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['milestone_list', 'loading'], false)
						.setIn(['milestone_list', 'data'], action.payload)
		}
		case types.ON_APPLY_FINISH:
			return state.setIn(['apply_list', 'loading'], true)
		case types.ON_APPLY_FINISH_FAILED:
			return state.setIn(['apply_list', 'loading'], false)
		case types.ON_APPLY_FINISH_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['apply_list', 'loading'], false)
						// .setIn(['milestone_list', 'data'], action.payload)
		}
		case types.GET_CONTRACT:
			return state.setIn(['contract_list', 'loading'], true)
		case types.GET_CONTRACT_FAILED:
			return state.setIn(['contract_list', 'loading'], false)
		case types.GET_CONTRACT_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['contract_list', 'loading'], false)
						.setIn(['contract_list', 'data'], action.payload)
		}
		case types.ON_ADD_TASK:
			return state.setIn(['milestone_list', 'loading'], true)
		case types.ON_ADD_TASK_FAILED:
			return state.setIn(['milestone_list', 'loading'], false)
		case types.ON_ADD_TASK_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['milestone_list', 'loading'], false)
						.setIn(['milestone_list', 'data'], action.payload)
		}
		case types.ON_DELETE_TASK:
			return state.setIn(['milestone_list', 'loading'], true)
		case types.ON_DELETE_TASK_FAILED:
			return state.setIn(['milestone_list', 'loading'], false)
		case types.ON_DELETE_TASK_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['milestone_list', 'loading'], false)
						.setIn(['milestone_list', 'data'], action.payload)
		}
		case types.ON_BID_PROJECT:
			return state.setIn(['bid_project', 'loading'], true)
		case types.ON_BID_PROJECT_FAILED:
			return state.setIn(['bid_project', 'loading'], false)
		case types.ON_BID_PROJECT_SUCCESS: {
			return state.setIn(['bid_project', 'loading'], false)
						// .setIn(['bid_project', 'data'], action.payload)
		}
		case types.GET_BID_LIST_HIRE: {
			return state.setIn(['bid_list_hire', 'loading'], true)
		}
		case types.GET_BID_LIST_HIRE_FAILED: {
			return state.setIn(['bid_list_hire', 'loading'], false)
		}
		case types.GET_BID_LIST_HIRE_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['bid_list_hire', 'loading'], false)
						.setIn(['bid_list_hire', 'data'], action.payload)

			// return state.setIn(['project_list', 'loading'], false)
			// 			.setIn(['project_list', 'data'], fromJS(action.payload))
		}
		case types.GET_BID_LIST_LANCER: {
			return state.setIn(['bid_list_lancer', 'loading'], true)
		}
		case types.GET_BID_LIST_LANCER_FAILED: {
			return state.setIn(['bid_list_lancer', 'loading'], false)
		}
		case types.GET_BID_LIST_LANCER_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['bid_list_lancer', 'loading'], false)
						.setIn(['bid_list_lancer', 'data'], action.payload)
		}
		case types.ON_DELETE_BID: {
			return state.setIn(['bid_list_lancer', 'loading'], true)
		}
		case types.ON_DELETE_BID_FAILED: {
			return state.setIn(['bid_list_lancer', 'loading'], false)
		}
		case types.ON_DELETE_BID_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['bid_list_lancer', 'loading'], false)
						.setIn(['bid_list_lancer', 'data'], action.payload)
		}
		case types.ON_CANCEL_CONTRACT: {
			return state.setIn(['bid_list_lancer', 'loading'], true)
		}
		case types.ON_CANCEL_CONTRACT_FAILED: {
			return state.setIn(['bid_list_lancer', 'loading'], false)
		}
		case types.ON_CANCEL_CONTRACT_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['bid_list_lancer', 'loading'], false)
						.setIn(['bid_list_lancer', 'data'], action.payload)
		}
		case types.ON_CONFIRM_CONTRACT: {
			return state.setIn(['bid_list_lancer', 'loading'], true)
		}
		case types.ON_CONFIRM_CONTRACT_FAILED: {
			return state.setIn(['bid_list_lancer', 'loading'], false)
		}
		case types.ON_CONFIRM_CONTRACT_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['bid_list_lancer', 'loading'], false)
						.setIn(['bid_list_lancer', 'data'], action.payload)
		}
		case types.ON_CHOOSE_BID: {
			return state.setIn(['bid_list_hire', 'loading'], true)
		}
		case types.ON_CHOOSE_BID_FAILED: {
			return state.setIn(['bid_list_hire', 'loading'], false)
		}
		case types.ON_CHOOSE_BID_SUCCESS: {
			return state.setIn(['bid_list_hire', 'loading'], false)
						.setIn(['bid_list_hire', 'data'], action.payload)
		}
		case types.ON_CHECK_PAYMENT: {
			return state.setIn(['check_payment', 'loading'], true)
		}
		case types.ON_CHECK_PAYMENT_FAILED: {
			return state.setIn(['check_payment', 'loading'], false)
		}
		case types.ON_CHECK_PAYMENT_SUCCESS: {
			// alert(action.payload)
			return state.setIn(['check_payment', 'loading'], false)
						.setIn(['check_payment', 'data'], action.payload)
		}
		case types.ON_SUBMIT_PAYMENT: {
			return state.setIn(['check_payment', 'loading'], true)
		}
		case types.ON_SUBMIT_PAYMENT_FAILED: {
			return state.setIn(['check_payment', 'loading'], false)
		}
		case types.ON_SUBMIT_PAYMENT_SUCCESS: {
			return state.setIn(['check_payment', 'loading'], false)
						.setIn(['check_payment', 'data'], action.payload)
		}
		default:
			return state
	}
}
