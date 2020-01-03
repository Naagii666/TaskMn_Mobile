import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import { ActivityIndicator ,H3,View, Text, FlatList,ScrollView, RefreshControl,TouchableOpacity, TouchableHighlight ,Image,StyleSheet,BackHandler,StatusBar} from 'react-native'
import { ListItem ,Rating, AirbnbRating,SearchBar } from 'react-native-elements'
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
//import all the basic component we have used
import { getAllWorkers } from './WorkersActions'


class WorkerView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value:'',
      error: null,
      data: [],
    };

    this.arrayholder = [];
  }
  componentDidMount() {
    const { workers, loading } = this.props
    this.props.getAllWorkers()
    this.arrayholder = workers
    this.setState({ data: workers }); 
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillMount(){
    this.setState({ data:  this.props.workers });
  }
  componentWillUnmount() {
		this.backHandler.remove()
	}
	handleBackPress = () => {
		// BackHandler.exitApp()
		return true;
	}
	_onRefresh() {
    this.props.getAllWorkers()
    // this.setState({ data: this.props.getAllWorkers() });
	}

	_renderEmpty() {
		return <H3>Мэдэгдэл алга байна.</H3>
	}
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.UserName.toUpperCase()} ${item.FirstName.toUpperCase()} ${item.LastName.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  }
  keyExtractor = (item, index) => index.toString()
  _keyExtractor = (item, index) => item.UserID;

  navigateDetail(item){
    this.props.navigation.navigate('WorkerDetail',{
      item: item
      })
  }
  EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
	  );
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Хайх..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  _renderEmpty() {
    return <H3>Мэдээлэл олдсонгүй</H3>
  }
  renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={'#f2f2f2'}  
      onPress={ () =>  this.navigateDetail(item)
      }
    >
    <ListItem 
      leftAvatar={item.ProPicture?{ source: { uri:'http://task.mn/content/'+item.ProPicture+'' } }:
      {source : {uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}}
      title={<View style={{flexDirection:'column'}}>
                <Text style={{color:'#4285F4',fontWeight:'bold'}}>{item.FirstName+' '+item.LastName}</Text>
                <Text style={{color:'#4285F4'}}>({item.UserName})</Text>
            </View>
            }
      subtitle={
      <View style={{flex:1}}>
        <Text style={{color:'black',fontStyle:'italic'}}>{item.Job}</Text> 
      </View>
      }
      rightTitle={
      <View style={{flex:1}}>
        {item.FLRatings?(
          <View style={{margin:5}}>
        <Rating
            imageSize={20}
            readonly
            style={{ flex:1 }}
            startingValue={4.5}
            // style={{ styles.rating }}
          />
          </View>
        ):(
          <View style={{margin:5}}>
          <Rating
            imageSize={15}
            readonly
            startingValue={4.5}
            // style={{ styles.rating }}
          />
          <Text>(4.5)</Text>
          </View>
        )
        }
        
    </View>
    }
      bottomDivider
      chevron
    />
   </TouchableHighlight>
    
  )
 	render() {
    const { workers, loading } = this.props
    
    return (
      <ScrollView>
        <View>
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
            ListEmptyComponent={
                  <this.EmptyComponent title="Хайлт олдсонгүй" />}
            keyExtractor= {this._keyExtractor}
            
            data={this.state.data}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderHeader}
          />
        )}
        </View>
      </ScrollView>
    )
  }
}

export default connect(
   state => ({
		loading: state.workers.getIn(['workers_list', 'loading']),
		workers: state.workers.getIn(['workers_list', 'data']),
   	   	// projects: state.project.getIn(['project_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
     	getAllWorkers: bindActionCreators(getAllWorkers, dispatch),
     }
   }
)(WorkerView);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  emptyContainer:{
    alignItems:'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});