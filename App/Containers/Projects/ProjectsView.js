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
  	componentWillMount() {
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
				<View style={{justifyContent:'space-between',flexDirection:'column' ,  marginHorizontal:10}}>
					<TouchableOpacity style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}
						onPress={() => {
							if(item.Status=='Finished'){
								this.props.navigation.navigate('PendingProject', {
									item:item
								})
							}else if(item.Status=='InProgress'||item.Status=='PendingToFinish'){
								// this.props.getMilestones(item.ProjectID);
								this.props.navigation.navigate('InProgressUser', {
									item:item
								})
							}else{
								this.props.navigation.navigate('ProjectDetail', {
									item:item
								})
							}
						}}>
						<View style={{width:'90%'}}>
							<Text style={{color:'#2D3954',fontSize:20,fontWeight:'bold'}}>
								{item.Name}
							</Text>
							<Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#69d275'}}>
								{item.LowPrice}₮ - {item.HighPrice}₮ / Саналын тоо : {item.AllowBidNumber}
							</Text>
							<Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#69d275'}}>
								Ажлын төлөв : {item.Status=='Finished'?'Дууссан':item.Status=='InProgress'||item.Status=='PendingToFinish'?'Үргэлжилж байгаа':'Эхлээгүй'}
							</Text>
						</View>
						
						<View style={{alignSelf:'center'}}>
							<Icon name="chevron-right" size={16} color="#4285F4"/>
						</View>
					</TouchableOpacity>
				</View>
	);
	renderItem2 = ({ item }) => (
		<View style={{justifyContent:'space-between',flexDirection:'column' , marginHorizontal:10}}>
			<TouchableOpacity style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}
				onPress={() => {
					if(item.ProjectStatus =='Finished'){
						this.props.navigation.navigate('FinishedProject', {
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
					<Text style={{color:'#2D3954',fontSize:20,fontWeight:'bold'}}>
						{item.Name}
					</Text>
					<Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#69d275'}}>
						Саналын төлөв : {item.Status=='Done'?'Зөвшөөрсөн':'Хүлээгдэж байгаа'}
					</Text>
					<Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#69d275'}}>
						Ажлын төлөв : {item.ProjectStatus=='Finished'?'Дууссан':item.ProjectStatus=='PendingToFinish'?'Дуусгах хүсэлт илгээсэн':'Үргэлжилж байгаа'}
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
		<View style={{flex:1}}>
		  	<View style={styles.switcher}>
				<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.switchButton,						styles.isActive]):([styles.switchButton])}
								onPress={() => this.switchScreen(true)}>
						<Text style={this.state.isMyProjects?{color:'#FFF'}:{color:'#4285F4'}}>Захиалсан ажлууд</Text>
				</TouchableHighlight>

			  	<TouchableHighlight underlayColor="#fff" style={this.state.isMyProjects?([styles.switchButton]):([styles.switchButton,styles.isActive])}
								onPress={() => this.switchScreen(false)}>
						<Text style={this.state.isMyProjects?{color:'#4285F4'}:{color:'#FFF'}}>Хийж буй ажлууд</Text>
				</TouchableHighlight>
			</View>
				{this.state.isMyProjects?(
					<View style={styles.container}>
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
						<View style={styles.container}>
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
									<this.EmptyComponent title="Хийж буй ажил байхгүй байна." />
								}
							/>
						)}
					</View>
					)
				}
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
		// marginBottom:'10%'
	},
	headerTitle: {
		color: '#fff',
		alignSelf:'center',
		fontSize:18 ,
		fontWeight:'bold',
		flex:1
	},
	switcher:{
		width:'90%',
		height:'8%',
		borderWidth:1,
		borderColor:'#4285F4',
		flexDirection:'row',
		alignSelf:'center',
		marginVertical:10,
		// justifyContent: 'space-between',
		alignItems:'center',
        alignContent:'center',
        justifyContent:'center'
	},
	isActive:{
		backgroundColor:'#4285F4',
		borderBottomColor:'#4285F4',
		borderBottomWidth:3,
	},
	switchButton:{
		width:'50%',
		alignItems:'center',
		height:'100%',
		alignItems:'center',
        alignContent:'center',
        justifyContent:'center'
	},
	container:{
		backgroundColor:'#FFF',
    	flex:1
  	},
	emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
	}
});

