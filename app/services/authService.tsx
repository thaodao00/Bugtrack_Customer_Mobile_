import axios from 'axios';
import {resetAuthAsyncStorage, setAuthAsyncStorage} from "./getAuthAsyncStorage";

// Import ENV
import getEnvVars from '../../env';
const { apiUrl } = getEnvVars();

// Import helper
import { Helper } from '../helpers/index';

function genOTP(userEmail : any) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/mobile/workspaces/gen-otp`, {
            email: userEmail,
        }).then(async (response : any) => {
            try {
              resolve(response);
            } catch (e) { reject(e) }
        }).catch((err : any) => {
            reject(err)
        });
    });
}

function verifyOTP(userEmail : any, otp : any) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/mobile/workspaces/verify-otp`, {
            email: userEmail,
            otp: otp
        }).then(async (response : any) => {
            try {
                await setAuthAsyncStorage(response);
                resolve(response);
            } catch (e) { reject(e) }
        }).catch((err : any) => {
            reject(err)
        });
    });
}

async function logout(getState : any) {
    return new Promise((resolve, reject) => {
      const currentState = getState();
      const { accessToken } = currentState.auth;
      axios.get(`${apiUrl}/mobile/workspaces/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(async (response : any) => {
        try {
          await resetAuthAsyncStorage();
          resolve(response);
        } catch(e) {reject(e) }
      }).catch((err : any) => {
          reject(err)
          Helper.handlerNetworkIncorrupt(err);
        });
    });
}

export const authService = {
  genOTP,
  verifyOTP,
  logout
};