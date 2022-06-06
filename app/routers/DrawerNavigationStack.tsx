// Import React
import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

// Import Navigators from React Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Routers Stack
import TabNavigationStack from './TabNavigationStack';
import SettingStack from './SettingStack';
import SocStack from './Soc/SocStack';
import MavexStack from './Mavex/MavexStack';
import BugTrackStack from './BugTrack/BugTrackStack';
// Import Components 
import CustomSidebarMenu from '../components/CustomSidebarMenu';

// Import AsyncStorage 
import { getAuthAsyncStorage } from "../services/getAuthAsyncStorage";

import axiosInstance from '../helpers/axios';

type Props = {
  props: any;
}

const Drawer = createDrawerNavigator();
const DrawerNavigatorRoutes:React.FC = (props: any) => {
  const auth = useSelector((state : RootStateOrAny) => state?.auth);
  const accessToken = auth?.accessToken

  useEffect(() => {
    if (!auth?.accessToken) {
      props.navigation.reset({
        routes: [{name: "AuthStack"}]
      });
    } else {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${auth?.accessToken}`;
    }
  }, [auth])

  
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: true}}
          drawerContent={CustomSidebarMenu}
         >
        <Drawer.Screen 
          name="TabNavigationStack" 
          options={{
            drawerLabel: 'Home',
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'#c20a0a',
            drawerLabelStyle:{
              fontSize:16,
            },
            headerShown: false}}>
          {props => <TabNavigationStack {...props}/>}
        </Drawer.Screen>
        {/* <Drawer.Screen
          name="SocStack"
          options={{
            drawerLabel: 'SOC',
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'#c20a0a',
            drawerLabelStyle:{
              fontSize:16,
            },
            headerShown: false}}>
          {props => <SocStack {...props} accessToken={accessToken}/>}
        </Drawer.Screen>
        <Drawer.Screen
          name="MavexStack"
          options={{
            drawerLabel: 'Mavex',
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'#c20a0a',
            drawerLabelStyle:{
              fontSize:16,
            },
            headerShown: false}}>
          {props => <MavexStack {...props} accessToken={accessToken}/>}
        </Drawer.Screen>
        <Drawer.Screen
          name="BugTrackStack"
          options={{
            drawerLabel: 'BugTrack',
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'#c20a0a',
            drawerLabelStyle:{
              fontSize:16,
            },
            headerShown: false}}>
          {props => <BugTrackStack {...props} accessToken={accessToken}/>}
        </Drawer.Screen> */}

        <Drawer.Screen 
          name="SettingStack" 
          options={{
          drawerLabel: 'Settings & privacy',
          drawerActiveTintColor:'#fff',
          drawerActiveBackgroundColor:'#c20a0a',
          drawerLabelStyle:{
            fontSize:16,
          },
          headerShown: false}}>
          {props => <SettingStack {...props}/>}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  };
  
export default DrawerNavigatorRoutes;