import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './ChatConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { Alert } from 'react-native'

function* getChat() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/Account/getChats`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_CHAT_FAILED
			})
		}

		return yield put({
			type: types.GET_CHAT_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_CHAT_FAILED
		})
	}
}

function* watchGetChat() {
  yield takeEvery(types.GET_CHAT, getChat)
}


export default function *root() {
  yield all([
	fork(watchGetChat),
  ])
}