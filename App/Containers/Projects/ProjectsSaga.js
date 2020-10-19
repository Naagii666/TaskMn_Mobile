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
	function* getProgressProjects() {
		try {
			let token = yield getAuthenticationToken()
			let res = yield request(token).get(`api/project/GetProgressProjects`)
			
			if(res.data==null) {
				return yield put({
					type: types.GET_PROGRESS_PROJECTS_FAILED
				})
			}

			return yield put({
				type: types.GET_PROGRESS_PROJECTS_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			console.log(e.message)
			// alert(e.message)
			yield put({
				type: types.GET_PROGRESS_PROJECTS_FAILED
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
	function* onCancelContract({payload}) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/CancelContract`,formData)
			if(res.data==null) {
				return yield put({
					type: types.ON_CANCEL_CONTRACT_FAILED
				})
			}

			return yield put({
				type: types.ON_CANCEL_CONTRACT_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_CANCEL_CONTRACT_FAILED
			})
		}
	}
	function* onConfirmContract({payload , payload2}) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload)
			formData.append('LancerID', payload2)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/ConfirmContract`,formData)
			if(res.data==null) {
				return yield put({
					type: types.ON_CONFIRM_CONTRACT_FAILED
				})
			}

			return yield put({
				type: types.ON_CONFIRM_CONTRACT_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_CONFIRM_CONTRACT_FAILED
			})
		}
	}
	function* onApplyTask({payload , payload2}) {
		try {
			var formData = new FormData();
			formData.append('TaskID', payload)
			formData.append('ProjectID', payload2)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/ApplyTask`,formData)
			if(res.data==null) {
				return yield put({
					type: types.ON_APPLY_TASK_FAILED
				})
			}

			return yield put({
				type: types.ON_APPLY_TASK_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_APPLY_TASK_FAILED
			})
		}
	}
	function* onComfirmTask({payload , payload2}) {
		try {
			var formData = new FormData();
			formData.append('TaskID', payload)
			formData.append('ProjectID', payload2)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/ComfirmTask`,formData)
			if(res.data==null) {
				return yield put({
					type: types.ON_COMFIRM_TASK_FAILED
				})
			}

			return yield put({
				type: types.ON_COMFIRM_TASK_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_COMFIRM_TASK_FAILED
			})
		}
	}
	function* onApplyFinish({payload}) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/ApplyToFinish`,formData)
			if(res.data==null) {
				return yield put({
					type: types.ON_APPLY_FINISH_FAILED
				})
			}
			Alert.alert('Мэдэгдэл',res.data)
			return yield put({
				type: types.ON_APPLY_FINISH_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_APPLY_FINISH_FAILED
			})
		}
	}
	function* onComfirmFinish({payload}) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/ComfirmFinish`,formData)
			if(res.data==null) {
				return yield put({
					type: types.ON_COMFIRM_FINISH_FAILED
				})
			}
			// Alert.alert('Мэдэгдэл',res.data)
			return yield put({
				type: types.ON_COMFIRM_FINISH_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_APPLY_FINISH_FAILED
			})
		}
	}

	// function* onBidProject({ payload }) {
	// 	// alert(payload.projectID)
	// 	try {
	// 		var formData = new FormData();
	// 		formData.append('Price', payload.Price)
	// 		formData.append('Duration', payload.Duration)
	// 		formData.append('ProjectID', payload.projectID)
	// 		formData.append('Description', payload.Description)
			
	// 		let token = yield getAuthenticationToken()
	// 		let res = yield request(token).post(`api/project/AddBid`,formData)

	// 		if(!res.data) {
	// 			return yield put({
	// 				type: types.ON_BID_PROJECT_FAILED
	// 			})
	// 		}
	// 		Alert.alert('Амжилттай','Саналыг хүлээн авлаа')
	// 		// this.props.navigation.navigate("Ажлууд")
	// 		yield put({
	// 			type: types.ON_BID_PROJECT_SUCCESS,
	// 			payload: res.data
	// 		})

	// 		// yield put({
	// 		// 	type: types.ON_BID_PROJECT
	// 		// })

	// 		// yield put(NavigationActions.back())
	// 	} catch(e) {
	// 		alert(e.message)
	// 		//alert(e.message)
	// 		yield put({
	// 			type: types.ON_BID_PROJECT_FAILED
	// 		})
	// 	}
	// }
	function* addProject({payload}) {
		try {
			// alert(payload.typeID)
			var formData = new FormData();
			formData.append('Name', payload.name)
			formData.append('StartDate', payload.startDate)
			formData.append('TypeID', payload.TypeID)
			formData.append('Description', payload.description)
			formData.append('Skills', payload.skills)
			formData.append('LowPrice', payload.lowPrice)
			formData.append('HighPrice', payload.highPrice)
			formData.append('Duration', payload.duration)
			for(i=0;i<3;i++){
				if(payload.photo[i]){
					formData.append('photo'+[i],{
						uri:	payload.photo[i].uri,
						type:	'image/jpeg',
						name:	payload.photo[i].fileName,
					});
				}
			}
			// payload.photo[0]?formData.append('UploadedImage', payload.photo[0]):null
			
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/AddProject`,formData)
			// alert(res.data)
			if(res.data==null) {
				return yield put({
					type: types.ADD_PROJECT_FAILED
				})
			}
	
			// Alert.alert('Мэдэгдэл',res.data)
	
			yield put({
				type: types.ADD_PROJECT_SUCCESS,
				payload: res.data
			})
			
			} catch(e) {
				alert(e.message)
				yield put({
					type: types.ADD_PROJECT_FAILED
				})
			}
	}
	function* onDeleteProject({ payload }) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/DeleteProject`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_DELETE_PROJECT_FAILED
				})
			}
			yield put({
				type: types.ON_DELETE_PROJECT_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_DELETE_PROJECT_FAILED
			})
		}
	}
	function* onDeleteBid({ payload }) {
		try {
			var formData = new FormData();
			formData.append('BidID', payload.BidID)
			// alert(formData)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/DeleteBid`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_DELETE_BID_FAILED
				})
			}
			// Alert.alert('Амжилттай','Санал устгагдлаа!')
			yield put({
				type: types.ON_DELETE_BID_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_DELETE_BID_FAILED
			})
		}
	}
	function* onChooseBid({ payload }) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload.ProjectID)
			formData.append('LancerID', payload.LancerID)
			formData.append('BidID', payload.BidID)
			// alert(payload.ProjectID+"/"+payload.BidID+"/"+payload.LancerID)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/ChooseBid`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_CHOOSE_BID_FAILED
				})
			}
			// Alert.alert('Амжилттай','Санал сонгогдлоо!')
			yield put({
				type: types.ON_CHOOSE_BID_SUCCESS,
				payload: res.data
			})

			// yield put({
			// 	type: types.ON_CHOOSE_BID
			// })
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_CHOOSE_BID_FAILED
			})
		}
	}
	function* getMilestones({ payload }) {
		try {
			var formData = new FormData();
			// alert(payload)
			formData.append('PID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/getMilestones`,formData)
			if(res.data==null) {
				return yield put({
					type: types.GET_MILESTONES_FAILED
				})
			}
			yield put({
				type: types.GET_MILESTONES_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.GET_MILESTONES_FAILED
			})
		}
	}
	function* onAddTask({ payload }) {
		try {
			var formData = new FormData();
			formData.append('ProjectID', payload.ProjectID)
			// formData.append('LancerID', payload.LancerID)
			formData.append('TaskName', payload.TaskName)
			formData.append('Amount', payload.Amount)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/AddTask`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_ADD_TASK_FAILED
				})
			}
			// Alert.alert('Амжилттай','Санал сонгогдлоо!')
			yield put({
				type: types.ON_ADD_TASK_SUCCESS,
				payload: res.data
			})

			// yield put({
			// 	type: types.ON_CHOOSE_BID
			// })
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_ADD_TASK_FAILED
			})
		}
	}
	function* getContract({ payload }) {
		try {
			var formData = new FormData();
			formData.append('PID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/getContract`,formData)
			if(!res.data) {
				return yield put({
					type: types.GET_CONTRACT_FAILED
				})
			}
			// Alert.alert('Амжилттай','Санал сонгогдлоо!')
			yield put({
				type: types.GET_CONTRACT_SUCCESS,
				payload: res.data
			})

			// yield put({
			// 	type: types.ON_CHOOSE_BID
			// })
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.GET_CONTRACT_FAILED
			})
		}
	}
	function* onDeleteTask({ payload , payload2 }) {
		try {
			var formData = new FormData();
			// alert(payload.TaskID)
			formData.append('TaskID', payload)
			formData.append('ProjectID', payload2.ProjectID)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/DeleteTask`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_DELETE_TASK_FAILED
				})
			}
			// Alert.alert('Амжилттай','Санал сонгогдлоо!')
			yield put({
				type: types.ON_DELETE_TASK_SUCCESS,
				payload: res.data
			})

			// yield put({
			// 	type: types.ON_CHOOSE_BID
			// })
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_DELETE_TASK_FAILED
			})
		}
	}
	function* onSubmitPayment({ payload , payload2 }) {
		try {
			var formData = new FormData();
			formData.append('Amount', payload)
			formData.append('PID', payload2)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/SubmitPayment`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_SUBMIT_PAYMENT_FAILED
				})
			}
			// Alert.alert('Мэдэгдэл',res.data)
			yield put({
				type: types.ON_SUBMIT_PAYMENT_SUCCESS,
				payload: res.data
			})

			// yield put({
			// 	type: types.ON_CHOOSE_BID
			// })
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_SUBMIT_PAYMENT_FAILED
			})
		}
	}
	function* onCheckPayment({ payload }) {
		try {
			var formData = new FormData();
			formData.append('PID', payload)
			let token = yield getAuthenticationToken()
			let res = yield request(token).post(`api/project/CheckPayment`,formData)
			if(!res.data) {
				return yield put({
					type: types.ON_CHECK_PAYMENT_FAILED
				})
			}
			yield put({
				type: types.ON_CHECK_PAYMENT_SUCCESS,
				payload: res.data
			})
		} catch(e) {
			alert(e.message)
			yield put({
				type: types.ON_CHECK_PAYMENT_FAILED
			})
		}
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
	function* watchGetProgressProjects() {
		yield takeEvery(types.GET_PROGRESS_PROJECTS, getProgressProjects)
	}
	// function* watchGetOnBidProject() {
	// 	yield takeEvery(types.ON_BID_PROJECT, onBidProject)
	// }
	function* watchGetOnDeleteProject() {
		yield takeEvery(types.ON_DELETE_PROJECT, onDeleteProject)
	}
	function* watchGetOnDeleteBid() {
		yield takeEvery(types.ON_DELETE_BID, onDeleteBid)
	}
	
	function* watchOnChooseBid() {
		yield takeEvery(types.ON_CHOOSE_BID, onChooseBid)
	}
	function* watchGetMilestones() {
		yield takeEvery(types.GET_MILESTONES, getMilestones)
	}
	function* watchOnDeleteTask() {
		yield takeEvery(types.ON_DELETE_TASK, onDeleteTask)
	}
	function* watchOnAddTask() {
		yield takeEvery(types.ON_ADD_TASK, onAddTask)
	}
	function* watchOnCancelContract() {
		yield takeEvery(types.ON_CANCEL_CONTRACT, onCancelContract)
	}
	function* watchOnConfirmContract() {
		yield takeEvery(types.ON_CONFIRM_CONTRACT, onConfirmContract)
	}
	function* watchGetContract() {
		yield takeEvery(types.GET_CONTRACT, getContract)
	}
	function* watchOnApplyTask() {
		yield takeEvery(types.ON_APPLY_TASK, onApplyTask)
	}
	function* watchOnApplyFinish() {
		yield takeEvery(types.ON_APPLY_FINISH, onApplyFinish)
	}
	function* watchAddProject() {
		yield takeEvery(types.ADD_PROJECT, addProject)
	}
	function* watchOnComfirmFinish() {
		yield takeEvery(types.ON_COMFIRM_FINISH, onComfirmFinish)
	}
	function* watchOnComfirmTask() {
		yield takeEvery(types.ON_COMFIRM_TASK, onComfirmTask)
	}
	function* watchOnCheckPayment() {
		yield takeEvery(types.ON_CHECK_PAYMENT, onCheckPayment)
	}
	function* watchOnSubmitPayment() {
		yield takeEvery(types.ON_SUBMIT_PAYMENT, onSubmitPayment)
	}
	
	

export default function *root() {
yield all([
	fork(watchGetAllProjects),
	fork(watchGetUserProjects),
	// fork(watchGetOnBidProject),
	fork(watchGetOnDeleteProject),
	fork(watchGetBidListHire),
	fork(watchGetBidListLancer),
	fork(watchGetProgressProjects),
	fork(watchOnChooseBid),
	fork(watchGetMilestones),
	fork(watchGetOnDeleteBid),
	fork(watchOnDeleteTask),
	fork(watchOnAddTask),
	fork(watchOnCancelContract),
	fork(watchGetContract),
	fork(watchOnConfirmContract),
	fork(watchOnApplyTask),
	fork(watchOnApplyFinish),
	fork(watchAddProject),
	fork(watchOnComfirmFinish),
	fork(watchOnComfirmTask),
	fork(watchOnCheckPayment),
	fork(watchOnSubmitPayment)
])
}