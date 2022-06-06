import React, { useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import {StyleSheet} from 'react-native';
import {View, Image, ProgressBar, Colors} from 'react-native-ui-lib';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import * as LocalAuthentication from 'expo-local-authentication';
import getUserStorage from '../services/getUserAsyncStorage';

type Props = {
  navigation: any;
}
const SplashScreen: React.FC<Props> = ({navigation}) => {
    const auth = useSelector((state : RootStateOrAny) => state.auth);
    const accessToken = auth?.accessToken;
    const [biometricStatus, setBiometricStatus] = useState<any | null>(null);
    const loadBiometricStatus = getUserStorage.userBiometricStatus().then(status => setBiometricStatus(status));
    
    useEffect(() => {
        (async () => {
          if (biometricStatus === 'true') {
            if (accessToken) {
              setTimeout(() => {
                navigation.navigate('AuthStack');
              }, 2000);
            }
          } else {
            setTimeout(() => {
              navigation.replace(accessToken ? 'DrawerNavigationStack' : 'AuthStack' );
            }, 2000);
          }
        })();
      },[biometricStatus]);
    return (
        <View style={styles.container}>
          <View style={styles.layer}>
            <View style={styles.logo}>
              <Image
                source={require('../images/bugtrack_logo.png')}
                style={{width: 300, height: 150, resizeMode: 'contain'}}
              />
               {/* <ProgressBar style={styles.processBar} progress={progresses} progressColor={Colors.red30}/> */}
            </View>
          </View>
          <View style={styles.companyLogo}>
              <Image
                source={require('../images/hpt_logo.png')}
                style={{width: 72, height: 40, resizeMode: 'contain'}}
              />
          </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  layer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
  },
  processBar: {
    marginTop: 20
  },
  companyLogo:{
    alignItems: 'center',
    marginBottom: 50,
  }
});