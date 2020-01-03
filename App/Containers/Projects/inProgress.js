// import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
// import React from 'react'
// import _ from 'lodash'
// import { fromJS } from "immutable";
// import { Table, Row, Rows,Cell,TableWrapper } from 'react-native-table-component';
// import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity,BackHandler,TextInput,Dimensions} from 'react-native'
// //import all the basic component we have used
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { Header as Header2 } from 'react-navigation';
// import moment from 'moment'
// import {  Card, ListItem, Button ,Header,Overlay } from 'react-native-elements'
// import { getAllWorkers } from '../Workers/WorkersActions'
// import { onBidProject,getBidListHire } from './ProjectsActions'
// import HTML from 'react-native-render-html';
// import ImageView from 'react-native-image-view';
// class ProjectDetail extends React.Component {
// 	constructor(props) {
// 		super(props);
// 			this.state = {
// 				data:[],
// 				isVisible : false,
// 				bidView: false,
// 				userName:'',
// 				Price:'',
// 				Duration:'',
// 				Description:'',
// 				projectID:'',
// 				isImageViewVisible:false,
// 			};
// 	}

	
// 	viewImage(){
// 		this.setState({isImageViewVisible: false});
// 	}
// 	_onRefresh() {
// 		this.props.getBidListHire()
// 	}
// 	keyExtractor = (item, index) => index.toString();
// 	BidProject(){
// 		const item = this.props.navigation.getParam('item', []);
// 		this.setState({projectID:item.ID})
// 		let error = this.formValidate()
// 		if(error) return
// 		this.props.onBidProject(this.state)
// 		this.setState({isVisible: false})
// 	}
// 	formValidate(){
// 		let { Price ,Duration,Description } = this.state
// 		if(!Price) {
// 		Alert.alert('','Үнийн саналаа оруулна уу!')
// 		return true
// 		}
// 		if(!Duration) {
// 		Alert.alert('','Ажиллах хугацаагаа оруулна уу!')
// 		return true
// 		}
// 	}
// 	componentWillReceiveProps(){
// 		this.setState({data: this.props.navigation.getParam('item', []) });
// 		this.findUser()
// 	}
// 	findUser(){
// 		const workers = this.props.workers
// 		const item = this.props.navigation.getParam('item', []);
// 		var data = null
// 		workers.forEach((worker) => {
// 			if(worker.UserID === item.UserID) {
// 				this.setState({userName: worker.UserName });
// 				data = worker;
// 		}
// 	})
// 	return data
// 	}
// 	findUserName(lancerID){
// 		const workers = this.props.workers
// 		const item = this.props.navigation.getParam('item', []);
// 		var data = null
// 		workers.forEach((worker) => {
// 			if(worker.UserID === lancerID) {
// 				data = worker.UserName;
// 		}
// 	})
// 	return data
// 	}
// 	componentDidMount() {
		
// 		this.props.getAllWorkers()
// 		this.props.getBidListHire()
// 	}
// 	// componentWillMount() {
// 	// 	const item = this.props.navigation.getParam('item', []);
// 	// 	this.setState({data:item})
// 	// }
// 	componentWillUnmount() {
// 		this.backHandler.remove()
// 	}
// 	handleBackPress = () => {
// 		this.goBack(); // works best when the goBack is async
// 		return true;
// 	}
// 	goBack(){
// 		this.setState({bidView: false});
// 		this.props.navigation.navigate('Tabs',{
// 		})
// 	}
// 	bidClicked(){
// 		this.setState({isVisible: true});
// 	}
// 	renderLeftComponent(){
// 		return(
// 			<View style={{flex:1}} >
// 				<TouchableOpacity 
// 						onPress={() => {
// 							this.props.navigation.navigate('Tabs',{
// 							})
//             			}}>
// 					<View >
// 						<Icon name="chevron-left" size={16} color="#fff"/>
// 						{/* <Text style={{color:"#fff", fontSize:10}}>Буцах</Text> */}
// 					</View>
					
