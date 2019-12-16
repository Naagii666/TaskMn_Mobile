import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity,BackHandler,Dimensions} from 'react-native'
//import all the basic component we have used
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment'
import { getAllProjects,getUserProjects } from './ProjectsActions'
import { Header as Header2 } from 'react-navigation';
import { getAllWorkers } from '../Workers/WorkersActions'
import HTML from 'react-native-render-html';
const regex = /([&].*?[;])*(<.*?>)/ig;

class ProjectsView extends React.Component {
	state = {
		ID:"",
		data:[],
		isMyProjects:true,
		workersData:[],
		worker:[]
	};
	setModalVisible(visible,item) {
		this.setState({modalVisible: visible});
		this.setState({data: item});
	  }
  	componentDidMount() {
	//   this.props.getAllProjects()
	  this.props.getUserProjects()
	  this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	  this.setState({ workersData: this.props.workers }); 
	}
	componentWillUnmount() {
		this.backHandler.remove()
	  }
	handleBackPress = () => {
		// this.goBack(); // works best when the goBack is async
		return true;
	}
	goBack(){
		if(this.state.modalVisible==true){
			this.setState({modalVisible: false});
			this.setState({data: null});
		}else{
			BackHandler.exitApp()
		}
	}
	switchScreen(value){
		// alert(value)
		this.setState({isMyProjects: value});
	}
	_onRefresh() {
		this.props.getAllProjects()
	}
	_onRefresh2() {
		this.props.getUserProjects()
	}

	_renderEmpty() {
		return <H3>Мэдэгдэл алга байна.</H3>
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

	renderItem = ({ item }) => (
				<Card
					  title={item.Name}
					  style={{backgroundColor:'#4285F4'}}
					//   image={require('../images/pic2.jpg')}>
				>
					
					<Text style={{marginBottom: 10,textAlign:'left',fontStyle: 'italic',color:'black'}}>
						
					Эхлэх хугацаа: {moment(item.StartDate).format("YYYY-MM-DD")}
  					</Text>
					  <Text style={{marginBottom: 10,textAlign:'left',fontStyle: 'italic',color:'black'}}>
					Үнийн санал: {item.LowPrice}₮ - {item.HighPrice}₮
  					</Text>
  					<Text numberOfLines={3} style={{marginBottom: 10,}}>
    					{item.Description.replace(regex,'')}
  					</Text>
					  {/* <HTML html={item.Description} imagesMaxWidth={Dimensions.get('window').width} containerStyle={{numberOfLines:3}}/> */}
  					<Button
						// icon={<Icon name='code' color='#ffffff' />}
						// onPress={() => this.setModalVisible(true,item)}
						onPress={() => {
							// alert(item.ID)
        					this.props.navigation.navigate('ProjectDetail', {
								item:item,
								isMyProjects:this.state.isMyProjects,
							})
      					}}
    					buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor:'#4285F4'}}
    					title='Дэлгэрэнгүй' />
				</Card>
	)
	EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
	  );
	renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                  			this.setModalVisible(!this.state.modalVisible,this.state.data);
                		}}>
					<View >
						<Icon name="chevron-left" size={16} color="#fff"/>
						{/* <Text style={{color:"#fff", fontSize:10}}>Буцах</Text> */}
					</View>
					
				</TouchableOpacity>
			</View>
		)
	}
 	render() {
		const { projects, loading } = this.props
		const { userProjects, loading2 } = this.props
		return (
			
			<View style={{marginBottom:60}}>
				<View style={{flex:1,flexDirection:'row', backgroundColor:'dcdcdc',marginVertical:20,marginHorizontal:10,alignContent:'center'}}>
						<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.buttonContainer,styles.isActive]):([styles.buttonContainer])}
							onPress={() => this.switchScreen(true)}>
							<Text style={{color:'#4285F4',marginBottom:2}}>Сүүлд нэмэгдсэн</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.buttonContainer]):([styles.buttonContainer,styles.isActive])}
							onPress={() => this.switchScreen(false)}>
							<Text style={{color:'#4285F4',marginBottom:2}}>Миний ажлууд</Text>
						</TouchableHighlight>	
				</View>

				{this.state.isMyProjects ? (
				
				<View>
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
					data={projects}
					renderItem={this.renderItem}
					ListEmptyComponent={
						<this.EmptyComponent title="Ажил олдсонгүй" />
					}
					/>
					)
				}
				</View>):(
					<View>
						{	
						loading2 ? (
							<ActivityIndicator />
						) : (
						<FlatList
							refreshControl={
							<RefreshControl
								refreshing={loading}
								onRefresh={this._onRefresh2.bind(this)}
							/>
						}
						keyExtractor={this.keyExtractor}
						data={userProjects}
						renderItem={this.renderItem}
						ListEmptyComponent={
							<this.EmptyComponent title="Ажил олдсонгүй" />
						}
						
						/>
						)
						}
					</View>
					)
					}
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
		workers: state.workers.getIn(['workers_list', 'data']),
   	   	// projects: state.project.getIn(['project_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
		 getAllProjects: bindActionCreators(getAllProjects, dispatch),
		 getUserProjects: bindActionCreators(getUserProjects, dispatch),
		 getProfile: bindActionCreators(getAllWorkers, dispatch),
     }
   }
)(ProjectsView);

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
	},
	emptyContainer:{
		alignItems:'center',
		marginTop:10
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
  container:{
	margin:20
  },
  constContainer:{
	left:0,
	right:0,
	bottom:0,
	height:'10%',
	backgroundColor:'#fff',
	borderTopWidth:2,	
	borderTopColor:'#dcdcdc',
	flexDirection:'row',
	alignSelf:'center'
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
  bidButton:{
	backgroundColor:'#4285F4',
	alignContent:'center',
    justifyContent: 'center',
	width:'30%',
	alignSelf:'flex-end',
	marginRight:'10%',
	borderRadius:10,
	height:'70%',
	marginVertical:10,
	justifyContent:'center'

  },
  backButton:{
	backgroundColor:'#B3B3B3',
	alignContent:'center',
    justifyContent: 'center',
	width:'30%',
	alignSelf:'flex-start',
	marginLeft:'10%',
	borderRadius:10,
	height:'70%',
	marginVertical:10,
	justifyContent:'center'
  },
  bidText:{
	color:'#fff',
	// fontWeight:'bold',
	fontSize:16,
	justifyContent:'center',
	textAlign:'center'
  },
  isActive:{
	borderBottomColor:'#4285F4',
	borderBottomWidth:3,
  }
});
