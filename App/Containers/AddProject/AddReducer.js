import { fromJS } from 'immutable'
import * as types from './AddConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	// project_list: {
 	// 	loading: false,
 	// 	// data: []
	//  } ,
	//  current_project: {
	// 	fetching: false,
	// } ,
 	types_list: {
		loading: false,
		data: []
	}  
})

export default function AddReducer(state = InitialState, action) {
	switch (action.type) {
		
		// case types.ADD_PROJECT:
		// 	return state.setIn(['project_list', 'loading'], true)
		// case types.ADD_PROJECT_FAILED:
		// 	return state.setIn(['project_list', 'loading'], false)
		// case types.ADD_PROJECT_SUCCESS: {
		// 	return state.setIn(['project_list', 'loading'], false)
		// 				.setIn(['project_list', 'data'],  action.payload)
		// }
		case types.GET_PROJECT_TYPES: {
			return state.setIn(['types_list', 'loading'], true)
		}
		case types.GET_PROJECT_TYPES_FAILED: {
			return state.setIn(['types_list', 'loading'], false)
		}
		case types.GET_PROJECT_TYPES_SUCCESS: {
			let { data } = action.payload
			console.log(fromJS(action.payload))
			console.log(action.payload)
			return state.setIn(['types_list', 'loading'], false)
						.setIn(['types_list', 'data'], action.payload)

			// return state.setIn(['project_list', 'loading'], false)
			// 			.setIn(['project_list', 'data'], fromJS(action.payload))
		}
		default:
			return state
	}
}
