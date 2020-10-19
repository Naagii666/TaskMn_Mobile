import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl ,BackHandler, TextInput} from 'react-native';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header as Header2 } from 'react-navigation';
import { Button,Header} from 'react-native-elements'
import {getUserSkills , onAddSkill, onDeleteSkill} from './ProfileActions'

class EditSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Skill : '',
          SkillID : '',
          height :0
        }
    }
    componentDidMount() {
        this.props.getUserSkills(),
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    handleBackPress = () => {
        this.props.navigation.pop()
        return true;
    }
    _onRefresh(){
        this.props.getUserSkills()
    }
    _keyExtractor = (item, index) => index.toString();
    InsertSkill(){
        this.state.Skill!=''?(
          this.props.onAddSkill(this.state),
          this.clearText()
        //   this.props.getUserSkills()
        ):
        null
    }
    DeleteSkill(SkillID){
        this.props.onDeleteSkill(SkillID)
    }
    clearText(){
        this.setState({Skill:''})
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
    renderCenterComponent(){
        return(
          <View style={{flex:1,alignContent:'center'}} >
            <Text style={{color: '#fff',fontWeight:'bold',fontSize:18}}>Ур чадвар</Text>
          </View>
        )
    }
    renderItem = ({ item }) => (
        <View style={styles.Skill}>
            <Text style={styles.Text}>{item.Text}</Text>
            <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} onPress = {() => {this.DeleteSkill(item.ID)} }>
                  <Icon
                    // style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}}
                    name="trash"
                    size={20}
                    color="#F98383"
                  />
            </TouchableOpacity>
        </View>
    )
    render() {
        const { loading , skills} = this.props
        return (
        <View style={{ flex: 1}}>
            <Header containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
                }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={this.renderCenterComponent()}
            />
            <View>
            {	
				loading?(
                	<ActivityIndicator />
                ) : (
                <View>
                    <FlatList
                        refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        ListEmptyComponent={
                            <this.EmptyComponent title="Ур чадвар байхгүй байна." />}
                        keyExtractor= {this._keyExtractor}
                        data={skills}
                        renderItem={this.renderItem}
                    />
                    <View style={styles.Skill}>
                        <TextInput style={styles.inputs}
                                numberOfLines={5}
                                ellipsizeMode="head"
                                keyboardType="default"
                                multiline={true}
                                placeholder="Ур чадвар ..."
                                value={this.state.Skill}
                                onChangeText={Skill => this.setState({Skill})}
                        />
                        <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} onPress = {() => {this.InsertSkill()} }>
                            <Icon
                                name="plus-circle"
                                size={25}
                                color="#69d275"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                )
            }
            </View>
        </View>
        );
    }
}
export default connect(
    state => ({
     loading: state.profile.getIn(['skill_list', 'loading']),
     skills: state.profile.getIn(['skill_list', 'data']),
    }),
    dispatch => {
      return {
        getUserSkills: bindActionCreators(getUserSkills, dispatch),
        onAddSkill: bindActionCreators(onAddSkill, dispatch),
        onDeleteSkill: bindActionCreators(onDeleteSkill, dispatch)
      }
    }
  )(EditSkills);

const styles = StyleSheet.create({
    inputs:{
        borderColor: '#DCDCDC',
        backgroundColor:'#F6F6F6',
        borderWidth:1,
        fontSize:18,
        // flex:1,
        width:'70%',
        height:40,
        // maxHeight:200,
        marginLeft:10,
        borderRadius:10,
        paddingHorizontal:5,
        marginVertical:5
    },
    Text:{
        alignItems:'center' , 
        justifyContent:'flex-start' , 
        marginLeft:10 ,
        color:'#3C4348',
        fontSize:18
    },
    Skill:{
        marginVertical:10,
        marginHorizontal:5,
        // flex: 1,
        flexDirection:'row',
        alignContent:'space-between',
        justifyContent:'space-between',
        backgroundColor:'#E7EBF1',
        borderRadius:10,

    },
    bidButton:{
        backgroundColor:'#FFF',
        // marginBottom:20,
        height:'70%',
        width:'20%',
        // borderWidth:1,
        borderColor:'#4285F4',
        borderRadius:10,
        marginVertical:5
    },
})