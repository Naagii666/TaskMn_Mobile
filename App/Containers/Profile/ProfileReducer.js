import { fromJS } from 'immutable'
import * as types from './ProfileConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	profile_list: {
 		loading: false,
 		data: []
	 } ,
	change_pass: {
		loading: false,
		data: []
	} , 
	balance: {
		loading: false,
		data: []
	}  ,
	comments: {
		loading: false,
		data: []
	},
	add_comment: {
		loading: false,
		data: []
	}, 
	current_comment: {
		fetching: false,
	},
	skill_list: {
		loading: false,
		data: []
	}, 
	// add_skill: {
	// 	loading: false,
	// 	data: []
	// }, 
	// delete_skill: {
	// 	loading: false,
	// 	data: []
	// }, 
	transaction_list:{
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
		case types.GET_TRANSACTION: {
			return state.setIn(['transaction_list', 'loading'], true)
		}
		case types.GET_TRANSACTION_FAILED: {
			return state.setIn(['transaction_list', 'loading'], false)
		}
		case types.GET_TRANSACTION_SUCCESS: {
			let { data } = fromJS(action.payload)

			return state.setIn(['transaction_list', 'loading'], false)
						.setIn(['transaction_list', 'data'], data)
		}

		case types.EDIT_PROFILE: {
			return state.setIn(['profile_list', 'loading'], true)
		}
		case types.EDIT_PROFILE_FAILED: {
			return state.setIn(['profile_list', 'loading'], false)
		}
		case types.EDIT_PROFILE_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['profile_list', 'loading'], false)
						.setIn(['profile_list', 'data'], action.payload)
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
		case types.GET_BALANCE: {
			return state.setIn(['balance', 'loading'], true)
		}
		case types.GET_BALANCE_FAILED: {
			return state.setIn(['balance', 'loading'], false)
		}
		case types.GET_BALANCE_SUCCESS: {
			// alert(action.payload)
			return state.setIn(['balance', 'loading'], false)
						.setIn(['balance', 'data'], action.payload)
		}
		case types.GET_COMMENTS: {
			return state.setIn(['comments', 'loading'], true)
		}
		case types.GET_COMMENTS_FAILED: {
			return state.setIn(['comments', 'loading'], false)
		}
		case types.GET_COMMENTS_SUCCESS: {
			// alert(action.payload)
			return state.setIn(['comments', 'loading'], false)
						.setIn(['comments', 'data'], action.payload)
		}
		case types.ON_ADD_COMMENT:
			return state.setIn(['comments', 'loading'], true)
		case types.ON_ADD_COMMENT_FAILED:
			return state.setIn(['comments', 'loading'], false)
		case types.ON_ADD_COMMENT_SUCCESS: {
			// let { Text } = action.payload
			// let add_comment = state.getIn(['add_comment', 'data'])
			// add_comment = add_comment.push(fromJS(Text))
			return state.setIn(['comments', 'loading'], false)
						.setIn(['comments', 'data'], action.payload)
		}
		case types.ON_ADD_SKILL:
			return state.setIn(['skill_list', 'loading'], true)
		case types.ON_ADD_SKILL_FAILED:
			return state.setIn(['skill_list', 'loading'], false)
		case types.ON_ADD_SKILL_SUCCESS: {
			return state.setIn(['skill_list', 'loading'], false)
						.setIn(['skill_list', 'data'], action.payload)
		}
		case types.ON_DELETE_SKILL:
			return state.setIn(['skill_list', 'loading'], true)
		case types.ON_DELETE_SKILL_FAILED:
			return state.setIn(['skill_list', 'loading'], false)
		case types.ON_DELETE_SKILL_SUCCESS: {
			return state.setIn(['skill_list', 'loading'], false)
						.setIn(['skill_list', 'data'], action.payload)
		}
		case types.GET_USER_SKILLS: {
			return state.setIn(['skill_list', 'loading'], true)
		}
		case types.GET_USER_SKILLS_FAILED: {
			return state.setIn(['skill_list', 'loading'], false)
		}
		case types.GET_USER_SKILLS_SUCCESS: {
			return state.setIn(['skill_list', 'loading'], false)
						.setIn(['skill_list', 'data'], action.payload)
		}

		default:
			return state
	}
}
