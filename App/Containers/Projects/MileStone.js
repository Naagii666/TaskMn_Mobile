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
class MileStone extends React.Component {   
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
                centerComponent={{ text: 'Даалгавар нэмэх', style:styles.headerTitle }}
            />
            <ScrollView >
                <View style={{marginHorizontal:10}}>
                   
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
)(MileStone);;
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