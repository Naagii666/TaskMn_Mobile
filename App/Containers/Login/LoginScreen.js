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
    ImageBackground
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
import SplashScreen from 'react-native-smart-splash-screen'
//import PushNotification from 'react-native-push-notification';
//import PushNotificationAndroid from 'react-native-push-notification'
import { Images } from '../../Themes'

class LoginScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      email   : '',
      password: '',
      isLoggedIn: false,
      userData: {},
    }
    
  }
  componentDidMount () {
     //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
     SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
     })
  }
  _onLoginFunction = () => {
    var form = new FormData();
    form.append("email", this.state.email);
    form.append("password", this.state.password);

        this.setState({
            isLoggedIn: true,
          });
        if(this.state.isLoggedIn) {
            this.props.navigation.navigate('Tabs')
        } 
  }
 // _onLoginFunction = () => {
 //    var form = new FormData();
 //    form.append("email", this.state.email);
 //    form.append("password", this.state.password);

 //    axios.post('http://124.158.124.60:8080/toilet/api/user/login',form)
 //      .then(response => {
 //        if(response.data.success) {
 //          console.log(JSON.stringify(response.data.data));
 //          let token = response.data.data.auth_token.toString();
 //          let customers_id = response.data.data.customers_id.toString();
 //          let customers_picture = response.data.data.picture;
 //          let customer_name = response.data.data.user_name;

 //          let userData = {
 //            name: response.data.data.name,
 //            email: response.data.data.email,
 //            auth_token: token,
 //            customers_id: customers_id
 //          }

 //          console.log('login userData ' + JSON.stringify(userData))
 //          setAuthenticationToken(token)
 //          setCustomerId(customers_id)

 //          let appState = {
 //            isLoggedIn: true,
 //            userData: userData
 //          }

 //          this.setState({
 //            isLoggedIn: appState.isLoggedIn,
 //            user: appState.user
 //          });

 //          if(this.state.isLoggedIn) {
 //            this.props.navigation.navigate('Dashboard',{
 //              url: customers_picture,
 //              name: customer_name
 //            })
 //          } else {
 //            Alert.alert("Алдаа", "Хэрэглэгчийн мэйл/нууц үг буруу байна!");
 //          }
 //        }
 //        else{
 //          Alert.alert("Алдаа", "Хэрэглэгчийн имэйл эсвэл нууц үг буруу байна!");
 //        }
 //      }).catch(error => {
 //          alert(error.message)
 //          console.log(error);
 //      });
 //  }
render() {
    return (
      // <ImageBackground source={Images.loginBG} style={{width: '100%',height:'100%', position: 'absolute'}}>
        <ScrollView style={Loginstyles.container}>
          <KeyboardAwareScrollView contentContainerStyle={Loginstyles.container2}
            resetScrollToCoords={{x:0,y:0}}
            scrollEnabled={false}>
            <Image source={Images.loginLogo} />
            <View style={Loginstyles.buttons}>
              <View style={Loginstyles.inputContainer}>
                <Icon name="mail" size={35} color="#1764AA" />
                <TextInput style={Loginstyles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
              </View>
        
              <View style={Loginstyles.inputContainer}>
                <Icon name="key" size={35} color="#1764AA"/>
                <TextInput style={Loginstyles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({password})}/>
              </View>
              <View style={Loginstyles.buttons}>
                <TouchableOpacity style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
                  onPress={(e) => this._onLoginFunction(e)}>
                  <Text style={Loginstyles.loginText}>Нэвтрэх</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
                  onPress={() => this.props.navigation.navigate('Forgot_password')}>
                  <Text style={Loginstyles.loginText}>Бүртгүүлэх</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Register')}>
              <Text>Нууц үг сэргээх</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ScrollView>
    // </ImageBackground>

    );
  }
}
 
const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(23,100,170, 1)'
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
      borderBottomColor: '#1764AA',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius:30,
      borderBottomWidth: 1,
      borderColor:'#1764AA',
      borderWidth:1,
      width:'90%',
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      paddingLeft:10
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
      borderBottomColor: '#1764AA',
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
    backgroundColor: "#3498db",
  },
  loginText: {
    color: 'white',
  }
});
export default LoginScreen