import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import {Alert, Modal,ActivityIndicator,H3,View, Text, FlatList, RefreshControl, ScrollView,TouchableHighlight ,Image,StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header as Header2 } from 'react-navigation';
import moment from 'moment'
import {  Card, ListItem, Button ,Header} from 'react-native-elements'

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    state = {
		  data:[],
	};
}
componentDidMount() {
  this.setState({data: this.props.navigation.getParam('item', []) });
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
  _onRefresh() {
    // this.props.getAllProjects()
  }

  _renderEmpty() {
    return <H3>Мэдэгдэл алга байна.</H3>
  }


  render() {
	const { navigation } = this.props;
	const item = navigation.getParam('item', []);
	const isMyProjects = navigation.getParam('isMyProjects', 'true');
    return (
      <View>
        <Header
						containerStyle={{
							height:Header2.HEIGHT,
							backgroundColor: '#3679B1',
						}}
						leftComponent={this.renderLeftComponent()}
						centerComponent={{ text: item.TypeName, style: { color: '#fff',flex:1,fontWeight:'bold',fontSize:18 } }}
					/>
					<ScrollView>
					
          			<View style={styles.container}>
            			<View>
							{/* <Icon name={item.TypePictures} size={20} color="#3679B1"/> */}
							<Text style={{textAlign:'left',color:'black',fontSize:20,fontWeight:'bold',flexDirection:'row'}}>		   	
								{item.Name}
							</Text>
							<View style={{marginVertical:10}}>
								<Text style={{color:'#3679B1'}}>
									Эхлэх хугацаа : <Text style={{color:'black'}} >{item.StartDate}</Text>
								</Text>
								<Text style={{color:'#3679B1'}}>
									Саналын тоо: <Text style={{color:'black'}} >{item.AllowBidNumber?item.AllowBidNumber:'0'}</Text>
								</Text>
							</View>
							<View style={{marginVertical:10}}>
								<Text style={{color:'black',fontSize:15,textAlign:'justify'}}>
									{item.Description}
								</Text>
							</View>
							{this.renderSeparator()}
							<View style={{marginVertical:10}}>
								<Text style={{color:'#3679B1',}}>Үнийн санал</Text>
								<Text style={{fontSize:18,color:'black',marginTop:5,}}>
									{item.LowPrice}₮-{item.HighPrice}₮
								</Text>
							</View>
							{this.renderSeparator()}
							<View style={{marginVertical:10}}>
								<Text style={{color:'#3679B1',}}>Захиалагч</Text>
								<Text style={{fontSize:18,color:'black',marginTop:5,}}>
									{item.UserID}
								</Text>
							</View>
							{this.renderSeparator()}
							<View style={{marginVertical:10}}>
								<Text style={{color:'#3679B1'}}>
									Шаардагдах ур чадварууд
								</Text>
								<View style={{justifyContent: 'flex-start',width:'auto'}}>
									<Text style={{marginTop:5,color:'black',flexDirection:'row',fontSize:15}}>		
										{item.Skills}
									</Text>
								</View>
							</View>
							{this.renderSeparator()}
							<View style={{marginVertical:10}}>
							<Text style={{color:'#3679B1'}}>
									Зураг 
								</Text>
							</View>
							<View style={{marginVertical:30}}>
							
							</View>
							
							
							  
							  {/* <TouchableHighlight
                				onPress={() => {
                  				this.setModalVisible(!this.state.modalVisible,item);
                				}}>
                				<Text>Hide Modal</Text>
							  </TouchableHighlight> */}
							  
            			</View>
          				</View>
						</ScrollView>
			{
				isMyProjects?
					<View style={styles.constContainer}>
						<TouchableOpacity style={[styles.bidButton]} 
                  					// onPress={() => this._onLoginFunction()}
						>
                  			<Text style={styles.bidText}>Санал өгөх</Text>
                		</TouchableOpacity>
						<TouchableOpacity style={[styles.backButton]} 
                  				onPress={() => {
										this.props.navigation.navigate('Tabs',{
										})
								}}
						>
                  			<Text style={styles.bidText}>Буцах</Text>
                		</TouchableOpacity>
					</View>
				:
					<View style={styles.constContainer}>
						<TouchableOpacity style={[styles.bidButton]} 
                  					// onPress={() => this._onLoginFunction()}
						>
                  			<Text style={styles.bidText}>Санал харах</Text>
                		</TouchableOpacity>
						<TouchableOpacity style={[styles.backButton]} 
                  				onPress={() => {
										this.props.navigation.navigate('Tabs',{
										})
								}}
						>
                  			<Text style={styles.bidText}>Буцах</Text>
                		</TouchableOpacity>
					</View>
				}
        </View>
    )
  
  }
}
export default ProjectDetail;

const styles = StyleSheet.create({
	thumb: {
		width: 80,
		height: 80,
		marginRight: 10
		},
		textContainer: {
		flex: 1
		},
		rowContainer: {
		flexDirection: 'row',
		padding: 10,
		},
		newsName: {
		fontSize: 18,
		// fontWeight: 'bold',
		color: 'black'
		},
		title: {
		fontSize: 14,
		color: '#656565'
	  },
	  container:{
		margin:20
	  },
	  constContainer:{
		left:0,
		right:0,
		bottom:0,
		height:'10%',
		backgroundColor:'#fff',
		borderTopWidth:2,	
		borderTopColor:'#dcdcdc',
		flexDirection:'row',
		alignSelf:'center'
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
	  bidButton:{
		backgroundColor:'#3679B1',
		alignContent:'center',
		justifyContent: 'center',
		width:'30%',
		alignSelf:'flex-end',
		marginRight:'10%',
		borderRadius:10,
		height:'70%',
		marginVertical:10,
		justifyContent:'center'
	
	  },
	  backButton:{
		backgroundColor:'#B3B3B3',
		alignContent:'center',
		justifyContent: 'center',
		width:'30%',
		alignSelf:'flex-start',
		marginLeft:'10%',
		borderRadius:10,
		height:'70%',
		marginVertical:10,
		justifyContent:'center'
	  },
	  bidText:{
		color:'#fff',
		// fontWeight:'bold',
		fontSize:16,
		justifyContent:'center',
		textAlign:'center'
	  },
	  isActive:{
		borderBottomColor:'#3679B1',
		borderBottomWidth:3,
	  }
});

