import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './ProfileConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
import { Alert } from 'react-native'
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
}
function* editProfile({payload}) {
	try {

		// alert(payload.Description)
		var formData = new FormData();
		formData.append('FirstName', payload.FirstName)
		formData.append('LastName', payload.LastName)
		formData.append('UserName', payload.UserName)
		formData.append('UserEmail', payload.UserEmail)
		formData.append('Education', payload.Education)
		formData.append('PhoneNumber', payload.PhoneNumber)
		formData.append('Job', payload.Job)
		formData.append('Description', payload.Description)
		formData.append('HomeAddress', payload.HomeAddress)
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/Account/editProfile`,formData)
		
		if(!res.data) {
			return yield put({
				type: types.EDIT_PROFILE_FAILED
			})
		}
		Alert.alert('Амжилттай','Мэдээлэл шинэчилэгдлээ!')
		return yield put({
			type: types.EDIT_PROFILE_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.EDIT_PROFILE_FAILED
		})
	}
}
function* changePass(payload) {
	try {
		var formData = new FormData();
		formData.append('NewPass', payload.NewPass)
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/Account/changePass`,formData)
		
		if(!res.data) {
			return yield put({
				type: types.CHANGE_PASS_FAILED
			})
		}

		return yield put({
			type: types.CHANGE_PASS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.CHANGE_PASS_FAILED
		})
	}
}

function* watchGetProfile() {
  yield takeEvery(types.GET_PROFILE, getProfile)
}
function* watchEditProfile() {
	yield takeEvery(types.EDIT_PROFILE, editProfile)
}
function* watchChangePass() {
	yield takeEvery(types.CHANGE_PASS, changePass)
}


export default function *root() {
  yield all([
	fork(watchGetProfile),
	fork(watchEditProfile),
	fork(watchChangePass)
  ])
}