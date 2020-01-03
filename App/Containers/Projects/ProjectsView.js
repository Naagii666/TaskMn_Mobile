// import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
// import React from 'react'
// import _ from 'lodash'
// import { fromJS } from "immutable";
// import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity,BackHandler,Dimensions} from 'react-native'
// //import all the basic component we have used
// import {  Card, ListItem, Button ,Header} from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import TouchableScale from 'react-native-touchable-scale';
// import moment from 'moment'
// import { getAllProjects,getUserProjects } from './ProjectsActions'
// import { Header as Header2 } from 'react-navigation';
// import { getAllWorkers } from '../Workers/WorkersActions'
// import HTML from 'react-native-render-html';
// const regex = /([&].*?[;])*(<.*?>)/ig;

// class ProjectsView extends React.Component {
// 	state = {
// 		ID:"",
// 		data:[],
// 		isMyProjects:true,
// 		workersData:[],
// 		worker:[]
// 	};
// 	setModalVisible(visible,item) {
// 		this.setState({modalVisible: visible});
// 		this.setState({data: item});
// 	  }
//   	componentDidMount() {
// 	//   this.props.getAllProjects()
// 	  this.props.getUserProjects()
// 	  this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
// 	  this.setState({ workersData: this.props.workers }); 
// 	}
// 	componentWillUnmount() {
// 		this.backHandler.remove()
// 	  }
// 	handleBackPress = () => {
// 		// this.goBack(); // works best when the goBack is async
// 		return true;
// 	}
// 	goBack(){
// 		if(this.state.modalVisible==true){
// 			this.setState({modalVisible: false});
// 			this.setState({data: null});
// 		}else{
// 			BackHandler.exitApp()
// 		}
// 	}
// 	switchScreen(value){
// 		// alert(value)
// 		this.setState({isMyProjects: value});
// 	}
// 	_onRefresh() {
// 		this.props.getAllProjects()
// 	}
// 	_onRefresh2() {
// 		this.props.getUserProjects()
// 	}

// 	_renderEmpty() {
// 		return <H3>Мэдэгдэл алга байна.</H3>
// 	}
// 	navigateDetail(){
// 		this.props.navigation.navigate('Stacks',{ProjectDetail
// 		})
// 	}
// 	renderSeparator = () => {
// 		return (
// 			<View
//   				style={{
// 					marginVertical:10,
//     				borderBottomColor: '#dcdcdc',
//     				borderBottomWidth: 1,
//   						}}
// 			/>
// 		);
// 	};
// 	keyExtractor = (item, index) => index.toString();

// 	renderItem = ({ item }) => (
// 				<Card
// 					  title={item.Name}
// 					  style={{backgroundColor:'#4285F4'}}
// 					//   image={require('../images/pic2.jpg')}>
// 				>
					
// 					<Text style={{marginBottom: 10,textAlign:'left',fontStyle: 'italic',color:'black'}}>
						
// 					Эхлэх хугацаа: {moment(item.StartDate).format("YYYY-MM-DD")}
//   					</Text>
// 					  <Text style={{marginBottom: 10,textAlign:'left',fontStyle: 'italic',color:'black'}}>
// 					Үнийн санал: {item.LowPrice}₮ - {item.HighPrice}₮
//   					</Text>
//   					<Text numberOfLines={3} style={{marginBottom: 10,}}>
//     					{item.Description.replace(regex,'')}
//   					</Text>
// 					  {/* <HTML html={item.Description} imagesMaxWidth={Dimensions.get('window').width} containerStyle={{numberOfLines:3}}/> */}
//   					<Button
// 						// icon={<Icon name='code' color='#ffffff' />}
// 						// onPress={() => this.setModalVisible(true,item)}
// 						onPress={() => {
// 							// alert(item.ID)
//         					this.props.navigation.navigate('ProjectDetail', {
// 								item:item,
// 								isMyProjects:this.state.isMyProjects,
// 							})
//       					}}
//     					buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor:'#4285F4'}}
//     					title='Дэлгэрэнгүй' />
// 				</Card>
// 	)
// 	EmptyComponent = ({ title }) => (
// 		<View style={styles.emptyContainer}>
// 		  <Text style={styles.emptyText}>{title}</Text>
// 		</View>
// 	  );
// 	renderLeftComponent(){
// 		return(
// 			<View style={{flex:1}} >
// 				<TouchableOpacity 
// 						onPress={() => {
//                   			this.setModalVisible(!this.state.modalVisible,this.state.data);
//                 		}}>
// 					<View >
// 						<Icon name="chevron-left" size={16} color="#fff"/>
// 						{/* <Text style={{color:"#fff", fontSize:10}}>Буцах</Text> */}
// 					</View>
					
