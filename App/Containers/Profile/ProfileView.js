import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import { H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet, StatusBar} from 'react-native'
//import all the basic component we have used
import {  Card, ListItem, Button, Icon,Rating, AirbnbRating } from 'react-native-elements'
import { getProfile } from './ProfileActions'

// const ProjectItem = ({ item,index}) => {
// 	let { Name} = item
// 	return (
// 		<View>
// 			<Text>
// 				{Name}
// 			</Text>
// 		</View>
	
// 	)
// }

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

	
 	render() {
 		const { profile, loading } = this.props
    const {ProPicture,LastName,FirstName,FLRatings,Job,HomeAddress,UserEmail,PhoneNumber,Education,} = profile[0]
    return (
    	<ScrollView>
      		<View style={styles.container}>
         	 	<View style={styles.header}>
              <Image style={styles.avatar} source={{uri:ProPicture}}/>
              </View>
          		{/* <Image style={styles.avatar} source={{uri:ProPicture}}/> */}
          		<View style={styles.body}>
            		<View style={styles.bodyContent}>
              			<Text style={styles.name}>{FirstName}.{LastName}</Text>
              			<Text style={styles.info}>{Job}</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={4}
                      // style={{ styles.rating }}
                    />
                    <View style={styles.information}>
                      <Text> {UserEmail} </Text>
                      <Text> {PhoneNumber} </Text>
                      <Text> {HomeAddress} </Text>
                      <Text> {Education} </Text>
                      </View>
              			<TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
                			<Text>Төсөл нэмэх</Text>  
              			</TouchableOpacity>              
              			<TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
                			<Text>Засварлах</Text> 
              			</TouchableOpacity>
            		</View>
        		</View>
      		</View>
      </ScrollView>
    );
  }
}

export default connect(
   state => ({
		loading: state.profile.getIn(['profile_list', 'loading']),
		profile: state.profile.getIn(['profile_list', 'data']),
   	   	// projects: state.project.getIn(['project_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
     	getProfile: bindActionCreators(getProfile, dispatch),
     }
   }
)(ProfileView);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  information:{
    marginTop:'10%',
    textAlign:'left'
  },
  header:{
    backgroundColor: "#3679B1",
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
    backgroundColor: "#3679B1",
    
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'100%',
    // borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#3679B1",
  },
});