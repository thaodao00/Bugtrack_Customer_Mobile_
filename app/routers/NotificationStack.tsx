// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator<{
  NotificationScreen:any;
  ReviewLoginScreen: any;
}>();
const Drawer = createDrawerNavigator();

// Import Screen
import NotificationScreen from '../screens/Notification/NotificationScreen';

// Import Components 
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import ReviewLoginScreen from '../screens/Notification/ReviewLoginScreen';

type Props = {
  navigation: any;
  route: any
}

const NotificationStack:React.FC<Props> = ({ navigation,  }) => {
  return (
    <Stack.Navigator initialRouteName="NotificationScreen">
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Notification', 
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
     />
      <Stack.Screen
        name="ReviewLoginScreen"
        component={ReviewLoginScreen}
        options={{
          title: 'Review Login',
          headerStyle: {
            backgroundColor: '#c20a0a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}/>
    </Stack.Navigator>
  );
}

export default NotificationStack;