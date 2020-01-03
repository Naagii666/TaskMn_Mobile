//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl } from 'react-native';
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getAllWorkers } from '../Search/WorkersActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import SplashScreen from 'react-native-smart-splash-screen'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
const test = [{
  "UserName" : "Naagii",
  "ProPicture" : null,
  "FirstName" : "Naagiii",
  "LastName" : "Naagiii",
	"Education":"Num",
  "Job":"Developer",
  "PhoneNumber" : 9999999,
	"HomeAddress" : "UB Mongolia",
	"UserEmail" : "naagii.dashdorj@gmail.com",
	"Skills" :"English",
  "Description": " Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
  "ORating" : 4.7,
  "FRating" : 5
  },
  {
    "UserName" : "Test",
    "ProPicture" : null,
    "FirstName" : "TestF",
    "LastName" : "TestL",
    "Education":"Num",
    "Job":"Developer",
    "PhoneNumber" : 9999999,
    "HomeAddress" : "UB Mongolia",
    "UserEmail" : "naagii.dashdorj@gmail.com",
    "Skills" :"English",
    "Description": " Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
    "ORating" : 4.7,
    "FRating" : 5
    }
]
const itemData = Object.values( test );
class MessagesScreen extends React.Component {
    componentDidMount(){
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
     })
    }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                            this.props.navigation.navigate('TopNavigation',{
                              
                      })
                }}>
					<View >
						<Icon name="chevron-left" size={16} color="#fff"/>
					</View>
				</TouchableOpacity>
			</View>
        )
    }
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', []);
        return(
        <View>
            {/* <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: item.UserName, style:styles.headerTitle }}
            /> */}
            
        </View>
        );
    }
}
export default (MessagesScreen);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
	}
})