// 				</TouchableOpacity>
// 			</View>
// 		)
// 	}
//  	render() {
// 		const { projects, loading } = this.props
// 		const { userProjects, loading2 } = this.props
// 		return (
			
// 			<View style={{marginBottom:60}}>
// 				<View style={{flex:1,flexDirection:'row', backgroundColor:'dcdcdc',marginVertical:20,marginHorizontal:10,alignContent:'center'}}>
// 						<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.buttonContainer,styles.isActive]):([styles.buttonContainer])}
// 							onPress={() => this.switchScreen(true)}>
// 							<Text style={{color:'#4285F4',marginBottom:2}}>Сүүлд нэмэгдсэн</Text>
// 						</TouchableHighlight>
// 						<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.buttonContainer]):([styles.buttonContainer,styles.isActive])}
// 							onPress={() => this.switchScreen(false)}>
// 							<Text style={{color:'#4285F4',marginBottom:2}}>Миний ажлууд</Text>
// 						</TouchableHighlight>	
// 				</View>

// 				{this.state.isMyProjects ? (
				
// 				<View>
//             	{	
// 					loading ? (
// 						<ActivityIndicator />
// 					) : (
// 					<FlatList
// 						refreshControl={
// 						<RefreshControl
// 							refreshing={loading}
// 							onRefresh={this._onRefresh.bind(this)}
// 						/>
// 					}
// 					keyExtractor={this.keyExtractor}
// 					data={projects}
// 					renderItem={this.renderItem}
// 					ListEmptyComponent={
// 						<this.EmptyComponent title="Ажил олдсонгүй" />
// 					}
// 					/>
// 					)
// 				}
// 				</View>):(
// 					<View>
// 						{	
// 						loading2 ? (
// 							<ActivityIndicator />
// 						) : (
// 						<FlatList
// 							refreshControl={
// 							<RefreshControl
// 								refreshing={loading}
// 								onRefresh={this._onRefresh2.bind(this)}
// 							/>
// 						}
// 						keyExtractor={this.keyExtractor}
// 						data={userProjects}
// 						renderItem={this.renderItem}
// 						ListEmptyComponent={
// 							<this.EmptyComponent title="Ажил олдсонгүй" />
// 						}
						
// 						/>
// 						)
// 						}
// 					</View>
// 					)
// 					}
// 				</View>
// 		)
// 	}
// }

// export default connect(
//    state => ({
// 		loading: state.project.getIn(['project_list', 'loading']),
// 		projects: state.project.getIn(['project_list', 'data']),
// 		loading2: state.project.getIn(['user_projects', 'loading']),
// 		userProjects: state.project.getIn(['user_projects', 'data']),
// 		workers: state.workers.getIn(['workers_list', 'data']),
//    	   	// projects: state.project.getIn(['project_list', 'data']).toJS(),
//    }),
//    dispatch => {
//      return {
// 		 getAllProjects: bindActionCreators(getAllProjects, dispatch),
// 		 getUserProjects: bindActionCreators(getUserProjects, dispatch),
// 		 getProfile: bindActionCreators(getAllWorkers, dispatch),
//      }
//    }
// )(ProjectsView);

