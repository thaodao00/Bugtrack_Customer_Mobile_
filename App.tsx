import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Redux
import { Provider } from 'react-redux';
import configStore, {persistor} from './app/reducers';

// Import Screen
import SplashScreen from './app/screens/SplashScreen';

// Import Routers Stack
import AuthStack from './app/routers/AuthStack';
import DrawerNavigationStack from './app/routers/DrawerNavigationStack';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();
export const store = configStore;

const App = () => {
  return (
    <Provider store={configStore}>
      <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="AuthStack" component={AuthStack}
            options={{
              title: 'AuthStack',
              headerShown: false
            }}
          />
          <Stack.Screen name="DrawerNavigationStack" component={DrawerNavigationStack} 
            options={{
              title: 'DrawerNavigationStack',
              headerShown: false          
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  ) 
}

export default App;