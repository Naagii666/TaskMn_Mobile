//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
 
export default class HomeScreen extends React.Component {
  //Home Screen to show in Home Option
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',backgroundColor: '#FFFFFF', alignItems: 'center' }}>
        <Text style={{ marginTop: 50, fontSize: 25 }}>Home!</Text>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});