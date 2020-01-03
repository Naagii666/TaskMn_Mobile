// import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
// import React from 'react'
// import _ from 'lodash'
// import { fromJS } from "immutable";
// import {ActivityIndicator, H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet, StatusBar,BackHandler,Alert} from 'react-native'
// //import all the basic component we have used
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { Header as Header2 } from 'react-navigation';
// import {  Card, ListItem, Button,Rating, AirbnbRating ,Avatar} from 'react-native-elements'
// import { getUserProjects ,releaseData} from '../Projects/ProjectsActions'
// import { getProfile } from './ProfileActions'
// import ViewMoreText from 'react-native-view-more-text';
// import RNRestart from 'react-native-restart';
// // import ViewMoreText from 'react-native-view-more-text';
// import {  
//   deleteAuthenticationToken, 
// } from '../../Services/storage'
// // const ProjectItem = ({ item,index}) => {
// // 	let { Name} = item
// // 	return (
// // 		<View>
// // 			<Text>
// // 				{Name}
// // 			</Text>
// // 		</View>
	
// // 	)
// // }

// class ProfileView extends React.Component {
//   constructor(props) {
//     super(props);
//       // this.searchInput = React.createRef();
//       this.state = {
//       isWorker:true,
//       userProjects:this.props.userProjects,
//       workingProjects:this.props.userProjects,
//       loading2:false,
//       userData:this.props.profile
//     };
//   }
//   switchScreen(value){
// 		this.setState({isWorker: value});
//   }
//   componentWillUpdate(){
//     this.props.getUserProjects()
//   }
//   componentDidMount() {
//     const { profile,userProjects } = this.props
//     this.props.getProfile()
//     this.props.getUserProjects()
//     // this.setState({userData:profile[0]})
//     this.setState({userProjects:userProjects})
//     this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
//     this.props.navigation.setParams({ 
//       onLogout: this.onLogout,
//       EditProfile: this.EditProfile,
//     });
    
//   }
//   _onRefresh2() {
// 		this.props.getUserProjects()
// 	}
//   componentWillUnmount() {
// 		this.backHandler.remove()
//     }
//   keyExtractor = (item, index) => index.toString();
// 	handleBackPress = () => {
// 		// BackHandler.exitApp()
// 		return true;
// 	}
// 	_onRefresh() {
// 		this.props.getProfile()
//   }
//   EditProfile = () =>{
//     const { profile} = this.props
//     this.props.navigation.navigate('EditProfile',{
//       user:this.props.profile[0]
//     })
//   }
//   onLogout = () => {
//     Alert.alert(
//       '',
//       'Та гарахдаа итгэлтэй байна уу',
//       [
//         {
//           text: 'Үгүй',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'Тийм', onPress: () => {
//           deleteAuthenticationToken(),
//           // releaseData(),
//           this.props.navigation.navigate('LoginScreen')
//           RNRestart.Restart();
//         }},
//       ],
//       { cancelable: true },
//     );
    
//   }
// 	_renderEmpty() {
// 		return <H3>Мэдэгдэл алга байна.</H3>
// 	}
//   keyExtractor = (item, index) => index.toString();

//   renderProjects = ({item}) =>(
//     // <View style={{marginVertical:20,marginHorizontal:10}}>
//       <View style={styles.container}>
//         <TouchableOpacity style={{backgroundColor:'#eaeff5',marginVertical:5}}
//           onPress={() => {
//             this.props.navigation.navigate('WorkProgress')}}>
//           <Text style={[styles.text,{color:'#4285F4'}]}>{item.Name}</Text>
//         </TouchableOpacity>
        
//       </View>
//     // </View>
    
//   )
//   EmptyComponent = ({ title }) => (
// 		<View style={styles.emptyContainer}>
// 		  <Text style={styles.emptyText}>{title}</Text>
// 		</View>
// 	  );
//   renderViewMore(onPress){
//     return(
//       <Text onPress={onPress} style={{color:'#727b84'}}>Дэлгэрэнгүй</Text>
//     )
//   }
//   renderViewLess(onPress){
//     return(
//       <Text onPress={onPress} style={{color:'#727b84'}}>Хураах</Text>
//     )
//   }
//   renderItem = ({ item }) => (
    
