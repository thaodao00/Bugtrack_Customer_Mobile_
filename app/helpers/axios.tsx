import axios from 'axios';
import { Helper } from '.';

const axiosInstance = axios.create({
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.response.use(undefined, (error) => Helper.handleStatusError(error));

export default axiosInstance