// const styles = StyleSheet.create({
//   thumb: {
//     width: 80,
//     height: 80,
//     marginRight: 10
// 	},
// 	emptyContainer:{
// 		alignItems:'center',
// 		marginTop:10
// 	  },
// 	textContainer: {
//     flex: 1
// 	},
// 	rowContainer: {
//     flexDirection: 'row',
//     padding: 10,
// 	},
// 	newsName: {
//     fontSize: 18,
//     // fontWeight: 'bold',
//     color: 'black'
// 	},
// 	title: {
//     fontSize: 14,
//     color: '#656565'
//   },
//   container:{
// 	margin:20
//   },
//   constContainer:{
// 	left:0,
// 	right:0,
// 	bottom:0,
// 	height:'10%',
// 	backgroundColor:'#fff',
// 	borderTopWidth:2,	
// 	borderTopColor:'#dcdcdc',
// 	flexDirection:'row',
// 	alignSelf:'center'
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
//   bidButton:{
// 	backgroundColor:'#4285F4',
// 	alignContent:'center',
//     justifyContent: 'center',
// 	width:'30%',
// 	alignSelf:'flex-end',
// 	marginRight:'10%',
// 	borderRadius:10,
// 	height:'70%',
// 	marginVertical:10,
// 	justifyContent:'center'

//   },
//   backButton:{
// 	backgroundColor:'#B3B3B3',
// 	alignContent:'center',
//     justifyContent: 'center',
// 	width:'30%',
// 	alignSelf:'flex-start',
// 	marginLeft:'10%',
// 	borderRadius:10,
// 	height:'70%',
// 	marginVertical:10,
// 	justifyContent:'center'
//   },
//   bidText:{
// 	color:'#fff',
// 	// fontWeight:'bold',
// 	fontSize:16,
// 	justifyContent:'center',
// 	textAlign:'center'
//   },
//   isActive:{
// 	borderBottomColor:'#4285F4',
// 	borderBottomWidth:3,
//   }
// });

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity,BackHandler,Dimensions} from 'react-native'
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { getAllProjects,getUserProjects , getProgressProjects} from './ProjectsActions'
import { Header as Header2 } from 'react-navigation';

const testWorkProgress = []
class ProjectsView extends React.Component {
	state = {
		ID:"",
		data:[],
		isMyProjects:true,
		workersData:[],
		worker:[]
	};
  	componentDidMount() {
	  this.props.getUserProjects()
	  this.props.getProgressProjects()
	}
	switchScreen(value){
		this.setState({isMyProjects: value});
	}
	navigateDetail(){
		this.props.navigation.navigate('Stacks',{ProjectDetail
		})
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
	keyExtractor = (item, index) => index.toString();
	_onRefresh() {
		this.props.getUserProjects()
	}
	_onRefresh2() {
		this.props.getProgressProjects()
	}
	renderItem = ({ item }) => (
				<View style={{justifyContent:'space-between',flexDirection:'column'}}>
					<TouchableOpacity style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}
						onPress={() => {
        					this.props.navigation.navigate('ProjectDetail', {
								item:item
							}
						)}}>
						<View style={{width:'90%'}}>
							<Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>
								{item.Name}
							</Text>
							<Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#A7A7A7'}}>
								{item.LowPrice}₮ - {item.HighPrice}₮ / Эхлэхэд өдөр : {item.StartDate}
							</Text>
						</View>
						<View style={{alignSelf:'center'}}>
							<Icon name="chevron-right" size={16} color="#4285F4"/>
						</View>
					</TouchableOpacity>
				</View>
	);
	renderItem2 = ({ item }) => (
		<View style={{justifyContent:'space-between',flexDirection:'column'}}>
			<TouchableOpacity style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}
				onPress={() => {
					if(item.Status=='Pending'){
						this.props.navigation.navigate('PendingProject', {
							item:item
						})
					}else{
						// this.props.getMilestones(item.ProjectID);
						this.props.navigation.navigate('inProgress', {
							item:item
						})
					}
				}}>
				<View style={{width:'90%'}}>
					<Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>
						{item.Name}
					</Text>
					<Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#A7A7A7'}}>
						Саналын төлөв : {item.Status}
					</Text>
				</View>
				<View style={{alignSelf:'center'}}>
					<Icon name="chevron-right" size={16} color="#4285F4"/>
				</View>
			</TouchableOpacity>
		</View>
	);
	EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
	);
 	render() {
	const { userProjects, loading2 ,progressProjects, loading3 } = this.props
     return(
      <View style={styles.body}>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
		  }}
          centerComponent={{ text: 'Миний ажлууд', style: styles.headerTitle }}
        />
		<View style={styles.body}>
		  	<View style={styles.switcher}>
				<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.switchButton,						styles.isActive]):([styles.switchButton])}
								onPress={() => this.switchScreen(true)}>
						<Text style={this.state.isMyProjects?{color:'#FFF'}:{color:'#4285F4'}}>Захиалсан ажлууд</Text>
				</TouchableHighlight>

			  	<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.switchButton]):([styles.switchButton,styles.isActive])}
								onPress={() => this.switchScreen(false)}>
						<Text style={this.state.isMyProjects?{color:'#4285F4'}:{color:'#FFF'}}>Хийгдэж буй ажлууд</Text>
				</TouchableHighlight>
			</View>
		  	<View style={styles.container}>
				{this.state.isMyProjects?(
					<View>
						{loading2 ? (
							<ActivityIndicator />
						) : (
							<FlatList
								refreshControl={
									<RefreshControl
										refreshing={loading2}
										onRefresh={this._onRefresh.bind(this)}
									/>
								}
								keyExtractor={this.keyExtractor}
								// data={userProjects}
								ItemSeparatorComponent={this.renderSeparator}
								data={userProjects}
								renderItem={this.renderItem}
								ListEmptyComponent={
									<this.EmptyComponent title="Захиалсан ажил байхгүй байна." />
								}
							/>
						)}
					</View>
					):(
						<View>
						{loading3 ? (
							<ActivityIndicator />
						) : (
							<FlatList
								refreshControl={
									<RefreshControl
										refreshing={loading3}
										onRefresh={this._onRefresh2.bind(this)}
									/>
								}
								keyExtractor={this.keyExtractor}
								// data={userProjects}
								ItemSeparatorComponent={this.renderSeparator}
								data={progressProjects}
								renderItem={this.renderItem2}
								ListEmptyComponent={
									<this.EmptyComponent title="Хийгдэж буй ажил байхгүй байна." />
								}
							/>
						)}
					</View>
				)

				}
			</View>
		</View>
      </View>
     )
	}
}

