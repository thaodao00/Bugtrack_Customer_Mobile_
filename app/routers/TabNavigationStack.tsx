// Import React
import React from 'react';
import {LayoutAnimation, MaskedViewBase, StyleSheet} from 'react-native';
import { View, Image } from 'react-native-ui-lib';

// Import Navigators from React Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { RootStateOrAny, useSelector } from 'react-redux';

// Import Routers Stack
import HomeStack from './HomeStack';
import NotificationStack from './NotificationStack';
// Import Icon

// Import Image
const homeImage = require('../images/home.png');
const bellImage = require('../images/bell.png');

type Props = {
    navigation: any;
}

const Tab = createBottomTabNavigator<{
    HomeStack: any;
    NotificationStack: any;
    NotificationScreen: any;
    ReviewLoginScreen: any;
}>();

const TabNavigatorRoutes:React.FC<Props> = (navigation) => {
    const auth = useSelector((state : RootStateOrAny) => state?.auth);
    let accessToken = auth?.accessToken;
    return (
        <Tab.Navigator initialRouteName='HomeStack' 
            screenOptions={{
                headerShown:false,
                tabBarStyle:{
                    backgroundColor:'#FFFFFF',
                    height: 60
                },
                tabBarIconStyle:{
                    marginTop: 20,
                },
            }}>         
            <Tab.Screen 
            name="HomeStack"
            options={{
                tabBarLabel:"",
                tabBarIcon: ({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                      <Image source={homeImage}
                      resizeMode='contain'
                      style={{width:40,height:40,tintColor:focused?'#c20a0a':'#999999'}}/>
                     
                    </View>
                ) , 
                tabBarActiveTintColor:'#c20a0a',
                headerShown:false}}>
            {props => <HomeStack {...props}/>}
            </Tab.Screen>
            <Tab.Screen
             name="NotificationStack"
             options={{
                tabBarLabel: '',
                tabBarIcon: ({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                      <Image source={bellImage}
                      resizeMode='contain'
                      style={{width:40,height:40,tintColor:focused?'#c20a0a':'#999999'}}/>
                    </View>
                   ) , 
                tabBarActiveTintColor:'#c20a0a',
                }}>
            {props => <NotificationStack {...props}/>}
            </Tab.Screen> 
        </Tab.Navigator>
    );
};

export default TabNavigatorRoutes;
