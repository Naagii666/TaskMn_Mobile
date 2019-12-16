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
	}  ,
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

			// return state.setIn(['project_list', 'loading'], false)
			// 			.setIn(['project_list', 'data'], fromJS(action.payload))
		}
		case types.RELEASE_DATA: {
			return state.setIn(['project_list', 'data'],null)
			.setIn(['user_projects', 'data'],null)
			.setIn(['bid_project', 'data'],null)
			.setIn(['bid_list_lancer', 'data'], null)
		}
		default:
			return state
	}
}
