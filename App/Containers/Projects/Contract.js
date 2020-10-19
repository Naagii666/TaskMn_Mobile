import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler,Alert,TextInput,FlatList,RefreshControl , ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import {getMilestones , onCancelContract , getContract , onDeleteBid , onComfirmContract} from './ProjectsActions'
class Contract extends React.Component {   
    constructor(props) {
      super(props);
      this.state = {
        TaskName : '',
        TaskID : '',
        ProjectID : '',
        Amount: '',
        height :0
      }
    }
    componentDidMount() {
      const item = this.props.navigation.getParam('item', []);
      this.props.getMilestones(item.ProjectID),
      this.props.getContract(item.ProjectID),
      this.setData(item)
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    setData(item){
      this.setState({ProjectID:item.ProjectID})
    }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    DeleteBid(item){
      const { navigation } = this.props;
      var data = [{
        "BidID" : item.ID
      }]
      d = Object.values( data )
      this.props.onDeleteBid(d[0])
    }
    handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
    }
    goBack(){
        this.setState({bidView: false});
        this.props.navigation.pop()
    } 
    Cancel = (ProjectID) => {
        Alert.alert(
          '',
          'Санал хүчингүй болно!',
          [
            {
              text: 'Үгүй',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Тийм', onPress: () => {
              this.props.onCancelContract(ProjectID),
              this.props.navigation.pop()
            }},
          ],
          { cancelable: true },
        );
    }
    Comfirm = (ProjectID , LancerID) => {
        Alert.alert(
          '',
          'Ажил эхлэнэ!',
          [
            {
              text: 'Үгүй',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Тийм', onPress: () => {
            //   this.props.deleteProfile(),
              // releaseData(),
              // alert('tada')
              this.props.onComfirmContract(ProjectID , LancerID),
              this.props.navigation.pop()
            }},
          ],
          { cancelable: true },
        );
    }
    renderCenterComponent(name){
      return(
        <View style={{flex:1,alignContent:'center'}} >
          <Text numberOfLines={1} style={{color: '#fff',fontWeight:'bold',fontSize:18}}>{name}</Text>
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
      this.props.getContract(this.state.ProjectID)
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
          <Text style={styles.Text}>Төлөв : {item.Status=='Pending'?'Дуусаагүй':'Дууссан'}</Text>
        </View>
      </View>
    );
    render() {
        const {loading , milestones, contract ,loading2} = this.props;
        const item = this.props.navigation.getParam('item', []);
        // const data = contract[0]
        return(
          <View style={{ flex: 1}}>
          <Header containerStyle={{
              height:Header2.HEIGHT,
              backgroundColor: '#4285F4',
              }}
              leftComponent={this.renderLeftComponent()}
              centerComponent={this.renderCenterComponent(item.Name)}
          />
          <ScrollView>
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
                      keyExtractor= {this._keyExtractor}
                      data={milestones}
                      renderItem={this.renderItem}
                  />
              </View>
              )
          }
          </ScrollView>
          {	
          loading2?(
              <ActivityIndicator />
              ) : (
          contract.Status=='Pending'?
            <View style={styles.constContainer}>
                    <TouchableOpacity style={[styles.backButton]} 
                        onPress={() => {
                            this.Cancel(item.ProjectID)
                        }}
                    >
                        <Text style={styles.bidText}>Татгалзах</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bidButton]} 
                    onPress={() => {
                            this.Comfirm(item.ProjectID , item.LancerID)
                        }}
                        >
                        <Text style={styles.bidText}>Зөвшөөрөх</Text>
                    </TouchableOpacity>
                    
                </View>     
            :
              <View style={styles.constContainer}>
                <TouchableOpacity style={[styles.deleteButton,{ alignContent:'center' , flex:1,alignItems:'center'}]} 
                        onPress={() => {
                          this.DeleteBid(item)
                        }}
                    >
                        <Text style={styles.bidText}>Санал устгах</Text>
                </TouchableOpacity>
                
              </View>   
            )
          }
        </View>        
        );
    }
}
export default connect(
    state => ({
            milestones: state.project.getIn(['milestone_list', 'data']),
            loading: state.project.getIn(['milestone_list', 'loading']),
            contract: state.project.getIn(['contract_list', 'data']),
            loading2: state.project.getIn(['contract_list', 'loading']),
    }),
    dispatch => {
        return {
            getMilestones:  bindActionCreators(getMilestones, dispatch),
            onCancelContract: bindActionCreators(onCancelContract, dispatch),
            getContract:bindActionCreators(getContract, dispatch),
            onDeleteBid: bindActionCreators(onDeleteBid, dispatch),
            onComfirmContract: bindActionCreators(onComfirmContract, dispatch)
        }
    }
)(Contract);
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
backButton:{
    backgroundColor:'#f28787',
    alignContent:'center',
    justifyContent: 'center',
    width:'40%',
    borderRadius:10,
    height:'70%',
    borderWidth:1,
    borderColor:'#f28787',
    marginHorizontal:'5%',
    marginVertical:5
  },
  deleteButton:{
    backgroundColor:'#f28787',
    alignContent:'center',
    alignSelf:'center',
    justifyContent: 'center',
    width:'60%',
    borderRadius:10,
    height:'70%',
    borderWidth:1,
    borderColor:'#ec7a73',
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
})