// 				</TouchableOpacity>
// 			</View>
// 		)
// 	}
// 	renderRightComponent(){
// 		const isMyProjects = this.props.navigation.getParam('isMyProjects', 'true');
// 		return(
			
// 			<View >
// 				{
// 				isMyProjects?
// 						<TouchableOpacity style={[styles.bidButton]} 
//                   					onPress={() => this.bidClicked()}
// 						>
//                   			<Text style={styles.bidText}>Санал өгөх</Text>
//                 		</TouchableOpacity>
// 				:
// 						<TouchableOpacity style={[styles.bidButton]} 
//                   					// onPress={() => this._onLoginFunction()}
// 						>
//                   			<Text style={styles.bidText}>Санал харах</Text>
//                 		</TouchableOpacity>
// 				}
// 			</View>
					
// 		)
// 	}
// 	deleteProject(){
// 		Alert.alert(
// 			'',
// 			'Энэ ажлыг устгах уу ?',
// 			[
// 			  {
// 				text: 'Үгүй',
// 				onPress: () => console.log('Cancel Pressed'),
// 				style: 'cancel',
// 			  },
// 			  {text: 'Тийм', onPress: () => {
				
// 			  }},
// 			],
// 			{ cancelable: true },
// 		  );
		  
// 	}
// 	navigateDetail(item){
// 		this.props.navigation.navigate('WorkerDetail',{
// 		  item: item
// 		  })
// 	  }
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
// 	EmptyComponent = ({ title }) => (
// 		<View style={styles.emptyContainer}>
// 		  <Text style={styles.emptyText}>{title}</Text>
// 		</View>
// 	  );
// 	renderLeftComponentModal(){
// 		return(
// 			<View style={{flex:1}} >
// 				<TouchableOpacity 
// 						onPress={() => {
// 							this.setState({bidView: false});
//                 		}}>
// 					<View >
// 						<Icon name="chevron-left" size={16} color="#fff"/>
// 						{/* <Text style={{color:"#fff", fontSize:10}}>Буцах</Text> */}
// 					</View>
					
// 				</TouchableOpacity>
// 			</View>
// 		)
// 	}

// 	_renderEmpty() {
// 		return <H3>Мэдэгдэл алга байна.</H3>
// 	}
// 	renderItem = ({ item }) =>{ 
// 		const data = this.props.navigation.getParam('item', []);
// 		// let TableData = item.forEach((item) => [this.findUserName(item.LancerID),item.Description, item.Cap, item.Time])
// 		// let TableData = ['Нэр','Тайлбар','Үнийн санал', 'Хугацаа','Үйлдэл']
//     	// let TableHead = ['Нэр','Тайлбар','Үнийн санал', 'Хугацаа','Үйлдэл']
// 		return(
// 		<View>
// 			{/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
//               <Row data={TableHead} flexArr={[2, 2, 2,2,2]}  />
//               <Rows data={TableData} flexArr={[2, 2, 2,2,2]} />
//             </Table> */}
// 			{data.ID==item.ProjectID?
// 			<View>
// 			<Text>{item.Cap}</Text>
// 			<Text>{item.Time}</Text>
// 			<Text>{item.Description}</Text>
// 			<TouchableOpacity>
// 				<Text>Зөвшөөрөх</Text>
// 			</TouchableOpacity>
// 			</View>:null
// 			}
// 		</View>
// 		)
// 	}

//   render() {
// 	const { navigation } = this.props;
// 	const { workers, loading ,bid_list_hire,loading2} = this.props
// 	const item = navigation.getParam('item', []);
// 	const isMyProjects = navigation.getParam('isMyProjects', 'true');
// 	const regex = /([&].*?[;])*(<.*?>)/ig;
// 	const images = [
// 		{
// 			source: {
// 				uri: 'https://www.w3schools.com/w3css/img_lights.jpg',
// 			},
// 			title: 'Paris',
// 			width: 806,
// 			height: 720,
// 		},
// 	];
//     return (
//       <View style={{flex:1}}>
//         <Header
// 			containerStyle={{
// 				height:Header2.HEIGHT,
// 				backgroundColor: '#4285F4',
// 			}}
// 			leftComponent={this.renderLeftComponent()}
// 			centerComponent={{ text: item.TypeName, style: { color: '#fff',flex:1,fontWeight:'bold',fontSize:18 } }}
// 			// rightComponent={this.renderRightComponent()}
// 		/>
		
