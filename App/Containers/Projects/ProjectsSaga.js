import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './ProjectsConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
import { Alert } from 'react-native'
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
function* getUserProjects() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/project/GetUserProjects`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_USER_PROJECTS_FAILED
			})
		}

		return yield put({
			type: types.GET_USER_PROJECTS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		console.log(e.message)
		// alert(e.message)
		yield put({
			type: types.GET_USER_PROJECTS_FAILED
		})
	}
}

function* getBidListHire() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/project/GetBidListHire`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_BID_LIST_HIRE_FAILED
			})
		}

		return yield put({
			type: types.GET_BID_LIST_HIRE_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_BID_LIST_HIRE_FAILED
		})
	}
}
function* getBidListLancer() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`api/project/GetBidListLancer`)
		
		if(res.data==null) {
			return yield put({
				type: types.GET_BID_LIST_LANCER_FAILED
			})
		}

		return yield put({
			type: types.GET_BID_LIST_LANCER_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_BID_LIST_LANCER_FAILED
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

		if(!res.data) {
			
			return yield put({
				type: types.ON_BID_PROJECT_FAILED
			})
		}
		Alert.alert('Амжилттай','Саналыг хүлээн авлаа')
		// this.props.navigation.navigate("Ажлууд")
		yield put({
			type: types.ON_BID_PROJECT_SUCCESS,
			payload: res.data
		})

		yield put({
			type: types.ON_BID_PROJECT
		})

		// yield put(NavigationActions.back())
	} catch(e) {
		alert(e.message)
		//alert(e.message)
		yield put({
			type: types.ON_BID_PROJECT_FAILED
		})
	}
}
function* releaseData() {
	alert('here')
	yield put({
		type: types.RELEASE_DATA,
	})
}

function* watchReleaseData() {
	yield takeEvery(types.RELEASE_DATA, releaseData)
}

function* watchGetAllProjects() {
  yield takeEvery(types.GET_ALL_PROJECTS, getAllProjects)
}
function* watchGetBidListHire() {
	yield takeEvery(types.GET_BID_LIST_HIRE, getBidListHire)
}
function* watchGetBidListLancer() {
	yield takeEvery(types.GET_BID_LIST_LANCER, getBidListLancer)
}
function* watchGetUserProjects() {
	yield takeEvery(types.GET_USER_PROJECTS, getUserProjects)
}
function* watchGetOnBidProject() {
	yield takeEvery(types.ON_BID_PROJECT, onBidProject)
}

export default function *root() {
  yield all([
	fork(watchGetAllProjects),
	fork(watchGetUserProjects),
	fork(watchGetOnBidProject),
	fork(watchGetBidListHire),
	fork(watchGetBidListLancer),
	fork(watchReleaseData)
  ])
}