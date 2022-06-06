import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../App'
import { SET_STATUS_ERROR } from '../constants/status-error';

type Props = {
    navigation: any;
}

const handlerTokenExpire = async (navigation : any) => {
    await AsyncStorage.removeItem('accessToken');
    navigation.reset({
        routes: [{name: "AuthStack"}]
      });
}

const handlerException = async (navigation: any, error : any) => {
    console.log("handlerException-DEBUG: ", error);
    await AsyncStorage.removeItem('accessToken');
    navigation.reset({
        routes: [{name: "AuthStack"}]
      });
}

const handlerNetworkIncorrupt = async (error : any) => {  
    console.log("handlerNetworkIncorrupt-DEBUG: ", error);
}

const dispatchError = (statusCode: number, message: string) => {
    return  {
        type: SET_STATUS_ERROR,
        payload: {
            statusCode,
                message
        }
    }

}

const handleStatusError = (error: any) => {
    console.log('======', error)
    if(error && error.hasOwnProperty('response')) {
        const {status} = error.response;
        if(status === 404) {
            store.dispatch(dispatchError(status, '404 Not Found'))
            return Promise.reject(error)
        }else {
            store.dispatch(dispatchError(status, 'Unknown Status code'))
            return Promise.reject(error)
        }
    }

    return Promise.reject(error)
}

export const Helper = {
    handlerTokenExpire,
    handlerException,
    handlerNetworkIncorrupt,
    handleStatusError
}