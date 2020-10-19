//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl ,BackHandler , TouchableHighlight, TextInput} from 'react-native';
import moment from 'moment'
import {  Card, ListItem, Button ,Header ,SearchBar ,Input } from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getProfile, getComments ,onAddComment } from './ProfileActions'
import { getAllWorkers ,getWorkerComments } from '../Search/WorkersActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

class AddComment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Text : '',
        toUser  : '',
        height :0
      }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const UserID = navigation.getParam('UserID', null);
        this.setState({toUser:UserID}),
        this.props.getWorkerComments(UserID)
        this.props.getComments()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        this.props.navigation.pop()
        return true;
    }
    InsertComment(UserID){
      this.state.Text!=''?(
        this.setState({toUser:UserID}),
        this.props.onAddComment(this.state),
        this.clearText(),
        this.props.getWorkerComments(UserID)
      ):
      null
    }

    clearText(){
      this.setState({Text:''})
      // this._onRefresh.bind(this)
    }
    goBack(){
        this.setState({bidView: false});
        // this.props.navigation.pop()
        this.props.navigation.navigate('Tabs',{
        })
    } 
    findUser(lancerID){
        const workers = this.props.workers
            var data = null
            workers.forEach((worker) => {
                if(worker.UserID === lancerID) {
                    // this.setState({userName: worker.UserName });
                    data = worker;
              }
        })
        return data
      }
      findUserName(lancerID){
            const workers = this.props.workers
            var data = null
            workers.forEach((worker) => {
                if(worker.UserID === lancerID) {
                    data = worker.UserName;
          }
        })
          return data
      }
    renderLeftComponent(){
		return(
			<View style={{flex:1}} >
				<TouchableOpacity 
						onPress={() => {
                            // this.props.navigation.pop()
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
    keyExtractor = (item, index) => index.toString();
	  _onRefresh() {
      // this.props.getComments(),
      this.props.getWorkerComments(this.state.toUser)
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
    EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
          
		</View>
    );
    
    renderItem = ({ item }) => (
        <View style={{margin:10 , flex:1 }}>
            <View style={{ paddingHorizontal: 20,paddingVertical:8, backgroundColor:"#DCDCDC",borderRadius:10}}>
                    <View>
                        <View  style={styles.rowText}>
                                <Text style={{textAlign: 'left'}}>{this.findUserName(item.FromUser)}</Text>
                        </View>
                        <View style={{ paddingTop: 10, }}>
                                <Text>{item.Text}</Text>
                        </View>
                        
                    </View>
            </View>
            <View style={{ alignItems: 'flex-end' } }>
            <Text>{moment(item.Date).fromNow()}</Text>
        </View>
	  </View>
    )
    render() {
        const { comments , loading } = this.props;
        const { navigation } = this.props;
        const UserID = navigation.getParam('UserID', null);
        return(
        <View style={{height:'100%'}}>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Сэтгэгдэл', style:styles.headerTitle }}
            />
          <KeyboardAwareScrollView>
            {	
            loading ? (
                  <ActivityIndicator />
            ) : (
                <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={loading}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }
                    style={{marginBottom:Header2.HEIGHT}}
                    ListEmptyComponent={
                        <this.EmptyComponent title="Сэтгэгдэл байхгүй" />}
                    keyExtractor= {item => item.ID}
                    data={comments}
                    renderItem={this.renderItem}
                />
            )}
           
          </KeyboardAwareScrollView>
          <View style={styles.constContainer}>
            <TextInput style={[styles.inputs,{height: Math.max(35, this.state.height)}]}
                            numberOfLines={5}
                            ellipsizeMode="head"
                            keyboardType="default"
                            multiline={true}
                            onContentSizeChange={(event) => {
                              this.setState({ height: event.nativeEvent.contentSize.height })
                            }}
                            placeholder="Сэтгэгдэл ..."
                            value={this.state.Text}
                            onChangeText={Text => this.setState({Text})}
                        />
              <TouchableOpacity style={[styles.bidButton]}
                    onPress = {() => {this.InsertComment(UserID)} }>
                  <Icon
                    style={{alignSelf:'center'}}
                    name="paper-plane"
                    size={20}
                    color="#4285F4"
                  />
              </TouchableOpacity>
            </View> 
          
        </View>
        );
    }
}
export default connect(
    state => ({
      loading: state.profile.getIn(['comments', 'loading']),
      comments: state.profile.getIn(['comments', 'data']),
      workers: state.workers.getIn(['workers_list', 'data']),
      loading3: state.profile.getIn(['add_comment', 'loading']),
    }),
    dispatch => {
      return {
        getComments: bindActionCreators(getComments, dispatch),
        getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
        getWorkerComments: bindActionCreators(getWorkerComments, dispatch),
        onAddComment: bindActionCreators(onAddComment, dispatch),
      }
    }
  )(AddComment);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  rowText:{
    flexDirection: 'row',
    // padding:10,
    fontSize:15,
    color:'#ff9900',
    justifyContent: 'space-between',
  },
  inputs:{
    borderColor: '#DCDCDC',
    backgroundColor:'#F6F6F6',
    borderWidth:1,
    // flex:1,
    width:'70%',
    height:50,
    maxHeight:200,
    marginLeft:10,
    borderRadius:30,
    paddingHorizontal:5,
    marginVertical:5
  },
  body:{
    margin:10,
    backgroundColor:"#FFF",
    // flex:1
  },
  emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
  },
  bidButton:{
    backgroundColor:'#FFF',
    // marginBottom:20,
    alignContent:'center',
    justifyContent: 'center',
    alignSelf:'center',
    height:'70%',
    width:'20%',
    // borderWidth:1,
    borderColor:'#4285F4',
    borderRadius:10,
    marginVertical:5
  },
  constContainer:{
    left:0,
    right:0,
    bottom:0,
    // flex:1,
    backgroundColor:'#fff',
    borderTopWidth:1,	
    borderRadius:10,
    borderTopColor:'#B6B6B6',
    flexDirection:'row',
    alignSelf:'center',
    position:'absolute',
    justifyContent: 'center',
    // flex:0.1,
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