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
    ActivityIndicator,
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
import {Overlay } from 'react-native-elements'
import SplashScreen from 'react-native-smart-splash-screen'
import { setAuthenticationToken,getAuthenticationToken  } from '../../Services/storage'
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
      isVisible : false,
      isLoading: false,

    }
    
  }
  componentDidMount () {
     getAuthenticationToken()
      .then(token => {
          if(token) {
            return this.props.navigation.navigate('Tabs',{
            })
          }else{
            SplashScreen.close({
              animationType: SplashScreen.animationType.scale,
              duration: 850,
              delay: 500,
           })
          }
      }) 
      // this.props.navigation.navigate('Tabs',{
      // })
     
  }
  forgotClicked(){
		this.setState({isVisible: true});
	}
  forgetPassword(){
    Alert.alert('Мэдэгдэл','Нууц үг солигдлоо.Та мэйл хаягаа шалгана уу!')
  }
  loginClicked(){
    let error = this.isValid()
    if(error)
      return
    else{
      this.setState({isLoading: true})
      this._onLoginFunction()
    }
  }
  isValid(){
    let { email ,password } = this.state
    if(!email) {
      Alert.alert('','Мэйл хаягаа оруулна уу!')
      return true
    }

    if(!password) {
      Alert.alert('','Нууц үгээ оруулна уу!')
      return true
    }
    return false
  }
 _onLoginFunction = () => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    var form = new FormData();
    form.append("UserName", this.state.email);
    form.append("Password", this.state.password);
    form.append("grant_type", 'password');
    const config = {
      data: {
        "UserName": this.state.email,
        "Password": this.state.password,
        "grant_type": 'password'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const data = `grant_type=password&UserName=${this.state.email}&Password=${this.state.password}`;   
    axios.post('https://taskmobile.conveyor.cloud/token', data)
     .then(response => {
        this.setState({isLoading: false})
      //  alert(response)
       if(response.data.access_token!=null) {
        let token = response.data.access_token.toString();
        setAuthenticationToken(token);
        let userData = {
           auth_token: token,
         }
         let appState = {
           isLoggedIn: true,
           userData: userData
         }
        this.setState({
           isLoggedIn: appState.isLoggedIn,
           isLoading: true
           //user: appState.user
         })
        
          if(this.state.isLoggedIn) 
                this.props.navigation.navigate('Tabs',{
                })
           else 
                Alert.alert("Алдаа", "Хэрэглэгчийн мэйл эсвэл нууц үг буруу байна!");
          
        } else {
            Alert.alert("Алдаа", "Хэрэглэгчийн мэйл эсвэл нууц үг буруу байна!");
          }
        }).catch(error => {
            Alert.alert("Алдаа",error.message)
            // Alert.alert("Алдаа", "Хэрэглэгчийн имэйл эсвэл нууц үг буруу байна!");
            console.log(error);
        });
        
    
         
  //  axios.post('https://taskmobile.conveyor.cloud/token',config)
  //    .then(response => {
  //      if(response.access_token!=null) {
   //       //console.log(JSON.stringify(response.data.data));
   //       let token = response.access_token.toString();
   //       //let customers_id = response.data.data.customers_id.toString();
   //       //let customers_picture = response.data.data.picture;
   //       //let customer_name = response.data.data.user_name;

   //       // let userData = {
   //       //   name: response.data.data.name,
   //       //   email: response.data.data.email,
   //       //   auth_token: token,
   //       //   customers_id: customers_id
   //       // }

   //       //console.log('login userData ' + JSON.stringify(userData))
   //       setAuthenticationToken(token)
   //       //setCustomerId(customers_id)

   //       let appState = {
   //         isLoggedIn: true,
   //         userData: userData
   //       }

   //       this.setState({
   //         isLoggedIn: appState.isLoggedIn,
   //         //user: appState.user
   //       });

   //       if(this.state.isLoggedIn) {
   //         this.props.navigation.navigate('Tabs',{
   //           //url: customers_picture,
   //           //name: customer_name
   //         })
    //      } else {
    //        Alert.alert("Алдаа", "Хэрэглэгчийн мэйл/нууц үг буруу байна!");
    //      }
    //    }
    //    else{
    //      Alert.alert("Алдаа", "Хэрэглэгчийн имэйл эсвэл нууц үг буруу байна!");
    //    }
    //  }).catch(error => {
    //      alert(error.message)
    //      console.log(error);
    //  });
  }
render() {
    return (
        <ScrollView style={Loginstyles.container}>
          <Overlay
            isVisible={this.state.isVisible}
            width="80%"
            height={250}
  					onBackdropPress={() => this.setState({ isVisible: false })}
				>
          <View style={{flex:1}}>
            <View style={{flexDirection:'row',alignSelf:'center',marginBottom:10}}>
              <Text style={{color:'#2D3954'}}>Бүртгэлтэй мэйл хаягаа оруулна уу.</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <View style={Loginstyles.inputContainer}>
                <TextInput style={Loginstyles.inputs}
                            placeholder="e-mail"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({email})}
                />
                </View>
              </View>
              
                <View style={{flexDirection:'row',marginBottom:5}}>
                  <TouchableOpacity style={[Loginstyles.comfirmButton,{alignContent:'center',
                                justifyContent: 'center',}]} 
                        onPress={() => this.BidProject()}
                        >
                        <Text style={{color:'#fff',justifyContent:'center',
                                textAlign:'center',}}>Нууц үг сэргээх</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[Loginstyles.closeButton,{alignContent:'center',
                                justifyContent: 'center',}]} 
                        onPress={() => this.setState({isVisible: false})}
                        >
                        <Text style={{color:'#fff',justifyContent:'center',
                                textAlign:'center',}}>Хаах</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </Overlay>
          <KeyboardAwareScrollView contentContainerStyle={Loginstyles.container2}
            resetScrollToCoords={{x:0,y:0}}
            scrollEnabled={false}>
            <Image style={Loginstyles.logo} source={Images.a} />
            <View>
            <Text style={{color:'#4285F4',margin:'10%'}}><H2>Онлайн ажил/төслийн платформ</H2></Text> 
            </View>
            <View style={Loginstyles.buttons}>
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
                  placeholder="Нууц үг"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({password})}/>
                  <Icon name="key" size={35} color="#4285F4"/>
              </View>
              <View style={Loginstyles.buttons}>
                <TouchableOpacity style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
                  onPress={() => this.loginClicked()}>
                  <Text style={Loginstyles.loginText}>Нэвтрэх</Text>
                  {this.state.isLoading?<ActivityIndicator/>:null}
                </TouchableOpacity>
                <TouchableOpacity style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={Loginstyles.loginText}>Бүртгүүлэх</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity  onPress={() => this.forgotClicked()}>
              <Text style={{color:'#4285F4'}}>Нууц үг сэргээх</Text>
            </TouchableOpacity>
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
  inputs:{
		borderColor:'#4285F4',
		borderWidth:1,
		width:'90%',
    height:45,
    marginVertical:10,
    backgroundColor:'#dcdcdc'
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
  comfirmButton:{
		backgroundColor:'#4285F4',
		width:'40%',
		height:40,
		borderRadius:5,
		alignSelf:'flex-start',
		marginTop:50,
		alignItems:'center',
		marginHorizontal:'5%'
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
  formText:{
		color:'#2D3954'
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
  closeButton:{
		backgroundColor:'#B3B3B3',
		width:'40%',
		height:40,
		borderRadius:5,
		alignSelf:'flex-end',
		alignItems:'center',
		marginHorizontal:'5%'
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
export default LoginScreen