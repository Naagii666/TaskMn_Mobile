//import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Button,View,TouchableOpacity,Text} from 'react-native'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/Login/LoginScreen'
import Register from '../Containers/Login/Register'
import HomeScreen from '../Containers/Dashboard/HomeScreen'
// import Profile from '../Containers/Dashboard/Profile'
import AddProject from '../Containers/AddProject/AddView'
import MyProjects from '../Containers/Projects/ProjectsView'
import ProjectDetail from '../Containers/Projects/ProjectDetail'
import Profile from '../Containers/Profile/ProfileView'
import EditProfile from '../Containers/Profile/EditProfile'
import WorkProgress from '../Containers/Profile/WorkProgress'
import Workers from '../Containers/Workers/WorkersView'
import WorkerDetail from '../Containers/Workers/WorkerDetail'
import styles from './Styles/NavigationStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import React,{Component} from 'react';
// Manifest of possible screens
// const LaunchScreenStack = createStackNavigator(
//   {
//     //Defination of Navigaton from home screen
//     LaunchScreen: { screen: LaunchScreen },
//   },
//   {
//     //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
//     defaultNavigationOptions: {
//       //Header customization of the perticular Screen
//       headerStyle: {
//         backgroundColor: '#42f44b',
//       },
//       headerTintColor: '#FFFFFF',
//       title: 'LaunchScreen',
//       //Header title
//     },
//   }
// );

var isLoggedIn= false
const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { screen: HomeScreen },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#4285F4',
      },
      headerTintColor: '#FFFFFF',
      title: 'Messenger',
      //Header title
    },
  }
);
const ProfileStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Profile: { screen: Profile },
    
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#4285F4',
      },
      headerTintColor: '#FFFFFF',
      title: 'Профайл',
      //Header title
    },
  }
);

const MyProjectsStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    MyProjects: { screen: MyProjects },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#4285F4',
      },
      headerTintColor: '#FFFFFF',
      title: 'Ажлууд',
      //Header title
    },
  }
);
const AddProjectStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    AddProject: { screen: AddProject },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#4285F4',
      },
      headerTintColor: '#FFFFFF',
      title: 'Ажил оруулах',
      //Header title
    },
  }
);
const WorkersStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Workers: { screen: Workers },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#4285F4',
      },
      headerTintColor: '#FFFFFF',
      title: 'Гүйцэтгэгчид',
      //Header title
    },
  }
);
const WorkerDetailStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    WorkerDetail: { screen: WorkerDetail },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#4285F4',
      },
      headerTintColor: '#FFFFFF',
      title: 'Дэлгэрэнгүй',
      //Header title
    },
  }
);
const Details = createStackNavigator({
  WorkerDetail: {
    screen: WorkerDetail,
    navigationOptions: {
      header: null,
    }
   },
   ProjectDetail: {
    screen: ProjectDetail,
    navigationOptions: {
      header: null,
    }
   },
   EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null,
    }
   },
   WorkProgress: {
    screen: WorkProgress,
    navigationOptions: {
      header: null,
    }
   },
})
const Login = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      header: null,
    }
   },
  ProjectDetail: {
    screen: ProjectDetail,
    navigationOptions: {
      header: null,
    }
   },
    
   LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
   },
   Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    }
   },
},{
  initialRouteName:'LoginScreen'
})

const App = createBottomTabNavigator(
  {
    Messenger: { screen: HomeStack },
    Ажлууд: { screen: MyProjectsStack},
    Захиалах: {screen: AddProjectStack},
    Гүйцэтгэгчид: {screen: WorkersStack},
    Профайл: { screen: ProfileStack },
    // WorkerDetail: { screen: WorkerDetailStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Messenger') {
          iconName = `ios-chatbubbles`;
        } else if (routeName === 'Профайл') {
          iconName = `ios-person`;
        } else if (routeName === 'Захиалах') {
        	iconName = `ios-add-circle`;
        } else if (routeName === 'Ажлууд') {
        	iconName = `ios-briefcase`;
        } else if (routeName === 'Гүйцэтгэгчид') {
          iconName = `ios-people`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#4285F4',
      inactiveTintColor: 'gray',
    },
  }
);
const Drawer = createDrawerNavigator({
  Stack:{screen:Login},
  Stack2:{screen:Details},
  Tabs:{screen:App},
},{
  edgeWidth:0
})
//For React Navigation 2.+ need to export App only
//export default App;
//For React Navigation 3.+
export default createAppContainer(Drawer);
