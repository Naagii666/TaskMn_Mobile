import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity,BackHandler} from 'react-native'
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { Header as Header2 } from 'react-navigation';
import {  Card, ListItem, Button ,Header,Rating } from 'react-native-elements'


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
    }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                            this.props.navigation.navigate('Tabs',{
                      })
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
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'User');
    return (
        <View style={{marginBottom:60}}>
            <Header containerStyle={{
							  height:Header2.HEIGHT,
							  backgroundColor: '#3679B1',
						  }}
						  leftComponent={this.renderLeftComponent()}
						  centerComponent={{ text:  item.UserName, style: { color: '#fff',fontWeight:'bold',fontSize:18, alignSelf:'center',marginVertical:'30%'} }}
					  />

            <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                
                  {item.ProPicture?
                    <Image style={styles.avatar}
                      source={{uri: 'http://task.mn/content/'+item.ProPicture+''}}/>
                      :
                    <Image style={styles.avatar}
                      source={{uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}/>
                  }
                <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
                {item.Job?
                <Text style={styles.userInfo}>{item.Job}</Text>
                :null
                }
                {item.UserEmail?
                <Text style={styles.userInfo}>{item.UserEmail}</Text>
                :null
                }
                {item.Education?
                <Text style={styles.userInfo}>{item.Education}</Text>
                :null
                }
                {item.PhoneNumber?
                <Text style={styles.userInfo}>{item.PhoneNumber}</Text>
                :null
                }
                {item.HomeAddress?
                <Text style={styles.userInfo}>{item.HomeAddress}</Text>
                :null
                }
                
            </View>
          </View>
          <View style={styles.body}>
            <View style={{flex:1,flexDirection:'row', backgroundColor:'dcdcdc',marginVertical:20,marginHorizontal:10,alignContent:'center'}}>
						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer,styles.isActive]):([styles.buttonContainer])}
							onPress={() => this.switchScreen(true)}>
							  <Text style={{color:'#3679B1',marginBottom:2}}>Гүйцэтгэгч</Text>
						  </TouchableHighlight>
						  <TouchableHighlight underlayColor="#fff" style={this.state.isWorker?([styles.buttonContainer]):([styles.buttonContainer,styles.isActive])}
							  onPress={() => this.switchScreen(false)}>
							  <Text style={{color:'#3679B1',marginBottom:2}}>Захиалагч</Text>
						  </TouchableHighlight>	
				    </View>
            {this.state.isWorker ? (
				        <View style={{marginVertical:20,marginHorizontal:10}}>
                  <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Үнэлгээ</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={4}
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
                    <Text style={styles.text}>Үнэлгээ</Text>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={5}
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
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#3679B1",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:14,
    color:"black",
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
    backgroundColor: "#3679B1",
    
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
    backgroundColor: "#3679B1",
  },
  isActive:{
    borderBottomColor:'#3679B1',
    borderBottomWidth:3,
    }
});
