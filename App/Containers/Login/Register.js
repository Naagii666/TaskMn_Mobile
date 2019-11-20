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
class Register extends Component {

    constructor(props){
      super(props)
      this.state = {
        email   : '',
        password: '',
        password_confirmation: '',
        phone:'',
        isLoggedIn: false,
      }
      
    }
    componentDidMount () {
        //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        
     }

     render() {
        return (
            <ScrollView style={Loginstyles.container}>
              <KeyboardAwareScrollView contentContainerStyle={Loginstyles.container2}
                resetScrollToCoords={{x:0,y:0}}
                scrollEnabled={false}>
                    <Image style={Loginstyles.logo} source={Images.logo_taskmn3} />
            <View>
            <Text style={{color:'#4285F4',margin:'10%'}}><H2>Шинээр бүртгүүлэх</H2></Text> 
            </View>
            <View style={Loginstyles.buttons}>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Овог"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="user" size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Нэр"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="user" size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Хэрэглэгчийн нэр"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="user" size={35} color="#4285F4" />
              </View>

              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Имэйл хаяг"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="mail-with-circle" size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Нууц үг"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({password})}/>
                  <Icon name="key" size={35} color="#4285F4"/>
              </View>
              
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Нууц үг баталгаажуулах"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="key" size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Утасны дугаар"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name='phone' size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Гэрийн хаяг"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="address" size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.inputContainer}>
                
                <TextInput style={Loginstyles.inputs}
                  placeholder="Боловсрол"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
                  <Icon name="graduation-cap" size={35} color="#4285F4" />
              </View>
              <View style={Loginstyles.buttons}>
                <TouchableOpacity style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
                  onPress={() => this._onLoginFunction()}>
                  <Text style={Loginstyles.loginText}>Бүртгүүлэх</Text>
                </TouchableOpacity>
               
              </View>
              <View >
                <TouchableOpacity style={[Loginstyles.buttonContainer, Loginstyles.loginButton,]} 
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  <Text style={Loginstyles.loginText}>Буцах</Text>
                </TouchableOpacity>
               
              </View>
            </View>
            
        </KeyboardAwareScrollView>
          </ScrollView>
        );
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
      inputContainer: {
          borderBottomColor: '#fff',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius:0,
          borderBottomWidth: 0,
          borderColor:'#fff',
          borderWidth:0,
          width:'90%',
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
    