//     <View style={styles.container}>
//           <View style={styles.header}>
//             <View style={styles.headerContent}>
                
//                   {item.ProPicture?
//                     <Image style={[styles.avatar,{alignSelf: 'center',}]}
//                       source={{uri: 'http://task.mn/content/'+item.ProPicture+''}}/>
//                       :
//                       <Image style={[styles.avatar,{alignSelf: 'center',}]}
//                       source={{uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}/>
//                   }
//                   <View style={{marginBottom:10}}>
//                     <Text style={[styles.name,{alignSelf: 'center',}]}>{item.FirstName} {item.LastName}</Text>
//                   </View>
//                 {item.Job?
//                   <View style={styles.infoView}>
//                       <Text style={styles.titleInfo}>Ажил :</Text>
//                       <Text style={styles.userInfo}>{item.Job}</Text>
//                   </View>
//                 :null
//                 }
//                 {item.UserEmail?
//                   <View style={styles.infoView}>
//                     <Text style={styles.titleInfo}>Имэйл :</Text>
//                     <Text style={styles.userInfo}>{item.UserEmail}</Text>
//                   </View>
//                 :null
//                 }
//                 {item.Education?
//                   <View style={styles.infoView}>
//                     <Text style={styles.titleInfo}>Боловсрол :</Text>
//                     <Text style={styles.userInfo}>{item.Education}</Text>
//                   </View>
                
//                 :null
//                 }
//                 {item.PhoneNumber?
//                   <View style={styles.infoView}>
//                     <Text style={styles.titleInfo}>Утас :</Text>
//                     <Text style={styles.userInfo}>{item.PhoneNumber}</Text>
//                   </View>
//                 :null
//                 }
//                 {item.HomeAddress?
//                   <View style={styles.infoView}>
//                     <Text style={styles.titleInfo}>Гэрийн хаяг :</Text>
//                     <Text style={styles.userInfo}>{item.HomeAddress}</Text>
//                   </View>
//                 :null
//                 }
//                 {item.Description?
//                   <View style={{marginTop:10}}>
//                     <ViewMoreText
//                       numberOfLines={3}
//                       renderViewMore={this.renderViewMore}
//                       renderViewLess={this.renderViewLess}
//                       textStyle={{textAlign: 'justify'}}
//                     >
//                       <Text style={styles.userInfo}>
//                         {item.Description}
//                       </Text>
//                     </ViewMoreText>
//                   </View>
//                 :null
//                 }
                
//             </View>
//           </View>
//           <View style={styles.body}>
//             <View style={{flex:1,flexDirection:'row', backgroundColor:'dcdcdc',marginVertical:20,marginHorizontal:10,alignContent:'center'}}>
// 						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer,styles.isActive]):([styles.buttonContainer])}
// 							onPress={() => this.switchScreen(true)}>
// 							  <Text style={{color:'#4285F4',marginBottom:2}}>Захиалагч</Text>
// 						  </TouchableHighlight>
// 						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer]):([styles.buttonContainer,styles.isActive])}
// 							  onPress={() => this.switchScreen(false)}>
// 							  <Text style={{color:'#4285F4',marginBottom:2}}>Гүйцэтгэгч</Text>
// 						  </TouchableHighlight>	
// 				    </View>
//             {this.state.isWorker ? (
// 				        <View style={{marginVertical:20,marginHorizontal:10}}>
//                   <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
//                     <Text style={styles.text}>Үнэлгээ</Text>
//                     <Rating
//                       imageSize={20}
//                       readonly
//                       startingValue={4}
//                     // style={{ styles.rating }}
//                     />
//                   </View>
//                   <View style={{marginVertical:10}}>
//                     <Text style={styles.text}>Захиалсан ажлын тоо:</Text>
//                     <Text style={styles.text}>Хийгдэж байгаа ажлын тоо:</Text>
//                     <Text style={styles.text}>Зарлага: ₮</Text>
//                   </View>
//                   <View style={styles.body2}>
//                     <View style={{marginVertical:10}}>
//                       {this.state.loading2 ? (
//                         <ActivityIndicator />
//                       ) : (
// 				                <FlatList
//           			          refreshControl={
//               		        <RefreshControl
//               			        refreshing={this.state.loading2}
//               			        onRefresh={this._onRefresh2.bind(this)}
//               		        />
//               	          }
//                         	keyExtractor={this.keyExtractor}
//             	            data={this.state.userProjects}
//                             renderItem={this.renderProjects}
//                             ListEmptyComponent={
//                               <this.EmptyComponent title="Захиалсан ажил байхгүй байна." />
//                           }
//           		          />
// 				              )}
//                     </View>
//                   </View>
//                 </View>
                