// 				<ScrollView>
					
// 				<Overlay
//   					isVisible={this.state.isVisible}
//   					onBackdropPress={() => this.setState({ isVisible: false })}
// 				>
// 					<Header
// 						containerStyle={{
// 							height:Header2.HEIGHT,
// 							backgroundColor: '#4285F4',
// 						}}
// 						centerComponent={{ text: 'Ажлын санал', style: { color: '#fff',flex:1,fontWeight:'bold',fontSize:14 } }}
// 					/>
// 					<View style={{flexDirection:'row',alignSelf:'center'}}>
// 						<Text style={{color:'#2D3954'}}>Ажлын саналын </Text>
// 						<Text style={{color:'#ff5722'}}>форм</Text>
// 					</View>
// 					<View style={{marginTop:10}}>
// 					<Text style={styles.formText}>
// 						Ажлын хөлс/төгрөгөөр/
// 					</Text>
// 					<TextInput style={styles.inputs}
//                   		placeholder="100000 , 5000 ..."
//                   		keyboardType="numeric"
//                   		underlineColorAndroid='transparent'
//                   		onChangeText={(Price) => this.setState({Price})}
// 					/>
// 					<Text  style={styles.formText}>
// 					Ажиллах хугацаа/хоногоор/
// 					</Text>
					
// 					<TextInput style={styles.inputs}
//                   		placeholder="30"
//                   		keyboardType="numeric"
//                   		underlineColorAndroid='transparent'
//                   		onChangeText={(Duration) => this.setState({Duration})}
// 					/>
// 					<Text  style={styles.formText}>
// 					Тайлбар
// 					</Text>
					
// 					<TextInput style={styles.inputs}
//                   		placeholder="Давуу тал , тайлбар ..."
//                   		underlineColorAndroid='transparent'
//                   		onChangeText={(Description) => this.setState({Description})}
// 					/>
						
					
// 						<Text  style={styles.formText}>
// 							Чадвар
// 						</Text>
// 						<View style={{flexDirection:'row',}}>
// 							<TouchableOpacity style={[styles.comfirmButton,{alignContent:'center',
// 														justifyContent: 'center',}]} 
// 										onPress={() => this.BidProject()}
// 										>
// 										<Text style={{color:'#fff',justifyContent:'center',
// 														textAlign:'center',}}>Батлах</Text>
// 							</TouchableOpacity>
// 							<TouchableOpacity style={[styles.closeButton,{alignContent:'center',
// 														justifyContent: 'center',}]} 
// 										onPress={() => this.setState({isVisible: false})}
// 										>
// 										<Text style={{color:'#fff',justifyContent:'center',
// 														textAlign:'center',}}>Хаах</Text>
// 							</TouchableOpacity>
// 						</View>
						
// 					</View>
					
// 				</Overlay>


// 				<Modal
// 						visible={this.state.bidView}
// 						animationType="slide"
//           				transparent={false}
// 				>
// 					<Header
// 						containerStyle={{
// 							height:Header2.HEIGHT,
// 							backgroundColor: '#4285F4',
// 						}}
// 						leftComponent={this.renderLeftComponentModal()}
// 						centerComponent={{ text: ' Санал өгсөн хэрэглэгчид', style: { color: '#fff',flex:1,fontWeight:'bold',fontSize:14 } }}
// 					/>
// 				<View>
// 					<ScrollView>
//        				 {	
// 						loading2 ? (
// 							<ActivityIndicator />
// 						) : (
// 							<FlatList
// 							refreshControl={
// 								<RefreshControl
// 								refreshing={loading2}
// 								onRefresh={this._onRefresh.bind(this)}
// 								/>
// 							}
// 							ListEmptyComponent={
// 								<this.EmptyComponent title="Санал байхгүй байна." />
// 							  }
// 							keyExtractor={this.keyExtractor}
// 							data={bid_list_hire}
// 							renderItem={this.renderItem}
// 							/>
// 							// this.renderItem(bid_list_hire)
// 						)
// 					}
// 					</ScrollView>
// 				</View>
					
					
// 				</Modal>

