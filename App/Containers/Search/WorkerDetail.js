import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity,BackHandler} from 'react-native'
//import all the basic component we have used
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import { Header as Header2 ,NavigationActions} from 'react-navigation';
import {  Card, ListItem, Button ,Header,Rating } from 'react-native-elements'
import ImageView from 'react-native-image-view';
import ViewMoreText from 'react-native-view-more-text';
//import all the basic component we have used
import { getWorkerComments , getAllWorkers ,getWorkerSkills } from './WorkersActions'
// npm install --save react-native-view-more-text 

class WorkerDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isWorker:true,
        isImageViewVisible:false,
        UserID:'',
        comment : ' Сэтгэгдэл'
      };
    }
    switchScreen(value){
      this.setState({isWorker: value});
    }
    componentWillMount() { 
      const { navigation} = this.props;
      const item = navigation.getParam('item', 'User');
      // this.props.getWorkerComments(item.UserID)
      this.props.getWorkerSkills(item.UserID)
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
      this.backHandler.remove()
    }
    // componentWillMount() {
    //   const { navigation} = this.props;
    //   const item = navigation.getParam('item', 'User');
    //   this.props.getWorkerComments(item.UserID)
    //   this.props.getWorkerSkills(item.UserID)
    //   this.countComments()
    //   this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // }
    handleBackPress = () => {
      this.goBack();
      return true;
    }
    goBack(){
      this.props.navigation.pop(),
      this.props.navigation.navigate('Tabs',{
      })
      // this.props.navigation.goBack()
    }
    getComments = (UserID) =>{
      this.props.getWorkerComments(UserID)
    }
    countComments(){
      const { comments } = this.props
      const count = comments.length
      this.setState({comment : ' Сэтгэгдэл ('+count+')'})
    }
    keyExtractor = (item, index) => index.toString();
	  _onRefresh() {
		  this.props.getWorkerComments()
	  }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
              // this.props.navigation.goBack()
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
  renderViewMore(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84',alignSelf:'flex-end'}}>Дэлгэрэнгүй</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84',alignSelf:'flex-end'}}>Хураах</Text>
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
  EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
          
		</View>
    );
  renderItem = ({ item }) => (
    <View style={{margin:10}}>
        <View style={{ paddingHorizontal: 20,paddingVertical:8, backgroundColor:"#DCDCDC",borderRadius:10}}>
                <View>
                    <View  style={styles.rowText}>
                            <Text style={{textAlign: 'left'}}>{this.findUserName(item.fromUser)}</Text>
                    </View>
                    <View style={{ paddingTop: 10, }}>
                            <Text>{item.Text}</Text>
                    </View>
                    
                </View>
        </View>
        <View style={{ alignItems: 'flex-end' } }>
        <Text>{moment(item.Date).fromNow()}</Text>
      </View>
    </View>
  )
  render() {
    const { navigation} = this.props;
    const item = navigation.getParam('item', 'User');
    // this.getComments(item.UserID)
    const {skills , loading , loading2} = this.props;
    const URI = item.ProPicture?'http://task.mn/content/'+item.ProPicture+'':'http://task.mn/Content/images/UserPictures/user2.png'
    const image = [
      {
          source: {
              uri: URI,
          },
          title: 'User Profile',
          width: 806,
          height: 720,
      },
    ];
    return (
        <View style={{marginBottom:60}}>
            <Header containerStyle={{
							  height:Header2.HEIGHT,
							  backgroundColor: '#4285F4',
						  }}
						  leftComponent={this.renderLeftComponent()}
						  centerComponent={{ text:  item.UserName, style: { color: '#fff',fontWeight:'bold',fontSize:18, alignSelf:'center',marginVertical:'30%'} }}
					  />
          <ScrollView>
            <View style={styles.container}>
          <View style={styles.header}>
          <View style={styles.headerContent}>
                <TouchableOpacity style={{flex:1}} onPress={() =>  this.setState({ isImageViewVisible: true })}>
                  <Image style={[styles.avatar,{alignSelf: 'center',}]}
                      source={{uri: URI}}/>
                </TouchableOpacity>
                <ImageView
                    images={image}
                    imageIndex={0}
                    isSwipeCloseEnabled={true}
                    isPinchZoomEnabled={true}
                    isTapZoomEnabled={true}
                    isVisible={this.state.isImageViewVisible}
                    onClose = {() =>  this.setState({ isImageViewVisible: false })}
                    // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                />
                <View style={{marginBottom:10}}>
                  <Text style={[styles.name,{alignSelf: 'center',}]}>{item.FirstName} {item.LastName}</Text>
                </View>
              {this.renderSeparator()}
            {/* <View  style={styles.generalTitle}>
              <Text style={styles.titleInfo2}>Ерөнхий мэдээлэл</Text>
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
                  <Text style={styles.userInfo} numberOfLines={3}>{item.Education}</Text>
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
                  <Text style={[styles.userInfo]} >{item.HomeAddress}</Text>
                </View>
              :null
              }
            </View>
              {this.renderSeparator()}
            {skills?
              <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Ур чадвар</Text>
                <View style={styles.infoView}>
                  {loading2?
                    <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',flex:1}}>
                      <ActivityIndicator/>
                    </View>
                    :
                    <FlatList
                      data={skills}
                      keyExtractor={item => item.Text}
                      renderItem={({ item }) => <Text style={styles.skill}>{item.Text}</Text>}
                    />
                  }
                </View>
              </View>
              :null
            }
            {this.renderSeparator()}
            
            {item.Description?
            <View  style={styles.generalTitle}>
            <Text style={styles.titleInfo2}>Танилцуулга</Text>
              <View style={{marginTop:10 ,width:'90%',alignSelf:'center'}}>
                <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={{textAlign: 'justify',alignSelf:'center',flex:1}}
                >
                  <Text style={styles.userInfo}>
                    {item.Description}
                  </Text>
                </ViewMoreText>
              </View>
            </View>
            
            :null
            } */}
            <View  style={styles.generalTitle}>
              <Text style={styles.titleInfo2}>Ерөнхий мэдээлэл</Text>
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
              </View>
              {item.Description?this.renderSeparator():null}
              {item.Description?
                <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Танилцуулга</Text>
                  <View style={{marginTop:10 ,width:'90%',alignSelf:'center'}}>
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                      textStyle={{textAlign: 'justify',alignSelf:'center',flex:1}}
                    >
                      <Text style={styles.userInfo}>
                        {item.Description}
                      </Text>
                    </ViewMoreText>
                  </View>
                </View>
                
                :null
              }
              {this.renderSeparator()}
              <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Үнэлгээ</Text>
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
              <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Ур чадвар</Text>
                <View style={styles.infoView}>
                  <FlatList
                    data={skills}
                    keyExtractor={item => item.Text}
                    renderItem={({ item }) => <Text style={styles.skill}>{item.Text}</Text>}
                  />
                </View>
              </View>
          </View>

            <View style={{margin:10}}>
              <Button
                  icon={
                    <Icon2
                      name="ios-chatbubbles"
                      size={18}
                      color="white"
                    />
                  }
                  buttonStyle={{
                    backgroundColor:'#4285F4',
                  }}
                  onPress={() => {
                        this.props.navigation.navigate('Chat',{ 
                          item:item
                      })
                  }}
                  title=" Чат бичих"
                />
            </View>
            <View style={{margin:10}}>
              <Button
                icon={
                  <Icon
                    name="comments"
                    size={18}
                    color="white"
                  />
                }
                buttonStyle={{
                  backgroundColor:'#4285F4',
                }}
                onPress={() => {
                  this.props.navigation.navigate('Comments',{
                    "UserID" :  item.UserID
                  })
                }}
                title = {this.state.comment}
              />
            </View>
          </View>
          
          {/* <View style={styles.body}>
            <View style={{flex:1,flexDirection:'row', backgroundColor:'dcdcdc',marginVertical:20,marginHorizontal:10,alignContent:'center'}}>
						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer,styles.isActive]):([styles.buttonContainer])}
							onPress={() => this.switchScreen(true)}>
							  <Text style={{color:'#4285F4',marginBottom:2}}>Гүйцэтгэгч</Text>
						  </TouchableHighlight>
						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer]):([styles.buttonContainer,styles.isActive])}
							  onPress={() => this.switchScreen(false)}>
							  <Text style={{color:'#4285F4',marginBottom:2}}>Захиалагч</Text>
						  </TouchableHighlight>	
				    </View>
            {this.state.isWorker ? (
				        <View style={{marginVertical:20,marginHorizontal:10}}>
                  <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Үнэлгээ/{item.FLRatings}/</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={item.FLRatings}
                    // style={{ styles.rating }}
                    />
                  </View>
                  {/* <View style={{marginVertical:10}}>
                    <Text style={styles.text}>Захиалсан ажлын тоо:</Text>
                    <Text style={styles.text}>Хийгдэж байгаа ажлын тоо:</Text>
                    <Text style={styles.text}>Зарлага: ₮</Text>
                  </View> */}
                {/* </View>
              ):(
                <View style={{marginVertical:20,marginHorizontal:10}}>
                  <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Үнэлгээ/{item.ORatings}/</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={item.ORatings}
                    // style={{ styles.rating }}
                    />
                  </View>
                  {/* <View style={{marginVertical:10}}>
                    <Text style={styles.text}>Гүйцэтгэсэн ажлын тоо:</Text>
                    <Text style={styles.text}>Гүйцэтгэж байгаа ажлын тоо:</Text>
                    <Text style={styles.text}>Орлого: ₮</Text>
                  </View> */}
                {/* </View>
              )  
            }
          </View> */}
        </View>
      </ScrollView>
        </View>
          
    )
  }
}

