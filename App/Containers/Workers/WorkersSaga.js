import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './WorkersConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
function* getAllWorkers() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/Account/getUsers`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_ALL_WORKERS_FAILED
			})
		}

		return yield put({
			type: types.GET_ALL_WORKERS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_ALL_WORKERS_FAILED
		})
	}
	
	
	// yield put({
	//   	type: types.GET_MY_COMMENTS_SUCCESS,
	//   	payload: {
	//   		comments
	//   	}
	// })
}

function* watchGetAllWorkers() {
  yield takeEvery(types.GET_ALL_WORKERS, getAllWorkers)
}

export default function *root() {
  yield all([
    fork(watchGetAllWorkers)
  ])
}