//           			<View style={styles.container}>
//             			<View>
// 							{/* <Icon name={item.TypePictures} size={20} color="#4285F4"/> */}
// 							<Text style={{textAlign:'left',color:'black',fontSize:20,fontWeight:'bold',flexDirection:'row'}}>		   	
// 								{item.Name}
// 							</Text>
// 							<View style={{marginVertical:10}}>
// 								<Text style={{color:'#4285F4'}}>
// 									Эхлэх хугацаа : <Text style={{color:'black'}} >{item.StartDate}</Text>
// 								</Text>
// 								<Text style={{color:'#4285F4'}}>
// 									Саналын тоо: <Text style={{color:'black'}} >{item.AllowBidNumber?item.AllowBidNumber:'0'}</Text>
// 								</Text>
// 							</View>
// 							<View style={{marginVertical:10}}>
// 								<HTML html={item.Description} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{color:'black'}}/>
// 									{/* {item.Description.replace(regex, '')} */}
								
// 							</View>
// 							{this.renderSeparator()}
// 							<View style={{marginVertical:10}}>
// 								<Text style={{color:'#4285F4',}}>Үнийн санал</Text>
// 								<Text style={{fontSize:18,color:'black',marginTop:5,}}>
// 									{item.LowPrice}₮-{item.HighPrice}₮
// 								</Text>
// 							</View>
// 							{isMyProjects?
								
// 							<View>
// 							{this.renderSeparator()}
								
// 								<View style={{marginVertical:10}}>
// 									<Text style={{color:'#4285F4',}}>Захиалагч</Text>
// 									<TouchableOpacity 
//                   					 onPress={() => this.navigateDetail(this.findUser())}
// 									  >
//                   						<Text style={{fontSize:18,color:'#3389ff',marginTop:5,}}>
// 											{this.findUserName(item.UserID)}
// 										</Text>
//                 					</TouchableOpacity>
									
// 								</View>
// 							</View>
// 							:
// 							null
							
// 							}
// 							{this.renderSeparator()}
// 							<View style={{marginVertical:10}}>
// 								<Text style={{color:'#4285F4'}}>
// 									Шаардагдах ур чадварууд
// 								</Text>
// 								<View style={{justifyContent: 'flex-start',width:'auto'}}>
// 									<Text style={{marginTop:5,color:'black',flexDirection:'row',fontSize:15}}>		
// 										{item.Skills}
// 									</Text>
// 								</View>
// 							</View>
// 							{this.renderSeparator()}
// 							<View style={{marginVertical:10}}>
// 							<Text style={{color:'#4285F4'}}>
// 									Зураг 
// 								</Text>
// 							</View>
// 							<View style={{marginBottom:50,width: 100, height: 100}}>
// 							<TouchableOpacity style={{flex:1}} onPress={() =>  this.setState({ isImageViewVisible: true })}>
// 								<Image
// 									style={{width: 100, height: 100}}
// 									source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
// 								/>
// 							</TouchableOpacity>
// 							<ImageView
// 								images={images}
// 								imageIndex={0}
// 								isSwipeCloseEnabled={true}
// 								isPinchZoomEnabled={true}
// 								isTapZoomEnabled={true}
// 								isVisible={this.state.isImageViewVisible}
// 								onClose = {() =>  this.setState({ isImageViewVisible: false })}
// 								// renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
// 							/>
// 							</View> 
//             			</View>
//           			</View>
// 				</ScrollView>
// 				{
// 							isMyProjects?
// 							<View style={styles.constContainer}>
// 								<TouchableOpacity style={[styles.backButton]} 
//                   					onPress={() => {
// 										this.props.navigation.navigate('Tabs',{
// 										})
// 								  	}}
// 									  >
//                   					<Text style={styles.bidText}>Буцах</Text>
//                 				</TouchableOpacity>
// 								<TouchableOpacity style={[styles.bidButton]} 
//                   					onPress={() => this.bidClicked()}
// 									  >
//                   					<Text style={styles.bidText}>Санал өгөх</Text>
//                 				</TouchableOpacity>
								
