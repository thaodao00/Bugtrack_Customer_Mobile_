// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import Screen
import LoginScreen from '../screens/Auth/LoginScreen';
import OTPScreen from '../screens/Auth/OTPScreen';

const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
          title: 'Login',
          headerShown: false
          }} />
        <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#5848FF', 
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize:20,
                },
            }}
            />
      </Stack.Navigator>
    );
}

export default AuthStack;