import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {ActivityIndicator, H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet, StatusBar,BackHandler,Alert} from 'react-native'
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header as Header2 } from 'react-navigation';
import {  Card, ListItem, Button,Rating, AirbnbRating ,Avatar} from 'react-native-elements'
import { getUserProjects } from '../Projects/ProjectsActions'
import { getProfile } from './ProfileActions'
import ViewMoreText from 'react-native-view-more-text';
// import ViewMoreText from 'react-native-view-more-text';
import {  
  deleteAuthenticationToken, 
} from '../../Services/storage'
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

class WorkProgress extends React.Component {
  state = {
    isWorker:true,
    userProjects:[],
    loading2:false,
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount(){
    this.backHandler.remove()
  }
  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
    }
    goBack(){
        this.props.navigation.navigate('Tabs',{
        })
    }
 	render() {
    const { profile, loading } = this.props
    return (
    	<ScrollView>
            <Text>Work progress screen</Text>
      </ScrollView>
    );
  }
}

export default connect(
   state => ({
		loading: state.profile.getIn(['profile_list', 'loading']),
		profile: state.profile.getIn(['profile_list', 'data']),
          // projects: state.project.getIn(['project_list', 'data']).toJS(),
    loading2: state.project.getIn(['user_projects', 'loading']),
		userProjects: state.project.getIn(['user_projects', 'data'])
   }),
   dispatch => {
     return {
       getProfile: bindActionCreators(getProfile, dispatch),
       getUserProjects: bindActionCreators(getUserProjects, dispatch)
     }
   }
)(WorkProgress);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFF",
  },
  text:{
    fontSize:16,
    color:'black',
    marginHorizontal:10
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#4285F4",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
  },
  body:{
    backgroundColor: "#FFF",
    // height:500,
    // alignItems:'center',
    borderTopWidth:2,
    borderTopColor:'#DB4437'
    
  },
  body2:{
    backgroundColor: "#FFF",
    // height:500,
    // alignItems:'center',
    borderTopWidth:2,
    borderTopColor:'#727b84'
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
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
    backgroundColor: "#4285F4",
    
  },
  buttonContainer: {
    height:20,
    flexDirection: 'row',
    justifyContent: 'center',
	alignItems: 'center',
	width:'40%',
	
	// backgroundColor: "#red",
	marginHorizontal:'5%',
  },
  loginButton: {
    backgroundColor: "#4285F4",
  },
  isActive:{
    borderBottomColor:'#4285F4',
    borderBottomWidth:3,
    }
});