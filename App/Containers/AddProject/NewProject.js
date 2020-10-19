//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler,TextInput,Alert,Image} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html';
import ImageView from 'react-native-image-view';
// import { addProject } from './AddActions'
import { addProject } from '../Projects/ProjectsActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// import FilePickerManager from 'react-native-file-picker';
import ImagePicker from 'react-native-image-picker'
import DatePicker from 'react-native-datepicker';
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var todayDate =  year+ '-' + month  + '-' +date 
class NewProject extends React.Component {   
    constructor(props) {
        super(props);
        // this.searchInput = React.createRef();
        this.state = {
          name : '',
          description   : '',
          lowPrice: '',
          highPrice: '',
          loading: false,
          photo: [],
          TypeID:'',
          startDate:'',
          duration:'',
          height :0
          // text:'',
        }
    }
    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      this.setState({startDate:todayDate}) 
      const TypeID = this.props.navigation.getParam('item', []);
      this.setState({TypeID: TypeID});
    }
    componentWillUnmount(){
      this.backHandler.remove()
      this.clearText()
    }
    handleBackPress = () => {
      this.goBack(); // works best when the goBack is async
      this.clearText()
      return true;
    }
    componentWillMount(){
      this.clearText()
    }
    clearText(){
      this.setState({
        name : '',
        description   : '',
        lowPrice: '',
        highPrice: '',
        loading: false,
        photo: [],
        TypeID:'',
        startDate:'',
        duration:'',
        height :0
      })
    }
    goBack(){
      this.props.navigation.navigate('Tabs',{
      })
    } 
    InsertProject = (id) => {
      // alert(id)
      let error = this.formValidate()
      if(error) return
      // const { navigation } = this.props;
      // const TypeID = navigation.getParam('TypeID', []);
      this.setState({TypeID: id});
      this.props.addProject(this.state)
      this.props.navigation.pop()
      this.props.navigation.navigate('Projects',{
      })
    }
    launchImageLibrary = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          console.log(response.customButton);
        } else {
          const source = { uri: response.uri };
          console.log('response', JSON.stringify(response));
          let photo = this.state.photo
          photo.push(response)
          this.forceUpdate()
        }
        // alert(this.state.photo[0])
      });
  
    }
    handleChoosePhoto = () => {
      const options = {
        title: 'Зураг оруулах',
      };
  
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          let photo = this.state.photo
          photo.push(response)
          this.forceUpdate()
        }
      });
    };
    renderPhoto(){
      if(this.state.photo!=null){
        return(
          this.state.photo.map((photo) => (
            <View>
                
                <TouchableOpacity 
                  activeOpacity={0.6}
                  onPress={()=>
                    this.state.photo.map(elem =>{
                      if(elem.uri==photo.uri){
                        var index=this.state.photo.indexOf(elem);
                        this.state.photo.splice(index,1);
                        this.forceUpdate()
                      }
                    })
                  }>
                  <Icon style={{marginLeft:95,paddingTop:10}} name='times-circle' size={20} color='red' />  
                </TouchableOpacity>
                <Image source={{ uri: photo.uri }} 
                  style={{ width: 100, height: 100,marginBottom:10,marginHorizontal:5 }}/>
            
            </View>
            ))
        )
      }
    }
    formValidate() {
      let { name ,startDate,TypeID ,duration,lowPrice,highPrice,description} = this.state
      if(!name) {
        Alert.alert('','Ажлын нэрийг оруулна уу!')
        return true
      }
      if(!duration) {
        Alert.alert('','Үргэлжилэх хугацааг оруулна уу!')
        return true
      }
      if(!lowPrice) {
        Alert.alert('','Үнийн мэдээллийг оруулна уу!')
        return true
      }
      if(!highPrice) {
        Alert.alert('','Үнийн мэдээллийг оруулна уу!')
        return true
      }
      if(!description) {
        Alert.alert('','Ажлын дэлгэрэнгүйг оруулна уу!')
        return true
      }
      if(!startDate) {
        Alert.alert('','Санал авах сүүлийн хугацааг оруулна уу!')
        return true
      }
      
    }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
              this.clearText(),
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
      const name = navigation.getParam('name', 'Категори сонгогдоогүй');
      const id = navigation.getParam('item', '');
      let photos = this.renderPhoto()
      return(
      <View style={{flex:1}}>
          <Header
          containerStyle={{
              height:Header2.HEIGHT,
              backgroundColor: '#4285F4',
          }}
              leftComponent={this.renderLeftComponent()}
              centerComponent={{ text: name, style:styles.headerTitle }}
          //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
          //   rightComponent={{ icon: 'home', color: '#fff' }}
          />
          <KeyboardAwareScrollView style={{marginHorizontal:10}}>
            <View style={{ marginTop: 10, }}>
                <Text style={{color:'#4285F4'}}>
                  Гарчиг: *
                </Text>
            </View>

            <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                  <TextInput 
                      style={styles.inputs}
                      keyboardType='default'
                      placeholder="Ажлын нэр"
                      value={this.state.name}
                      underlineColorAndroid='transparent'
                      // maxLength={8}
                      onChangeText={name => this.setState({name})}
                  />
              </View>  
            </View>

            <View style={{ marginBottom: 10, }}>
              <Text style={{color:'#4285F4'}}>
                Тайлбар:
              </Text>
            </View>

            <View style={{alignContent:'center',marginHorizontal:10,flex:1}}>
              <View style={styles.inputContainer2}>    
                  <TextInput style={styles.inputs,{height: Math.max(45, this.state.height)}}
                      numberOfLines={5}
                      placeholder="Ажлын дэлгэрэнгүйг оруулна"
                      ellipsizeMode="head"
                      keyboardType="default"
                      onContentSizeChange={(event) => {
                        this.setState({ height: event.nativeEvent.contentSize.height<100?event.nativeEvent.contentSize.height:100 })
                      }}
                      multiline={true}
                      value={this.state.description}
                      underlineColorAndroid='transparent'
                      onChangeText={description => this.setState({description})}
                  />
              </View>
            </View>
            
            <View style={{ marginBottom: 10, }}>
              <Text style={{color:'#4285F4'}}>
                  Ажлын хөлсний хэмжээ/төгрөгөөр/:
              </Text>
            </View>

            <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={styles.inputContainer}> 
                    
                  <TextInput style={styles.inputs}
                      placeholder="Доод үнэ"
                      keyboardType="numeric"
                      value={this.state.lowPrice}
                      // value={this.state.firstName}
                      underlineColorAndroid='transparent'
                      onChangeText={lowPrice => this.setState({lowPrice})}
                  />
                  <TextInput 
                      // style={{marginLeft:-20,}}
                      editable={false}
                      placeholder="₮"
                      // value={this.state.textInputValue} 
                      /> 
                  
              </View>
              <View style={styles.inputContainer}>    
                    
                  <TextInput style={styles.inputs}
                      placeholder="Дээд үнэ"
                      keyboardType="numeric"
                      value={this.state.highPrice}
                      // value={this.state.firstName}
                      underlineColorAndroid='transparent'
                      onChangeText={highPrice => this.setState({highPrice})}
                  />
                  <TextInput
                      // style={{marginLeft:-20,}}
                      editable={false}
                      placeholder="₮"
                      // value={this.state.textInputValue} 
                      />
                  
              </View>
            </View>

            <View style={{ marginBottom: 10, }}>
              <Text style={{color:'#4285F4'}}>
                  Шаардагдах ур чадварууд:
              </Text>
            </View>

            <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={styles.inputContainer}>    
                  <TextInput style={styles.inputs}
                      placeholder="HTML , PHP , Англи хэл ..."
                      ellipsizeMode="head"
                      value={this.state.skills}
                      keyboardType="default"
                      // value={this.state.firstName}
                      underlineColorAndroid='transparent'
                      onChangeText={skills => this.setState({skills})}
                  />
              </View>
            </View>
            

            <View>
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#4285F4'}}>
                  Үргэлжлэх хугацаа/зөвхөн хоног/:
                </Text>
            </View>

            <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={[styles.inputContainer]}>
                  <TextInput style={styles.inputs}
                      placeholder="120 , 6 ..."
                      keyboardType="numeric"
                      value={this.state.duration}
                      underlineColorAndroid='transparent'
                      onChangeText={duration => this.setState({ duration })}
                  />
                  <TextInput
                      // style={{marginLeft:-20,}}
                      editable={false}
                      placeholder="хоног"
                      // value={this.state.textInputValue} 
                      />
              </View>
            </View>

            {/* <View> */}
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#4285F4'}}>
                  Санал авах сүүлийн хугацаа: *
                </Text>
              </View>

            <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={[styles.inputContainer]}>
              
                <DatePicker
                  style={{width: 200}}
                  date={this.state.startDate}
                  mode="date"
                  placeholder="Он сар сонгох"
                  format="YYYY-MM-DD"
                  minDate={todayDate}
                  maxDate="2030-01-01"
                  confirmBtnText="Сонгох"
                  cancelBtnText="Буцах"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => {this.setState({startDate: date})}}
                />
              </View>
            </View>

            <View style={{ marginBottom: 10, flexDirection:'row'}}>
              <Text style={{color:'#4285F4',marginTop:10}}>
                  Зураг:
              </Text>
              <View style={[styles.inputContainer, { marginBottom: 0, borderBottomColor: "#fff"}]}>
                <View style={{margin:10}}>
                <Button
                    // icon={
                    //   <Icon
                    //     name="add"
                    //     size={18}
                    //     color="white"
                    //   />
                    // }
                    style={{
                      borderRadius:10,
                      width:'50%',
                      backgroundColor:'#4285F4'
                    }}
                    onPress={() => {
                      this.launchImageLibrary()
                    }}
                    title="Зураг нэмэх"
                  />
                </View>
              </View>
            </View>

            <View style={{alignContent:'center',marginHorizontal:10 ,marginBottom:60}}>
              
              <View style={{flex:1,flexDirection: 'row',}}>
                    {photos}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.constContainer}>
          {/* <TouchableOpacity style={[styles.bidButton]} 
                  onPress={() => this.InsertProject(id)}
          >
              <Text style={styles.bidText}>+ Ажил нэмэх</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.bidButton,{ alignContent:'center' , flex:1,alignItems:'center'}]} 
                        onPress={() => this.InsertProject(id)}
                    >
                      <Text style={styles.bidText}>+ Ажил нэмэх</Text>
          </TouchableOpacity>
          
        </View> 
    </View>
      
      
      );
  }
}
export default connect(
  state => ({
        // loading: state.addProject.getIn(['project_list', 'loading']),
        // project: state.addProject.getIn(['project_list', 'data']),
  }),
  dispatch => {
    return {
      addProject: bindActionCreators(addProject, dispatch),
      //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    }
  }
)(NewProject)
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  backButton:{
    backgroundColor:'#B3B3B3',
    alignContent:'center',
    justifyContent: 'center',
    width:'40%',
    borderRadius:10,
    height:'70%',
    borderWidth:1,
    borderColor:'#B3B3B3',
    marginHorizontal:'5%',
    marginVertical:5
  },
  bidButton:{
    backgroundColor:'#69d275',
    // marginBottom:20,
    alignContent:'center',
    justifyContent: 'center',
    height:'70%',
    width:'40%',
    borderWidth:1,
    borderColor:'#27b737',
    borderRadius:10,
    marginHorizontal:'5%',
    marginVertical:5
  },
  constContainer:{
    left:0,
    right:0,
    bottom:0,
    height:Header2.HEIGHT,
    backgroundColor:'#fff',
    borderTopWidth:2,	
    borderTopColor:'#dcdcdc',
    flexDirection:'row',
    // alignSelf:'center'
    position:'absolute',
    flex:0.1,
  },
  bidText:{
    color:'#fff',
    // fontWeight:'bold',
    fontSize:14,
    justifyContent:'center',
    textAlign:'center',
    flexDirection:'row'
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: "#4285F4",
    width:'90%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
  },
  inputContainer2: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: "#4285F4",
    width:'90%',
    height:100,
    maxHeight:200,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    flex:1
  },
  inputs:{
    height:45,
    maxHeight:200,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    // flex:1,
    maxHeight:200
    
  },
  
  backButton:{
    backgroundColor:'#f28787',
    alignContent:'center',
      justifyContent: 'center',
    width:'40%',
    // alignSelf:'flex-start',
    marginLeft:'5%',
    borderRadius:10,
    height:'70%',
    marginTop:10,
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#ec7a73'
    },
  // constContainer:{
  //   left:0,
  //   right:0,
  //   bottom:0,
  //   width:'100%',
  //   height:'10%',
  //   backgroundColor:'#fff',
  //   borderTopWidth:1,	
  //   borderTopColor:'#DB4437',
  //   // flexDirection:'row',
  //   alignSelf:'center',
  //   marginVertical:10,
  //   flexDirection:'row',
  //   justifyContent:'center'
  //   },
  btnText: {
    textAlign: 'center',
    color: '#4285F4',
    fontSize: 14,
  },
})