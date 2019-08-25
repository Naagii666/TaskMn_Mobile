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
    StyleSheet,
    Alert,
    AsyncStorage
} from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
//import PushNotification from 'react-native-push-notification';
//import PushNotificationAndroid from 'react-native-push-notification'

import { Images } from '../Themes'

class LoginScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      email   : '',
      password: '',
      isLoggedIn: false,
      userData: {}
    }
  }

  _onLoginFunction = () => {
        this.setState({
            isLoggedIn: true,
          });
        if(this.state.isLoggedIn) {
            this.props.navigation.navigate('LaunchScreen')
          } 
  }
 
render() {
    return (
      <ScrollView style={Loginstyles.container}>
        <KeyboardAwareScrollView contentContainerStyle={Loginstyles.container2}
        resetScrollToCoords={{x:0,y:0}}
        scrollEnabled={false}>
        <View style={Loginstyles.inputContainer}>
          <Icon name="mail" size={35} color="#42f44b" />
          <TextInput style={Loginstyles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={Loginstyles.inputContainer}>
        <Icon name="key" size={35} color="#42f44b"/>
          <TextInput style={Loginstyles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={Loginstyles.buttons}>
        <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
            onPress={(e) => this._onLoginFunction(e)}>
          <Text style={Loginstyles.loginText}>Нэвтрэх</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={Loginstyles.loginText}>Бүртгүүлэх</Text>
        </TouchableHighlight>
        </View>
        
        <View style={Loginstyles.inputContainer1}>
          {/* <TouchableHighlight style={[Loginstyles.facebook, Loginstyles.loginButton]} 
              onPress={() => this.onClickListener('facebook_login')}>
            <Text style={Loginstyles.loginText}>Facebook нэвтрэх</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[Loginstyles.fingerPrint]} 
              onPress={() => this.onClickListener('login')}>
            <Image style={Loginstyles.fingerIcon} source={Images.fingerPrint}/> */}
            {/* <Text style={Loginstyles.loginText}>Хур</Text> */}
          {/* </TouchableHighlight> */}
        </View>

        {/* <TouchableHighlight style={Loginstyles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Нууц үгээ мартсан?</Text>
        </TouchableHighlight> */}

        {/* <TouchableHighlight style={Loginstyles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Бүртгүүлэх</Text>
        </TouchableHighlight> */}
      </KeyboardAwareScrollView>
      </ScrollView>

    );
  }
}
 
const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  container2: {
    paddingTop:'30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons:{
    marginTop:'10%'
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      borderColor:'lightgrey',
      borderWidth:1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      paddingLeft:10
  },
  inputContainer1: {
    width:250,
    height:45,
    marginBottom:15,
    flexDirection: 'row',
    alignItems:'center',
},
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
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
    width:250,
    borderRadius:30,
  },
  facebook: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
  },
  fingerPrint: {
    height:45,
    marginBottom:20,
    width:50,
    borderRadius:30,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: "#42f44b",
  },
  loginText: {
    color: 'white',
  }
});
export default LoginScreen