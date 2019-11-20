import React, { Component } from 'react'
import axios from 'axios'

const BASE_URL = 'http://192.168.88.16:45455/'

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