//               ):(
//                 <View style={{marginVertical:20,marginHorizontal:10}}>
//                   <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
//                     <Text style={styles.text}>Үнэлгээ</Text>
//                     <Rating
//                       imageSize={20}
//                       readonly
//                       startingValue={5}
//                     // style={{ styles.rating }}
//                     />
//                   </View>
//                   <View style={{marginVertical:10}}>
//                     <Text style={styles.text}>Гүйцэтгэсэн ажлын тоо:</Text>
//                     <Text style={styles.text}>Гүйцэтгэж байгаа ажлын тоо:</Text>
//                     <Text style={styles.text}>Орлого: ₮</Text>
//                   </View>
//                   <View style={styles.body2}>
//                     <View style={{marginVertical:10}}>
//                       {this.state.loading2 ? (
//                         <ActivityIndicator />
//                       ) : (
// 				                <FlatList
//           			          refreshControl={
//               		        <RefreshControl
//               			        refreshing={this.state.loading2}
//               			        onRefresh={this._onRefresh2.bind(this)}
//               		        />
//               	          }
//                         	keyExtractor={this.state.userProjects.ID}
//             	            data={this.state.userProjects}
//                           renderItem={this.renderProjects}
//                           ListEmptyComponent={
//                               <this.EmptyComponent title="Гүйцэтгэж байгаа ажил байхгүй байна." />
//                           }
//           		          />
// 				              )}
//                     </View>
//                   </View>
//                 </View>
//               )  
//             }

//           </View>
          
//       </View>
//   )
//   static navigationOptions = ({ navigation }) => {
//     const { params = {} } = navigation.state;
//     return {
//       headerTitle: (
//         <View style={{
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           width:'100%'
//         }}>
//          <View style={{ alignItems: 'flex-start' }}>
//             <TouchableOpacity 
//               activeOpacity={0.6}
//               onPress={navigation.getParam('EditProfile')}
//             >
//               <View style={{ margin:20, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4285F4' }}>
//                 <Icon name="cog" size={20} color="#FFF" />
//               </View>
//             </TouchableOpacity>
//           </View> 
//           <View style={{ alignItems: 'flex-end' }}>
//             <TouchableOpacity 
//               activeOpacity={0.6}
//               onPress={navigation.getParam('onLogout')}
//             >
//               <View style={{ margin:20, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4285F4' }}>
//               <Icon name="sign-out" size={20} color="#FFF" />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ),
//       headerStyle:{
//         backgroundColor: '#4285F4',
//         height:Header2.HEIGHT,
//       },
//       headerLeft: null,
//       gesturesEnabled: false,
//     }
//   }
//  	render() {
//     const { profile, loading } = this.props
    
//     return (
//     	<ScrollView>
//         {	
// 				    loading ? (
//                 	<ActivityIndicator />
//             ) : (
//               <FlatList
//               refreshControl={
//                 <RefreshControl
//                   refreshing={loading}
//                   onRefresh={this._onRefresh.bind(this)}
//                 />
//               }
//             keyExtractor={this.keyExtractor}
//             data={profile}
//             renderItem={this.renderItem}
//             />
//           )}
//       </ScrollView>
//     );
//   }
// }

// export default connect(
//    state => ({
// 		loading: state.profile.getIn(['profile_list', 'loading']),
// 		profile: state.profile.getIn(['profile_list', 'data']),
//           // projects: state.project.getIn(['project_list', 'data']).toJS(),
//     loading2: state.project.getIn(['user_projects', 'loading']),
// 		userProjects: state.project.getIn(['user_projects', 'data'])
//    }),
//    dispatch => {
//      return {
//        getProfile: bindActionCreators(getProfile, dispatch),
//        getUserProjects: bindActionCreators(getUserProjects, dispatch)
//      }
//    }
// )(ProfileView);

