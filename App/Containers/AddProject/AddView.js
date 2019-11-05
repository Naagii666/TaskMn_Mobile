import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import { View, Text, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert,ScrollView, TextInput ,TouchableOpacity} from 'react-native'
// import moment from 'moment'
import { H2, H3, H4 } from '../../Components'
import { addProject,getProjectTypes } from './AddActions'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'
import ModalSelector from 'react-native-modal-selector'
import FilePickerManager from 'react-native-file-picker';
import ImagePicker from 'react-native-image-picker'
class AddView extends React.Component {
	constructor(props) {
      super(props);
      state = {
        name : '',
        description   : '',
        lowPrice: '',
        highPrice: '',
        loading: false,
        photo: [],
        typeID:'',
        startDate:'',
        duration:'',
      }
    }
  _alert(){
    Alert.alert('Мэдэгдэл', 'хийгдэж байна')
  }
  componentDidMount() {
    this.props.getProjectTypes()
    this.setState({description:' '})
	}
  // handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   if(this.state.photo.length>2){
  //     alert('Гурваас олон зураг оруулах боломжгүй')
  //   }else{
  //     ImagePicker.launchImageLibrary(options, response => {
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       } else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //       } else {
  //         const source = { uri: response.uri };
  //         this.state.photo.push(response.uri)
  //         this.forceUpdate()
  //       }
  //     });
  //   }
  // };
  InsertProject = () => {
    // alert('Project added')
    let error = this.formValidate()
    if(error) return
    this.props.addProject(this.state)
  }
  formValidate() {
    let { name ,startDate,typeID } = this.state
    if(!name) {
      Alert.alert('','Ажлын нэрийг оруулна уу!')
      return true
    }
    if(!typeID) {
      Alert.alert('','Ажлын категорийг сонгоно уу!')
      return true
    }
    if(!startDate) {
      Alert.alert('','Санал авах сүүлийн хугацааг оруулна уу!')
      return true
    }
    
  }
  // renderPhoto(){
  //   if(this.state.photo!=null){
  //     return(
  //       this.state.photo.map((photo) => (
  //         <View>
  //             <Image source={{ uri: photo.uri }} 
  //               style={{ width: 100, height: 100,marginVertical:10,marginHorizontal:5 }}/>
  //             <TouchableOpacity 
  //               activeOpacity={0.6}
  //               onPress={()=>
  //                 this.state.photo.map(elem =>{
  //                   if(elem.uri==photo.uri){
  //                     var index=this.state.photo.indexOf(elem);
  //                     this.state.photo.splice(index,1);
  //                     this.forceUpdate()
  //                   }
  //                 })
  //               }>
  //               <Icon2 style={{marginLeft:50}} name='trash-o' size={20} color='red' />  
  //             </TouchableOpacity>
          
  //         </View>
  //         ))
  //     )
  //   }
    
  // }
	render() {
    // const { photo } = this.state;
    const { project, loading,types } = this.props
    let typeData = []
    if(this.props.types) {
      this.props.types.forEach((type) => {
        if(type.TypeName) {
          typeData.push({
            label: type.TypeName,
            id: type.TypeID,
          })
        }
      })
    }
    // let photos = this.renderPhoto()
    
		return (
      <View style={{marginBottom:60}}>
      <ScrollView style={styles.container}>
        <View style={{ padding: 20, }}>
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                  Категори: *
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
                <View style={[styles.inputContainer, { flex: 1,flexDirection:'row' }]}>
                <TextInput style={styles.inputs}
                        editable={false}
                        placeholder="Ажлын төрөл"
                        // value={this.state.textInputValue} 
                        />
                  <ModalSelector
                      data={typeData}
                      cancelText={'Буцах'}
                      initValue="Сонгох"
                      initValueTextStyle={{ color: '#b5b5b5' }}
                      supportedOrientations={['landscape']}
                      accessible={true}
                      scrollViewAccessibilityLabel={'Scrollable options'}
                      onChange={(option)=> { this.setState({ typeID: option.id }) }} 
                      
                      />
                </View>  
              </View>
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                  Гарчиг: *
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                    <TextInput 
                        style={styles.inputs}
                        keyboardType='default'
                        placeholder="Ажлын нэр"
                        underlineColorAndroid='transparent'
                        // maxLength={8}
                        onChangeText={name => this.setState({name})}
                    />
                </View>  
                </View>
                <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                  Тайлбар:
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
                <View style={styles.inputContainer}>    
                    <TextInput style={styles.inputs}
                        placeholder="Ажлын дэлгэрэнгүйг оруулна"
                        ellipsizeMode="head"
                        keyboardType="default"
                        // value={this.state.firstName}
                        underlineColorAndroid='transparent'
                        onChangeText={description => this.setState({description})}
                    />
                </View>
                </View>
                <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                    Ажлын хөлсний хэмжээ/төгрөгөөр/:
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
                <View style={styles.inputContainer}> 
                      
                    <TextInput style={styles.inputs}
                        placeholder="Доод үнэ"
                        keyboardType="numeric"
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
                <Text style={{color:'#3679B1'}}>
                    Шаардагдах ур чадварууд:
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={styles.inputContainer}>    
                    <TextInput style={styles.inputs}
                        placeholder="HTML , PHP , Англи хэл ..."
                        ellipsizeMode="head"
                        keyboardType="default"
                        // value={this.state.firstName}
                        underlineColorAndroid='transparent'
                        onChangeText={skills => this.setState({skills})}
                    />
                </View>
              </View>
              

            <View>
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                  Үргэлжлэх хугацаа/зөвхөн хоног/:
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={[styles.inputContainer]}>
                    <TextInput style={styles.inputs}
                        placeholder="120 , 6 ..."
                        keyboardType="numeric"
                        // value={this.state.phone}
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
              <View>
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                Санал авах сүүлийн хугацаа: *
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={[styles.inputContainer, { marginBottom: 0, }]}>
                    <TextInput style={styles.inputs}
                        placeholder=""
                        keyboardType="numeric"
                        // value={this.state.email}
                        underlineColorAndroid='transparent'
                        onChangeText={startDate => this.setState({ startDate })}
                    />
              </View>
              </View>
              <View style={{ marginBottom: 10, }}>
                <Text style={{color:'#3679B1'}}>
                    Зураг:
                </Text>
              </View>
              <View style={{alignContent:'center',marginHorizontal:10}}>
              <View style={[styles.inputContainer, { marginBottom: 0, }]}>
              <View >
      
                {/* <View style={{ flex: 1,flexDirection: 'row',}}>
                
                    {photos}
                </View> */}
                <TouchableOpacity 
                activeOpacity={0.6}
                // onPress={this.handleChoosePhoto}
                >
                <View style={[styles.inputContainer, { marginTop:10,marginBottom: 0, backgroundColor: '#f9ac19' }]}>
                    <View style={styles.inputs2}>
                        <Text>Зураг оруулах</Text>
                    </View>
                </View>
              </TouchableOpacity>
              </View>
              </View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.constContainer}>
						<TouchableOpacity style={[styles.bidButton]} 
                  	onPress={() => this.InsertProject()}
						>
                <Text style={styles.bidText}>Ажил нэмэх</Text>
            </TouchableOpacity>
				</View> */}
      </ScrollView>
      <View style={styles.constContainer}>
      <TouchableOpacity style={[styles.backButton]} 
              onPress={() => {
                this.props.navigation.navigate("Ажлууд")
            }}
      >
          <Text style={styles.bidText}> Цуцлах</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.bidButton]} 
              onPress={() => this.InsertProject()}
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
   	    loading: state.addProject.getIn(['project_list', 'loading']),
        project: state.addProject.getIn(['project_list', 'data']),
        types: state.addProject.getIn(['types_list', 'data']),
   }),
   dispatch => {
     return {
       addProject: bindActionCreators(addProject, dispatch),
       getProjectTypes: bindActionCreators(getProjectTypes, dispatch),
       //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
     }
   }
)(AddView)

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
    },
    bidText:{
      textAlign:'center'
    },
    container2: {
      paddingTop:'10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputItems:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputDescription:{
      height:180,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: "#3679B1",
        width:'90%',
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        // paddingLeft:10,
      //   shadowColor: "#3679B1",
      // shadowOffset: {
      //   width: 1,
      //   height: 2,
      // },
      // shadowOpacity: 0.22,
      // shadowRadius: 2.22,
      // elevation: 3,
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
    },
    loginButton: {
      backgroundColor: "#3679B1",
    },
    loginText: {
      color: 'white',
    },
    bidButton:{
      backgroundColor:'#69d275',
      alignContent:'center',
      justifyContent: 'center',
      width:'40%',
      // alignSelf:'flex-end',
      marginLeft:'10%',
      borderRadius:10,
      height:'70%',
      marginTop:10,
      justifyContent:'center',
      borderWidth:1,
      borderColor:'#27b737'
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
      constContainer:{
        left:0,
	      right:0,
	      bottom:0,
        width:'100%',
        height:'10%',
        backgroundColor:'#fff',
        borderTopWidth:2,	
        borderTopColor:'#DB4437',
        // flexDirection:'row',
        alignSelf:'center',
        marginVertical:10,
        flexDirection:'row'
        },
  });
