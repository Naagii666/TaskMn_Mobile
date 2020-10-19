import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './AddConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
import { Alert } from 'react-native'
import axios from 'axios'
// function* addProject({payload}) {
// 	try {
// 		// alert(payload.typeID)
// 		var formData = new FormData();
// 		formData.append('Name', payload.name)
// 		formData.append('StartDate', payload.startDate)
// 		formData.append('TypeID', payload.TypeID)
// 		formData.append('Description', payload.description)
// 		formData.append('Skills', payload.skills)
// 		formData.append('LowPrice', payload.lowPrice)
// 		formData.append('HighPrice', payload.highPrice)
// 		formData.append('Duration', payload.duration)
// 		payload.photo[0]?formData.append('UploadedImage', payload.photo[0]):null
		
// 		let token = yield getAuthenticationToken()
// 		let res = yield request(token).post(`api/project/AddProject`,formData)
// 		// alert(res.data)
// 		if(res.data==null) {
// 			return yield put({
// 				type: types.ADD_PROJECT_FAILED
// 			})
// 		}

// 		Alert.alert('Мэдэгдэл',res.data)

// 		yield put({
// 			type: types.ADD_PROJECT_SUCCESS,
// 			payload: res.data
// 		})
		
// 		} catch(e) {
// 			alert(e.message)
// 			yield put({
// 				type: types.ADD_PROJECT_FAILED
// 			})
// 		}
	
	
// }
function* getProjectTypes() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/project/GetProjectTypes`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_PROJECT_TYPES_FAILED
			})
		}

		return yield put({
			type: types.GET_PROJECT_TYPES_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		Alert.alert("Алдаа","Интернэт холболтоо шалгана уу !")
		yield put({
			type: types.GET_PROJECT_TYPES_FAILED
		})
	}
}

// function* watchAddProject() {
//   yield takeEvery(types.ADD_PROJECT, addProject)
// }
function* watchGetProjectTypes() {
	yield takeEvery(types.GET_PROJECT_TYPES, getProjectTypes)
  }

export default function *root() {
  yield all([
	// fork(watchAddProject),
	fork(watchGetProjectTypes)
  ])
}