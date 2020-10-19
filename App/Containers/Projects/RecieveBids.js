//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text,Alert, View, TouchableOpacity, StyleSheet,FlatList,RefreshControl ,TextInput,ScrollView,ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getBidListHire ,onChooseBid} from './ProjectsActions'
// import { ActivityIndicator } from 'react-native-paper';
import { getAllWorkers } from '../Search/WorkersActions'
class RecieveBids extends React.Component {
  constructor(props) {
		super(props);
			this.state = {
				LancerID:'',
				BidID:'',
				ProjectID:'',
			};
    }
  EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
  );
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
  navigateDetail(item){
		this.props.navigation.navigate('WorkerDetail',{
		  item: item
		  })
  }
  NavigateMilestone(item){
    const { navigation } = this.props;
    const id = navigation.getParam('id', []);
    var data = [{
      "ProjectID" : id,
      "LancerID" : item.LancerID,
      "BidID" : item.ID
    }]
    Data = Object.values( data )
    // this.props.onChooseBid(d[0])
    this.props.navigation.navigate('MileStone',{
      data : Data[0]
    })
  }
  ChooseBid(item){
    const { navigation } = this.props;
    const id = navigation.getParam('id', []);
    var data = [{
      "ProjectID" : id,
      "LancerID" : item.LancerID,
      "BidID" : item.ID
    }]
    Data = Object.values( data )
    this.props.onChooseBid(Data[0])
  }
  componentDidMount() {
    this.props.getBidListHire()
    this.props.getAllWorkers()
  }
  _onRefresh(){
    this.props.getBidListHire()
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
                    <Text style={{color:'#FFF'}}> Буцах</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
  }
  findProjectBid(ProjectID){
    const { navigation } = this.props;
    const id = navigation.getParam('id', []);
    if(id == ProjectID)
      return true
    return false
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
  keyExtractor = (item, index) => index.toString()
 
  renderItem = ({ item }) => (
    <View style={{justifyContent:'space-between',flexDirection:'column',borderWidth:1,borderColor:'#4285F4',borderRadius:10,margin:5,backgroundColor:'#E7EBF1'}}>
        <View style={styles.body}>
        <View style={styles.container}>
            <Text style={styles.userInfo}>Ажлын нэр :</Text>
            <Text style={styles.titleInfo}>{item.Name}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Төлөв :</Text>
            <Text style={styles.titleInfo}>{item.Winner?'Сонгогдсон':'Хүлээгдэж байгаа'}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Хугацаа :</Text>
            <Text style={styles.titleInfo}>{item.Time + ' хоног'}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Үнэ :</Text>
            <Text style={styles.titleInfo}>{item.Cap+' ₮'}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Тайлбар :</Text>
            <Text style={[styles.titleInfo,{flex:1 , marginLeft:'10%',textAlign:'right'}]}>{item.Description}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Санал илгээгч :</Text>
            <TouchableOpacity 
                      onPress={() => this.navigateDetail(this.findUser(item.LancerID))}
            >
                <Text style={{fontSize:18,color:'#3389ff'}}>
                    {this.findUserName(item.LancerID)}
                </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical:20}}>
          {item.Winner?
              <Button
                buttonStyle={{
                  borderRadius:10,
                  width:'90%',
                  backgroundColor:'#868E96',
                  alignSelf:'center',
                  flex:1
                }}
                onPress={() => {
                    Alert.alert('','Саналыг сонгосон байна!')
                }}
                title="Сонгох"
              />
              
              :
              <View style={{flexDirection:'row',flex:1}}>
                <View style={[styles.deleteButton]}>
                  <Button
                    buttonStyle={{
                      borderRadius:5,
                      backgroundColor:'#69d275',
                      alignSelf:'center',
                      width:'100%',
                    
                    }}
                    onPress={() => {
                        this.NavigateMilestone(item)
                    }}
                    title="Даалгавар"
                  />
                </View>
                <View style={[styles.bidButton]}>
                  <Button
                    buttonStyle={{
                      borderRadius:5,
                      backgroundColor:'#69d275',
                      alignSelf:'center',
                      width:'100%'
                    }}
                    onPress={() => {
                        this.ChooseBid(item)
                    }}
                    title="Сонгох"
                  />
                </View>
            </View>
            }
          </View>
        </View>
    </View>
  )
  render() {
    const { bids, loading } = this.props
    return(
      <View style={{flex:1}}>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
          }}
            leftComponent={this.renderLeftComponent()}
            centerComponent={{ text: 'Ирсэн саналууд', style:styles.headerTitle }}
        />
        <ScrollView>
          {loading?(
              <ActivityIndicator/>
          ):(
            <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
                keyExtractor={this.keyExtractor}
                // ItemSeparatorComponent={this.renderSeparator}
                data={bids}
                renderItem={this.renderItem}
                ListEmptyComponent={
                  <this.EmptyComponent title="Ирсэн санал байхгүй байна." />
                }
            />
          )}
        </ScrollView>
        
      </View>
     );
  }
}
export default connect(
  state => ({
    loading: state.project.getIn(['bid_list_hire', 'loading']),
    bids: state.project.getIn(['bid_list_hire', 'data']),
    loading2: state.workers.getIn(['workers_list', 'loading']),
    workers: state.workers.getIn(['workers_list', 'data']),
    loading3: state.workers.getIn(['on_choose_bid', 'loading']),
		// choose_bid: state.workers.getIn(['on_choose_bid', 'data']),
         // projects: state.project.getIn(['project_list', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getBidListHire: bindActionCreators(getBidListHire, dispatch),
      getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
      onChooseBid: bindActionCreators(onChooseBid, dispatch),
    }
  }
)(RecieveBids);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  body: {
    backgroundColor:'#E7EBF1',
    margin:10,
    // borderBottomWidth:1, 
    borderColor:'#4285F4',
    marginBottom:10
  },
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
    marginTop:10
  },
  emptyContainer:{
		alignItems:'center',
		marginTop:20
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
    // flex:1,
    // alignSelf:'flex-end',
    // paddingHorizontal:10,
    // marginLeft:'10%',
    // backgroundColor:'#4285F4',
    color:"#000",
    // margin:5,
    // borderRadius:10,
    // borderWidth:1,
    // borderColor:'#4285F4',
    maxHeight:700,

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
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  bidButton:{
    backgroundColor:'#E7EBF1',
    // marginBottom:20,
    alignContent:'center',
    justifyContent: 'center',
    height:'70%',
    width:'40%',
    borderWidth:1,
    borderColor:'#E7EBF1',
    borderRadius:10,
    marginHorizontal:'5%',
    marginVertical:5
  },
  deleteButton:{
    backgroundColor:'#E7EBF1',
    alignContent:'center',
    justifyContent: 'center',
    width:'40%',
    borderRadius:10,
    height:'70%',
    borderWidth:1,
    borderColor:'#E7EBF1',
    marginHorizontal:'5%',
    marginVertical:5
  },
})



