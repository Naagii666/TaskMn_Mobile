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
import ViewMoreText from 'react-native-view-more-text';
// npm install --save react-native-view-more-text 

class WorkerDetail extends React.Component {
    state = {
      isWorker:true,
    };
    switchScreen(value){
      this.setState({isWorker: value});
    }
    componentDidMount() { 
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
      this.backHandler.remove()
    }
    handleBackPress = () => {
      this.goBack(); // works best when the goBack is async
      return true;
    }
    goBack(){
      this.props.navigation.navigate('Tabs',{
      })
      // this.props.navigation.goBack()
    }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
              // this.props.navigation.goBack()
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
      <Text onPress={onPress} style={{color:'#727b84'}}>Дэлгэрэнгүй</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84'}}>Хураах</Text>
    )
  }
  
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'User');
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
                
                {item.ProPicture?
                  <Image style={[styles.avatar,{alignSelf: 'center',}]}
                    source={{uri: 'http://task.mn/content/'+item.ProPicture+''}}/>
                    :
                    <Image style={[styles.avatar,{alignSelf: 'center',}]}
                    source={{uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}/>
                }
                <View style={{marginBottom:10}}>
                  <Text style={[styles.name,{alignSelf: 'center',}]}>{item.FirstName} {item.LastName}</Text>
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
                <View style={{marginTop:10}}>
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
                </View>
              :null
              }
                
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
                        this.props.navigation.navigate('MessagesScreen',{ 
                          item:item
                      })
                  }}
                  title=" Чат бичих"
                />
            </View>
          </View>
          
          <View style={styles.body}>
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
                  <View style={{marginVertical:10}}>
                    <Text style={styles.text}>Захиалсан ажлын тоо:</Text>
                    <Text style={styles.text}>Хийгдэж байгаа ажлын тоо:</Text>
                    <Text style={styles.text}>Зарлага: ₮</Text>
                  </View>
                </View>
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
                  <View style={{marginVertical:10}}>
                    <Text style={styles.text}>Гүйцэтгэсэн ажлын тоо:</Text>
                    <Text style={styles.text}>Гүйцэтгэж байгаа ажлын тоо:</Text>
                    <Text style={styles.text}>Орлого: ₮</Text>
                  </View>
                </View>
              )  
            }

          </View>
      </View>
      </ScrollView>
        </View>
          
    )
  }
}

export default WorkerDetail;

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
  infoView:{
    width:'80%',
    alignSelf:'center',
    flexDirection:'row', 
    justifyContent:'space-between' 
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
    }
});
