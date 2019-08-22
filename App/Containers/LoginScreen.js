import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  Button, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
  
//import PushNotification from 'react-native-push-notification';
//import PushNotificationAndroid from 'react-native-push-notification'

import { Images } from '../Themes'

// Styles

export default class LoginScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View >
          
        </View>
        <Text>ene login huudas n</Text>
        
          
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#dcdcdc',
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
    backgroundColor: '#f9ac19',
    padding: 10,
    margin: 10,
    // flex:1/3,
    borderRadius:10,
    alignContent: 'flex-end',
  },
});