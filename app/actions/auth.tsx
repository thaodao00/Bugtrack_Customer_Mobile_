import { Alert, Linking } from "react-native";
import {
    AUTH_ERR_LOG_IN,
    AUTH_ERR_LOG_OUT,
    AUTH_GENNED_OTP,
    AUTH_GENNING_OTP,
    AUTH_VERIFIED_OTP,
    AUTH_VERIFYING_OTP,
    AUTH_ATTEMPT_VERIFY_OTP,
    AUTH_LOGGING_OUT,
    AUTH_LOGOUT
  } from "../constants/auth";

import {authService} from "../services/authService";
  
  export const genningOTP = (genningOTP : any) => ({
    type: AUTH_GENNING_OTP,
    payload: genningOTP
  });
  
  export const gennedOTP = (data : any, userEmail : any) => ({
    type: AUTH_GENNED_OTP,
    payload: { ...data, userEmail },
  });
  
  export const errorLogIn = (errorMessage : any) => ({
    type: AUTH_ERR_LOG_IN,
    payload: errorMessage,
  });
  
  export const genOTP = (userEmail : any) => (dispatch : any) => {
    authService.genOTP(userEmail).then(async (res : any) => {
      if (res.data.status === 'Success') {
        dispatch(genningOTP(true));
        await dispatch(gennedOTP(res.data, userEmail));
      } else {
        await dispatch(gennedOTP(res.data, userEmail));
        if (res.data.message.includes("https://")) {
          var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
          let url = res.data.message.match(urlRegex)[0];
          Alert.alert('Error', res.data.message,[
            {
              text: 'Open Browser',
              onPress: () => {
                Linking.openURL(url);
              }
            },
            {
              text: 'Cancel',
            }
          ])
        } else {
          Alert.alert('Error', res.data.message);
        }
      }  
    }).catch((err) => {
      dispatch(errorLogIn('Oops!!Something wrong. Please try again.'));
    }).finally(() => {
      dispatch(genningOTP(false));
    });
  };
    
  export const verifyingOTP = (verifyingOTP : any) => ({
    type: AUTH_VERIFYING_OTP,
    payload: verifyingOTP
  });
  
  export const verifiedOTP = (data : any) => ({
    type: AUTH_VERIFIED_OTP,
    payload: data,
  });


  export const attemptVerifyOTP = (data : any) => ({
    type: AUTH_ATTEMPT_VERIFY_OTP,
    payload: data,
  });

  export const verifyOTP = (userEmail : any, otp: any) => (dispatch : any) => {
    authService.verifyOTP(userEmail, otp).then(async (res : any) => {
      if (res.data.status === 'Success') {
        dispatch(verifyingOTP(true));
        await dispatch(verifiedOTP(res.data));
      } else {
        if (res.data.code === 403) {
          await dispatch(attemptVerifyOTP(res.data));
          dispatch(verifyingOTP(true));
          if (res.data.attempt) {
            Alert.alert('Error', res.data.message + ' ' + res.data.attempt + ' time');
          } else {
            Alert.alert('Error', res.data.message);
          }
        } else {
          Alert.alert('Error', res.data.message);
        }
      }
    }).catch((err) => {
      dispatch(errorLogIn('Oops!!Something wrong. Please try again.'));
    }).finally(() => {
      dispatch(verifyingOTP(false));
    });
  };

  export const loggedOut = () => ({
    type: AUTH_LOGOUT,
  });
  
  export const loggingOut = (lOut : any) => ({
    type: AUTH_LOGGING_OUT,
    payload: lOut,
  });
  
  export const errorLogOut = (errorMessage : any) => ({
    type: AUTH_ERR_LOG_OUT,
    payload: errorMessage,
  });
  
  export const logout = () => async (dispatch : any, getState : any) => {
    await authService.logout(getState).then((res : any) => {
      if (res.data.status === 'Success') {
        dispatch(loggingOut(true));
        dispatch(loggedOut());
      } else {
        Alert.alert('Error', res.data.message);
      }
    }).catch((err : any) => {
      console.log(err)
      dispatch(errorLogOut('Error logging out.'));
    }).finally(() => {
      dispatch(loggingOut(false));
    });
  };