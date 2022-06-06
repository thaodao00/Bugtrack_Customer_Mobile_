import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text, Button, Image} from 'react-native-ui-lib';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

// Import Loader
import Loader from '../../components/Loader';

// Import Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { genOTP, verifyOTP } from '../../actions/auth';
  
// Import getEnvVars() from env
import getEnvVars from '../../../env';
const { apiUrl } = getEnvVars();

interface VerifyCodeProps {
}
// Length OTP
const CELL_COUNT = 6;
// Limit time resend OTP
const RESEND_OTP_TIME_LIMIT = 30;

const OTPScreen = ({ navigation }: { navigation: any }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const auth = useSelector((state : RootStateOrAny) => state.auth);

    const dispatch = useDispatch();

    const userEmail = auth?.userEmail;

    let resendOtpTimerInterval: any;

    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );

    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };

    const handlerResendOTP = () => {
        //clear input field
        setValue('')
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();

        // resend OTP Api call
        setLoading(true);
        dispatch(genOTP(userEmail));
    }

    const handlerVerifySubmit = () => {
        if (!value) {
            alert('Please Input OTP');
            return;
        }
        if (value.length !== 6 ) {
            alert('Invalid OTP Format');
            return;
        }
        setLoading(true);
        dispatch(verifyOTP(userEmail, value));
    }
    
    useEffect(() => {
        if (auth?.verifyingOTP === true) {
            if (auth?.code === 403 && !auth.attemptVerifyOTP) {
                setLoading(false);
                navigation.replace('AuthStack');
            } else if (auth?.code === 200) {
                setLoading(false);
                navigation.navigate('DrawerNavigationStack');
            }
        }else {
            setLoading(false);
        }
    }, [auth])

    //start timer on screen on launch
    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

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
                <Text style={styles.verifyTitle}>Verification</Text>
                <Text style={styles.verifySubTitle}>You will get a OTP via Email</Text>
            </View>
            <View style={styles.inputContainer}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFiledRoot}
                    // keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoCapitalize='none'
                    renderCell={({index, symbol, isFocused}) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={{width: 200, height: 50}} label="Verify" onPress={() => handlerVerifySubmit()}
                />
            </View>
            <View style={styles.footerContainer}>
                <Text>Didn't Receive OTP?</Text>
            {resendButtonDisabledTime > 0 ? (
                <Text style={styles.resendCodeText}>Resend OTP in {resendButtonDisabledTime} sec</Text>
                ) : (
                    <TouchableOpacity
                        onPress={() => handlerResendOTP()}>
                        <View style={styles.resendCodeContainer}>
                            <Text style={styles.resendCode} > Resend OTP</Text>
                        </View>
                    </TouchableOpacity >
                )
            }
            </View>
        </View>
    )
}


export default OTPScreen;

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
    verifyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5848FF',
        marginBottom: 5,
        
    },
    verifySubTitle: {
        color: '#9c9c9c',
        marginBottom: 5,
    },
    verifyHeader: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#5848FF',
        marginBottom: 20,
    },
    verifyContent: {
        marginBottom: 30,
        alignItems: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    root: {
        padding: 20, 
        minHeight: 300
    },
    title: {
        textAlign: 'center', 
        fontSize: 30
    },
    codeFiledRoot: {
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    cellRoot: {
        width: 45,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#9c9c9c',
        borderBottomWidth: 1,
    },
    cellText: {
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#5848FF',
        borderBottomWidth: 2,
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 100
    },
    footerSubTitle: {
        color: '#5848FF',
        fontWeight: 'bold'
    },
    resendCode: {
        color: '#5848FF',
        fontWeight: 'bold',
    },
    resendCodeText: {
        color: '#5848FF',
        fontWeight: 'bold',
    },
    resendCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})