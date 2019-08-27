import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  Button, 
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
  
//import PushNotification from 'react-native-push-notification';
//import PushNotificationAndroid from 'react-native-push-notification'

import { Images } from '../Themes'

// Styles

export default class LaunchScreen extends React.Component {
  render () {
    return (
      
        <ImageBackground source={Images.loginBG} style={{width: '100%',height:'100%', position: 'absolute'}}>
          
          <View style={styles.container}>
          <View style={{ position: 'absolute', bottom: 0}}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableOpacity  onPress={ () => this.props.navigation.navigate('LoginScreen') }>
                  <Text adjustFontSizeToFit numberOfLines={1} style={{color: 'white',}} > Нэвтрэх </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register') } >
                  <Text adjustFontSizeToFit numberOfLines={1} style={{color: 'white',}}> Бүртгүүлэх </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
        </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'rgba(23,100,170, 1)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
  },
  rowText:{
    flexDirection: 'row',
    // padding:10,
    fontSize:15,
    color:'#ff9900',
    justifyContent: 'space-between',
  },
  definition: {
    fontSize:15,
    color:'black',
    textAlign:'justify'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    // flex:1/3,
    borderRadius:10,
    alignContent: 'flex-end',
  },
});