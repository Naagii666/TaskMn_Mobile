import { Platform } from 'react-native';
import { createMaterialTopTabNavigator , Header } from 'react-navigation';

// import MessagesScreen from 'src/screens/MessagesScreen';
import MessagesScreen from '../Containers/Messenger/MessagesScreen'
import ActiveScreen from '../Containers/Messenger/MessengerView'
// import ActiveScreen from 'src/screens/ActiveScreen';

export const TopNavigation = createMaterialTopTabNavigator(
    {
        MessagesScreen: {
            screen: MessagesScreen,
            navigationOptions: { header: null, title: 'Чат' }
        },
  
        ActiveScreen: {
            screen: ActiveScreen,
            navigationOptions: { header: null, title: 'Харилцагчид' }
        },
    },
    {
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#FFF',
            pressColor: '#FFF',
            height:300,
            labelStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 14 : 15,
                // fontFamily: AppStyles.fonts.FONT_MEDIUM
            },
            tabStyle: {
                height: Header.HEIGHT,
            },
            indicatorStyle: {
                backgroundColor: '#FFF'
            },
            style: {
                backgroundColor: '#4285F4'
            }
        }
    }
  );