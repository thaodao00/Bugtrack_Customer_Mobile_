// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Import Screen
import SettingScreen from '../screens/Setting/SettingScreen';
import ManageAccountScreen from '../screens/Setting/Account/ManageAccountScreen';
import SecurityScreen from '../screens/Setting/Account/SecurityLoginScreen';
import PaymentScreen from '../screens/Setting/Payment/PaymentScreen';
import DarkModeScreen from '../screens/Setting/Preference/DarkModeScreen';
import PushNotification from '../screens/Setting/Preference/NotificationScreen';
// Import Components 
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';


type Props = {
  navigation: any;
}

const SettingStack:React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        options={{
          title: 'Settings & privacy',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}
      >
        {props => <SettingScreen {...props}/>}
    </Stack.Screen>
    
    <Stack.Screen
        name="ManageAccountScreen"
        options={{
          title: 'Manage account',
          headerStyle: {
            backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}
      >
        {props => <ManageAccountScreen {...props}/>}
    </Stack.Screen>

    <Stack.Screen
        name="SecurityScreen"
        options={{
          title: 'Security & login',
          headerStyle: {
            backgroundColor: '#c20a0a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}
      >
        {props => <SecurityScreen {...props}/>}
    </Stack.Screen> 
    
    <Stack.Screen
        name="PushNotificationScreen"
        options={{
          title: 'Push Notification',
          headerStyle: {
            backgroundColor: '#c20a0a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}
      >
        {props => <PushNotification {...props}/>}
      </Stack.Screen>

      <Stack.Screen
        name="DarkModeScreen"
        options={{
          title: 'DarkMode',
          headerStyle: {
            backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}
      >
        {props => <DarkModeScreen {...props}/>}
      </Stack.Screen>

      <Stack.Screen
        name="PaymentScreen"
        options={{
          title: 'Payments & subscriptions',
          headerStyle: {
            backgroundColor: '#c20a0a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}
      >
        {props => <PaymentScreen {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default SettingStack;