// 							</View>
// 							:
// 							<View style={styles.constContainer}>
// 								<TouchableOpacity style={[styles.deleteButton]} 
//                   					onPress={() => {
// 										this.deleteProject()
// 								  	}}
// 									  >
//                   					<Text style={styles.bidText}>Устгах</Text>
//                 				</TouchableOpacity>
// 								<TouchableOpacity style={[styles.bidButton]} 
// 									  onPress={() => this.setState({ bidView: true  })}
// 									  >
//                   					<Text style={styles.bidText}>Санал харах</Text>
//                 				</TouchableOpacity>
								
// 							</View>
// 						}
			
//         </View>
//     )
  
//   }
// }
// export default connect(
// 	state => ({
// 		loading: state.workers.getIn(['workers_list', 'loading']),
// 		workers: state.workers.getIn(['workers_list', 'data']),
// 		loading2: state.project.getIn(['bid_list_hire', 'loading']),
// 		bid_list_hire: state.project.getIn(['bid_list_hire', 'data']),
// 			   // projects: state.project.getIn(['project_list', 'data']).toJS(),
// 	}),
// 	dispatch => {
// 	  return {
// 		onBidProject: bindActionCreators(onBidProject, dispatch),
// 		getBidListHire: bindActionCreators(getBidListHire, dispatch),
// 		getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
		
// 	  }
// 	}
//  )(ProjectDetail)
// // export default ProjectDetail

// const styles = StyleSheet.create({
// 	formText:{
// 		color:'#2D3954'
// 	},
// 	comfirmButton:{
// 		backgroundColor:'#4285F4',
// 		width:'40%',
// 		height:40,
// 		borderRadius:5,
// 		alignSelf:'flex-start',
// 		marginTop:50,
// 		alignItems:'center',
// 		marginHorizontal:'5%'
// 	},
// 	closeButton:{
// 		backgroundColor:'#B3B3B3',
// 		width:'40%',
// 		height:40,
// 		borderRadius:5,
// 		alignSelf:'flex-end',
// 		alignItems:'center',
// 		marginHorizontal:'5%'
// 	},
// 	emptyContainer:{
// 		alignItems:'center',
// 		marginTop:20 
// 	  },
// 	  emptyText:{
// 		marginTop:20 ,
// 		color:'black'
// 	  },
// 	  container:{
// 		margin:20
// 	  },
// 	  inputs:{
// 		borderColor:'#4285F4',
// 		borderWidth:1,
// 		width:'90%',
//       	height:45,
//       	marginVertical:10,
// 	  },
	  
// 	  buttonContainer: {
// 		height:20,
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		width:'40%',
		
