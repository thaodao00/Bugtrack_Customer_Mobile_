// Import Navigators from React Navigation
import { useState } from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { TextInput } from 'react-native';
import {View, Modal} from 'react-native-ui-lib';
// Import icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Stack = createStackNavigator();

// Import Screen
import AppHomeScreen, { handleSearch } from '../screens/Home/HomeScreen';
// import {handleSearch} from '../screens/Home/HomeScreen';
import SocStack from './Soc/SocStack';
import MavexStack from './Mavex/MavexStack';
import BugTrackStack from './BugTrack/BugTrackStack';
import AccountScreen from '../screens/Home/Account/AccountScreen';

// Import Components 
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
type Props = {
  navigation: any;
}

const HomeStack:React.FC<Props> = ({ navigation}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Stack.Navigator initialRouteName="AppHomeScreen">
      <Stack.Screen
        name="AppHomeScreen"
        options={{
          title: '',
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
        }}>
        {props => <AppHomeScreen {...props}/>}
      </Stack.Screen>
      <Stack.Screen 
        name="SocStack"
        options={{
          headerShown: false,
        }}>
        {props => <SocStack {...props}/>}
      </Stack.Screen>
      <Stack.Screen 
        name="MavexStack"
        options={{
          headerShown: false,
        }}>
        {props => <MavexStack {...props}/>}
      </Stack.Screen>
      <Stack.Screen 
        name="BugTrackStack"
        options={{
          headerShown: false,
        }}>
        {props => <BugTrackStack {...props}/>}
      </Stack.Screen>
      <Stack.Screen 
        name="AccountScreen"
        options={{
          title: 'Account',
          headerStyle: {
            backgroundColor: '#c20a0a', 
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize:20,
        },
        }}>
        {props => <AccountScreen {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


export default HomeStack;