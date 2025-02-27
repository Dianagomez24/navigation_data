import * as SecureStore from 'expo-secure-store';


export const saveSecureData = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
};


export const getSecureData = async (key: string) => {
    return await SecureStore.getItemAsync(key);
};


export const deleteSecureData = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
};
