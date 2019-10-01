import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './ProfileConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
function* getProfile() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/Account/getProfile`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_PROFILE_FAILED
			})
		}

		return yield put({
			type: types.GET_PROFILE_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_PROFILE_FAILED
		})
	}
	
	
	// yield put({
	//   	type: types.GET_MY_COMMENTS_SUCCESS,
	//   	payload: {
	//   		comments
	//   	}
	// })
}

function* watchGetProfile() {
  yield takeEvery(types.GET_PROFILE, getProfile)
}

export default function *root() {
  yield all([
    fork(watchGetProfile)
  ])
}