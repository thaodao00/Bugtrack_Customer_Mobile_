import {
    AUTH_ERR_LOG_IN,
    AUTH_ERR_LOG_OUT,
    AUTH_GENNED_OTP,
    AUTH_GENNING_OTP,
    AUTH_VERIFIED_OTP,
    AUTH_VERIFYING_OTP,
    AUTH_ATTEMPT_VERIFY_OTP,
    AUTH_LOGGING_OUT,
    AUTH_LOGOUT,
  } from '../constants/auth';
  
  const INITIAL_STATE = {
    code: 0,
    attemptVerifyOTP: 0,
    message: null,
    status: null,
    userEmail: null,
    userName: null,
    accessToken: null,
    genningOTP: false,
    verifyingOTP: false,
    loggingOut: false,
    errorMessageLogin: null,
    errorMessageLogout: null,
  };
  
  export default function (state = INITIAL_STATE, action : any) {
    switch (action.type) {
      case AUTH_LOGOUT: {
        return {
          ...INITIAL_STATE,
        };
      }
  
      case AUTH_GENNING_OTP: {
        return {
          ...state,
          errorMessageLogin: action.payload ? null : state.errorMessageLogin,
          errorMessageLogout: null,
          genningOTP: action.payload,
        };
      }

      case AUTH_GENNED_OTP: {
        let {code, message, status, userEmail} = action.payload;
        return {
          ...state,
          code,
          message,
          status,
          userEmail
        };
      }

      case AUTH_VERIFYING_OTP: {
        return {
          ...state,
          errorMessageLogin: action.payload ? null : state.errorMessageLogin,
          errorMessageLogout: null,
          verifyingOTP: action.payload,
        };
      }

      case AUTH_VERIFIED_OTP: {
        let {code, message, status, accessToken, userName} = action.payload;
        return {
          ...state,
          code,
          message,
          status,
          accessToken,
          userName
        };
      }

      case AUTH_ATTEMPT_VERIFY_OTP: {
        let {code, message, status, attempt} = action.payload;
        return {
          ...state,
          code,
          message,
          status,
          attemptVerifyOTP: attempt,
        };
      }
      
      case AUTH_LOGGING_OUT: {
        return {
          ...state,
          errorMessageLogout: action.payload ? null : state.errorMessageLogout,
          loggingOut: action.payload,
        };
      }

      case AUTH_ERR_LOG_IN: {
        return {
          ...state,
          loggingIn: false,
          errorMessageLogin: action.payload,
        };
      }
  
      case AUTH_ERR_LOG_OUT: {
        return {
          ...state,
          loggingOut: false,
          errorMessageLogout: action.payload,
        };
      }
  
      default:
        return state;
    }
  }