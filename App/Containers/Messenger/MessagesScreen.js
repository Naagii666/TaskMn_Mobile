//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl ,TextInput,Image, BackHandler} from 'react-native';
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getAllWorkers } from '../Search/WorkersActions'
import { getProfile } from '../Profile/ProfileActions'
import { getChat } from './ChatActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import SplashScreen from 'react-native-smart-splash-screen'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
const test = [{
  "UserName" : "Naagii",
  "ProPicture" : null,
  "Date":"3:12",
  "isMine":true,
  "FirstName" : "D",
  "LastName" : "Narandelger",
	"Education":"Num",
  "Job":"Developer",
  "PhoneNumber" : 9999999,
	"HomeAddress" : "UB Mongolia",
	"UserEmail" : "naagii.dashdorj@gmail.com",
	"Skills" :"English",
  "Message": " Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
  "ORating" : 4.7,
  "FRating" : 5,
  "ID" : "aaaa"
  },
]
const chat = [{
  "fromUserId" : "aaaa",
  "toUserId" : "bbbb",
  "Date":"3:11",
  "Message":"to a from b",
  },
  {
    "fromUserId" : "bbbb",
    "toUserId" : "aaaa",
    "Date":"3:12",
    "Message":"to b from a",
  },
  {
    "fromUserId" : "cccc",
    "toUserId" : "aaaa",
    "Date":"3:13",
    "Message":"to c from a",
  },
  {
    "fromUserId" : "aaaa",
    "toUserId" : "cccc",
    "Date":"3:14",
    "Message":"to a from c",
  }
]
const chatData = Object.values( chat );
const itemData = Object.values( test );
class MessagesScreen extends React.Component {
    state = {
      messages: [],
    }
    componentDidMount(){
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      // this.props.getAllWorkers()
      // this.props.getProfile()
      // this.props.getChat()
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
     })
     this.setState({
       data: [
        {id:1, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit amet"},
        {id:2, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit amet"} ,
        {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        {id:9, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
      ],
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
    }
    componentWillUnmount(){
      this.backHandler.remove()
    }
    handleBackPress = () => {
      // this.goBack();
      return true;
    }
    renderDate = (date) => {
      return(
        <Text style={styles.time}>
          {date}
        </Text>
      );
    }
    findUser(lancerID){
      const workers = this.props.workers
      var data = null
      // workers.forEach((worker) => {
      //   if(worker.UserID === lancerID) {
      //     // this.setState({userName: worker.UserName });
      //     data = worker;
      //   }
      // })
      itemData.forEach((worker) => {
        if(worker.ID === lancerID) {
          // this.setState({userName: worker.UserName });
          data = worker;
        }
      })
      return data
    }
    navigateChat(item){
      this.props.navigation.navigate('Chat',{
         item : item             
      })
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
    // _onRefresh(){
    //   this.props.getChat()
    // }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                            this.props.navigation.navigate('TopNavigation',{
                              
                      })
                }}>
					<View >
						<Icon name="chevron-left" size={16} color="#fff"/>
					</View>
				</TouchableOpacity>
			</View>
        )
    }
    _keyExtractor = (item, index) => index.toString()
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
    renderItem = ({ item }) => 
        // if(itemData.ID==item.fromUserId){
        //   user = this.findUser(item.toUserId)
        // }else{
        //   user = this.findUser(item.fromUserId)
        // }
      (
      <TouchableOpacity style={{width:'100%'}}
        onPress={() => {
              this.navigateChat(item)
        }}>
           {/* {alert(user.UserName)} */}
        <ListItem 
          leftAvatar={item.ProPicture?{ source: { uri:'http://task.mn/content/'+item.ProPicture+'' } }:
          {source : {uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}}
          title={
            <View style={{flexDirection:'column'}}>
              <Text style={{color:'#000',fontWeight:'bold',fontSize:18}}>{item.FirstName+' '+item.LastName}</Text>
              
                {item.fromUserId==itemData.ID?(
                  <View style={{flexDirection:'row'}}>
                  <Text >You: </Text>
                  <Text numberOfLines={1}>{item.Message}</Text>
                  <Text > • {item.Date}</Text>
                  </View>
                ):(
                  <View style={{flexDirection:'row'}}>
                    <Text numberOfLines={1}>{item.Message}</Text>
                    <Text > • {item.Date}</Text>
                  </View>
                )
                }
            </View>
          }
          rightTitle={
            <View style={{flex:1}}>
  
            </View>
          }
          // bottomDivider
          // chevron
        />
       {/* <Text>
       {item.Message}
         </Text> */}
      </TouchableOpacity>
    )
        
    render() {
        const { navigation } = this.props;
        const { loading , chats } = this.props
        const item = navigation.getParam('item', []);
        return(
        <View style={{backgroundColor:'#FFF',flex:1}}>
          {/* {loading ? (
          <ActivityIndicator />
            ) : ( */}
              <FlatList
              // refreshControl={
              //   		<RefreshControl
              //   			refreshing={loading}
              //   			onRefresh={this._onRefresh.bind(this)}
              //   		/>
              //     }
              ListEmptyComponent={
                    <this.EmptyComponent title="Чат байхгүй байна." />}
              keyExtractor= {this._keyExtractor}
              data={itemData}
              renderItem={this.renderItem}
              // ListHeaderComponent={this.renderHeader}
            />
          {/* )} */}
        </View>
        );
    }
}
export default connect(
  state => ({
    loading: state.chat.getIn(['chat_list', 'loading']),
    chats: state.chat.getIn(['chat_list', 'data']),
    loading2: state.workers.getIn(['workers_list', 'loading']),
    workers: state.workers.getIn(['workers_list', 'data']),
    profile: state.profile.getIn(['profile_list', 'data']),
         // projects: state.project.getIn(['project_list', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getChat: bindActionCreators(getChat, dispatch),
      getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
      getProfile: bindActionCreators(getProfile, dispatch),
    }
  }
)(MessagesScreen);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
	}
})