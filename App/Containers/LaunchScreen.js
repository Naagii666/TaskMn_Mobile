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

export default class LaunchScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View >
          
        </View>

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}>
          <View style={{flexDirection: 'row', padding: 20, }}>
            <TouchableOpacity  onPress={ () => this.props.navigation.navigate('LoginScreen') }>
              <Text adjustFontSizeToFit numberOfLines={1} > Нэвтрэх </Text>
            </TouchableOpacity>
            <View style={{ width: 20, }} />
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register') } >
              <Text adjustFontSizeToFit numberOfLines={1}> Бүртгүүлэх </Text>
            </TouchableOpacity>
          </View>
        </View>
          
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