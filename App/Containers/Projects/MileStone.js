import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler,Alert,TextInput,FlatList,RefreshControl , ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import {getMilestones , onAddTask , onDeleteTask} from './ProjectsActions'
class MileStone extends React.Component {   
    constructor(props) {
      super(props);
      this.state = {
        TaskName : '',
        TaskID : '',
        ProjectID : '',
        BidID : '',
        LancerID : '',
        Amount: '',
        height :0
      }
    }
    componentDidMount() {
      const item = this.props.navigation.getParam('data', []);
      this.setData(item)
      this.props.getMilestones(item.ProjectID),
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    setData(item){
      this.setState({ProjectID:item.ProjectID , BidID:item.BidID, LancerID:item.LancerID})
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
        this.props.navigation.pop()
    } 
    renderCenterComponent(){
      return(
        <View style={{flex:1,alignContent:'center'}} >
          <Text style={{color: '#fff',fontWeight:'bold',fontSize:18}}>Даалгавар</Text>
        </View>
      )
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
    EmptyComponent = ({ title }) => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{title}</Text>
      </View>
	  );
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

	  _onRefresh() {
		  this.props.getMilestones(this.state.ProjectID)
    }

    DeleteTask = (item) =>{
      this.props.onDeleteTask(item.TaskID , this.state)
    }
    InsertTask(){
      this.state.TaskName!=''?(
        this.props.onAddTask(this.state),
        this.clearText()
      ):
      null
    }
    clearText(){
      this.setState({TaskName:'',Amount:''})
    }    
    renderItem = ({ item }) => (
      <View style={styles.Skill}>
        <View style={{flex:1 , flexDirection:'column',margin:5}}>
          <Text style={styles.Text}>Даалгавар : {item.TaskName}</Text>
          <Text style={styles.Text}>Үнийн хэмжээ : {item.Amount}</Text>
        </View>
        <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} onPress = {() => {this.DeleteTask(item)} }>
              <Icon
                name="trash"
                size={25}
                color="#F98383"
              />
        </TouchableOpacity>
      </View>
    );
    render() {
        const {loading , milestones } = this.props;
        const item = this.props.navigation.getParam('data', []);

        return(
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
                        <this.EmptyComponent title="Даалгавар байхгүй." />
                      }
                      keyExtractor= {item => item.TaskID}
                      data={milestones}
                      renderItem={this.renderItem}
                  />
                  <View style={styles.Skill}>
                    <View style={{flexDirection:'column',flex:1,margin:5}}>
                      <TextInput style={styles.inputs}
                              numberOfLines={5}
                              ellipsizeMode="head"
                              keyboardType="default"
                              multiline={true}
                              placeholder="Даалгавар"
                              value={this.state.TaskName}
                              onChangeText={TaskName => this.setState({TaskName})}
                      />
                      <TextInput style={styles.inputs}
                              numberOfLines={5}
                              ellipsizeMode="head"
                              keyboardType="numeric"
                              multiline={true}
                              placeholder="Даалгаврын үнэ"
                              value={this.state.Amount}
                              onChangeText={Amount => this.setState({Amount})}
                      />
                    </View>
                      <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} onPress = {() => {this.InsertTask()} }>
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
            milestones: state.project.getIn(['milestone_list', 'data']),
            loading: state.project.getIn(['milestone_list', 'loading']),
    }),
    dispatch => {
        return {
            getMilestones:  bindActionCreators(getMilestones, dispatch),
            onAddTask: bindActionCreators(onAddTask, dispatch),
            onDeleteTask: bindActionCreators(onDeleteTask, dispatch),
        }
    }
)(MileStone);
const styles = StyleSheet.create({
  inputs:{
    borderColor: '#DCDCDC',
    backgroundColor:'#F6F6F6',
    borderWidth:1,
    fontSize:18,
    // flex:1,
    width:'80%',
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
    fontSize:15
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
emptyContainer:{
  alignItems:'center',
  margin:5 ,
},
emptyText:{
  margin:5 ,
  color:'black'
},
})