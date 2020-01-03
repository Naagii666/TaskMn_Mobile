// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import React from 'react'
// import { View, Text,Platform, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert,ScrollView, TextInput ,TouchableOpacity,Button,BackHandler,Image} from 'react-native'
// // import moment from 'moment'
// import { H2, H3, H4 } from '../../Components'
// import { addProject,getProjectTypes } from './AddActions'
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/Entypo'
// import ModalSelector from 'react-native-modal-selector'
// import FilePickerManager from 'react-native-file-picker';
// import ImagePicker from 'react-native-image-picker'
// import DatePicker from 'react-native-datepicker';
// import RNRestart from 'react-native-restart';
// var date = new Date().getDate(); //Current Date
// var month = new Date().getMonth() + 1; //Current Month
// var year = new Date().getFullYear(); //Current Year
// var todayDate =  year+ '-' + month  + '-' +date  
// const initialState = {
//         name : '',
//         description   : '',
//         lowPrice: '',
//         highPrice: '',
//         loading: false,
//         photo: [],
//         typeID:'',
//         startDate:'',
//         duration:'',
// }
// class AddView extends React.Component {
// 	constructor(props) {
//       super(props);
//       // this.searchInput = React.createRef();
//       this.state = {
//         name : '',
//         description   : '',
//         lowPrice: '',
//         highPrice: '',
//         loading: false,
//         photo: [],
//         typeID:'',
//         startDate:'',
//         duration:'',
//         // text:'',
//       }
//     }
//   _alert(){
//     Alert.alert('Мэдэгдэл', 'хийгдэж байна')
//   }
//   componentDidMount() {
//     this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
//     this.props.getProjectTypes()
//     this.setState({description:' '})
//     this.setState({startDate:todayDate})
//   }
//   componentWillUnmount(){
//     this.backHandler.remove()
//     this.setState(initialState);
//                 this.forceUpdate()
//   }
//   handleBackPress = () => {
// 		// this.goBack(); // works best when the goBack is async
// 		return true;
// 	}
//   InsertProject = () => {
//     let error = this.formValidate()
//     if(error) return
//     this.props.addProject(this.state)
//   }
//   formValidate() {
//     let { name ,startDate,typeID } = this.state
//     if(!name) {
//       Alert.alert('','Ажлын нэрийг оруулна уу!')
//       return true
//     }
//     if(!typeID) {
//       Alert.alert('','Ажлын категорийг сонгоно уу!')
//       return true
//     }
//     if(!startDate) {
//       Alert.alert('','Санал авах сүүлийн хугацааг оруулна уу!')
//       return true
//     }
    
//   }
//   launchImageLibrary = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.launchImageLibrary(options, (response) => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         console.log(response.customButton);
//       } else {
//         const source = { uri: response.uri };
//         console.log('response', JSON.stringify(response));
//         let photo = this.state.photo
//         photo.push(response)
//         this.forceUpdate()
//       }
//     });

//   }
//   handleChoosePhoto = () => {
//     const options = {
//       title: 'Зураг оруулах',
//     };

//     ImagePicker.launchImageLibrary(options, (response) => {
//       if (response.uri) {
//         let photo = this.state.photo
//         photo.push(response)
//         this.forceUpdate()
//       }
//     });
//   };
//   renderPhoto(){
//     if(this.state.photo!=null){
//       return(
//         this.state.photo.map((photo) => (
//           <View>
              
//               <TouchableOpacity 
//                 activeOpacity={0.6}
//                 onPress={()=>
//                   this.state.photo.map(elem =>{
//                     if(elem.uri==photo.uri){
//                       var index=this.state.photo.indexOf(elem);
//                       this.state.photo.splice(index,1);
//                       this.forceUpdate()
//                     }
//                   })
//                 }>
//                 <Icon style={{marginLeft:95,paddingTop:10}} name='circle-with-cross' size={20} color='red' />  
//               </TouchableOpacity>
//               <Image source={{ uri: photo.uri }} 
//                 style={{ width: 100, height: 100,marginBottom:10,marginHorizontal:5 }}/>
          
//           </View>
//           ))
//       )
//     }
    
