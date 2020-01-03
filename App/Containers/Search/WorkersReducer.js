import { fromJS } from 'immutable'
import * as types from './WorkersConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	workers_list: {
 		loading: false,
 		data: []
	 }  ,
	 project_list: {
		loading: false,
		data: []
	},
	bid_project: {
		loading: false,
		data: []
	},
})

export default function WorkersReducer(state = InitialState, action) {
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
		case types.ON_BID_PROJECT:
			return state.setIn(['bid_project', 'loading'], true)
		case types.ON_BID_PROJECT_FAILED:
			return state.setIn(['bid_project', 'loading'], false)
		case types.ON_BID_PROJECT_SUCCESS: {
			return state.setIn(['bid_project', 'loading'], false)
						// .setIn(['bid_project', 'data'], action.payload)
		}
		case types.GET_ALL_WORKERS: {
			return state.setIn(['workers_list', 'loading'], true)
		}
		case types.GET_ALL_WORKERS_FAILED: {
			return state.setIn(['workers_list', 'loading'], false)
		}
		case types.GET_ALL_WORKERS_SUCCESS: {
			let { data } = action.payload
			console.log(fromJS(action.payload))
			console.log(action.payload)
			return state.setIn(['workers_list', 'loading'], false)
						.setIn(['workers_list', 'data'], action.payload)

			// return state.setIn(['project_list', 'loading'], false)
			// 			.setIn(['project_list', 'data'], fromJS(action.payload))
		}
		default:
			return state
	}
}
