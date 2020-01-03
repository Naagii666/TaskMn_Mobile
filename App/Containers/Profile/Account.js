//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl ,BackHandler } from 'react-native';
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getAllWorkers } from '../Search/WorkersActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class Account extends React.Component {
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
    }
    goBack(){
        this.setState({bidView: false});
        this.props.navigation.navigate('Tabs',{
        })
    } 
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                            this.props.navigation.navigate('Tabs',{
                      })
                }}>
					<View style={{flexDirection:'row'}}>
                        <Icon name="chevron-left" size={16} color="#fff"/>
                        <Text style={{color:'#FFF'}}> Буцах</Text>
                    </View>
				</TouchableOpacity>
			</View>
        )
    }
    renderSeparator = () => {
		return (
			<View
  				style={{
					marginVertical:10,
    				borderBottomColor: '#dcdcdc',
    				borderBottomWidth: 1,
  						}}
			/>
		);
	};
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', []);
        return(
        <View>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Данс', style:styles.headerTitle }}
            />
            <View style={styles.body}>
                <Text style={{color:'#2D3954',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>
                    Данс цэнэглэх заавар
                </Text>
                <View style={{flexDirection:'row',marginVertical:10}}>
                    <Text style={{color:'#3c4348',textAlign:'justify' , fontSize:16}}>
                        Хаан Банкны 5022781276 данс руу цэнэглэх мөнгөө шилжүүлнэ. Гүйлгээний утга дээр бүртгүүлсэн утасны дугаараа бичнэ.
                    </Text>
                    {/* <Text style={{color:'#27B737'}}>
                    {' '}5022781276{' '}
                    </Text>  
                    <Text style={{color:'#3c4348'}}>
                        данс руу цэнэглэх мөнгөө шилжүүлнэ. Гүйлгээний утга дээр бүртгүүлсэн утасны дугаараа бичнэ.
                    </Text>  */}
                </View>
                <View style={{flexDirection:'row',marginVertical:10}}>
                    <Text style={{color:'#3c4348', fontSize:16}}>
                        Бүртгэлтэй дугаар : 
                    </Text>  
                    <Text style={{color:'#F33066',fontSize:16}}>
                        {' '}{item}{' '}
                    </Text> 
                </View>
                
            </View>
            
        </View>
        );
    }
}
export default (Account);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  body:{
    margin:10,
    backgroundColor:"#FFF",
    // flex:1
  },
  emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
	}
})