//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet ,TextInput ,Alert} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import { onBidProject } from './WorkersActions'
class BidProject extends React.Component {
    constructor(props) {
		super(props);
			this.state = {
				Price:'',
				Duration:'',
				Description:'',
				projectID:'',
			};
    }
    componentDidMount(){
        const pID = this.props.navigation.getParam('projectID', []);
        this.setState({projectID:pID})
    }
    BidProject(){
        // this.setID()
        let error = this.formValidate()
        if(error) return
        this.props.onBidProject(this.state)
    }
    setID(){
        const pID = this.props.navigation.getParam('projectID', []);
        this.setState({projectID:pID})
    }
    formValidate(){
        let { Price ,Duration,Description } = this.state
        if(!Price) {
            Alert.alert('','Үнийн саналаа оруулна уу!')
            return true
        }
        if(!Duration) {
            Alert.alert('','Ажиллах хугацаагаа оруулна уу!')
            return true
        }
        this.props.navigation.pop()
    }
    renderLeftComponent(){
        return(
            <View style={{flex:1}} >
                <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.pop()
                }}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="chevron-left" size={16} color="#fff"/>
                        <Text style={{color:'#FFF'}}> Буцах</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { navigation } = this.props;
        return(
        <View style={{flex:1}}>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Санал өгөх', style:styles.headerTitle }}
            //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
            //   rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <View style={{margin:10}}>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Text style={{color:'#2D3954'}}>Ажлын саналын </Text>
                    <Text style={{color:'#ff5722'}}>форм</Text>
                </View>
                
                <View style={{marginTop:10,flex:1}}>
                    <Text style={styles.formText}>
                        Ажлын хөлс/төгрөгөөр/
                    </Text>
                    <TextInput style={styles.inputs}
                        placeholder="100000 , 5000 ..."
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(Price) => this.setState({Price})}
                    />
                    <Text  style={styles.formText}>
                    Ажиллах хугацаа/хоногоор/
                    </Text>
                    
                    <TextInput style={styles.inputs}
                        placeholder="30"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(Duration) => this.setState({Duration})}
                    />
                    <Text  style={styles.formText}>
                    Тайлбар
                    </Text>
                    
                    <TextInput style={styles.inputs}
                        placeholder="Давуу тал , тайлбар ..."
                        underlineColorAndroid='transparent'
                        onChangeText={(Description) => this.setState({Description})}
                    />
                </View>
            </View>
            <View style={styles.consContainer}>
                <Button
                    buttonStyle={[styles.comfirmButton,{alignContent:'center',
                    justifyContent: 'center',}]}
                    onPress={() => {
                        this.BidProject()
                    }}
                    title="Илгээх"
                  />
            </View>
        </View>
        );
    }
}
export default connect(
	state => ({
        loading: state.workers.getIn(['bid_project', 'loading']),
		data: state.workers.getIn(['bid_project', 'data']),
	}),
	dispatch => {
	  return {
		onBidProject: bindActionCreators(onBidProject, dispatch),
	  }
	}
 )(BidProject)
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  inputs:{
    borderColor:'#4285F4',
    borderWidth:1,
    width:'90%',
    height:45,
    marginVertical:10,
    alignSelf:'center'
  },
  comfirmButton:{
    backgroundColor:'#69d275',
    width:'50%',
    height:40,
    borderRadius:5,
    alignItems:'center',
    margin:5,
    alignSelf:'center'
    },
consContainer:{
    left:0,
    right:0,
    bottom:0,
    height:Header2.HEIGHT,
    backgroundColor:'#fff',
    borderTopWidth:2,	
    borderTopColor:'#dcdcdc',
    // flexDirection:'row',
    // alignSelf:'center'
    position:'absolute',
    flex:0.1,
},
formText:{
   color: '#3C4348'
}

  
})