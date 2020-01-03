import { fromJS } from 'immutable'
import * as types from './ProfileConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	profile_list: {
 		loading: false,
 		data: []
	 } ,
	 edit_profile: {
		loading: false,
		data: []
	},
	change_pass: {
		loading: false,
		data: []
	}     
})

export default function ProfileReducer(state = InitialState, action) {
	switch (action.type) {
		case types.GET_PROFILE: {
			return state.setIn(['profile_list', 'loading'], true)
		}
		case types.GET_PROFILE_FAILED: {
			return state.setIn(['profile_list', 'loading'], false)
		}
		case types.GET_PROFILE_SUCCESS: {
			let { data } = action.payload
			console.log(fromJS(action.payload))
			console.log(action.payload)
			// alert(action.payload.FLRatings)
			return state.setIn(['profile_list', 'loading'], false)
						.setIn(['profile_list', 'data'], action.payload)

			// return state.setIn(['project_list', 'loading'], false)
			// 			.setIn(['project_list', 'data'], fromJS(action.payload))
		}
		case types.EDIT_PROFILE: {
			return state.setIn(['edit_profile', 'loading'], true)
		}
		case types.EDIT_PROFILE_FAILED: {
			return state.setIn(['edit_profile', 'loading'], false)
		}
		case types.EDIT_PROFILE_SUCCESS: {
			return state.setIn(['edit_profile', 'loading'], false)
						.setIn(['edit_profile', 'data'], action.payload)
		}
		case types.CHANGE_PASS: {
			return state.setIn(['change_pass', 'loading'], true)
		}
		case types.CHANGE_PASS_FAILED: {
			return state.setIn(['change_pass', 'loading'], false)
		}
		case types.CHANGE_PASS_SUCCESS: {
			return state.setIn(['change_pass', 'loading'], false)
						.setIn(['change_pass', 'data'], action.payload)
		}
		default:
			return state
	}
}
