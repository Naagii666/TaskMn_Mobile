//import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../Containers/Dashboard/HomeScreen'
import Profile from '../Containers/Dashboard/Profile'
import AddProject from '../Containers/Dashboard/AddProject'
import MyProjects from '../Containers/Dashboard/MyProjects'
import styles from './Styles/NavigationStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
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

var isLoggedIn: false
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
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Нүүр',
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
        backgroundColor: '#42f44b',
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
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Миний төслүүд',
      //Header title
    },
  }
);
const AddProjectSrack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    AddProject: { screen: AddProject },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Төсөл нэмэх',
      //Header title
    },
  }
);
const Login = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
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
})
const App = createBottomTabNavigator(
  {
    Нүүр: { screen: HomeStack },
    Нэмэх: {screen: AddProjectSrack},
    Төслүүд: { screen: MyProjectsStack },
    Профайл: { screen: ProfileStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Нүүр') {
          iconName = `ios-home`;
        } else if (routeName === 'Профайл') {
          iconName = `ios-contact`;
        } else if (routeName === 'Нэмэх') {
        	iconName = `ios-add-circle`;
        } else if (routeName === 'Төслүүд') {
        	iconName = `ios-briefcase`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  }
);
//For React Navigation 2.+ need to export App only
//export default App;
//For React Navigation 3.+
export default createAppContainer(isLoggedIn?App:Login);