export default connect(
   state => ({
		loading: state.project.getIn(['project_list', 'loading']),
		projects: state.project.getIn(['project_list', 'data']),
		loading2: state.project.getIn(['user_projects', 'loading']),
		userProjects: state.project.getIn(['user_projects', 'data']),
		loading3: state.project.getIn(['progress_projects', 'loading']),
		progressProjects: state.project.getIn(['progress_projects', 'data']),
			  // projects: state.project.getIn(['project_list', 'data']).toJS(),
		// milestones: state.workers.getIn(['milestone_list', 'data']),
        // loading4: state.workers.getIn(['milestone_list', 'loading']),
   }),
   dispatch => {
     return {
		 getAllProjects: bindActionCreators(getAllProjects, dispatch),
		 getUserProjects: bindActionCreators(getUserProjects, dispatch),
		 getProgressProjects: bindActionCreators(getProgressProjects, dispatch),
		//  getMilestones: bindActionCreators(getMilestones, dispatch),
     }
   }
)(ProjectsView);

const styles = StyleSheet.create({
	body:{
		backgroundColor:'#FFF',
		height:'100%',
		marginBottom:'10%'
	},
	headerTitle: {
		color: '#fff',
		alignSelf:'center',
		fontSize:18 ,
		fontWeight:'bold',
		flex:1
	},
	switcher:{
		width:'80%',
		borderWidth:1,
		borderColor:'#4285F4',
		flexDirection:'row',
		alignSelf:'center',
		marginVertical:10,
		justifyContent: 'space-between',

	},
	isActive:{
		backgroundColor:'#4285F4',
		borderBottomColor:'#4285F4',
		borderBottomWidth:3,
	},
	switchButton:{
		width:'50%',
		alignItems:'center'
	},
	container:{
		backgroundColor:'#FFF',
		marginHorizontal:10
	},
	emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
	}
});