// const styles = StyleSheet.create({
//   header:{
//     backgroundColor: "#FFF",
//   },
//   text:{
//     fontSize:16,
//     color:'black',
//     marginHorizontal:10
//   },
//   headerContent:{
//     padding:30,
    
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "#4285F4",
//     marginBottom:10,
//   },
//   emptyContainer:{
//     alignItems:'center'
//   },
//   name:{
//     fontSize:22,
//     color:"#000000",
//     fontWeight:'600',
//   },
//   infoView:{
//     width:'70%',
//     alignSelf:'center',
//     flexDirection:'row', 
//     justifyContent:'space-between' 
//   },
//   userInfo:{
//     fontSize:14,
//     color:"black",
//     fontWeight:'300',
//   },
//   titleInfo:{
//     fontSize:14,
//     color:"#4285F4",
//     fontWeight:'300',
//   },
//   body:{
//     backgroundColor: "#FFF",
//     // height:500,
//     // alignItems:'center',
//     borderTopWidth:2,
//     borderTopColor:'#DB4437'
    
//   },
//   body2:{
//     backgroundColor: "#FFF",
//     // height:500,
//     // alignItems:'center',
//     borderTopWidth:2,
//     borderTopColor:'#727b84'
//   },
//   item:{
//     flexDirection : 'row',
//   },
//   infoContent:{
//     flex:1,
//     alignItems:'flex-start',
//     paddingLeft:5
//   },
//   iconContent:{
//     flex:1,
//     alignItems:'flex-end',
//     paddingRight:5,
//   },
//   icon:{
//     width:30,
//     height:30,
//     marginTop:20,
//   },
//   info:{
//     fontSize:18,
//     marginTop:20,
//     color: "#FFFFFF",
//   },
//   description:{
//     fontSize:16,
//     color: "#696969",
//     marginTop:10,
//     textAlign: 'center'
//   },
//   buttonContainer: {
//     marginTop:10,
//     height:45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom:20,
//     width:250,
//     borderRadius:30,
//     backgroundColor: "#4285F4",
    
//   },
//   buttonContainer: {
//     height:20,
//     flexDirection: 'row',
//     justifyContent: 'center',
// 	alignItems: 'center',
// 	width:'40%',
	
// 	// backgroundColor: "#red",
// 	marginHorizontal:'5%',
//   },
//   loginButton: {
//     backgroundColor: "#4285F4",
//   },
//   isActive:{
//     borderBottomColor:'#4285F4',
//     borderBottomWidth:3,
//     }
// });

//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet ,Alert ,Image ,ScrollView,RefreshControl} from 'react-native';
import {  Card, ListItem, Button ,Header ,Rating} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import {  deleteAuthenticationToken, } from '../../Services/storage'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import RNRestart from 'react-native-restart';
import { getProfile } from './ProfileActions'
import ViewMoreText from 'react-native-view-more-text';
import { ActivityIndicator } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';

class ProfileView extends React.Component {