// {item.Winner && item.Status==null?
//   <Button
//     buttonStyle={{
//       borderRadius:10,
//       width:'90%',
//       backgroundColor:'#868E96',
//       alignSelf:'center'
//     }}
//     onPress={() => {
//         Alert.alert('','Саналд татгалзсан хариу өгсөн байна!'),
//         this.ChooseBid(item)
//     }}
//     title="Дахин сонгох"
//   />
  
//   :
//   item.Winner==false?
//     <Button
//       buttonStyle={{
//         borderRadius:10,
//         width:'90%',
//         backgroundColor:'#69d275',
//         alignSelf:'center'
//       }}
//       onPress={() => {
//           this.ChooseBid(item)
//       }}
//       title="Сонгох"
//     />
//   : 
//   item.Winner && item.Status=='Pending'?
//     <Button
//     buttonStyle={{
//       borderRadius:10,
//       width:'90%',
//       backgroundColor:'#69d275',
//       alignSelf:'center'
//     }}
//     onPress={() => {
//       Alert.alert('','Гүйцэтгэгч хариу өгөөгүй байна!')
//     }}
//     title="Хүлээгдэж байгаа"
//   />
//   :
//       <Button
//       buttonStyle={{
//         borderRadius:10,
//         width:'90%',
//         backgroundColor:'#69d275',
//         alignSelf:'center'
//       }}
//       onPress={() => {
//         Alert.alert('','Ажил эхлэсэн байна!')
//       }}
//       title="Ажил эхлэсэн"
//     />
// }