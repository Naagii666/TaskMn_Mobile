import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler,Alert,TextInput ,FlatList , RefreshControl, ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header , Rating , AirbnbRating} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html';
import ImageView from 'react-native-image-view';
import { onDeleteProject ,getUserProjects ,getMilestones} from './ProjectsActions'
import { getAllWorkers } from '../Search/WorkersActions'
class FinishedProject extends React.Component {  
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const item = this.props.navigation.getParam('item', []);
        item.ProjectID?(
            this.props.getMilestones(item.ProjectID)
            )
          :
            (
            this.props.getMilestones(item.ID)
          )
        // alert(this.state.milestones)
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
        this.props.navigation.pop(),
        this.props.navigation.navigate('Tabs',{
        })
        
    } 
    navigateDetail(item){
		this.props.navigation.navigate('WorkerDetail',{
		  item: item
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
    _onRefresh() {
		const item = this.props.navigation.getParam('item', []);
        this.props.getMilestones(item.ProjectID)
    }
    keyExtractor = (item, index) => index.toString();
    EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
	);
    renderItem = ({ item }) => (
        <View style={styles.Skill}>
          <View style={{flex:1 , flexDirection:'column',margin:5}}>
            <Text style={styles.Text}>Даалгавар : {item.TaskName}</Text>
            <Text style={styles.Text}>Үнийн хэмжээ : {item.Amount}</Text>
            <Text style={styles.Text}>Төлөв : {item.Status=='Pending'?'Хүсэлт илгээсэн':item.Status=='Confirmed'?'Дууссан':'Дуусаагүй'}</Text>
          </View>
        </View>
     );
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
                            this.props.navigation.pop(),
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
    render() {
        const { navigation, loading2 , milestones  } = this.props;
        const item = navigation.getParam('item', []);
        return(
        <View style={{flex:1}}>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Дэлгэрэнгүй', style:styles.headerTitle }}
            //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
            //   rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <ScrollView >
                <View style={{marginHorizontal:10}}>
					<Text style={{textAlign:'left',color:'black',fontSize:20,fontWeight:'bold',flexDirection:'row'}}>		{item.Name}
					</Text>

                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                            Эхлэх хугацаа : <Text style={{color:'black'}} >{item.StartDate}</Text>
                        </Text>
                        <Text style={{color:'#4285F4'}}>
                            Саналын тоо: <Text style={{color:'black'}} >{item.AllowBidNumber?item.AllowBidNumber:'0'}</Text>
                        </Text>
                        <Text style={{color:'#4285F4'}}>
                            Үргэлжилэх хугацаа: <Text style={{color:'black'}} >{item.Duration}</Text>
                        </Text>
                        <Text style={{color:'#4285F4'}}>
                            Төлөв: <Text style={{color:'black'}} >Дууссан</Text>
                        </Text>
                    </View>
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4',}}>Дэлгэрэнгүй мэдээлэл</Text>
                        <HTML html={item.Description} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{color:'black'}}/>
                            {/* {item.Description.replace(regex, '')} */}
                        
                    </View>
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4',}}>Ажлын төсөв</Text>
                        <Text style={{fontSize:18,color:'black',marginTop:5,}}>
                            {item.LowPrice}₮-{item.HighPrice}₮
                        </Text>
                    </View>
                   
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                            Шаардагдах ур чадварууд
                        </Text>
                        <View style={{justifyContent: 'flex-start',width:'auto'}}>
                            <Text style={{marginTop:5,color:'black',flexDirection:'row',fontSize:15}}>		
                                {item.Skills}
                            </Text>
                        </View>
                    </View>
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                            Санал
                        </Text>
                    </View>

                    <View style={{justifyContent:'space-between',flexDirection:'column',borderWidth:1,borderColor:'#4285F4',borderRadius:10,margin:5,backgroundColor:'#E7EBF1'}}>
                    <View style={styles.body}>
                        <View style={styles.container}>
                            <Text style={styles.userInfo}>Хугацаа :</Text>
                            <Text style={styles.titleInfo}>{item.Time + ' хоног'}</Text>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.userInfo}>Үнэийн санал :</Text>
                            <Text style={styles.titleInfo}>{item.Cap+' ₮'}</Text>
                        </View>

                        {/* <View style={styles.container}>
                            <Text style={styles.titleInfo}>Төлөв :</Text>
                            <Text style={styles.titleInfo}>{item.Status + ' хоног'}</Text>
                        </View> */}

                        <View style={styles.container}>
                            <Text style={styles.userInfo}>Тайлбар :</Text>
                            <Text adjustsFontSizeToFit={true} style={[styles.titleInfo,{flex:1 , marginLeft:'10%',textAlign:'right'}]}>{item.BidDescription}</Text>
                        </View>
                        
                        {/* <View style={styles.container}>
                            <Text style={styles.titleInfo}>Гүйцэтгэгч :</Text>
                            <TouchableOpacity 
                                    onPress={() => this.navigateDetail(this.findUser(item.LancerID))}
                            >
                                    <Text style={{fontSize:18,color:'#3389ff'}}>
                            {this.findUserName(item.LancerID)}
                            </Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    </View>
                        {this.renderSeparator()}
                        <View style={{marginVertical:10}}>
                            <Text style={{color:'#4285F4'}}>
                                Захиалагчийг үнэлэх
                            </Text>
                        </View>
                        <View style={[styles.container,{justifyContent:'space-between'}]}>
                                <AirbnbRating
                                count={5}
                                reviews={["Маш муу", "Муу", "Дундаж", "Сайн", "Маш сайн"]}
                                defaultRating={3}
                                size={20}
                                />
                                <View style={{margin:10,flex:1,alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                                    <Button
                                        buttonStyle={{
                                            backgroundColor:'#4285F4',
                                            alignItems:'center'
                                        }}
                                        onPress={() => {
                                            alert('go')
                                        }}
                                        title=" Үнэлгээ өгөх"
                                    />
                                </View>
                        </View>
                        {this.renderSeparator()}
                        <View style={{marginVertical:10}}>
                            <Text style={{color:'#4285F4'}}>
                                Даалгаврын мэдээлэл
                            </Text>
                            {loading2?
                                <ActivityIndicator />
                            :(
                                <FlatList
                                refreshControl={
                                    <RefreshControl
                                    refreshing={loading2}
                                    onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                                keyExtractor={this.keyExtractor}
                                // ItemSeparatorComponent={this.renderSeparator}
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
            workers: state.workers.getIn(['workers_list', 'data']),
            loading3: state.workers.getIn(['on_choose_bid', 'loading']),
            milestones: state.project.getIn(['milestone_list', 'data']),
            loading2: state.project.getIn(['milestone_list', 'loading']),
    }),
    dispatch => {
        return {
            onDeleteProject: bindActionCreators(onDeleteProject, dispatch),
            getUserProjects: bindActionCreators(getUserProjects, dispatch),
            getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
            getMilestones:  bindActionCreators(getMilestones, dispatch),
        }
    }
)(FinishedProject);;
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
  body: {
    backgroundColor:'#E7EBF1',
    margin:10,
    // borderBottomWidth:1, 
    borderColor:'#4285F4',
    marginBottom:10
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
    emptyContainer:{
        alignItems:'center',
        marginTop:20
    },
    emptyText:{
        color:'#4285F4'
    },
    Skill:{
        marginVertical:10,
        marginHorizontal:5,
        // flex: 1,
        flexDirection:'row',
        alignContent:'space-between',
        justifyContent:'space-between',
        backgroundColor:'#E7EBF1',
        borderRadius:10,
    
      },
      Text:{
        alignItems:'center' , 
        justifyContent:'flex-start' , 
        marginLeft:10 ,
        color:'#3C4348',
        fontSize:15
      },
})