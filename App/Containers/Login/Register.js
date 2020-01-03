import React, { Component } from 'react'
import { 
    ScrollView, 
    Text, 
    Image, 
    View, 
    KeyboardAvoidingView,
    Button, 
    TextInput,
    TouchableHighlight,
    TouchableOpacity, 
    StyleSheet,
    Alert,
    AsyncStorage,
    ImageBackground,
} from 'react-native'
import { Row, H2, H3, H4,H5, Wrapper, Separator } from '../../Components'
import Icon from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SplashScreen from 'react-native-smart-splash-screen'
import { setAuthenticationToken,getAuthenticationToken  } from '../../Services/storage'
//import PushNotification from 'react-native-push-notification';
//import PushNotificationAndroid from 'react-native-push-notification'
import { Images } from '../../Themes'
import Swiper from 'react-native-swiper'
class Register extends Component {

    constructor(props){
      
      super(props)
      this.onPressNext = this.onPressNext.bind(this);
      this.onPressPrev = this.onPressPrev.bind(this);
      this.state = {
        FirstName : '',
        LastName : '',
        UserName   : '',
        UserEmail: '',
        Education: '',
        PhoneNumber: '',
        HomeAddress: '',
        Job: '',
        Description:'',
        idxActive: 0,
        isPerson:true,
      }
      
    }
    componentDidMount () {
        //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        
     }
    switchScreen(value){
      this.setState({isPerson: value});
    }
     onPressPrev = () => {
      const {idxActive} = this.state;
      if (idxActive > 0) {
        this.refs.swiper.scrollBy(-1)
      }
    }
  
