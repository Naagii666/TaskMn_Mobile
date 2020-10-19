//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl,BackHandler } from 'react-native';
import {  Card, ListItem, Rating, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getAllWorkers } from '../Search/WorkersActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class MessengerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      error: null,
      data: []
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.getAllWorkers()

    const { workers, loading } = this.props
    this.arrayholder = workers
    // while(loading){
    //   console.log('waiting')
    // }
    // this.setState({ data: workers });
    workers[0]==null?this._onRefresh.bind(this):this.setState({ data: workers }); 
    // this.arrayholder = itemData
    // this.setState({ data: itemData});
  }
  componentWillUnmount(){
    this.backHandler.remove()
  }
  handleBackPress = () => {
    return true;
  }
  _onRefresh() {
    this.props.getAllWorkers()
    const { workers, loading } = this.props
    this.arrayholder = workers
    workers[0]==null?null:this.setState({ data: workers }); 
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
  renderList(){
    
    const { workers, loading } = this.props
    
    return(
      <FlatList
        refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
        ListEmptyComponent={
              <this.EmptyComponent title="Хайлт олдсонгүй" />}
        keyExtractor= {item => item.ID}
        data={this.state.data}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    )
    
  }
  renderItem = ({ item }) => (
    <View style={{margin:10}}>
      <TouchableOpacity style={{width:'100%'}}
        onPress={() => {
              this.navigateDetail(item)
        }}>
        <ListItem 
          leftAvatar={item.ProPicture?{ source: { uri:'http://task.mn/content/'+item.ProPicture+'' } }:
          {source : {uri: 'http://task.mn/Content/images/UserPictures/user2.png'}}}
          title={
            <View style={{flexDirection:'column'}}>
              <Text style={{color:'#4285F4',fontSize:16,fontWeight:'bold'}}>{item.FirstName+' '+item.LastName}</Text>
              {/* <Text style={{color:'#4285F4'}}>({item.UserName})</Text> */}
            </View>
          }
          subtitle={
            <View style={{flex:1}}>
              <Text style={{color:'black',fontSize:14 ,fontStyle:'italic'}}>{item.Job}</Text> 
            </View>
          }
          // rightTitle={
          //   <View style={{flex:1}}>
          //     <Text>Үнэлгээ : {item.ORatings?item.ORatings:item.FLRatings}</Text>
          //     {item.ORatings?
          //       <View style={{flexDirection:'row'}}>
          //         <Rating
          //           imageSize={20}
          //           readonly
          //           startingValue={item.ORatings}
          //         />
          //       </View>
          //     :
          //       <Rating
          //         imageSize={20}
          //         readonly
          //         startingValue={item.FLRatings}
          //       />
          //   }
              
          //   </View>
          // }
          rightTitle={
            <View style={{flex:1}}>
              
              <Text>Үнэлгээ : {item.ORatings?item.FLRatings?(item.ORatings+item.FLRatings)/2:item.ORatings:item.FLRatings?item.FLRatings:null}</Text>
                <Rating
                  imageSize={20}
                  readonly
                  startingValue={item.ORatings?item.FLRatings?(item.ORatings+item.FLRatings)/2:item.ORatings:item.FLRatings?item.FLRatings:null}
                />
              
            </View>
          }
          bottomDivider
          chevron
        />
      </TouchableOpacity>
    </View>
    
    
  )
  render() {
    const { workers, loading } = this.props
    return(
      <View style={{backgroundColor:'#FFF',flex:1}}>
        <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          this.renderList()
        )}
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