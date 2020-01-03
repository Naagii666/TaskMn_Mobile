//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl } from 'react-native';
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getAllWorkers } from '../Search/WorkersActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
const test = [{
  "UserName" : "Naagii",
  "ProPicture" : null,
  "FirstName" : "Naagiii",
  "LastName" : "Naagiii",
	"Education":"Num",
  "Job":"Developer",
  "PhoneNumber" : 9999999,
	"HomeAddress" : "UB Mongolia",
	"UserEmail" : "naagii.dashdorj@gmail.com",
	"Skills" :"English",
  "Description": " Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
  "ORating" : 4.7,
  "FRating" : 5
  },
  {
    "UserName" : "Test",
    "ProPicture" : null,
    "FirstName" : "TestF",
    "LastName" : "TestL",
    "Education":"Num",
    "Job":"Developer",
    "PhoneNumber" : 9999999,
    "HomeAddress" : "UB Mongolia",
    "UserEmail" : "naagii.dashdorj@gmail.com",
    "Skills" :"English",
    "Description": " Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
    "ORating" : 4.7,
    "FRating" : 5
    }
]
const itemData = Object.values( test );
class MessengerView extends React.Component {
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
    this.props.getAllWorkers()
    const { workers, loading } = this.props
    this.arrayholder = workers
    this.setState({ data: workers }); 
    // this.arrayholder = itemData
    // this.setState({ data: itemData});
  }
  _onRefresh() {
    this.props.getAllWorkers()
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
  _keyExtractor = (item, index) => index.toString()

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
  renderItem = ({ item }) => (
    <TouchableOpacity style={{width:'100%'}}
      onPress={() => {
            this.navigateDetail(item)
      }}>
      <ListItem 
        leftAvatar={item.ProPicture?{ source: { uri:'http://task.mn/content/'+item.ProPicture+'' } }:
        {source : {uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}}
        title={
          <View style={{flexDirection:'column'}}>
            <Text style={{color:'#4285F4',fontWeight:'bold'}}>{item.FirstName+' '+item.LastName}</Text>
            <Text style={{color:'#4285F4'}}>({item.UserName})</Text>
          </View>
        }
        rightTitle={
          <View style={{flex:1}}>

          </View>
        }
        bottomDivider
        chevron
      />
    </TouchableOpacity>
    
  )
  render() {
    const { workers, loading } = this.props
    return(
      <View>
        <View>
        {/* {loading ? (
          <ActivityIndicator />
        ) : ( */}
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
        {/* )} */}
        </View>
      </View>
     );
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
)(MessengerView);
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
	}
})