//   }
// 	render() {
//     const { photo } = this.state;
//     const { project, loading,types } = this.props
//     let photos = this.renderPhoto()
//     let typeData = []
//     if(this.props.types) {
//       this.props.types.forEach((type) => {
//         if(type.TypeName) {
//           typeData.push({
//             label: type.TypeName,
//             id: type.TypeID,
//           })
//         }
//       })
//     }
//     // let photos = this.renderPhoto()
    
// 		return (
//       <View style={{marginBottom:60}}>
//       <ScrollView style={[styles.container,]}>
//         <View style={{ padding: 20, }}>
//               <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                   Категори: *
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//                 <View style={[styles.inputContainer, { flex: 1,flexDirection:'row' }]}>
//                 <TextInput style={styles.inputs}
//                         editable={false}
//                         placeholder="Ажлын төрөл"
//                         // value={this.state.textInputValue} 
//                         />
//                   <ModalSelector
//                       data={typeData}
//                       cancelText={'Буцах'}
//                       initValue="Сонгох"
//                       initValueTextStyle={{ color: '#b5b5b5' }}
//                       supportedOrientations={['landscape']}
//                       accessible={true}
//                       scrollViewAccessibilityLabel={'Scrollable options'}
//                       onChange={(option)=> { this.setState({ typeID: option.id }) }} 
                      
//                       />
//                 </View>  
//               </View>
//               <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                   Гарчиг: *
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//                 <View style={[styles.inputContainer, { flex: 1 }]}>
//                     <TextInput 
//                         // ref={this.searchInput}
//                         // clearButtonMode='always'
//                         style={styles.inputs}
//                         keyboardType='default'
//                         placeholder="Ажлын нэр"
//                         underlineColorAndroid='transparent'
//                         // maxLength={8}
//                         onChangeText={name => this.setState({name})}
//                     />
//                 </View>  
//                 </View>
//                 <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                   Тайлбар:
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//                 <View style={styles.inputContainer}>    
//                     <TextInput style={styles.inputs}
//                         placeholder="Ажлын дэлгэрэнгүйг оруулна"
//                         ellipsizeMode="head"
//                         keyboardType="default"
//                         // value={this.state.firstName}
//                         underlineColorAndroid='transparent'
//                         onChangeText={description => this.setState({description})}
//                     />
//                 </View>
//                 </View>
//                 <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                     Ажлын хөлсний хэмжээ/төгрөгөөр/:
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//                 <View style={styles.inputContainer}> 
                      
//                     <TextInput style={styles.inputs}
//                         placeholder="Доод үнэ"
//                         keyboardType="numeric"
//                         // value={this.state.firstName}
//                         underlineColorAndroid='transparent'
//                         onChangeText={lowPrice => this.setState({lowPrice})}
//                     />
//                     <TextInput 
//                         // style={{marginLeft:-20,}}
//                         editable={false}
//                         placeholder="₮"
//                         // value={this.state.textInputValue} 
//                         /> 
                   
//                 </View>
//                 <View style={styles.inputContainer}>    
                      
//                     <TextInput style={styles.inputs}
//                         placeholder="Дээд үнэ"
//                         keyboardType="numeric"
//                         // value={this.state.firstName}
//                         underlineColorAndroid='transparent'
//                         onChangeText={highPrice => this.setState({highPrice})}
//                     />
//                     <TextInput
//                         // style={{marginLeft:-20,}}
//                         editable={false}
//                         placeholder="₮"
//                         // value={this.state.textInputValue} 
//                         />
                    
//                 </View>
//                 </View>
//                 <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                     Шаардагдах ур чадварууд:
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//               <View style={styles.inputContainer}>    
//                     <TextInput style={styles.inputs}
//                         placeholder="HTML , PHP , Англи хэл ..."
//                         ellipsizeMode="head"
//                         keyboardType="default"
//                         // value={this.state.firstName}
//                         underlineColorAndroid='transparent'
//                         onChangeText={skills => this.setState({skills})}
//                     />
//                 </View>
//               </View>
              

