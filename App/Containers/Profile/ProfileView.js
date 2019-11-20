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

class ProfileView extends React.Component {
  state = {
    isWorker:true,
    userProjects:[],
    loading2:false,
  };
  switchScreen(value){
		this.setState({isWorker: value});
  }
  componentWillMount(){
    const { userProjects, loading2 } = this.props
    this.setState({userProjects:userProjects})
    this.setState({loading2:loading2})
  }
  componentDidMount() {
    this.props.getProfile()
    this.props.getUserProjects()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.navigation.setParams({ 
      onLogout: this.onLogout,
      EditProfile: this.EditProfile,
    });
    
  }
  _onRefresh2() {
		this.props.getUserProjects()
	}
  componentWillUnmount() {
		this.backHandler.remove()
    }
  keyExtractor = (item, index) => index.toString();
	handleBackPress = () => {
		// BackHandler.exitApp()
		return true;
	}
	_onRefresh() {
		this.props.getProfile()
  }
  EditProfile = () =>{
    this.props.navigation.navigate('EditProfile')
  }
  onLogout = () => {
    Alert.alert(
      '',
      'Та гарахдаа итгэлтэй байна уу',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          deleteAuthenticationToken(),
          this.props.navigation.navigate('LoginScreen')
        }},
      ],
      { cancelable: true },
    );
    
  }
	_renderEmpty() {
		return <H3>Мэдэгдэл алга байна.</H3>
	}
  keyExtractor = (item, index) => index.toString();

// 	renderItem = ({ item }) => (
//     <View style={styles.container}>
          
//       <View style={styles.header}>
      
//     {item.ProPicture?
//     (
//       <Image style={styles.avatar}  source={{uri:'http://task.mn/content/'+item.ProPicture+''}}/>
//     ):(
//       <Avatar size='xlarge' icon={{name: 'user', type: 'font-awesome', }} style={styles.avatar}/>
//     )}
//     </View>
//     {/* <Image style={styles.avatar} source={{uri:ProPicture}}/> */}
//     <View style={styles.body}>
//       <View style={styles.bodyContent}>
//           <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
//           <Text style={styles.info}>{item.Job}</Text>
//           <Rating
//             imageSize={20}
//             readonly
//             startingValue={4}
//             // style={{ styles.rating }}
//           />
//           <View style={styles.information}>
//             <Text> {item.UserEmail} </Text>
//             <Text> {item.PhoneNumber} </Text>
//             <Text> {item.HomeAddress} </Text>
//             <Text> {item.Education} </Text>
//             </View>
//           <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
//           onPress={() => {
//             this.props.navigation.navigate('Нэмэх')
//           }}>
//             <Text>Төсөл нэмэх</Text>  
//           </TouchableOpacity>              
//           <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
//             <Text>Засварлах</Text> 
//           </TouchableOpacity>
//       </View>
//   </View>
  
