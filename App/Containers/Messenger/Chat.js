import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import { Header as Header2 ,NavigationActions} from 'react-navigation';
import {Header} from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper';
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit amet"},
        {id:2, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit amet"} ,
        {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        {id:9, date:"9:55 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
      ]
    };
  }

  componentWillMount() { 
    const { navigation} = this.props;
    const item = navigation.getParam('item', 'User');
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
  handleBackPress = () => {
    this.goBack();
    return true;
  }
  goBack(){
    this.props.navigation.pop(),
    this.props.navigation.navigate('Tabs',{
    })
    // this.props.navigation.goBack()
  }
  renderLeftComponent(){
      return(
          <View style={{flex:1}} >
              <TouchableOpacity 
                      onPress={() => {
          // this.props.navigation.goBack()
          this.props.navigation.pop(),
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
  _handleLoadMore(){
    return(
      <View>
        <ActivityIndicator/>
      </View>
    )
  }
    
  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {
    const { navigation} = this.props;
    const item = navigation.getParam('item', 'User');
    return (
        <View style={{flex:1}}>
            <Header containerStyle={{
                    height:Header2.HEIGHT,
                    backgroundColor: '#4285F4',
                }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text:  item.UserName, style: { color: '#fff',fontWeight:'bold',fontSize:18, alignSelf:'center',marginVertical:'30%'} }}
            />
      <View style={styles.container}>
          
        <FlatList style={styles.list}
          inverted
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id.toString();
          }}
          renderItem={(message) => {
            console.log(item);
            const item = message.item;
            let inMessage = item.type === 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.date)}
                <View style={[styles.balloon]}>
                  <Text>{item.message}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
              </View>
            )
          }}
          onEndReached={this._handleLoadMore}
          />
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                  placeholder="Write a message..."
                  underlineColorAndroid='transparent'
                  onChangeText={(name_address) => this.setState({name_address})}/>
            </View>

              <TouchableOpacity style={styles.btnSend}>
                <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
              </TouchableOpacity>
          </View>
      </View>
    </View> 
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list:{
    paddingHorizontal: 17,
    // flexDirection:'column-reverse'
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:5,
  },
});  