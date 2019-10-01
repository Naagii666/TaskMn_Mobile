import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import { H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet, 
  StatusBar} from 'react-native'
import { ListItem ,Rating, AirbnbRating } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
//import all the basic component we have used
import { getAllWorkers } from './WorkersActions'


class ProfileView extends React.Component {

  componentDidMount() {
	  this.props.getProfile()
	}

	_onRefresh() {
		this.props.getProfile()
	}

	_renderEmpty() {
		return <H3>Мэдэгдэл алга байна.</H3>
	}

	keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    
    <ListItem style={item%2 == 0 ? { backgroundColor: "white", } : { backgroundColor: "#dcdcdc", }}
      leftAvatar={{ source: { uri:'http://task.mn/content/'+item.ProPicture+'' } }}
      title={item.FirstName+' '+item.LastName}
      subtitle={item.Education}
      bottomDivider
      chevron
    />
   
    
  )
 	render() {
    const { workers, loading } = this.props
    return (
      <ScrollView>
        <View>
          <FlatList
          	refreshControl={
              		<RefreshControl
              			refreshing={loading}
              			onRefresh={this._onRefresh.bind(this)}
              		/>
              	}
            keyExtractor={this.keyExtractor}
            data={workers}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    )
  }
}

export default connect(
   state => ({
		loading: state.workers.getIn(['workers_list', 'loading']),
		workers: state.workers.getIn(['workers_list', 'data']),
   	   	// projects: state.project.getIn(['project_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
     	getProfile: bindActionCreators(getAllWorkers, dispatch),
     }
   }
)(ProfileView);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});