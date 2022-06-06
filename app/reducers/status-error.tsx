import {
    STATUS_ERROR,
    SET_STATUS_ERROR,
  } from '../constants/status-error';
  
  const INITIAL_STATE = {
    statusCode: 0,
    message: ''
  };
  
  export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
      case STATUS_ERROR: {
        return state
      }

      case SET_STATUS_ERROR: {
        const {payload} = action;
        return {
            ...state, ...payload
        }
      }
  
      default:
        return state;
    }
  }