// </View>
// 	)
  renderProjects = ({item}) =>(
    // <View style={{marginVertical:20,marginHorizontal:10}}>
      <View style={styles.container}>
        <TouchableOpacity style={{backgroundColor:'#eaeff5',marginVertical:5}}
          onPress={() => {
            this.props.navigation.navigate('WorkProgress')}}>
          <Text style={[styles.text,{color:'#4285F4'}]}>{item.Name}</Text>
        </TouchableOpacity>
        
      </View>
    // </View>
    
  )
  renderViewMore(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84'}}>Дэлгэрэнгүй</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84'}}>Хураах</Text>
    )
  }
  renderItem = ({ item }) => (
    
    <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                
                  {item.ProPicture?
                    <Image style={styles.avatar}
                      source={{uri: 'http://task.mn/content/'+item.ProPicture+''}}/>
                      :
                      <Image style={styles.avatar}
                      source={{uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}/>
                  }
                <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
                {item.Job?
                <Text style={styles.userInfo}>{item.Job}</Text>
                :null
                }
                {item.UserEmail?
                <Text style={styles.userInfo}>{item.UserEmail}</Text>
                :null
                }
                {item.Education?
                <Text style={styles.userInfo}>{item.Education}</Text>
                :null
                }
                {item.PhoneNumber?
                <Text style={styles.userInfo}>{item.PhoneNumber}</Text>
                :null
                }
                {item.HomeAddress?
                <Text style={styles.userInfo}>{item.HomeAddress}</Text>
                :null
                }
                {item.Description?
                <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={{textAlign: 'justify'}}
                >
                  <Text style={styles.userInfo}>
                    {item.Description}
                  </Text>
                </ViewMoreText>
                :null
                }
                
            </View>
          </View>
          <View style={styles.body}>
            <View style={{flex:1,flexDirection:'row', backgroundColor:'dcdcdc',marginVertical:20,marginHorizontal:10,alignContent:'center'}}>
						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer,styles.isActive]):([styles.buttonContainer])}
							onPress={() => this.switchScreen(true)}>
							  <Text style={{color:'#4285F4',marginBottom:2}}>Захиалагч</Text>
						  </TouchableHighlight>
						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer]):([styles.buttonContainer,styles.isActive])}
							  onPress={() => this.switchScreen(false)}>
							  <Text style={{color:'#4285F4',marginBottom:2}}>Гүйцэтгэгч</Text>
						  </TouchableHighlight>	
				    </View>
            {this.state.isWorker ? (
				        <View style={{marginVertical:20,marginHorizontal:10}}>
                  <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Үнэлгээ</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={4}
                    // style={{ styles.rating }}
                    />
                  </View>
                  <View style={{marginVertical:10}}>
                    <Text style={styles.text}>Захиалсан ажлын тоо:</Text>
                    <Text style={styles.text}>Хийгдэж байгаа ажлын тоо:</Text>
                    <Text style={styles.text}>Зарлага: ₮</Text>
                  </View>
                  <View style={styles.body2}>
                    <View style={{marginVertical:10}}>
                      {this.state.loading2 ? (
                        <ActivityIndicator />
                      ) : (
				                <FlatList
          			          refreshControl={
              		        <RefreshControl
              			        refreshing={this.state.loading2}
              			        onRefresh={this._onRefresh2.bind(this)}
              		        />
              	          }
                        	keyExtractor={this.keyExtractor}
            	            data={this.state.userProjects}
           	 	            renderItem={this.renderProjects}
          		          />
				              )}
                    </View>
                  </View>
                </View>
                
              ):(
                <View style={{marginVertical:20,marginHorizontal:10}}>
                  <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Үнэлгээ</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={5}
                    // style={{ styles.rating }}
                    />
                  </View>
                  <View style={{marginVertical:10}}>
                    <Text style={styles.text}>Гүйцэтгэсэн ажлын тоо:</Text>
                    <Text style={styles.text}>Гүйцэтгэж байгаа ажлын тоо:</Text>
                    <Text style={styles.text}>Орлого: ₮</Text>
                  </View>
                  <View style={styles.body2}>
                    <View style={{marginVertical:10}}>
                      {this.state.loading2 ? (
                        <ActivityIndicator />
                      ) : (
				                <FlatList
          			          refreshControl={
              		        <RefreshControl
              			        refreshing={this.state.loading2}
              			        onRefresh={this._onRefresh2.bind(this)}
              		        />
              	          }
                        	keyExtractor={this.keyExtractor}
            	            data={this.state.userProjects}
           	 	            renderItem={this.renderProjects}
          		          />
				              )}
                    </View>
                  </View>
                </View>
              )  
            }

          </View>
          
      </View>
  )
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width:'100%'
        }}>
         <View style={{ alignItems: 'flex-start' }}>
            <TouchableOpacity 
              activeOpacity={0.6}
              onPress={navigation.getParam('EditProfile')}
            >
              <View style={{ margin:20, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4285F4' }}>
                <Icon name="cog" size={20} color="#FFF" />
              </View>
            </TouchableOpacity>
          </View> 
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity 
              activeOpacity={0.6}
              onPress={navigation.getParam('onLogout')}
            >
              <View style={{ margin:20, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4285F4' }}>
              <Icon name="sign-out" size={20} color="#FFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ),
      headerStyle:{
        backgroundColor: '#4285F4',
        height:Header2.HEIGHT,
      },
      headerLeft: null,
      gesturesEnabled: false,
    }
  }
 	render() {
    const { profile, loading } = this.props
    return (
    	<ScrollView>
        {	
				    loading ? (
                	<ActivityIndicator />
            ) : (
              <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            keyExtractor={this.keyExtractor}
            data={profile}
              renderItem={this.renderItem}
            />
          )}
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
)(ProfileView);

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