//             <View>
//               <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                   Үргэлжлэх хугацаа/зөвхөн хоног/:
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//               <View style={[styles.inputContainer]}>
//                     <TextInput style={styles.inputs}
//                         placeholder="120 , 6 ..."
//                         keyboardType="numeric"
//                         // value={this.state.phone}
//                         underlineColorAndroid='transparent'
//                         onChangeText={duration => this.setState({ duration })}
//                     />
//                     <TextInput
//                         // style={{marginLeft:-20,}}
//                         editable={false}
//                         placeholder="хоног"
//                         // value={this.state.textInputValue} 
//                         />
//               </View>
//               </View>
//               <View>
//               <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                   Санал авах сүүлийн хугацаа: *
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//               <View style={[styles.inputContainer]}>
                
//                 <DatePicker
//                   style={{width: 200}}
//                   date={this.state.startDate}
//                   mode="date"
//                   placeholder="Он сар сонгох"
//                   format="YYYY-MM-DD"
//                   minDate={todayDate}
//                   maxDate="2030-01-01"
//                   confirmBtnText="Сонгох"
//                   cancelBtnText="Буцах"
//                   customStyles={{
//                     dateIcon: {
//                       position: 'absolute',
//                       left: 0,
//                       top: 4,
//                       marginLeft: 0
//                     },
//                     dateInput: {
//                       marginLeft: 36
//                     }
//                   }}
//                   onDateChange={(date) => {this.setState({startDate: date})}}
//                 />
//               </View>
//               </View>
//               <View style={{ marginBottom: 10, }}>
//                 <Text style={{color:'#4285F4'}}>
//                     Зураг:
//                 </Text>
//               </View>
//               <View style={{alignContent:'center',marginHorizontal:10}}>
//                 <View style={[styles.inputContainer, { marginBottom: 0, borderBottomColor: "#fff"}]}>
//                   <View >
//                     <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
//                       <Text style={styles.btnText}>Зураг оруулах</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//                 <View style={{flex:1,flexDirection: 'row',}}>
//                       {photos}
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//         {/* <View style={styles.constContainer}>
// 						<TouchableOpacity style={[styles.bidButton]} 
//                   	onPress={() => this.InsertProject()}
// 						>
//                 <Text style={styles.bidText}>Ажил нэмэх</Text>
//             </TouchableOpacity>
// 				</View> */}
//       </ScrollView>

//       <View style={styles.constContainer}>
//       <TouchableOpacity style={[styles.backButton]} 
//               onPress={() => {
//                 this.setState(initialState);
//                 this.forceUpdate();
//             }}
//       >
//           <Text style={styles.bidText}> Цуцлах</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.bidButton]} 
//               onPress={() => this.InsertProject()}
//       >
//           <Text style={styles.bidText}>+ Ажил нэмэх</Text>
//       </TouchableOpacity>
//     </View> 
//     </View>
      
//       );
// 	}
// }


// export default connect(
//    state => ({
//    	    loading: state.addProject.getIn(['project_list', 'loading']),
//         project: state.addProject.getIn(['project_list', 'data']),
//         types: state.addProject.getIn(['types_list', 'data']),
//    }),
//    dispatch => {
//      return {
//        addProject: bindActionCreators(addProject, dispatch),
//        getProjectTypes: bindActionCreators(getProjectTypes, dispatch),
//        //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
//      }
//    }
// )(AddView)

