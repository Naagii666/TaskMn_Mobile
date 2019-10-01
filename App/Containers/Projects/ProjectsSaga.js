import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './ProjectsConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
function* getAllProjects() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/project/projectView`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_ALL_PROJECTS_FAILED
			})
		}

		return yield put({
			type: types.GET_ALL_PROJECTS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_ALL_PROJECTS_FAILED
		})
	}
	
	
	// yield put({
	//   	type: types.GET_MY_COMMENTS_SUCCESS,
	//   	payload: {
	//   		comments
	//   	}
	// })
}

function* watchGetAllProjects() {
  yield takeEvery(types.GET_ALL_PROJECTS, getAllProjects)
}

export default function *root() {
  yield all([
    fork(watchGetAllProjects)
  ])
}