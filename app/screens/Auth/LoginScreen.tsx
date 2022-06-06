import React, { useEffect, useState } from 'react';
import {TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {View, Text, Button, Image, Checkbox, Icon} from 'react-native-ui-lib';

// Import Loader
import Loader from '../../components/Loader';

// Import Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { genOTP } from '../../actions/auth';

// Import Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons' // https://fonts.google.com/icons?selected=Material+Icons&icon.query=mail

import * as LocalAuthentication from 'expo-local-authentication';
import getUserStorage from '../../services/getUserAsyncStorage';

// Import ENV
import getEnvVars from '../../../env';
const { apiUrl } = getEnvVars();

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [userEmail, setUserEmail] = useState<any | null>('');
    const [isCheckBoxTerm, setCheckBoxTerm] = useState(true);
    const [loading, setLoading] = useState(false);
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]{2,}\.)+[a-zA-Z]{2,}))$/;

    const auth = useSelector((state : RootStateOrAny) => state.auth);
    const { errorMessageLogin } = auth;
    const dispatch = useDispatch();

    const handlerLoginSubmit = () => {
        if (!userEmail) {
            alert('Please Input Your Email');
            return;
        }
        if (regex.test(userEmail) === false) {
            alert('Invalid Email Format');
            return;
        }
        setLoading(true);
        dispatch(genOTP(userEmail));
    }

    useEffect(() => {
        if(auth?.code === 200 && auth?.genningOTP === true) {
            setLoading(false);
            navigation.navigate('OTPScreen');
        } else {
            setLoading(false);
        }
    }, [auth])
    
    // working with biometric authentication
    const [isDeviceCompatible, setDeviceIsCompatible] = useState<any | null>(null);
    const [biometricStatus, setBiometricStatus] = useState<any | null>(null);
    const loadBiometricStatus = getUserStorage.userBiometricStatus().then(status => setBiometricStatus(status));

    useEffect(() => {
        (async () => {
            const deviceCompatible = await LocalAuthentication.hasHardwareAsync();
            if (deviceCompatible == true) {
                setDeviceIsCompatible(true);
            } else {
                setDeviceIsCompatible(false);
            }
            if (biometricStatus === 'true') {
                if (auth?.accessToken) {
                    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    
                    if (!isEnrolled) {
                        throw new Error('No Faces / Fingers found.')
                    } else {
                        const isAuth = await LocalAuthentication.authenticateAsync();
                        if (isAuth.success === true) {
                            navigation.navigate('DrawerNavigationStack');
                        }
                    }
                } else {
                    Alert.alert(
                        'Info',
                        'Please Login Your App First.!',
                        [
                            {
                            text: 'OK',
                            },
                        ],
                        {cancelable: false},
                    )
                }
            }
        })();
    },[biometricStatus]);

    const handlerAuthBiometric = async () => {
        if (biometricStatus == null) {
            Alert.alert(
                'Info',
                'Please Enable in Settings & privacy > Security & login > Biometric Authentication',
                [
                    {
                    text: 'OK',
                    },
                ],
                {cancelable: false},
            )
        } else if (biometricStatus === 'true') {
            if (auth?.accessToken) {
                const isEnrolled = await LocalAuthentication.isEnrolledAsync();

                if (!isEnrolled) {
                    throw new Error('No Faces / Fingers found.')
                } else {
                    const isAuth = await LocalAuthentication.authenticateAsync();
                    if (isAuth.success === true) {
                        navigation.navigate('DrawerNavigationStack');
                    }
                }
            } else {
                Alert.alert(
                    'Info',
                    'Please Login Your App First.!',
                    [
                        {
                        text: 'OK',
                        },
                    ],
                    {cancelable: false},
                )
            }
        } else {
            Alert.alert(
                'Info',
                'Please Enable in Settings & privacy > Security & login > Biometric Authentication',
                [
                    {
                    text: 'OK',
                    },
                ],
                {cancelable: false},
            )
        }
    }

    // console.log("=================BioStatus", biometricStatus);
    // console.log("=================isDeviceCompatible", isDeviceCompatible);
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={styles.logo}>
                <Image
                source={require('../../images/bugtrack_logo.png')}
                style={{width: 150, height: 150, resizeMode: 'contain'}}
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.loginTitle}>Welcome to HPT Bugtrack!</Text>
                <Text style={styles.loginSubTitle}>Enter your email to continue</Text>
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={28} color="#5848FF" />
                <View style={styles.verticleLine}></View>
                <TextInput
                    style={styles.emailInputText}
                    placeholder="Email"
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCompleteType='email'
                    // autoFocus={true}
                    autoCapitalize='none'
                    onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                />
            </View>

            <View style={styles.buttonContainer}>
                {
                    isCheckBoxTerm ? (
                        <Button style={{width: 200, height: 50}} label="Login" onPress={() => handlerLoginSubmit()}/>
                    ) : (
                        <Button style={{width: 200, height: 50}} label="Login" disabled={true} onPress={() => handlerLoginSubmit()}/>
                    )
                }
            </View>
            <View style={styles.footerContainer}>
                <Checkbox style={styles.checkbox} value={isCheckBoxTerm} onValueChange={setCheckBoxTerm}/>
                <Text>I accept the <Text style={styles.footerSubTitle}>Terms and Conditions</Text></Text>
            </View>

            <View style={styles.touchId}>
                {
                    isDeviceCompatible
                    ?
                    <TouchableOpacity onPress={() => handlerAuthBiometric()}>
                        <Icon source={require("../../images/fingerprint.png")} style={styles.touchIdIcon} tintColor='#5848FF' />
                     </TouchableOpacity>
                    :
                    <Icon source={require("../../images/fingerprint.png")} style={styles.touchIdIcon} tintColor='#9c9c9c' />
                }            
            </View>
        </View>
    )
}


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo : {
        alignItems : 'center',
    },
    headerContainer: {
        marginBottom: 20,
        marginLeft: 40,
    },
    loginTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5848FF',
        marginBottom: 5,
        
    },
    loginSubTitle: {
        color: '#9c9c9c',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35,
        minWidth: 270,
        marginBottom: 50,
    },
    verticleLine: {
        height: '70%',
        width: 1,
        backgroundColor: '#5848FF',
        marginLeft: 10,
        marginRight: 10,
    },
    emailInputText: {
        width: 220,
        fontSize: 18,
        paddingBottom: 3,
        borderBottomColor: '#5848FF',
        borderBottomWidth: 1.5,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    signUpButton: {
        width: 200,
        height: 50,
        marginTop: 20,
        marginBottom: 100,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#5848FF',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    footerSubTitle: {
        color: '#5848FF',
        fontWeight: 'bold'
    },
    checkbox : {
        marginRight: 10
    },
    touchId: {
        marginTop: 10,
        alignItems: "center",
    },
    touchIdIcon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    finger: {
        backgroundColor: "#666666",
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: "#F4AE64",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop:15
      },
})

