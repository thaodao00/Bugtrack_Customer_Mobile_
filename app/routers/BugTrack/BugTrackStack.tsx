// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import Screen
import BugTrackHomeScreen from '../../screens/BugTrack/Home/HomeScreen';
import WorkspaceStack from './WorkspaceStack';

type Props = {
  navigation: any;
  route: any;
}

const BugTrackStack:React.FC<Props> = ({ navigation, route }) => {

  return (
    <Stack.Navigator initialRouteName="BugTrackHomeScreen">
      <Stack.Screen
          name="BugTrackHomeScreen"
          options={{
          title: 'BugTrack',
          headerStyle: {
              backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontSize:20,
          },
          }}>
          {props => <BugTrackHomeScreen {...props}/>}
      </Stack.Screen>
      <Stack.Screen 
        name="WorkspaceStack"
        options={{
          headerShown: false,
        }}>
        {props=> <WorkspaceStack {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

}

export default BugTrackStack;