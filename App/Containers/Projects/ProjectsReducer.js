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
		default:
			return state
	}
}
