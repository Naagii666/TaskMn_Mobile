import React, { Component } from 'react'
import axios from 'axios'

const BASE_URL = 'https://taskmobile.conveyor.cloud/'

export function request(token) {
	var axiosInstance = axios.create({
		baseURL: BASE_URL,
		headers: {
		  	'Authorization': 'bearer ' + token,
		  	'Content-Type': 'application/x-www-form-urlencoded'
	    }
	})

	return axiosInstance
}