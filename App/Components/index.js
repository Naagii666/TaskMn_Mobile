import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export const H2 = (props) => {
	return (
		<Text style={styles.text}>
			{props.children}
		</Text>
	)
}

export const H3 = (props) => {
	return (
		<Text style={[styles.text, styles.h3]}>
			{props.children}
		</Text>
	)
}

export const H4 = (props) => {
	return (
		<Text style={[styles.text, styles.h4]}>
			{props.children}
		</Text>
	)
}

export const H5 = (props) => {
	return (
		<Text style={[styles.text, styles.h5]}>
			{props.children}
		</Text>
	)
}

export const Separator2 = () => {
	return <View style={{ height: 1, backgroundColor: '#fff', marginTop: 10, marginBottom: 10 }}/>
}

function _getJustify(type) {
	switch(type) {
		case 'between': return 'space-between'
		case 'center': return 'center'
		case 'around': return 'space-around'
		default: return 'flex-start'
	}
}

function _getAlign(type) {
	switch(type) {
		case 'start': return 'flex-start'
		case 'center': return 'center'
		case 'end': return 'flex-end'
		default: return 'flex-start'
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontSize: 18,
		//text
	},
	h3: {
		fontSize: 14,
	},
	h4: {
		fontSize: 10,
	},
	h5: {
		fontSize: 8,
	},
})