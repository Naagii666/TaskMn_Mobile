import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import { TopNavigation } from './TopNavigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/Login/LoginScreen'
import Register from '../Containers/Login/Register'
import Search from '../Containers/Search/SearchView'
import WorkDetail from '../Containers/Search/WorkDetail'
import WorkerDetail from '../Containers/Search/WorkerDetail'
import BidProject from '../Containers/Search/BidProject'
import Profile from '../Containers/Profile/ProfileView'
import Comments from '../Containers/Profile/Comments'
import AddComment from '../Containers/Profile/AddComment'
import EditProfile from '../Containers/Profile/EditProfile'
import Account from '../Containers/Profile/Account'
import ChangePass from '../Containers/Profile/ChangePass'
import EditSkills from '../Containers/Profile/EditSkills'
import Projects from '../Containers/Projects/ProjectsView'
import MileStone from '../Containers/Projects/MileStone'
import FinishedProject from '../Containers/Projects/FinishedProject'

import RecieveBids from '../Containers/Projects/RecieveBids'
import SentBids from '../Containers/Projects/SentBids'
import ProjectDetail from '../Containers/Projects/ProjectDetail'
import ChooseBid from '../Containers/Projects/ChooseBid'
import PendingProject from '../Containers/Projects/PendingProject'
import inProgress from '../Containers/Projects/inProgress'
import Contract from '../Containers/Projects/Contract'
import InProgressUser from '../Containers/Projects/InProgressUser'

import Chat from '../Containers/Messenger/Chat'
import Messenger from '../Containers/Messenger/MessengerView'
// import MessagesScreen from '../Containers/Messenger/MessagesScreen'
import AddProject from '../Containers/AddProject/AddView'
import NewProject from '../Containers/AddProject/NewProject'
import styles from './Styles/NavigationStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'; 

import {StyleSheet, Text, View,Button} from 'react-native'; 
const TabNavigator = createMaterialBottomTabNavigator(  
  {  
      Messenger: { 
          // screen: Messenger,  
          screen: TopNavigation, 
          navigationOptions:{  
              tabBarLabel:'Чат',
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-chatbubbles'}/>  
                  </View>),  
          } 
      },  
      
      Projects: { screen: Projects,  
          navigationOptions:{  
              tabBarLabel:'Ажлууд',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-briefcase'}/>  
                  </View>),  
              activeColor: '#0078FF',  
              inactiveColor: '#4285F4',  
              barStyle: { backgroundColor: '#FFF' },  
              headerTitle:'aaaaaa'
          }  
      },  
      AddProject: {  
          screen: AddProject,  
          navigationOptions:{  
              tabBarLabel:'Ажил нэмэх',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-add-circle'}/>  
                  </View>),
                  activeColor: '#0078FF',  
                  inactiveColor: '#4285F4',  
                  barStyle: { backgroundColor: '#FFF' },    
          }  
      }, 
      Search: { screen: Search,  
        navigationOptions:{  
            tabBarLabel:'Ажил хайх',  
            tabBarIcon: ({ tintColor }) => (  
                <View>  
                    <Icon style={[{color: tintColor}]} size={25} name={'md-search'}/>  
                </View>),  
            activeColor: '#0078FF',  
            inactiveColor: '#4285F4',  
            barStyle: { backgroundColor: '#FFF' },  
        }  
    },   
      Profile: { screen: Profile,  
        navigationOptions:{  
            tabBarLabel:'Профайл',  
            tabBarIcon: ({ tintColor }) => (  
                <View>  
                    <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
                </View>),  
            activeColor: '#0078FF',  
            inactiveColor: '#4285F4',  
            barStyle: { backgroundColor: '#FFF' },  
        }  
    },  
  },  
  {  
    initialRouteName: "Messenger",  
    activeColor: '#0078FF',  
    inactiveColor: '#4285F4',  
    barStyle: { backgroundColor: '#FFF' },  
  },  
);  

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
  },
  ProjectDetail:{
    screen: ProjectDetail,
    navigationOptions: {
      header: null,
    }
  },
  ChooseBid:{
    screen: ChooseBid,
    navigationOptions: {
      header: null,
    }
  },
  NewProject:{
    screen: NewProject,
    navigationOptions: {
      header: null,
    }
  },
  WorkDetail:{
    screen: WorkDetail,
    navigationOptions: {
      header: null,
    }
  },
  BidProject:{
    screen: BidProject,
    navigationOptions: {
      header: null,
    }
  },
  WorkerDetail: {
    screen: WorkerDetail,
    navigationOptions: {
      header: null,
    }
  },
  // MessagesScreen: {
  //   screen: MessagesScreen,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  Account:{
    screen: Account,
    navigationOptions: {
      header: null,
    }
  },
  ChangePass:{
    screen: ChangePass,
    navigationOptions: {
      header: null,
    }
  },
  EditSkills:{
    screen: EditSkills,
    navigationOptions: {
      header: null,
    }
  },
  EditProfile:{
    screen: EditProfile,
    navigationOptions: {
      header: null,
    }
  },
  Comments:{
    screen: Comments,
    navigationOptions: {
      header: null,
    }
  },
  Chat:{
    screen: Chat,
    navigationOptions: {
      header: null,
    }
  },
  AddComment:{
    screen: AddComment,
    navigationOptions: {
      header: null,
    }
  },
  PendingProject:{
    screen: PendingProject,
    navigationOptions: {
      header: null,
    }
  },
  inProgress:{
    screen: inProgress,
    navigationOptions: {
      header: null,
    }
  },
  FinishedProject:{
    screen: FinishedProject,
    navigationOptions: {
      header: null,
    }
  },
  InProgressUser:{
    screen: InProgressUser,
    navigationOptions: {
      header: null,
    }
  },
  Contract:{
    screen: Contract,
    navigationOptions: {
      header: null,
    }
  },
  RecieveBids:{
    screen: RecieveBids,
    navigationOptions: {
      header: null,
    }
  },
  SentBids:{
    screen: SentBids,
    navigationOptions: {
      header: null,
    }
  },
  MileStone:{
    screen: MileStone,
    navigationOptions: {
      header: null,
    }
  },
  Register:{
    screen: Register,
    navigationOptions: {
      header: null,
    }
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const Drawer = createDrawerNavigator({
  Stack:{screen:PrimaryNav},
  Tabs:{screen:TabNavigator},
},{
  edgeWidth:0
})

export default createAppContainer(Drawer)
