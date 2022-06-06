// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import Screen
import MavexHomeScreen from '../../screens/Mavex/Home/HomeScreen';

type Props = {
  navigation: any;
  route: any;
}

const MavexStack:React.FC<Props> = ({ navigation, route }) => {

  return (
    <Stack.Navigator initialRouteName="MavexHomeScreen">
      <Stack.Screen
          name="MavexHomeScreen"
          options={{
          title: 'Mavex',
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
              backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontSize:20,
          },
          }}>
          {props => <MavexHomeScreen {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );

}

export default MavexStack;