  componentDidMount(){
    this.props.getProfile()
  }
  componentWillUnmount(){
    this.props.getProfile()
  }
  _onRefresh(){
    this.props.getProfile()
  }
  DeleteAccount = () => {
    Alert.alert(
      '',
      'Аккоунтыг устгах уу ?',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          this.props.deleteProfile(),
          // releaseData(),
          this.props.navigation.navigate('LoginScreen')
        }},
      ],
      { cancelable: true },
    );
  }
  onLogout = () => {
    Alert.alert(
      '',
      'Та гарахдаа итгэлтэй байна уу ?',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          deleteAuthenticationToken(),
          // releaseData(),
          RNRestart.Restart();
          this.props.navigation.navigate('LoginScreen')
        }},
      ],
      { cancelable: true },
    );
  }
  renderSeparator = () => {
		return (
			<View
  				style={{
					marginVertical:10,
    				borderBottomColor: '#dcdcdc',
    				borderBottomWidth: 1,
  						}}
			/>
		);
	};
  renderLeftComponent(item){
    return(
        <View style={{margin:5,alignItems:'center'}}>
            <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => {this.props.navigation.navigate('EditProfile', {
                  item:item
              })}}
            >
                <Icon name="cog" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
  }
  renderRightComponent(){
    return(
        <View style={{margin:5,alignItems:'center'}}>
            <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => {this.onLogout()}}
            >
                <Icon name="sign-out" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
  }
  render() {
    const { profile, loading } = this.props
    const item = profile[0]
    return(
      <View style={styles.body}>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
          }}
          leftComponent={this.renderLeftComponent(item)}
          centerComponent={{ text: 'Профайл', style:styles.headerTitle }}
          rightComponent={this.renderRightComponent()}
        />
        {item==null?
        <ActivityIndicator/>
        :(
          <ScrollView style={styles.headerContent}>
            <RefreshControl
										refreshing={loading}
										onRefresh={this._onRefresh.bind(this)}
									/>
                  
              {item.ProPicture?
                  <Image style={[styles.avatar,{alignSelf: 'center',}]}
                    source={{uri: 'http://task.mn/content/'+item.ProPicture+''}}/>
                    :
                  <Image style={[styles.avatar,{alignSelf: 'center',}]}
                    source={{uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}/>
                }
                <View style={{marginBottom:10}}>
                  <Text style={[styles.name,{alignSelf: 'center', color:'#000'}]}>{item.FirstName} {item.LastName}</Text>
                </View>
              {item.Job?
                <View style={styles.infoView}>
                    <Text style={styles.titleInfo}>Ажил :</Text>
                    <Text style={styles.userInfo}>{item.Job}</Text>
                </View>
              :null
              }
              {item.UserEmail?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Имэйл :</Text>
                  <Text style={styles.userInfo}>{item.UserEmail}</Text>
                </View>
              :null
              }
              {item.Education?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Боловсрол :</Text>
                  <Text style={styles.userInfo}>{item.Education}</Text>
                </View>
              
              :null
              }
              {item.PhoneNumber?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Утас :</Text>
                  <Text style={styles.userInfo}>{item.PhoneNumber}</Text>
                </View>
              :null
              }
              {item.HomeAddress?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Гэрийн хаяг :</Text>
                  <Text style={styles.userInfo}>{item.HomeAddress}</Text>
                </View>
              :null
              }
              {item.Description?
                <View style={{marginTop:10 ,width:'80%',alignSelf:'center'}}>
                  <ViewMoreText
                    numberOfLines={3}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    textStyle={{textAlign: 'justify'}}
                  >
                    <Text style={styles.Description}>
                      {item.Description}
                    </Text>
                  </ViewMoreText>
                </View>
              :null
              }
              {this.renderSeparator()}
              <View>
                <Text style={styles.text}>Үнэлгээ</Text>
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Захиалагч({item.ORatings})</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    style={styles.rating}
                    startingValue={item.ORatings}
                  />
                </View>
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Гүйцэтгэгч({item.FLRatings})</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={item.FLRatings}
                  />
                </View>
              </View>
                
              {this.renderSeparator()}
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="paper-plane"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('SentBids',{ 
                        })
                    }}
                    title=" Илгээсэн саналууд"
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="inbox"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('RecieveBids',{
                        })
                    }}
                    title=" Ирсэн саналууд"
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="cc-visa"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('Account',{ 
                            item:item.PhoneNumber
                        })
                    }}
                    title=" Данс"
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="lock"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('ChangePass',{ 
                            item:item
                        })
                    }}
                    title=" Нууц үг солих"
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="trash"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#f28787',
                    }}
                    onPress={() => {
                          this.DeleteAccount()
                    }}
                    title=" Аккоунт устгах"
                  />
              </View>
              
          </ScrollView>
          )}
        </View>
     );
  }
}
export default connect(
  state => ({
   loading: state.profile.getIn(['profile_list', 'loading']),
   profile: state.profile.getIn(['profile_list', 'data']),
  }),
  dispatch => {
    return {
      getProfile: bindActionCreators(getProfile, dispatch),
    }
  }
)(ProfileView);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  body:{
    backgroundColor: "#FFF",
    flex:1,
  },
  headerContent:{
    marginHorizontal:10
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#4285F4",
    marginBottom:10,
  },
  userInfo:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
  },
  titleInfo:{
    fontSize:14,
    color:"#4285F4",
    fontWeight:'300',
  },
  rating:{

  },
  infoView:{
    width:'80%',
    alignSelf:'center',
    flexDirection:'row', 
    justifyContent:'space-between' 
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  text:{
    alignSelf:'center',

  },
  Description:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
    textAlign:'justify',
    
  }

})