// const styles = StyleSheet.create({
//     container: {
//       // flex: 1,
//       backgroundColor: '#fff',
//     },
//     bidText:{
//       textAlign:'center'
//     },
//     container2: {
//       paddingTop:'10%',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     inputItems:{
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     inputDescription:{
//       height:180,
//       marginLeft:16,
//       borderBottomColor: '#FFFFFF',
//       flex:1,
//   },
//     inputContainer: {
//         backgroundColor: '#FFFFFF',
//         borderBottomWidth: 1,
//         borderBottomColor: "#4285F4",
//         width:'90%',
//         height:45,
//         marginBottom:20,
//         flexDirection: 'row',
//         alignItems:'center',
//         // paddingLeft:10,
//       //   shadowColor: "#4285F4",
//       // shadowOffset: {
//       //   width: 1,
//       //   height: 2,
//       // },
//       // shadowOpacity: 0.22,
//       // shadowRadius: 2.22,
//       // elevation: 3,
//     },
//     inputs:{
//         height:45,
//         marginLeft:16,
//         borderBottomColor: '#FFFFFF',
//         flex:1,
//     },
//     inputIcon:{
//       width:30,
//       height:30,
//       marginLeft:15,
//       justifyContent: 'center'
//     },
//     buttonContainer: {
//       height:45,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom:20,
//       width:250,
//     },
//     loginButton: {
//       backgroundColor: "#4285F4",
//     },
//     loginText: {
//       color: 'white',
//     },
//     bidButton:{
//       backgroundColor:'#69d275',
//       alignContent:'center',
//       justifyContent: 'center',
//       width:'40%',
//       // alignSelf:'flex-end',
//       marginLeft:'10%',
//       borderRadius:10,
//       height:'70%',
//       marginTop:10,
//       justifyContent:'center',
//       borderWidth:1,
//       borderColor:'#27b737'
//       },
//       btnSection: {
//         width: 225,
//         height: 40,
//         backgroundColor: '#fff',
//         borderColor:'#4285F4',
//         borderWidth:1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 3,
//         marginVertical:10,
//         alignSelf:'center',
//       },
//       btnText: {
//         textAlign: 'center',
//         color: '#4285F4',
//         fontSize: 14,
//       },
//     backButton:{
//       backgroundColor:'#f28787',
//       alignContent:'center',
//         justifyContent: 'center',
//       width:'40%',
//       // alignSelf:'flex-start',
//       marginLeft:'5%',
//       borderRadius:10,
//       height:'70%',
//       marginTop:10,
//       justifyContent:'center',
//       borderWidth:1,
//       borderColor:'#ec7a73'
//       },
//       constContainer:{
//         left:0,
// 	      right:0,
// 	      bottom:0,
//         width:'100%',
//         height:'10%',
//         backgroundColor:'#fff',
//         borderTopWidth:1,	
//         borderTopColor:'#DB4437',
//         // flexDirection:'row',
//         alignSelf:'center',
//         marginVertical:10,
//         flexDirection:'row'
//         },
//   });

//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet ,FlatList ,RefreshControl,ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getProjectTypes } from './AddActions'

class AddView extends Component {
  componentDidMount(){
    this.props.getProjectTypes()
  }
  _onRefresh(){
    this.props.getProjectTypes()
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
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => (
    <View style={{justifyContent:'space-between',flexDirection:'column',marginHorizontal:10}}>
      <TouchableOpacity style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}
        onPress={() => {
              this.props.navigation.navigate('NewProject', {
              item:item.TypeID,
              name:item.TypeName
          }
        )}}>
        <View style={{width:'90%'}}>
          <Text style={{color:'#4285F4',fontSize:20,fontWeight:'600'}}>
            {item.TypeName}
          </Text>
        </View>
        <View style={{alignSelf:'center'}}>
          <Icon name="chevron-right" size={16} color="#4285F4"/>
        </View>
      </TouchableOpacity>
    </View>
  )
  EmptyComponent = ({ title }) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{title}</Text>
    </View>
  );
  render() {
    const {types ,loading} = this.props
    return(
      <View>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
		  }}
      centerComponent={{ text: 'Ажил захиалах', style:styles.headerTitle }}
        //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
        //   rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View>
          {loading?
          <ActivityIndicator/>
          :(
            <FlatList
						refreshControl={
							<RefreshControl
								refreshing={loading}
								onRefresh={this._onRefresh.bind(this)}
							/>
						}
						keyExtractor={this.keyExtractor}
						ItemSeparatorComponent={this.renderSeparator}
						data={types}
						renderItem={this.renderItem}
						ListEmptyComponent={
							<this.EmptyComponent title="Хоосон" />
						}
					/>
          )
          }
        
        </View>
      </View>
     );
  }
}
export default connect(
  state => ({
        loading: state.addProject.getIn(['types_list', 'loading']),
        types: state.addProject.getIn(['types_list', 'data']),
  }),
  dispatch => {
    return {
      getProjectTypes: bindActionCreators(getProjectTypes, dispatch),
      //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    }
  }
)(AddView)
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