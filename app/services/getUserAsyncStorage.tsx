import AsyncStorage from '@react-native-async-storage/async-storage';

const userStorage =  {

    async userAvatar() {
        try {
            const value = await AsyncStorage.getItem('userAvatar')
            if(value !== null) {
                return value
            }
        } catch (error) {
            console.log('Load User Avatar Error:', error);
        }
    },

    async userBiometricStatus() {
        try {
            const value = await AsyncStorage.getItem('userBiometricStatus')
            if(value !== null) {
                return value
            }
        } catch (error) {
            console.log('Load User Biometric Status Error:', error);
        }
    }
}

export default userStorage