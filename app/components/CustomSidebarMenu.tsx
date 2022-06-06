// Import React and Component
import React, { useEffect, useState } from 'react';
import {View, Text, Alert, StyleSheet,TouchableOpacity} from 'react-native';
import { Image } from 'react-native-ui-lib';
// Import Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

// import user storage
import userStorage from '../services/getUserAsyncStorage';

const CustomSidebarMenu = ( props: any ) => {

  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<any | null>(null);
  const auth = useSelector((state : RootStateOrAny) => state?.auth);
  const loadUserAvatar = userStorage.userAvatar().then(value => setAvatar(value));

  let userName = auth?.userName || '';
  
  const handlerLogout = () => {
   // AsyncStorage.clear();
    dispatch(logout());
  }

  return (
    <View style={styles.sideMenuContainer}>
      <TouchableOpacity onPress={() => props.navigation.navigate('AccountScreen')}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderPicCircle}>
          {
            avatar
            ?
            <Image source={{ uri: avatar }} style={styles.imgAvatar} />
            :
            <Text style={styles.profileUserName}>
              {userName.charAt(0)}
            </Text>
          }
          </View>
          <Text style={styles.profileHeaderText}>{userName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) =>
          <View style ={{flex:1, alignItems:'center',flexDirection:'row'}}>

            <Text style={{color: '#c20a0a',fontSize: 16,marginRight:5}}>
              Logout
            </Text>
            <MaterialIcons name="login" color="#c20a0a" size={25} />
          </View> 
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {handlerLogout()},
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    // backgroundColor: '#e9c766',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: '#fff',
    backgroundColor: '#c20a0a',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 17,
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#c20a0a',
    marginTop: 15,
  },
  profileUserName: {
    fontSize: 25,
    color: '#fff'
  },
  imgAvatar:{
    borderRadius: 65 / 2,
    height:65,
    width: 65,
  },
});