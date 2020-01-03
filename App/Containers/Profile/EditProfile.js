import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {ActivityIndicator, H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet, TextInput,BackHandler,Alert,} from 'react-native'
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header as Header2 } from 'react-navigation';
import {  Card, ListItem, Button,Rating, AirbnbRating ,Avatar,Header} from 'react-native-elements'
import { editProfile ,getProfile} from './ProfileActions'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName : '',
      LastName : '',
      UserName   : '',
      UserEmail: '',
      Education: '',
      PhoneNumber: '',
      HomeAddress: '',
      Job: '',
      Description:''
    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const { navigation } = this.props;
    const item = navigation.getParam('item', []);
    this.setState({FirstName:item.FirstName,
                    LastName:item.LastName,
                    UserName:item.UserName,
                    UserEmail:item.UserEmail,
                    Education:item.Education,
                    PhoneNumber:item.PhoneNumber,
                    Job:item.Job,
                    Description:item.Description,
                    HomeAddress:item.HomeAddress
    })
  }

  change(){
    this.props.editProfile(this.state)
    this.props.getProfile()
    this.goBack()
  }
  componentWillUnmount(){
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
  renderCenterComponent(){
    return(
      <View style={{flex:1,alignContent:'center'}} >
        <Text style={{color: '#fff',fontWeight:'bold',fontSize:18}}>Засварлах</Text>
      </View>
    )
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
 	render() {
    return (
      <View style={{flex:1}}>
        <Header containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
          }}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          
        />
        <ScrollView>
          <KeyboardAwareScrollView resetScrollToCoords={{x:0,y:0}} scrollEnabled={false}>
              {/* <Text style={{color:'black'}}>{this.state.UserName}</Text> */}
            <View style={{marginVertical:10,alignContent:'center'}}>
              {/* <Icon name="v-card" size={32} color="#f9ac19" /> */}
            <Text style={styles.titleInfo}>Овог</Text>
            <View style={styles.textInput}>
              <TextInput
                style={styles.userInfo}
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.FirstName}
                onChangeText={(FirstName) => this.setState({FirstName})}/>
            </View>
            <Text style={styles.titleInfo}>Нэр</Text>
            <View style={styles.textInput}>
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.LastName}
                onChangeText={(LastName) => this.setState({LastName})}
                />
            </View>
            <Text style={styles.titleInfo}>Хэрэглэгчийн нэр</Text>
              <View style={styles.textInput}>
                <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.UserName}
                onChangeText={(UserName) => this.setState({UserName})}
                />
              </View>
              <Text style={styles.titleInfo}>И-мэйл</Text>
              <View style={styles.textInput}>
                <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.UserEmail}
                onChangeText={(UserEmail) => this.setState({UserEmail})}
                />
              </View>
              <Text style={styles.titleInfo}>Утасны дугаар</Text>
              <View style={styles.textInput}>
                <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.PhoneNumber}
                onChangeText={(PhoneNumber) => this.setState({PhoneNumber})}/>
              </View>
              <Text style={styles.titleInfo}>Боловсрол</Text>
              <View style={styles.textInput}>
                <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.Education}
                onChangeText={(Education) => this.setState({Education})}
                />
              </View>
              <Text style={styles.titleInfo}>Гэрийн хаяг</Text>
              <View style={styles.textInput}>
                <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.HomeAddress}
                onChangeText={(HomeAddress) => this.setState({HomeAddress})}
                />
              </View>
              <Text style={styles.titleInfo}>Танилцуулга</Text>
              <View style={styles.Summary}>
                <TextInput
                  numberOfLines={10}
                  ellipsizeMode="head"
                  keyboardType="default"
                  multiline={true}
                  underlineColorAndroid='transparent'
                  selectTextOnFocus={false}
                  value={this.state.Description}
                  onChangeText={(Description) => this.setState({Description})}
                  />
              </View>
              <View style={{width:'80%',marginVertical:20 , alignSelf:'center'}}>
                <Button
                    buttonStyle={{
                      borderRadius:10,
                      width:'90%',
                      backgroundColor:'#69d275',
                      alignSelf:'center'
                    }}
                    onPress={() => {
                          this.change()
                    }}
                    title=" Засварлах"
                  />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
   state => ({
		loading: state.profile.getIn(['edit_profile', 'loading']),
		profile: state.profile.getIn(['edit_profile', 'data']),
   }),
   dispatch => {
     return {
       editProfile: bindActionCreators(editProfile, dispatch),
       getProfile: bindActionCreators(getProfile, dispatch),
     }
   }
)(EditProfile);

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
    borderColor: "#4285F4",
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
    width:'80%',
    height:100,
    alignSelf:'center',
    paddingHorizontal:10,
    // backgroundColor:'#4285F4',
    margin:5,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#4285F4',
    maxHeight:500,

  },
  body:{
    backgroundColor: "#FFF",
    marginVertical:30
  },
  body2:{
    backgroundColor: "#FFF",
    // height:500,
    // alignItems:'center',
    borderTopWidth:2,
    borderTopColor:'#727b84'
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
  infoView:{
    width:'70%',
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
    marginLeft:'10%'

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