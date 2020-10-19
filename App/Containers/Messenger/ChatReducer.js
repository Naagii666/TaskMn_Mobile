import { fromJS } from 'immutable'
import * as types from './ChatConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	chat_list: {
 		loading: false,
 		data: []
	 } ,   
})

export default function ChatReducer(state = InitialState, action) {
	switch (action.type) {
		case types.GET_CHAT: {
			return state.setIn(['chat_list', 'loading'], true)
		}
		case types.GET_CHAT_FAILED: {
			return state.setIn(['chat_list', 'loading'], false)
		}
		case types.GET_CHAT_SUCCESS: {
			return state.setIn(['chat_list', 'loading'], false)
						.setIn(['chat_list', 'data'], action.payload)
		}
		default:
			return state
	}
}