    onPressNext = () => {
      const {idxActive} = this.state;
      // Probably best set as a constant somewhere vs a hardcoded 5
      if (idxActive < 5) {
        this.refs.swiper.scrollBy(1);
      }
    }
    renderSeparator = () => {
      return (
        <View
            style={{
            marginVertical:10,
              borderBottomColor: '#2D3954',
              borderBottomWidth: 1,
                }}
        />
      );
    };
     render() {
          return (
            <Swiper style={Loginstyles.wrapper} loop={false} onIndexChanged={idxActive => this.setState({idxActive})} showsButtons={true}>
              <View style={Loginstyles.slide1}>
                <Text style={Loginstyles.text}>Шинээр бүртгүүлэх</Text>
              </View>
              <View style={Loginstyles.slide2}>

              <ScrollView style={{width:'100%'}}>
                <KeyboardAwareScrollView resetScrollToCoords={{x:0,y:0}} scrollEnabled={false}>
                    {/* <Text style={{color:'black'}}>{this.state.UserName}</Text> */}
                  <View style={{marginVertical:10,alignContent:'center'}}>
                    <View style={{margin:10,alignSelf:'center'}}>
                      <Text style={{color:'#2D3954',fontWeight:'bold',fontSize:20}}>ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ</Text>
                    </View>
                    <View style={styles.switcher}>
                      <TouchableHighlight underlayColor="#fff" style={this.state.isPerson?([styles.switchButton,						styles.isActive]):([styles.switchButton])}
                              onPress={() => this.switchScreen(true)}>
                          <Text style={this.state.isPerson?{color:'#FFF'}:{color:'#4285F4'}}>Хувь хүн</Text>
                      </TouchableHighlight>

                        <TouchableHighlight underlayColor="#fff" style={this.state.isPerson?([styles.switchButton]):([styles.switchButton,styles.isActive])}
                              onPress={() => this.switchScreen(false)}>
                          <Text style={this.state.isPerson?{color:'#4285F4'}:{color:'#FFF'}}>Байгууллага</Text>
                      </TouchableHighlight>
                    </View>
                    {this.renderSeparator()}
                  <Text style={styles.titleInfo}>Овог</Text>
                  <View style={styles.textInput}>
                    <TextInput
                      style={styles.userInfo}
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.FirstName}
                      onChangeText={(FirstName) => this.setState({FirstName})}/>
                  </View>
                  <Text style={styles.titleInfo}>Нэр</Text>
                  <View style={styles.textInput}>
                    <TextInput
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.LastName}
                      onChangeText={(LastName) => this.setState({LastName})}
                      />
                  </View>
                  <Text style={styles.titleInfo}>Хэрэглэгчийн нэр</Text>
                    <View style={styles.textInput}>
                      <TextInput
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.UserName}
                      onChangeText={(UserName) => this.setState({UserName})}
                      />
                    </View>
                    <Text style={styles.titleInfo}>И-мэйл</Text>
                    <View style={styles.textInput}>
                      <TextInput
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.UserEmail}
                      onChangeText={(UserEmail) => this.setState({UserEmail})}
                      />
                    </View>
                    <Text style={styles.titleInfo}>Утасны дугаар</Text>
                    <View style={styles.textInput}>
                      <TextInput
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.PhoneNumber}
                      onChangeText={(PhoneNumber) => this.setState({PhoneNumber})}/>
                    </View>
                    <Text style={styles.titleInfo}>Боловсрол</Text>
                    <View style={styles.textInput}>
                      <TextInput
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.Education}
                      onChangeText={(Education) => this.setState({Education})}
                      />
                    </View>
                    <Text style={styles.titleInfo}>Гэрийн хаяг</Text>
                    <View style={styles.textInput}>
                      <TextInput
                      underlineColorAndroid='transparent'
                      selectTextOnFocus={false}
                      // value={this.state.HomeAddress}
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
                        // value={this.state.Description}
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
                          onPress={() => this._onLoginFunction()}
                          title=" Бүртгүүлэх"
                        />
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </ScrollView>
              </View>
            </Swiper>
          )
     }
    }
    const styles = StyleSheet.create({
      
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
      titleInfo:{
        fontSize:14,
        color:"#4285F4",
        fontWeight:'300',
        marginLeft:'10%'
      },
      switcher:{
        width:'80%',
        height:40,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#4285F4',
        flexDirection:'row',
        alignSelf:'center',
        marginVertical:10,
        justifyContent: 'space-between',
    
      },
      switchButton:{
        width:'50%',
        alignItems:'center',
      },
      isActive:{
        backgroundColor:'#4285F4',
        borderBottomColor:'#4285F4',
        borderBottomWidth:3,
      },
    });
    const Loginstyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      container2: {
        paddingTop:'10%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttons:{
        marginTop:'10%'
      },
      slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
      },
      slide2: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
      },
      text: {
        color: '#4285f4',
        fontSize: 30,
        fontWeight: 'bold'
      },
      inputContainer: {
          borderBottomColor: '#fff',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius:10,
          borderBottomWidth: 0,
          borderColor:'#fff',
          borderWidth:0,
          width:'80%',
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center',
          paddingLeft:10,
          backgroundColor:"#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
    
          elevation: 3,
          },
      inputContainer1: {
        width:'90%',
        height:45,
        marginBottom:15,
        flexDirection: 'row',
        alignItems:'center',
    },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#fff',
          flex:1,
      },
      inputIcon:{
        width:40,
        height:40,
        marginLeft:15,
        justifyContent: 'center',
      },
      fingerIcon:{
        width:40,
        height:40,
        marginLeft:10,
        justifyContent: 'center',
        // backgroundColor: 'black',
        borderRadius: 30,
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:'100%',
        // borderRadius:30,
      },
      buttonContainer2: {
        height:45,
        marginBottom:20,
        width:'50%',
        // borderRadius:30,
      },
      facebook: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:200,
        // borderRadius:30,
      },
      fingerPrint: {
        height:45,
        marginBottom:20,
        width:50,
        // borderRadius:30,
        justifyContent: 'center',
      },
      loginButton: {
        backgroundColor: "#4285F4",
      },
      logo:{
        flex:1,
      },
      image:{
        flex:1,
        width:'100%',
        marginTop:'10%',
      },
      loginText: {
        color: 'white',
      }
    });
    export default Register
    