import React,{Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet ,Alert ,Image ,ScrollView,RefreshControl,ActivityIndicator,FlatList} from 'react-native';
import {  Card, ListItem, Button ,Header ,Rating} from 'react-native-elements'
import { Header as Header2 } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import {  deleteAuthenticationToken, } from '../../Services/storage'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import RNRestart from 'react-native-restart';
import { getProfile, getComments , getUserSkills} from './ProfileActions'
import ViewMoreText from 'react-native-view-more-text';
import ImageView from 'react-native-image-view';
// import { ActivityIndicator } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';

class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment : ' Сэтгэгдэл',
      isImageViewVisible:false,
    };
  }
  componentWillMount(){
    this.props.getProfile(),
    this.props.getComments(),
    this.props.getUserSkills()
    // this.countComments()
  }
  // componentDidMount(){
  //   this.countComments()
  // }
  _onRefresh(){
    this.props.getProfile(),
    this.props.getComments()
    // this.countComments()
  }
  DeleteAccount = () => {
    Alert.alert(
      '',
      'Аккоунтыг устгах уу ?',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          this.props.deleteProfile(),
          // releaseData(),
          this.props.navigation.navigate('LoginScreen')
        }},
      ],
      { cancelable: true },
    );
  }
  onLogout = () => {
    Alert.alert(
      '',
      'Та гарахдаа итгэлтэй байна уу ?',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          deleteAuthenticationToken(),
          // releaseData(),
          RNRestart.Restart();
          this.props.navigation.navigate('LoginScreen')
        }},
      ],
      { cancelable: true },
    );
  }
  renderViewMore(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84',alignSelf:'flex-end'}}>Дэлгэрэнгүй</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style={{color:'#727b84',alignSelf:'flex-end'}}>Хураах</Text>
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
  renderLeftComponent(item){
    return(
        <View style={{margin:5,alignItems:'center'}}>
            <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => {this.props.navigation.navigate('EditProfile', {
                  item:item
              })}}
            >
                <Icon name="cog" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
  }
  renderRightComponent(){
    return(
        <View style={{margin:5,alignItems:'center'}}>
            <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => {this.onLogout()}}
            >
                <Icon name="sign-out" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
  }
  render() {
    const { profile, loading , comments ,skills,loading2} = this.props
    const item = profile[0]
    const URI = item.ProPicture!=null?'http://task.mn/content/'+item.ProPicture+'':'http://task.mn/Content/images/UserPictures/user2.png'
    const image = [
      {
          source: {
              uri: URI,
          },
          title: 'User Profile',
          width: 806,
          height: 720,
      },
    ];
    return(
      <View style={styles.body}>
        <Header
          containerStyle={{
            height:Header2.HEIGHT,
            backgroundColor: '#4285F4',
          }}
          leftComponent={this.renderLeftComponent(item)}
          centerComponent={{ text: 'Профайл', style:styles.headerTitle }}
          rightComponent={this.renderRightComponent()}
        />
        {item==null || loading?
        <ActivityIndicator/>
        :(
          <ScrollView style={styles.headerContent}>
            <RefreshControl
										refreshing={loading}
										onRefresh={this._onRefresh.bind(this)}
									/>
                  
                <TouchableOpacity style={{flex:1}} onPress={() =>  this.setState({ isImageViewVisible: true })}>
                  <Image style={[styles.avatar,{alignSelf: 'center',}]}
                      source={{uri: URI}}/>
                </TouchableOpacity>
                <ImageView
                    images={image}
                    imageIndex={0}
                    isSwipeCloseEnabled={true}
                    isPinchZoomEnabled={true}
                    isTapZoomEnabled={true}
                    isVisible={this.state.isImageViewVisible}
                    onClose = {() =>  this.setState({ isImageViewVisible: false })}
                    // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                />
                <View style={{marginBottom:10}}>
                  <Text style={[styles.name,{alignSelf: 'center',}]}>{item.FirstName} {item.LastName}</Text>
                </View>
            {this.renderSeparator()}
            <View  style={styles.generalTitle}>
              <Text style={styles.titleInfo2}>Ерөнхий мэдээлэл</Text>
              {item.Job?
                <View style={styles.infoView}>
                    <Text style={styles.titleInfo}>Ажил :</Text>
                    <Text style={styles.userInfo}>{item.Job}</Text>
                </View>
              :null
              }
              {item.UserEmail?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Имэйл :</Text>
                  <Text style={styles.userInfo}>{item.UserEmail}</Text>
                </View>
              :null
              }
              {item.Education?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Боловсрол :</Text>
                  <Text style={styles.userInfo}>{item.Education}</Text>
                </View>
              
              :null
              }
              {item.PhoneNumber?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Утас :</Text>
                  <Text style={styles.userInfo}>{item.PhoneNumber}</Text>
                </View>
              :null
              }
              {item.HomeAddress?
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Гэрийн хаяг :</Text>
                  <Text style={styles.userInfo}>{item.HomeAddress}</Text>
                </View>
              :null
              }
              </View>
              {item.Description?this.renderSeparator():null}
              {item.Description?
                <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Танилцуулга</Text>
                  <View style={{marginTop:10 ,width:'90%',alignSelf:'center'}}>
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                      textStyle={{textAlign: 'justify',alignSelf:'center',flex:1}}
                    >
                      <Text style={styles.userInfo}>
                        {item.Description}
                      </Text>
                    </ViewMoreText>
                  </View>
                </View>
                
                :null
              }
              {this.renderSeparator()}
              <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Үнэлгээ</Text>
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Захиалагч({item.ORatings})</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    style={styles.rating}
                    startingValue={item.ORatings}
                  />
                </View>
                <View style={styles.infoView}>
                  <Text style={styles.titleInfo}>Гүйцэтгэгч({item.FLRatings})</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={item.FLRatings}
                  />
                </View>
              </View>
              {this.renderSeparator()}
              <View  style={styles.generalTitle}>
                <Text style={styles.titleInfo2}>Ур чадвар</Text>
                <View style={styles.infoView}>
                  <FlatList
                    data={skills}
                    keyExtractor={item => item.Text}
                    renderItem={({ item }) => <Text style={styles.skill}>{item.Text}</Text>}
                  />
                </View>
              </View>
                
              {this.renderSeparator()}
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="paper-plane"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('SentBids',{ 
                        })
                    }}
                    title=" Илгээсэн саналууд"
                  />
              </View>
              {/* <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="inbox"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('RecieveBids',{
                        })
                    }}
                    title=" Ирсэн саналууд"
                  />
              </View> */}
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="comments"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('AddComment',{
                            "UserID" :  item.UserID
                        })
                    }}
                    title = {' Сэтгэгдэл'}
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="cc-visa"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('Account',{ 
                            pCode: item.PaymentCode,
                            item: item.PhoneNumber
                        })
                    }}
                    title=" Данс"
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="lock"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#4285F4',
                    }}
                    onPress={() => {
                          this.props.navigation.navigate('ChangePass',{ 
                            item:item
                        })
                    }}
                    title=" Нууц үг солих"
                  />
              </View>
              <View style={{margin:10}}>
                <Button
                    icon={
                      <Icon
                        name="trash"
                        size={18}
                        color="white"
                      />
                    }
                    buttonStyle={{
                      backgroundColor:'#f28787',
                    }}
                    onPress={() => {
                          this.DeleteAccount()
                    }}
                    title=" Аккоунт устгах"
                  />
              </View>
              
          </ScrollView>
          )}
        </View>
     );
  }
}
export default connect(
  state => ({
   loading: state.profile.getIn(['profile_list', 'loading']),
   profile: state.profile.getIn(['profile_list', 'data']),
   skills: state.profile.getIn(['skill_list', 'data']),
   loading2: state.profile.getIn(['comments', 'loading']),
   comments: state.profile.getIn(['comments', 'data']),

  }),
  dispatch => {
    return {
      getProfile: bindActionCreators(getProfile, dispatch),
      getComments: bindActionCreators(getComments, dispatch),
      getUserSkills: bindActionCreators(getUserSkills, dispatch),
    }
  }
)(ProfileView);
const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18 ,
    fontWeight:'bold',
    flex:1
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#FFF",
    flex:1,
  },
  headerContent:{
    marginHorizontal:10
  },
  skill:{
    backgroundColor:'#E7EBF1',
    borderRadius:15,
    margin:3,
    color:'#3C4348',
    textAlign:'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#4285F4",
    marginBottom:10,
  },
  titleInfo:{
    fontSize:14,
    color:"#4285F4",
    fontWeight:'300',
  },
  rating:{

  },
  titleInfo2:{
    fontSize:16,
    color:"#000",
    fontWeight:'300',
  },
  generalTitle:{
    alignItems:'center',
    justifyContent:'center'
  },
  
  infoView:{
    width:'80%',
    alignSelf:'center',
    flexDirection:'row', 
    justifyContent:'space-between' ,
    flexWrap: 'wrap',
    flex: 1,
  },
  userInfo:{
    fontSize:14,
    color:"#3C4348",
    fontWeight:'300',
    // width:'50%'
    flexShrink: 1 ,
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  text:{
    alignSelf:'center',

  },
  Description:{
    fontSize:14,
    color:"black",
    fontWeight:'300',
    textAlign:'justify',
    
  }

})