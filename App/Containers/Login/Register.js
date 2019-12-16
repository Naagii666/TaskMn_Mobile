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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
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
        email   : '',
        password: '',
        password_confirmation: '',
        phone:'',
        isLoggedIn: false,
        idxActive: 0
      }
      
    }
    componentDidMount () {
        //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        
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
     render() {
          return (
            <Swiper style={Loginstyles.wrapper} loop={false} onIndexChanged={idxActive => this.setState({idxActive})} showsButtons={true}>
              <View style={Loginstyles.slide1}>
                <Text style={Loginstyles.text}>Шинээр бүртгүүлэх</Text>
              </View>
              <View style={Loginstyles.slide2}>
              <View style={Loginstyles.inputContainer}>
                
                             <TextInput style={Loginstyles.inputs}
                              placeholder="Овог"
                              keyboardType="email-address"
                              underlineColorAndroid='transparent'
                              onChangeText={(email) => this.setState({email})}/>
                              {/* <Icon name="user" size={35} color="#4285F4" /> */}
                          </View>
                          <View style={Loginstyles.inputContainer}>
                            
                            <TextInput style={Loginstyles.inputs}
                              placeholder="Нэр"
                              keyboardType="email-address"
                              underlineColorAndroid='transparent'
                              onChangeText={(email) => this.setState({email})}/>
                              {/* <Icon name="user" size={35} color="#4285F4" /> */}
                          </View>
                          <View style={Loginstyles.inputContainer}>
                            
                            <TextInput style={Loginstyles.inputs}
                              placeholder="Хэрэглэгчийн нэр"
                              keyboardType="email-address"
                              underlineColorAndroid='transparent'
                              onChangeText={(email) => this.setState({email})}/>
                              {/* <Icon name="user" size={35} color="#4285F4" /> */}
                          </View>
                         
            
              </View>
                <View style={Loginstyles.slide3}>
                      <View style={Loginstyles.inputContainer}>
                              
                              <TextInput style={Loginstyles.inputs}
                                placeholder="Утасны дугаар"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({email})}/>
                                {/* <Icon name='phone' size={35} color="#4285F4" /> */}
                            </View>
                            <View style={Loginstyles.inputContainer}>
                              
                              <TextInput style={Loginstyles.inputs}
                                placeholder="Боловсрол"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({email})}/>
                                {/* <Icon name="graduation-cap" size={35} color="#4285F4" /> */}
                            </View>
                            
                            <View style={Loginstyles.inputContainer}>
                              
                              <TextInput style={Loginstyles.inputs}
                                placeholder="Гэрийн хаяг"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({email})}/>
                                {/* <Icon name="address" size={35} color="#4285F4" /> */}
                            </View>
                            
                </View>
                <View style={Loginstyles.slide4}>
                <View style={Loginstyles.inputContainer}>
                  
                  <TextInput style={Loginstyles.inputs}
                    placeholder="Имэйл хаяг"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
                    {/* <Icon name="mail-with-circle" size={35} color="#4285F4" /> */}
                </View>
                <View style={Loginstyles.inputContainer}>
                  
                  <TextInput style={Loginstyles.inputs}
                    placeholder="Нууц үг"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
                    {/* <Icon name="key" size={35} color="#4285F4"/> */}
                </View>
                
                <View style={Loginstyles.inputContainer}>
                  
                  <TextInput style={Loginstyles.inputs}
                    placeholder="Нууц үг баталгаажуулах"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
                    {/* <Icon name="key" size={35} color="#4285F4" /> */}
                </View>
                
              </View>
              <View style={Loginstyles.slide5}>
                <View>
                  <TouchableOpacity style={[Loginstyles.buttonContainer2, Loginstyles.loginButton,{margin:0}]} 
                    onPress={() => this._onLoginFunction()}>
                    <Text style={[Loginstyles.loginText,{fontSize: 30,fontWeight: 'bold'}]}>Бүртгүүлэх</Text>
                </TouchableOpacity>
               </View>
               {/* <View >
                 <TouchableOpacity style={[Loginstyles.buttonContainer2, Loginstyles.loginButton,]} 
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  <Text style={[Loginstyles.loginText,{fontSize: 30,fontWeight: 'bold'}]}>Буцах</Text>
                </TouchableOpacity>
               
              </View>  */}
              </View>
            </Swiper>
          )
     }
    }
     
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
        backgroundColor: '#4285f4'
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4f8dfe'
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5a96ff'
      },
      slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#669fff'
      },
      slide5: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4285f4'
      },
      text: {
        color: '#fff',
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
    