export default connect(
  state => ({
   loading: state.workers.getIn(['comment_list', 'loading']),
   comments: state.workers.getIn(['comment_list', 'data']),
   skills: state.workers.getIn(['skill_list', 'data']),
   loading2: state.workers.getIn(['skill_list', 'loading']),
   workers: state.workers.getIn(['workers_list', 'data']),
         // projects: state.project.getIn(['project_list', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getWorkerComments: bindActionCreators(getWorkerComments, dispatch),
      getWorkerSkills: bindActionCreators(getWorkerSkills, dispatch),
      getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
    }
  }
)(WorkerDetail);
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFF",
  },
  text:{
    fontSize:16,
    color:'#3C4348',
    marginHorizontal:10
  },
  headerContent:{
    padding:30,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#4285F4",
    marginBottom:10,
  },
  skill:{
    backgroundColor:'#E7EBF1',
    borderRadius:15,
    margin:3,
    color:'#3C4348',
    textAlign:'center'
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  infoView:{
    width:'90%',
    alignSelf:'center',
    flexDirection:'row', 
    justifyContent:'space-between' ,
    flexWrap: 'wrap',
    flex: 1,
  },
  userInfo:{
    fontSize:14,
    color:"#3C4348",
    fontWeight:'300',
    // width:'50%'
    flexShrink: 1 ,
  },
  titleInfo:{
    fontSize:14,
    color:"#4285F4",
    fontWeight:'300',
  },
  titleInfo2:{
    fontSize:16,
    color:"#000",
    fontWeight:'300',
  },
  generalTitle:{
    alignItems:'center',
    justifyContent:'center'
  },
  body:{
    backgroundColor: "#FFF",
    // height:500,
    // alignItems:'center',
    borderTopWidth:2,
    borderTopColor:'#DB4437'
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
  },
  emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
	}

});
