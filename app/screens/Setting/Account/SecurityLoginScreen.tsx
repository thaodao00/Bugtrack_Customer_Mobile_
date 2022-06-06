import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, Image, Card, Button, TouchableOpacity } from 'react-native-ui-lib';
import * as LocalAuthentication from 'expo-local-authentication';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import getUserStorage from '../../../services/getUserAsyncStorage';

const Stack = createStackNavigator();

type Props = {
    navigation: any;
}

const BodyScreen: React.FC<Props> = ({ navigation }) => {
    const [isDeviceCompatible, setDeviceIsCompatible] = useState<any | null>(null);
    const [biometricStatus, setBiometricStatus] = useState<any | null>(null);
    const [btnBiometric, setBtnBiometric] = useState(true); //Default show btn Enable
    const [labelBiometricStatus, setLabelBiometricStatus] = useState('Not Set');
    const loadBiometricStatus = getUserStorage.userBiometricStatus().then(status => setBiometricStatus(status));

    useEffect(() => {
        (async () => {
            const deviceCompatible = await LocalAuthentication.hasHardwareAsync();
            if (deviceCompatible == true) {
                setDeviceIsCompatible(true);
            } else {
                setDeviceIsCompatible(false);
            }
        })();
        if (biometricStatus == null) {
            setBtnBiometric(true);
        } else if (biometricStatus === 'true') {
            setBtnBiometric(false);
            setLabelBiometricStatus('Enable');
        } else {
            setBtnBiometric(true);
            setLabelBiometricStatus('Disable');
        }
      },[biometricStatus]);
    
    const handlerAuthBiometric = async (option : any) => {
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (option === 'enable') {
            if (!isEnrolled) {
                Alert.alert(
                'Error',
                'No Faces / Fingers found. Please set up your Faces / Fingers first.',
                [
                    {
                    text: 'OK',
                    },
                ],
                {cancelable: false},
                )
            } else {
                const isAuth = await LocalAuthentication.authenticateAsync();
                if (isAuth.success === true) {
                    AsyncStorage.setItem('userBiometricStatus', 'true');
                    setBiometricStatus('true');
                    Alert.alert('Biometric Authenticated', 'Enable Success.!');
                }
            }
        } else {
            if (!isEnrolled) {
                Alert.alert(
                'Error',
                'No Faces / Fingers found. Please set up your Faces / Fingers first.',
                [
                    {
                    text: 'OK',
                    },
                ],
                {cancelable: false},
                )
            } else {
                const isAuth = await LocalAuthentication.authenticateAsync();
                if (isAuth.success === true) {
                    AsyncStorage.setItem('userBiometricStatus', 'false');
                    setBiometricStatus('false');
                    Alert.alert('Biometric Authenticated', 'Disable Success.!');
                }
            }
        }
    };

    // console.log("=================BioStatus", biometricStatus);
    // console.log("=================btnBioStatus", btnBiometric);
    // console.log("=================isDeviceCompatible", isDeviceCompatible);
    return (
        <View style={styles.container}>
            <Card style={{ margin: 15 }}>
                <View padding-20>
                    <Text text50 $textDefault>
                        Biometric Authentication
                    </Text>
                    <Text text80 $textDefault>
                        Enabling Biometric enhances the security of your application.
                    </Text>
                    <View row>
                        <Text text90 >
                            Check:
                        </Text>
                        <Text text90 $textDefault> {isDeviceCompatible ? 'Device is compatible' : 'Device is not compatible'}</Text>
                    </View>
                    <View row>
                        <Text text90 >
                            Status:
                        </Text>
                        <Text text90 $textDefault> {labelBiometricStatus} </Text>
                    </View>
                    <View>
                        <View row right>
                            {
                                isDeviceCompatible
                                ?
                                    btnBiometric
                                    ?
                                    <Button style={{ marginRight: 10 }} text90 link label="Enable" onPress={() => handlerAuthBiometric('enable')} />
                                    :
                                    <Button text90 link label="Disable" onPress={() => handlerAuthBiometric('disable')} />
                                :
                                <Button text90 link label="Not Support" />
                            }
                        </View>
                    </View>
                </View>
            </Card>
            <Card style={{ margin: 15 }}>
                <View padding-20>
                    <Text text50 $textDefault>
                        Where You're Logged In
                    </Text>
                    <Text text80 $textDefault>
                        Information of devices you have logged in.
                    </Text>
                </View>
            </Card>
            <Card style={{ margin: 15 }}>
                <View padding-20>
                    <Text text50 $textDefault>
                        Login Abnormality
                    </Text>
                    <Text text80 $textDefault>
                        Information about unusual logins on your account.
                    </Text>
                    <View row>
                        <Text text90 >
                            IP Address:
                        </Text>
                        <Text text90 $textDefault> 127.0.0.1</Text>
                    </View>
                    <View row>
                        <Text text90 >
                            Login At:
                        </Text>
                        <Text text90 $textDefault> 0:0:0</Text>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const SecurityScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Security" options={{ headerShown: false }}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default SecurityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
})