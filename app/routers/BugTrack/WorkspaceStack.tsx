// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator<{
  WorkspaceScreen: any;
  AppScreen: any;
  BugScreen: any;
}>();
const Drawer = createDrawerNavigator();

// Import Screen
import WorkspaceScreen from '../../screens/BugTrack/Workspace/WorkspaceScreen';
import AppScreen from '../../screens/BugTrack/Workspace/AppScreen';
import BugScreen from '../../screens/BugTrack/Workspace/BugScreen';

// Import Components 
import NavigationDrawerHeader from '../../components/NavigationDrawerHeader';

type Props = {
  navigation: any;
  route: any;
}

const WorkspaceStack:React.FC<Props> = ({ navigation, route }) => {

  return (
    <Stack.Navigator initialRouteName="WorkspaceScreen">
      <Stack.Screen
        name="WorkspaceScreen"
        options={{
          title: 'Workspace',
          headerStyle: {
            backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:20,
          },
        }}>
        {props => <WorkspaceScreen {...props} route={route} />}
      </Stack.Screen>
      <Stack.Screen 
            name='AppScreen' 
            component={AppScreen}
            options={{
              headerShown: false,
              title: 'App',
              // headerStyle: {
              //   backgroundColor: '#c20a0a', 
              // },
              // headerTintColor: '#fff',
              // headerTitleStyle: {
              //   fontSize:20,
              // },
            }}/>
      <Stack.Screen 
          name='BugScreen' 
          component={BugScreen}
          options={{
            headerShown: true,
            title: '',
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

export default WorkspaceStack;