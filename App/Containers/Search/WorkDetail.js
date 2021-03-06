//This is an example code for Bottom Navigation//
import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet ,ScrollView,Dimensions,BackHandler ,TextInput ,Image , ActivityIndicator} from 'react-native';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {  Card, ListItem, Button ,Header} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html';
import ImageView from 'react-native-image-view';
import {onCheckPayment} from '../Projects/ProjectsActions'
class WorkDetail extends React.Component {   
    constructor(props) {
		super(props);
			this.state = {
				isImageViewVisible:false,
			};
	}
    componentDidMount() {
        const item = this.props.navigation.getParam('item', []);
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.props.onCheckPayment(item.ID)
        // alert(item.ID)
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
    render() {
        const { navigation ,loading, payment } = this.props;
        const item = navigation.getParam('item', []);
        
        const images = [
            {
                source: {
                    uri: item.Picture?'http://task.mn/'+item.Picture:null,
                },
                title: 'Project picture',
                width: 806,
                height: 720,
            },
        ];
        return(
        <View style={{flex:1}}>
            <Header
            containerStyle={{
                height:Header2.HEIGHT,
                backgroundColor: '#4285F4',
            }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Дэлгэрэнгүй', style:styles.headerTitle }}
            //   centerComponent={{ text: 'Миний ажлууд', style: { color: '#fff' } }}
            //   rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <ScrollView >
                <View style={{marginHorizontal:10 ,marginBottom:'10%'}}>
					<Text style={{textAlign:'left',color:'black',fontSize:20,fontWeight:'bold',flexDirection:'row'}}>		{item.Name}
					</Text>

                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                            Эхлэх хугацаа : <Text style={{color:'black'}} >{item.StartDate}</Text>
                        </Text>
                        <Text style={{color:'#4285F4'}}>
                            Саналын тоо: <Text style={{color:'black'}} >{item.AllowBidNumber?item.AllowBidNumber:'0'}</Text>
                        </Text>
                        <Text style={{color:'#4285F4'}}>
                            Үргэлжилэх хугацаа: <Text style={{color:'black'}} >{item.Duration}</Text>
                        </Text>
                    </View>
                    {this.renderSeparator()}
                    {loading?
                            <ActivityIndicator/>
                        :payment!='0'?
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
                        <HTML html={item.Description} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{color:'black'}}/>
                            {/* {item.Description.replace(regex, '')} */}
                        
                    </View>
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4',}}>Үнийн санал</Text>
                        <Text style={{fontSize:18,color:'black',marginTop:5,}}>
                            {item.LowPrice}₮-{item.HighPrice}₮
                        </Text>
                    </View>
                   
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        <Text style={{color:'#4285F4'}}>
                            Шаардагдах ур чадварууд
                        </Text>
                        <View style={{justifyContent: 'flex-start',width:'auto'}}>
                            <Text style={{marginTop:5,color:'black',flexDirection:'row',fontSize:15}}>		
                                {item.Skills}
                            </Text>
                        </View>
                    </View>
                    {this.renderSeparator()}
                    <View style={{marginVertical:10}}>
                        
                        <Text style={{color:'#4285F4'}}>
                                Зураг 
                            </Text>
                        </View>
                        <View style={{marginBottom:50,width: 100, height: 100}}>
                        {item.Picture?
                                <TouchableOpacity style={{flex:1}} onPress={() =>  this.setState({ isImageViewVisible: true })}>
                                    <Image
                                        style={{width: 100, height: 100}}
                                        source={{uri: 'http://task.mn/'+item.Picture}}
                                    />
                                </TouchableOpacity>
                                
                        :(
                            <View StyleSheet={{alignSelf:'center',alignContent:'center'}}>
                                <Text style={{fontSize:14,color:"#3C4348",fontWeight:'300',alignSelf:'center'}}>
                                    Зураг байхгүй
                                </Text>
                            </View>
                        )}
                    </View> 
                    <ImageView
                        images={images}
                        imageIndex={0}
                        isSwipeCloseEnabled={true}
                        isPinchZoomEnabled={true}
                        isTapZoomEnabled={true}
                        isVisible={this.state.isImageViewVisible}
                        onClose = {() =>  this.setState({ isImageViewVisible: false })}
                        // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                    />
                    {this.renderSeparator()}
                </View>
            </ScrollView>
            <View style={styles.constContainer}>
                <TouchableOpacity style={[styles.bidButton,{ alignContent:'center' , flex:1,alignItems:'center'}]} 
                            onPress={() => {
                                this.props.navigation.navigate('BidProject', {
                                    projectID:item.ID
                                }
                            )}}
                        >
                        <Text style={styles.bidText}>Санал өгөх</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        );
    }
}
export default connect(
    state => ({
            loading: state.project.getIn(['check_payment', 'loading']),
            payment: state.project.getIn(['check_payment', 'data']),
    }),
    dispatch => {
        return {
            onCheckPayment: bindActionCreators(onCheckPayment, dispatch),
        }
    }
)(WorkDetail);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
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