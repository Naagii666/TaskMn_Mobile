//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,FlatList ,RefreshControl ,BackHandler } from 'react-native';
import {  Card, ListItem, Button ,Header ,SearchBar} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import { getProfile, getBalance , getTransaction } from './ProfileActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
// ID
// Date
// Time
// TransactionValue  
// BeforeBalance
// Value
// AfterBalance
// Account  
class Account extends React.Component {
    componentDidMount() {
        this.props.getBalance(),
        this.props.getTransaction(),
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
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
        this.props.navigation.pop(),
        this.props.navigation.navigate('Tabs',{
        })
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
    keyExtractor = (item, index) => index.toString();
	_onRefresh() {
		this.props.getTransaction()
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
    accountNumber = () => {
        return(
                <Text style={{color:'#27B737'}}>
                    {' '}5022781276{' '}
                </Text> 
        )
    }
    EmptyComponent = ({ title }) => (
		<View style={styles.emptyContainer}>
		  <Text style={styles.emptyText}>{title}</Text>
		</View>
    );
    renderItem = ({ item }) => (
        <View style={{flexDirection:'row'}}>
            <Text>{item.Account}</Text>
        </View>
      );
  
    render() {
        const { navigation ,balance, loading ,loading2 , transaction} = this.props;
        const item = navigation.getParam('item', []);
        const code = navigation.getParam('pCode', []);
        return(
        <View>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Данс', style:styles.headerTitle }}
            />
            <View style={styles.body}>
                <Text style={{color:'#2D3954',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>
                    Данс цэнэглэх заавар
                </Text>
                <View style={{flexDirection:'row',marginVertical:10}}>
                    <Text style={{color:'#3c4348',textAlign:'justify' , fontSize:16}}>
                        Хаан Банкны {this.accountNumber()} данс руу цэнэглэх мөнгөө шилжүүлнэ. Гүйлгээний утга дээр бүртгүүлсэн утасны дугаараа бичнэ.
                    </Text>
                    {/* <Text style={{color:'#27B737'}}>
                    {' '}5022781276{' '}
                    </Text>  
                    <Text style={{color:'#3c4348'}}>
                        данс руу цэнэглэх мөнгөө шилжүүлнэ. Гүйлгээний утга дээр бүртгүүлсэн утасны дугаараа бичнэ.
                    </Text>  */}
                </View>
                <View style={{flexDirection:'row',marginVertical:10}}>
                    <Text style={{color:'#3c4348', fontSize:16}}>
                        Бүртгэлтэй дугаар : 
                    </Text>  
                    <Text style={{color:'#F33066',fontSize:16}}>
                        {' '}{item}{' '}
                    </Text> 
                </View>
                <View style={{flexDirection:'row',marginVertical:10}}>
                    <Text style={{color:'#3c4348', fontSize:16}}>
                        Төлбөрийн код : 
                    </Text>  
                    <Text style={{color:'#F33066',fontSize:16}}>
                        {' '}{code}{' '}
                    </Text> 
                </View>
                <View style={{flexDirection:'row',marginVertical:10}}>
                <Text style={{color:'#3c4348', fontSize:16}}>
                        Дансны үлдэгдэл : 
                    </Text>  
                    {loading?<ActivityIndicator/>:
                        <Text style={{color:'#27B737',fontSize:16}}>
                            {' '}{balance.Amount}{' ₮'}
                        </Text> 
                    }
                </View>
                {this.renderSeparator()}
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <Text style={{color:'#2D3954',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>
                        Дансны хуулга 
                    </Text>  
                </View>
                {this.renderSeparator()}
                <View>
                  {loading2?
                    <ActivityIndicator />
                  :(
                    <FlatList
                      refreshControl={
                        <RefreshControl
                          refreshing={loading}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }
                      keyExtractor={item => item.Account}
                      // ItemSeparatorComponent={this.renderSeparator}
                      data={transaction}
                      renderItem={this.renderItem}
                      ListEmptyComponent={
                        <this.EmptyComponent title="Гүйлгээ хийгдээгүй." />
                      }
                    />
                  )}
                </View>
                
            </View>
            
        </View>
        );
    }
}
export default connect(
    state => ({
     loading: state.profile.getIn(['balance', 'loading']),
     balance: state.profile.getIn(['balance', 'data']),
     loading2: state.profile.getIn(['transaction_list', 'loading']),
     transaction: state.profile.getIn(['transaction_list', 'data']),
    }),
    dispatch => {
      return {
        getBalance: bindActionCreators(getBalance, dispatch),
        getTransaction: bindActionCreators(getTransaction, dispatch),
      }
    }
  )(Account);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
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
	}
})