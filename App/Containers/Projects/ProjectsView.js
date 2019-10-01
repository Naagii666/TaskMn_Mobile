import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import { H3,View, Text, FlatList, RefreshControl, TouchableHighlight ,Image,StyleSheet, StatusBar} from 'react-native'
//import all the basic component we have used
import {  Card, ListItem, Button, Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment'
import { getAllProjects } from './ProjectsActions'
const regex = /([&].*?[;])*(<.*?>)/ig;

class ProjectsView extends React.Component {

  	componentDidMount() {
	  this.props.getAllProjects()
	}

	_onRefresh() {
		this.props.getAllProjects()
	}

	_renderEmpty() {
		return <H3>Мэдэгдэл алга байна.</H3>
	}
	navigateDetail(){
		alert("here")
		this.props.navigation.navigate('Stacks',{ProjectDetail
		})
	}
	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
				<Card
					  title={item.Name}
					  style={{backgroundColor:'#3679B1'}}
					//   image={require('../images/pic2.jpg')}>
				>
  					<Text style={{marginBottom: 10}}>
    					{item.Description.replace(regex,'')}
  					</Text>
  					<Button
						// icon={<Icon name='code' color='#ffffff' />}
						onPress={() => this.props.navigation.navigate('ProjectDetail')}
    					buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor:'#3679B1'}}
    					title='Дэлгэрэнгүй' />
				</Card>
	)
	
 	render() {
		const { projects, loading } = this.props
		return (
			
			<View>
				<FlatList
          			refreshControl={
              		<RefreshControl
              			refreshing={loading}
              			onRefresh={this._onRefresh.bind(this)}
              		/>
              	}
            	keyExtractor={this.keyExtractor}
            	data={projects}
           	 	renderItem={this.renderItem}
          		/>
			</View>
		)
	}
}

export default connect(
   state => ({
		loading: state.project.getIn(['project_list', 'loading']),
		projects: state.project.getIn(['project_list', 'data']),
   	   	// projects: state.project.getIn(['project_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
     	getAllProjects: bindActionCreators(getAllProjects, dispatch),
     }
   }
)(ProjectsView);

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
	},
	textContainer: {
    flex: 1
	},
	rowContainer: {
    flexDirection: 'row',
    padding: 10,
	},
	newsName: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black'
	},
	title: {
    fontSize: 14,
    color: '#656565'
  },
});
