import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler,Alert,TextInput,FlatList,RefreshControl,ActivityIndicator } from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import HTML from 'react-native-render-html';
import ImageView from 'react-native-image-view';
import { getMilestones , onApplyTask ,onApplyFinish ,onCheckPayment} from './ProjectsActions'
import { getAllWorkers } from '../Search/WorkersActions'
class inProgress extends React.Component {   
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation} = this.props;
        const item = navigation.getParam('item', []);
        item.ProjectID?(
          this.props.getMilestones(item.ProjectID),
          this.props.onCheckPayment(item.ProjectID)
          )
        :
          (
          this.props.getMilestones(item.ID),
          this.props.onCheckPayment(item.ID)
        )
    }
    componentWillUnmount(){
        this.backHandler.remove()
    }
    handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
    }
    ApplyTask(taskID){
      const item = this.props.navigation.getParam('item', []);
      this.props.onApplyTask(taskID , item.ProjectID)
    }
    goBack(){
        this.props.navigation.pop(),
        this.props.navigation.navigate('Tabs',{
        })
    } 
    FinishProject = () => {
      Alert.alert(
        'Анхааруулга',
        'Ажлыг дуусгах',
        [
          {
            text: 'Үгүй',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Тийм', onPress: () => {
            const item = this.props.navigation.getParam('item', []);
            this.props.onApplyFinish(item.ProjectID)
            // this.props.navigation.pop()
            // Alert('tada')
          }},
        ],
        { cancelable: true },
      );
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
                this.props.navigation.pop(),
                this.props.navigation.navigate('Tabs',{
                })
              }}>
            <View style={{flexDirection:'row'}}>
                <Icon name="chevron-left" size={16} color="#fff"/>
                <Text style={{color:'#FFF'}}>Буцах</Text>
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
      const item = this.props.navigation.getParam('item', []);
      this.props.getMilestones(item.ProjectID)
    }

    renderItem = ({ item }) => (
      <View style={styles.Skill}>
        <View style={{ flexDirection:'column',margin:5}}>
          <Text style={styles.Text}>Даалгавар : {item.TaskName}</Text>
          <Text style={styles.Text}>Үнийн хэмжээ : {item.Amount}</Text>
          <Text style={styles.Text}>Төлөв : {item.Status=='Pending'?'Хүсэлт илгээсэн':item.Status=='Confirmed'?'Дууссан':'Дуусаагүй'}</Text>
        </View>

        {item.Status=="Confirmed"?
            <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} >
            <Icon
                name="check"
                size={25}
                color="#69d275"
            />
          </TouchableOpacity>
        :item.Status=="Pending"?
          <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} >
              <Icon
                  name="check-square"
                  size={25}
                  color="#69d275"
              />
          </TouchableOpacity>
        :
          <TouchableOpacity style={{marginRight:10 ,alignItems:'center',alignContent:'center',justifyContent:'center'}} onPress = {() => {this.ApplyTask(item.TaskID)} }>
              <Icon
                  name="plus-square"
                  size={25}
                  color="#69d275"
              />
          </TouchableOpacity>
      }
        
        </View>
    );

    render() {
        const { navigation ,loading, milestones , loading2 , payment , loading3  } = this.props;
        const item = navigation.getParam('item', []);
        return(
          <View style={{flex:1}}>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: item.Name, style:styles.headerTitle }}
            />
            <ScrollView style={{marginBottom:Header2.HEIGHT }}>
              <View style={{marginHorizontal:10 }}>

                <View style={{marginVertical:10}}>
                    <Text style={{color:'#4285F4'}}>
                        Сонгосон санал
                    </Text>
                </View>

                <View style={{justifyContent:'space-between',flexDirection:'column',borderWidth:1,borderColor:'#4285F4',borderRadius:10,margin:5,backgroundColor:'#E7EBF1'}}>
                  <View style={styles.body}>
                      <View style={styles.container}>
                          <Text style={styles.userInfo}>Хугацаа :</Text>
                          <Text style={styles.titleInfo}>{item.Time + ' хоног'}</Text>
                      </View>

                      <View style={styles.container}>
                          <Text style={styles.userInfo}>Үнэийн санал :</Text>
                          <Text style={styles.titleInfo}>{item.Cap+' ₮'}</Text>
                      </View>

                      {/* <View style={styles.container}>
                          <Text style={styles.titleInfo}>Төлөв :</Text>
                          <Text style={styles.titleInfo}>{item.Status + ' хоног'}</Text>
                      </View> */}

                      <View style={styles.container}>
                          <Text style={styles.userInfo}>Тайлбар :</Text>
                          <Text adjustsFontSizeToFit={true} style={[styles.titleInfo,{flex:1 , marginLeft:'10%',textAlign:'right'}]}>{item.BidDescription}</Text>
                      </View>
                      
                      <View style={styles.container}>
                          <Text style={styles.titleInfo}>Гүйцэтгэгч :</Text>
                          <TouchableOpacity 
                                  onPress={() => this.navigateDetail(this.findUser(item.LancerID))}
                          >
                                  <Text style={{fontSize:18,color:'#3389ff'}}>
                          {this.findUserName(item.LancerID)}
                          </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                </View>
                {this.renderSeparator()}
                {loading3?
                        <ActivityIndicator/>
                    :payment!=''?
                        <View style={{marginVertical:10}}>
                            <Text style={{color:'#4285F4',}}>Төлбөр баталгаажуулсан дүн</Text>
                            <Text style={{fontSize:18,color:'black',marginTop:5,}}>
                                {payment}₮
                            </Text>
                        </View>
                    :
                    <View style={{marginVertical:10}}>
                            <Text style={{color:'#4285F4',}}>Төлбөр</Text>
                            <Text style={{fontSize:18,color:'black',marginTop:5,}}>
                                Баталгаажаагүй
                            </Text>
                    </View>
                  }

                {this.renderSeparator()}

                <View style={{marginVertical:10}}>
                    <Text style={{color:'#4285F4'}}>
                        Даалгаварууд
                    </Text>
                </View>
                <View style={{margin:10,flex:1}}>
                  <View style={{flexDirection:'row'}}>
                    <Icon
                      name="check"
                      size={25}
                      color="#69d275"
                    />
                    <Text> - Дууссан </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Icon
                      name="check-square"
                      size={25}
                      color="#69d275"
                    />
                    <Text> - Хүсэлт илгээсэн </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Icon
                      name="plus-square"
                      size={25}
                      color="#69d275"
                    />
                    <Text> - Дуусгах </Text>
                  </View>
                </View>
                <View>
                  {loading?
                    <ActivityIndicator />
                  :(
                    <FlatList
                      refreshControl={
                        <RefreshControl
                          refreshing={loading}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }
                      keyExtractor={this.keyExtractor}
                      // ItemSeparatorComponent={this.renderSeparator}
                      data={milestones}
                      renderItem={this.renderItem}
                      ListEmptyComponent={
                        <this.EmptyComponent title="Даалгавар байхгүй." />
                      }
                    />
                  )}
                  </View>
              </View>
            </ScrollView>
            <View style={styles.constContainer}>
                <TouchableOpacity style={[styles.bidButton,{ alignContent:'center' , flex:1,alignItems:'center'}]} 
                        onPress={() => {
                          this.FinishProject()
                        }}
                    >
                      {loading2?
                        <ActivityIndicator style={{alignSelf:'center'}}/>
                      :
                        <Text style={styles.bidText}>Дуусгах</Text>
                      }
                        
                </TouchableOpacity>
                
            </View>  
        </View>
        );
    }
}
export default connect(
    state => ({
            milestones: state.project.getIn(['milestone_list', 'data']),
            loading: state.project.getIn(['milestone_list', 'loading']),
            workers: state.workers.getIn(['workers_list', 'data']),
            loading2: state.project.getIn(['apply_list', 'loading']),
            loading3: state.project.getIn(['check_payment', 'loading']),
            payment: state.project.getIn(['check_payment', 'data']),
    }),
    dispatch => {
        return {
            getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
            getMilestones:  bindActionCreators(getMilestones, dispatch),
            onApplyTask: bindActionCreators(onApplyTask, dispatch),
            onApplyFinish: bindActionCreators(onApplyFinish, dispatch),
            onCheckPayment: bindActionCreators(onCheckPayment, dispatch),
        }
    }
)(inProgress);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
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
  Text:{
    alignItems:'center' , 
    justifyContent:'flex-start' , 
    marginLeft:10 ,
    color:'#3C4348',
    fontSize:15
  },
  body: {
    backgroundColor:'#E7EBF1',
    margin:10,
    // borderBottomWidth:1, 
    borderColor:'#4285F4',
    marginBottom:10
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
  inputs:{
    borderColor:'#4285F4',
    borderWidth:1,
    width:'50%',
    height:45,
    marginVertical:10,
    alignSelf:'center'
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
    // position: 'fixed',
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
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
    marginTop:10
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
  Summary:{
    width:'70%',
    height:80,
    alignSelf:'center',
    paddingHorizontal:10,
    marginLeft:'10%',
    // backgroundColor:'#4285F4',
    color:"#000",
    margin:5,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#4285F4',
    maxHeight:500,

  },
  userInfo:{
    fontSize:14,
    color:"#3C4348",
    fontWeight:'300',
  },
  titleInfo:{
    fontSize:14,
    color:"#3C4348",
    fontWeight:'300',
    maxHeight:700

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