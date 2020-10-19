//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet,FlatList,RefreshControl ,TextInput,Alert,ScrollView ,ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getBidListHire ,onChooseBid} from './ProjectsActions'
// import {  } from 'react-native-paper';
import { getAllWorkers } from '../Search/WorkersActions'
class ChooseBid extends React.Component {
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
  onChooseBid = (item) => {
    Alert.alert(
      'Анхааруулга',
      'Саналыг сонгосноор даалгаварт өөрчилөлт оруулах боломжгүй болно!',
      [
        {
          text: 'Цуцлах',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Сонгох', onPress: () => {
          this.ChooseBid(item)
        }},
      ],
      { cancelable: true },
    );
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
                        this.props.navigation.pop()
                  //       this.props.navigation.navigate('ProjectDetail',{
                  // })
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
    // alert(ProjectID)
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
    <View style={{justifyContent:'space-between',flexDirection:'column'}}>
      {this.findProjectBid(item.ProjectID)?(
        <View style={styles.body}>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Хугацаа :</Text>
            <Text style={styles.titleInfo}>{item.Time + ' хоног'}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Үнэ :</Text>
            <Text style={styles.titleInfo}>{item.Cap+' ₮'}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Төлөв :</Text>
            <Text style={styles.titleInfo}>{item.Winner?'Сонгогдсон':'Хүлээгдэж байгаа'}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.userInfo}>Тайлбар :</Text>
            
            <Text adjustsFontSizeToFit={true} style={[styles.titleInfo,{flex:1 , marginHorizontal:'5%',textAlign:'right'}]}>{item.Description}</Text>
              {/* <TextInput
                style={styles.Summary}
                numberOfLines={20}
                ellipsizeMode="head"
                multiline={true}
                underlineColorAndroid='transparent'
                editable={false}
                scrollEnabled={true}
                value={item.Description}/> */}
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
                title="Сонгосон"
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
                    onPress={() => {this.onChooseBid(item)}}
                    title="Сонгох"
                  />
                </View>
            </View>
            }
          </View>
        </View>
      ):(
        null
        // <Text>hooson</Text>
      )
    }
    </View>
  )
  render() {
    const { bids, loading } = this.props
    return(
      <View>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
          }}
            leftComponent={this.renderLeftComponent()}
            centerComponent={{ text: 'Санал сонгох', style:styles.headerTitle }}
        //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
        //   rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <ScrollView>
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
                // ItemSeparatorComponent={this.renderSeparator}
                data={bids}
                renderItem={this.renderItem}
                ListEmptyComponent={
                  <this.EmptyComponent title="Санал ирээгүй байна ." />
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
)(ChooseBid);
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
    margin:15,
    // borderBottomWidth:1, 
    borderColor:'#4285F4',
    marginBottom:10,
    justifyContent:'space-between',
    flexDirection:'column',
    borderWidth:1,
    borderColor:'#4285F4',
    borderRadius:10,
    padding:5
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
    flex:1,
    alignSelf:'center',
    paddingHorizontal:10,
    marginLeft:'10%',
    // backgroundColor:'#4285F4',
    color:"#000",
    margin:5,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#4285F4',
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
  emptyContainer:{
		alignItems:'center',
		marginTop:20 
	},
	emptyText:{
		marginTop:20 ,
		color:'black'
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