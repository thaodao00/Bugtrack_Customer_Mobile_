import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAuthAsyncStorage() {
  const accessToken = await AsyncStorage.getItem('accessToken');
  return {
    accessToken,
  };
}

export async function setAuthAsyncStorage(response : any) {
  if (response.data.accessToken) {
    await AsyncStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
  }
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('accessToken');
}