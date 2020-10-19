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
function* onAddComment({ payload}) {
	try {
		var formData = new FormData();
		formData.append('toUser', payload.toUser)
		formData.append('Text', payload.Text)
		// alert(payload.Text)
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/Account/AddComment`,formData)
		if(!res.data) {
			return yield put({
				type: types.ON_ADD_COMMENT_FAILED
			})
		}
		// Alert.alert('Амжилттай','Ажил нэмэгдлээ')
		yield put({
			type: types.ON_ADD_COMMENT_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_ADD_COMMENT_FAILED
		})
	}
}
function* onAddSkill({ payload}) {
	try {
		var formData = new FormData();
		formData.append('Skill', payload.Skill)
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/Account/onAddSkill`,formData)
		if(!res.data) {
			return yield put({
				type: types.ON_ADD_SKILL_FAILED
			})
		}
		yield put({
			type: types.ON_ADD_SKILL_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_ADD_SKILL_FAILED
		})
	}
}	
function* onDeleteSkill({ payload}) {
	try {
		var formData = new FormData();
		formData.append('SkillID', payload)
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/Account/onDeleteSkill`,formData)
		if(!res.data) {
			return yield put({
				type: types.ON_DELETE_SKILL_FAILED
			})
		}
		yield put({
			type: types.ON_DELETE_SKILL_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_DELETE_SKILL_FAILED
		})
	}
}
function* getBalance() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/Account/getBalance`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_BALANCE_FAILED
			})
		}

		return yield put({
			type: types.GET_BALANCE_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_BALANCE_FAILED
		})
	}
}
function* getComments() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/Account/getUserComments`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_COMMENTS_FAILED
			})
		}

		return yield put({
			type: types.GET_COMMENTS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_COMMENTS_FAILED
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
		// Alert.alert('Амжилттай','Мэдээлэл шинэчилэгдлээ!')
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
function* getUserSkills() {
	// alert(payload)
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/account/getUserSkills`)
		// alert(res.data)
		if(!res.data) {
			return yield put({
				type: types.GET_USER_SKILLS_FAILED
			})
		}
		yield put({
			type: types.GET_USER_SKILLS_SUCCESS,
			payload: res.data
		})

	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_USER_SKILLS_FAILED
		})
	}
}
function* getTransaction() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/project/getTransaction`)
		if(!res.data) {
			return yield put({
				type: types.GET_TRANSACTION_FAILED
			})
		}
		yield put({
			type: types.GET_TRANSACTION_SUCCESS,
			payload: res.data
		})

	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_TRANSACTION_FAILED
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
function* watchGetBalance() {
	yield takeEvery(types.GET_BALANCE, getBalance)
}
function* watchGetComments() {
	yield takeEvery(types.GET_COMMENTS, getComments)
}
function* watchOnAddComment() {
	yield takeEvery(types.ON_ADD_COMMENT, onAddComment)
}
function* watchGetUserSkills() {
	yield takeEvery(types.GET_USER_SKILLS, getUserSkills)
}
function* watchOnAddSkill() {
	yield takeEvery(types.ON_ADD_SKILL, onAddSkill)
}
function* watchOnDeleteSkill() {
	yield takeEvery(types.ON_DELETE_SKILL, onDeleteSkill)
}
function* watchGetTransaction() {
	yield takeEvery(types.GET_TRANSACTION, getTransaction)
}



export default function *root() {
  yield all([
	fork(watchGetProfile),
	fork(watchEditProfile),
	fork(watchChangePass),
	fork(watchGetBalance),
	fork(watchGetComments),
	fork(watchOnAddComment),
	fork(watchOnAddSkill),
	fork(watchOnDeleteSkill),
	fork(watchGetUserSkills),
	fork(watchGetTransaction)
  ])
}