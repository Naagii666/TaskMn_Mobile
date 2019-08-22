import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { 
  	screen: LaunchScreen,
  	navigationOptions: {
      header: null,
    }
  },
  Login:{
  	screen: LoginScreen,
  	navigationOptions: {
      header: null,
    }
  }
},
Dashboard:{
	screen: LoginScreen,
}
{
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
