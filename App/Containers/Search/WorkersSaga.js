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
		// alert(e.message)
		//alert(e.message)
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

function* watchGetAllWorkers() {
  yield takeEvery(types.GET_ALL_WORKERS, getAllWorkers)
}

function* watchGetAllProjects() {
	yield takeEvery(types.GET_ALL_PROJECTS, getAllProjects)
  }
function* watchGetOnBidProject() {
	yield takeEvery(types.ON_BID_PROJECT, onBidProject)
}
export default function *root() {
  yield all([
	fork(watchGetAllWorkers),
	fork(watchGetAllProjects),
	fork(watchGetOnBidProject)
  ])
}