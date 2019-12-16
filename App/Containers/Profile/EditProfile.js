import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {ActivityIndicator, H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet, TextInput,BackHandler,Alert,KeyboardAvoidingView} from 'react-native'
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header as Header2 } from 'react-navigation';
import {  Card, ListItem, Button,Rating, AirbnbRating ,Avatar,Header} from 'react-native-elements'
import { getUserProjects } from '../Projects/ProjectsActions'
import { getProfile } from './ProfileActions'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName : '',
      LastName : '',
      UserName   : '',
      UserEmail: '',
      Education: '',
      PhoneNumber: '',
      HomeAddress: '',
      Job: '',
      Description:''
    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const { navigation } = this.props;
    const item = navigation.getParam('user', 'user');
    this.setState({FirstName:item.FirstName,
                    LastName:item.LastName,
                    UserName:item.UserName,
                    UserEmail:item.UserEmail,
                    Education:item.Education,
                    PhoneNumber:item.PhoneNumber,
                    Job:item.Job,
                    Description:item.Description,
                    HomeAddress:item.HomeAddress
    })
  }
  componentWillMount(){
    const { navigation } = this.props;
    const item = navigation.getParam('user', 'user');
    this.setState({FirstName:item.FirstName,
                    LastName:item.LastName,
                    UserName:item.UserName,
                    UserEmail:item.UserEmail,
                    Education:item.Education,
                    PhoneNumber:item.PhoneNumber,
                    Job:item.Job,
                    Description:item.Description,
                    HomeAddress:item.HomeAddress
    })
  }
  componentWillUnmount(){
    this.backHandler.remove()
  }
  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
    }
  goBack(){
      this.props.navigation.navigate('Tabs',{
      })
  }
  renderCenterComponent(){
    return(
      <View style={{flex:1,alignContent:'center'}} >
        <Text style={{color: '#fff',fontWeight:'bold',fontSize:18}}>Засварлах</Text>
      </View>
    )
  }
  
  renderLeftComponent(){
    return(
      <View style={{flex:1}} >
        <TouchableOpacity 
            onPress={() => {
                            this.props.navigation.navigate('Tabs',{
                      })
            }}>
          <View >
            <Icon name="chevron-left" size={16} color="#fff"/>
            {/* <Text style={{color:"#fff", fontSize:10}}>Буцах</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
 	render() {
    return (
      <View style={{flex:1}}>
        <Header containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
          }}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          
        />
        <ScrollView>
          <KeyboardAwareScrollView resetScrollToCoords={{x:0,y:0}} >
              {/* <Text style={{color:'black'}}>{this.state.UserName}</Text> */}
            <View style={{marginVertical:10,alignContent:'center'}}>
              {/* <Icon name="v-card" size={32} color="#f9ac19" /> */}
              <View style={styles.infoView}>
                      <Text style={styles.titleInfo}>Овог :</Text>
                      <TextInput
                        style={styles.userInfo}
                        underlineColorAndroid='transparent'
                        selectTextOnFocus={false}
                        value={this.state.FirstName}
                        onChangeText={(FirstName) => this.setState({FirstName})}/>
                </View>
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.LastName}
                onChangeText={(LastName) => this.setState({LastName})}
                />
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.UserName}
                onChangeText={(UserName) => this.setState({UserName})}
                />
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.UserEmail}
                onChangeText={(UserEmail) => this.setState({UserEmail})}
                />
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.PhoneNumber}
                onChangeText={(PhoneNumber) => this.setState({PhoneNumber})}/>
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.Education}
                onChangeText={(Education) => this.setState({Education})}
                />
              <TextInput
                underlineColorAndroid='transparent'
                selectTextOnFocus={false}
                value={this.state.HomeAddress}
                onChangeText={(HomeAddress) => this.setState({HomeAddress})}
                />
              
              <KeyboardAvoidingView>
                <TextInput
                  underlineColorAndroid='transparent'
                  selectTextOnFocus={false}
                  value={this.state.Description}
                  onChangeText={(Description) => this.setState({Description})}
                  />
                  
              </KeyboardAvoidingView>
              
              <TouchableOpacity>
                <Text>Засварлах</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
   state => ({
		loading: state.profile.getIn(['profile_list', 'loading']),
		profile: state.profile.getIn(['profile_list', 'data']),
          // projects: state.project.getIn(['project_list', 'data']).toJS(),
    loading2: state.project.getIn(['user_projects', 'loading']),
		userProjects: state.project.getIn(['user_projects', 'data'])
   }),
   dispatch => {
     return {
       getProfile: bindActionCreators(getProfile, dispatch),
       getUserProjects: bindActionCreators(getUserProjects, dispatch)
     }
   }
)(EditProfile);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFF",
  },
  text:{
    fontSize:16,
    color:'black',
    marginHorizontal:10
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#4285F4",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
  },
  body:{
    backgroundColor: "#FFF",
    marginVertical:30
  },
  body2:{
    backgroundColor: "#FFF",
    // height:500,
    // alignItems:'center',
    borderTopWidth:2,
    borderTopColor:'#727b84'
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  infoView:{
    width:'70%',
    alignSelf:'center',
    flexDirection:'row', 
    justifyContent:'space-between' 
  },
  userInfo:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
  },
  titleInfo:{
    fontSize:14,
    color:"#4285F4",
    fontWeight:'300',
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#4285F4",
    
  },
  buttonContainer: {
    height:20,
    flexDirection: 'row',
    justifyContent: 'center',
	alignItems: 'center',
	width:'40%',
	
	// backgroundColor: "#red",
	marginHorizontal:'5%',
  },
  loginButton: {
    backgroundColor: "#4285F4",
  },
  isActive:{
    borderBottomColor:'#4285F4',
    borderBottomWidth:3,
    }
});