// 		// backgroundColor: "#red",
// 		marginHorizontal:'5%',
// 	  },
// 	  bidButton:{
// 		backgroundColor:'#69d275',
// 		// marginBottom:20,
// 		alignContent:'center',
// 		justifyContent: 'center',
// 		height:'70%',
// 		width:'40%',
// 		borderWidth:1,
// 		borderColor:'#27b737',
// 		borderRadius:10,
// 		marginHorizontal:'5%',
// 		marginVertical:5
// 	  },
// 	  backButton:{
// 		backgroundColor:'#B3B3B3',
// 		alignContent:'center',
// 		justifyContent: 'center',
// 		width:'40%',
// 		borderRadius:10,
// 		height:'70%',
// 		borderWidth:1,
// 		borderColor:'#B3B3B3',
// 		marginHorizontal:'5%',
// 		marginVertical:5
// 	  },
// 	  deleteButton:{
// 		backgroundColor:'#f28787',
// 		alignContent:'center',
// 		justifyContent: 'center',
// 		width:'40%',
// 		borderRadius:10,
// 		height:'70%',
// 		borderWidth:1,
// 		borderColor:'#ec7a73',
// 		marginHorizontal:'5%',
// 		marginVertical:5
// 	  },
// 	  constContainer:{
// 		left:0,
// 		right:0,
// 		bottom:0,
// 		height:Header2.HEIGHT,
// 		backgroundColor:'#fff',
// 		borderTopWidth:2,	
// 		borderTopColor:'#dcdcdc',
// 		flexDirection:'row',
// 		// alignSelf:'center'
// 		position:'absolute',
// 		flex:0.1,
// 	  },
// 	  bidText:{
// 		color:'#fff',
// 		// fontWeight:'bold',
// 		fontSize:14,
// 		justifyContent:'center',
// 		textAlign:'center',
// 		flexDirection:'row'
// 	  },
// 	  isActive:{
// 		borderBottomColor:'#4285F4',
// 		borderBottomWidth:3,
// 	  }
// });

