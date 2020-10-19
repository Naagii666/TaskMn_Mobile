//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { connect } from 'react-redux'

import {bindActionCreators} from 'redux'
import { Text, View, TouchableOpacity, StyleSheet,FlatList,RefreshControl ,ActivityIndicator} from 'react-native';
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getAllWorkers , getAllProjects  } from './WorkersActions'
// import { ActivityIndicator } from 'react-native-paper';

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      error: null,
      data: []
    };
    this.arrayholder = [];
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
  componentWillMount() {
    this.props.getAllProjects()
    this.setProjets()
  }
  setProjets(){
    const { projects, loading } = this.props
    this.arrayholder = projects
    // while(loading){
    //   console.log('waiting')
    // }
    // this.setState({ data: projects });
    projects[0]==null?this._onRefresh.bind(this):this.setState({ data: projects }); 
  }
  _onRefresh(){
    this.props.getAllProjects()
    this.setProjets()
  }
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.Name.toUpperCase()} ${item.Description.toUpperCase()} ${item.StartDate.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  }
  EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
	);
  keyExtractor = (item, index) => index.toString()
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
  renderFooter = () => {
    return (
      <Text>aa</Text>
    );
  };
  renderItem = ({ item }) => (
    <View style={{justifyContent:'space-between',flexDirection:'column',margin:10}}>
      <TouchableOpacity style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}
        onPress={() => {
              this.props.navigation.navigate('WorkDetail', {
              item:item
          }
        )}}>
        <View style={{width:'90%'}}>
          <Text style={{color:'#2D3954',fontSize:20,fontWeight:'bold'}}>
            {item.Name}
          </Text>
          <Text numberOfLines={3} style={{fontSize:14 , textAlign:'justify',color:'#69d275'}}>
            {item.LowPrice}₮ - {item.HighPrice}₮ / Эхлэхэд өдөр : {item.StartDate}
          </Text>
        </View>
        <View style={{alignSelf:'center'}}>
          <Icon name="chevron-right" size={16} color="#4285F4"/>
        </View>
      </TouchableOpacity>
    </View>
  )
  renderList(){
    const { projects, loading } = this.props
    return(
      <View style={styles.container}>
        <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            keyExtractor={item => item.ID}
            // data={userProjects}
            ItemSeparatorComponent={this.renderSeparator}
            data={this.state.data}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderHeader}
            // ListFooterComponent={this.renderFooter}
            ListEmptyComponent={
              <this.EmptyComponent title="Мэдээлэл олдсонгүй" />
            }
        />
      </View>
    )
  }
  render() {
    const { projects, loading } = this.props
    return(
      <View style={styles.body}>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
		  }}
      centerComponent={{ text: 'Ажил хайх', style:styles.headerTitle }}
        //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
        //   rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {loading?
          <ActivityIndicator/>
        :(
          this.renderList()
        )}
      </View>
     );
  }
}
export default connect(
  state => ({
    loading: state.project.getIn(['project_list', 'loading']),
		projects: state.project.getIn(['project_list', 'data']),
         // projects: state.project.getIn(['project_list', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getAllProjects: bindActionCreators(getAllProjects, dispatch),
    }
  }
)(SearchView);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  body:{
		backgroundColor:'#FFF',
    height:'100%',
    marginBottom:'10%'
	},
	emptyContainer:{
		alignItems:'center',
		marginTop:20
	},
	emptyText:{
		color:'#4285F4'
  },
  container:{
		backgroundColor:'#FFF',
    flex:1
  },
  SearchBar:{
    backgroundColor:'#FFF',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#4285F4',
    marginVertical:5
  },
  SearchBarInput:{
    backgroundColor:'#FFF',
    // borderWidth:1,
    // borderColor:'#4285F4',
    // marginVertical:5
  }
})