// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import Screen
import SocHomeScreen from '../../screens/Soc/Home/HomeScreen';

type Props = {
  navigation: any;
  route: any;
}

const SocStack:React.FC<Props> = ({ navigation, route }) => {

  return (
    <Stack.Navigator initialRouteName="SocHomeScreen">
      <Stack.Screen
          name="SocHomeScreen"
          options={{
          title: 'SOC',
          headerStyle: {
              backgroundColor: '#c20a0a', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontSize:20,
          },
          }}>
          {props => <SocHomeScreen {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );

}

export default SocStack;