//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler,Alert,TextInput,FlatList,RefreshControl} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html';
import ImageView from 'react-native-image-view';
import { onDeleteProject ,getUserProjects ,getMilestones} from './ProjectsActions'
import { getAllWorkers } from '../Search/WorkersActions'
class inProgress extends React.Component {   
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation} = this.props;
        const item = navigation.getParam('item', []);
		this.props.getMilestones(item.ProjectID)
    }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
    }
    goBack(){
        this.setState({bidView: false});
        this.props.navigation.navigate('Tabs',{
        })
    } 
    findUser(lancerID){
        const workers = this.props.workers
            var data = null
            workers.forEach((worker) => {
                if(worker.UserID === lancerID) {
                    // this.setState({userName: worker.UserName });
                    data = worker;
              }
        })
        return data
      }
    findUserName(lancerID){
            const workers = this.props.workers
            var data = null
            workers.forEach((worker) => {
                if(worker.UserID === lancerID) {
                    data = worker.UserName;
          }
        })
          return data
      }
    deleteProject(ID){
	    Alert.alert(
            '',
            'Энэ ажлыг устгах уу ?',
            [
                {
                text: 'Үгүй',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                {text: 'Тийм', onPress: () => {
                    this.props.onDeleteProject(ID),
                    this.props.getUserProjects()
                    this.props.navigation.navigate('Tabs',{
                    })
                }},
            ],
            { cancelable: true },
            );
	}
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                            this.props.navigation.navigate('Tabs',{
                      })
                }}>
					<View style={{flexDirection:'row'}}>
                        <Icon name="chevron-left" size={16} color="#fff"/>
                        <Text style={{color:'#FFF'}}> Буцах</Text>
                    </View>
				</TouchableOpacity>
			</View>
        )
    }
    EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
	);
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
    navigateDetail(item){
		this.props.navigation.navigate('WorkerDetail',{
		  item: item
		  })
    }
    keyExtractor = (item, index) => index.toString();
	_onRefresh(id) {
		this.props.getMilestones(id)
	}
    renderItem = ({ item }) => (
       <View>
           {alert(item.TaskName)}
           {item.TaskName}
       </View>
    );
    render() {
        const { navigation ,loading2 , milestones } = this.props;
        const item = navigation.getParam('item', []);

        return(
        <View style={{flex:1}}>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: item.Name, style:styles.headerTitle }}
            />
            <ScrollView >
                <View style={{marginHorizontal:10}}>
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                           Зөвшөөрөгдсөн санал
                        </Text>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'column', }}>
                            <View style={styles.body}>
                                <View style={styles.container}>
                                    <Text style={styles.titleInfo}>Хугацаа :</Text>
                                    <Text style={styles.titleInfo}>{item.Time + ' хоног'}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.titleInfo}>Үнэийн санал :</Text>
                                    <Text style={styles.titleInfo}>{item.Cap+' ₮'}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.titleInfo}>Тайлбар :</Text>
                                    <TextInput
                                        style={styles.Summary}
                                        numberOfLines={10}
                                        ellipsizeMode="head"
                                        keyboardType="default"
                                        multiline={true}
                                        underlineColorAndroid='transparent'
                                        selectTextOnFocus={false}
                                        editable={false}
                                        value={item.BidDescription}/>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.titleInfo}>Гүйцэтгэгч :</Text>
                                    <TouchableOpacity 
                                            onPress={() => this.navigateDetail(this.findUser(item.LancerID))}
                                    >
                                            <Text style={{fontSize:18,color:'#3389ff'}}>
                                    {this.findUserName(item.LancerID)}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                           Milestones
                        </Text>
                    </View>
                    <View>
                        {loading2 ? (
							<ActivityIndicator />
						) : (
							<FlatList
								refreshControl={
									<RefreshControl
										refreshing={loading2}
										onRefresh={this._onRefresh(item.ProjectID)}
									/>
								}
								keyExtractor={this.keyExtractor}
								// data={userProjects}
								ItemSeparatorComponent={this.renderSeparator}
								data={milestones}
								renderItem={this.renderItem}
								ListEmptyComponent={
									<this.EmptyComponent title="Даалгавар байхгүй." />
								}
							/>
						)}
                    </View>
                </View>
            </ScrollView>
            
        </View>
        
        );
    }
}
export default connect(
    state => ({
            loading: state.project.getIn(['on_delete_project', 'loading']),
                // projects: state.project.getIn(['project_list', 'data']).toJS(),
            milestones: state.workers.getIn(['milestone_list', 'data']),
            loading2: state.workers.getIn(['milestone_list', 'loading']),
            workers: state.workers.getIn(['workers_list', 'data']),
            loading3: state.workers.getIn(['on_choose_bid', 'loading']),

    }),
    dispatch => {
        return {
            onDeleteProject: bindActionCreators(onDeleteProject, dispatch),
            getUserProjects: bindActionCreators(getUserProjects, dispatch),
            getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
            getMilestones:  bindActionCreators(getMilestones, dispatch),
        }
    }
)(inProgress);;
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  backButton:{
    backgroundColor:'#B3B3B3',
    alignContent:'center',
    justifyContent: 'center',
    width:'40%',
    borderRadius:10,
    height:'70%',
    borderWidth:1,
    borderColor:'#B3B3B3',
    marginHorizontal:'5%',
    marginVertical:5
  },
  bidButton:{
    backgroundColor:'#69d275',
    // marginBottom:20,
    alignContent:'center',
    justifyContent: 'center',
    height:'70%',
    width:'40%',
    borderWidth:1,
    borderColor:'#27b737',
    borderRadius:10,
    marginHorizontal:'5%',
    marginVertical:5
  },
  constContainer:{
    left:0,
    right:0,
    bottom:0,
    height:Header2.HEIGHT,
    backgroundColor:'#fff',
    borderTopWidth:2,	
    borderTopColor:'#dcdcdc',
    flexDirection:'row',
    // alignSelf:'center'
    position:'absolute',
    flex:0.1,
  },
  bidText:{
    color:'#fff',
    // fontWeight:'bold',
    fontSize:14,
    justifyContent:'center',
    textAlign:'center',
    flexDirection:'row'
  },
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
    marginTop:10
  },
  textInput:{
    width:'80%',
    alignSelf:'center',
    // backgroundColor:'#4285F4',
    margin:5,
    borderRadius:10,
    borderWidth:1,
    paddingHorizontal:10,
    borderColor:'#4285F4'

  },
  Summary:{
    width:'70%',
    height:80,
    alignSelf:'center',
    paddingHorizontal:10,
    marginLeft:'10%',
    // backgroundColor:'#4285F4',
    color:"#000",
    margin:5,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#4285F4',
    maxHeight:500,

  },
  userInfo:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
  },
  titleInfo:{
    fontSize:14,
    color:"#000",
    fontWeight:'300',
    maxHeight:500

  },
})