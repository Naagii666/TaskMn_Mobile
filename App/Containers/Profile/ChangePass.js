//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl,BackHandler,TextInput ,Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { changePass } from './ProfileActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class ChangePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          OldPass : '',
          NewPass : '',
          NewPassComfirm   : '',
        }
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    change(){
        let error = this.isValid()
        if(error)
            return
        else{
            this.props.changePass(this.state)
        }
    }
    isValid(){
        let { NewPass ,NewPassComfirm ,OldPass} = this.state
        if(!OldPass) {
            Alert.alert('','Хуучин нууц үгээ оруулна уу!')
            return true
        }
        if(!NewPass) {
            Alert.alert('','Шинэ нууц үгээ оруулна уу!')
            return true
        }
        if(!NewPassComfirm) {
            Alert.alert('','Шинэ нууц үг баталгаажуулах хэсгийг оруулна уу!')
            return true
        }
        if(NewPass!=NewPassComfirm) {
          Alert.alert('','Шинэ нууц үг баталгаажуулах нууц үгтэй тохирохгүй байна!')
          return true
        }
        return false
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
                centerComponent={{ text: 'Нууц үг солих', style:styles.headerTitle }}
            />
             <KeyboardAwareScrollView resetScrollToCoords={{x:0,y:0}} scrollEnabled={false}>
              {/* <Text style={{color:'black'}}>{this.state.UserName}</Text> */}
            <View style={{marginVertical:10,alignContent:'center'}}>
              {/* <Icon name="v-card" size={32} color="#f9ac19" /> */}
            <Text style={styles.titleInfo}>Хуучин нууц үг</Text>
            <View style={styles.textInput}>
              <TextInput
                style={styles.userInfo}
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                selectTextOnFocus={false}
                placeholder="Нууц үг"
                onChangeText={(OldPass) => this.setState({OldPass})}/>
            </View>
            <Text style={styles.titleInfo}>Шинэ нууц үг</Text>
            <View style={styles.textInput}>
              <TextInput
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                selectTextOnFocus={false}
                placeholder="Шинэ нууц үг"
                onChangeText={(NewPass) => this.setState({NewPass})}
                />
            </View>
            <Text style={styles.titleInfo}>Шинэ нууц үг баталгаажуулах</Text>
              <View style={styles.textInput}>
                <TextInput
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                selectTextOnFocus={false}
                placeholder="Шинэ нууц үг дахин оруулах"
                onChangeText={(NewPassComfirm) => this.setState({NewPassComfirm})}
                />
              </View>
              <View style={{width:'80%',marginVertical:20 , alignSelf:'center'}}>
                <Button
                    
                    buttonStyle={{
                      borderRadius:10,
                      width:'90%',
                      backgroundColor:'#69d275',
                      alignSelf:'center'
                    }}
                    onPress={() => {
                          this.change()
                    }}
                    title="Нууц үг солих"
                  />
              </View>
            </View>
          </KeyboardAwareScrollView>
            
        </View>
        );
    }
}
export default connect(
    state => ({
         loading: state.profile.getIn(['change_pass', 'loading']),
         pass: state.profile.getIn(['change_pass', 'data']),
    }),
    dispatch => {
      return {
        changePass: bindActionCreators(changePass, dispatch),
      }
    }
 )(ChangePass);
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
    },
    titleInfo:{
        fontSize:14,
        color:"#4285F4",
        fontWeight:'300',
        marginLeft:'10%'
    
    },
    textInput:{
        width:'80%',
        alignSelf:'center',
        // backgroundColor:'#4285F4',
        margin:5,
        borderRadius:10,
        borderWidth:1,
        paddingHorizontal:10,
        borderColor:'#4285F4'
    
      },
})