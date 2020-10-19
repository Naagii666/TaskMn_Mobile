import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './WorkersConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
import {Alert} from 'react-native'

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
			console.log(e.message)
			// alert(e.message)
			yield put({
				type: types.GET_ALL_PROJECTS_FAILED
			})
		
	}
}
function* getWorkerComments({ payload }) {
	// alert(payload)
	try {
		var formData = new FormData();
		formData.append('UserID', payload)
		
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/account/getWorkerComments`,formData)
		// alert(res.data)
		if(!res.data) {
			return yield put({
				type: types.GET_WORKER_COMMENTS_FAILED
			})
		}
		// alert('here')
		// this.props.navigation.navigate("Ажлууд")
		yield put({
			type: types.GET_WORKER_COMMENTS_SUCCESS,
			payload: res.data
		})

	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_WORKER_COMMENTS_FAILED
		})
	}
}
function* getWorkerSkills({ payload }) {
	// alert(payload)
	try {
		var formData = new FormData();
		formData.append('UserID', payload)
		
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/account/getWorkerSkills`,formData)
		// alert(res.data)
		if(!res.data) {
			return yield put({
				type: types.GET_WORKER_SKILLS_FAILED
			})
		}
		// alert('here')
		// this.props.navigation.navigate("Ажлууд")
		yield put({
			type: types.GET_WORKER_SKILLS_SUCCESS,
			payload: res.data
		})

	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_WORKER_SKILLS_FAILED
		})
	}
}

function* onBidProject({ payload }) {
	// alert(payload.projectID)
	try {
		var formData = new FormData();
		formData.append('Price', payload.Price)
		formData.append('Duration', payload.Duration)
		formData.append('ProjectID', payload.projectID)
		formData.append('Description', payload.Description)
		
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`api/project/AddBid`,formData)
		// alert(res.data.error)
		// console.log(res)
		if(!res.data) {
			return yield put({
				type: types.ON_BID_PROJECT_FAILED
			})
		}
		Alert.alert('Мэдэгдэл',res.data)
		// Alert.alert('Амжилттай','Саналыг хүлээн авлаа')
		// this.props.navigation.navigate("Ажлууд")
		yield put({
			type: types.ON_BID_PROJECT_SUCCESS,
			payload: res.data
		})

		// yield put(NavigationActions.back())
	} catch(e) {
		alert(res.error)
		yield put({
			type: types.ON_BID_PROJECT_FAILED
		})
	}
}
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
				type: types.ON_ADD_COMMENT2_FAILED
			})
		}
		// Alert.alert('Амжилттай','Ажил нэмэгдлээ')
		yield put({
			type: types.ON_ADD_COMMENT2_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_ADD_COMMENT2_FAILED
		})
	}
}


function* watchGetAllWorkers() {
  yield takeEvery(types.GET_ALL_WORKERS, getAllWorkers)
}
function* watchGetWorkerComments() {
	yield takeEvery(types.GET_WORKER_COMMENTS, getWorkerComments)
}
function* watchGetWorkerSkills() {
	yield takeEvery(types.GET_WORKER_SKILLS, getWorkerSkills)
}
function* watchGetAllProjects() {
	yield takeEvery(types.GET_ALL_PROJECTS, getAllProjects)
  }
function* watchGetOnBidProject() {
	yield takeEvery(types.ON_BID_PROJECT, onBidProject)
}
function* watchOnAddComment() {
	yield takeEvery(types.ON_ADD_COMMENT2, onAddComment)
}

export default function *root() {
  yield all([
	fork(watchGetAllWorkers),
	fork(watchGetAllProjects),
	fork(watchGetOnBidProject),
	fork(watchGetWorkerComments),
	fork(watchGetWorkerSkills),
	fork(watchOnAddComment)
  ])
}