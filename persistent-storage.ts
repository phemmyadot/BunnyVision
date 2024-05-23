import AsyncStorage from '@react-native-async-storage/async-storage';

export class PersistentStorage {
    private static instance: PersistentStorage;

    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new PersistentStorage();
        }
        return this.instance;
    }
    public storeData = async (value: string, key: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            throw new Error('Failed to store data');
        }
    };

    public getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
            throw new Error('Failed to retrieve data');
        }
    };

    public removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            throw new Error('Failed to remove data');
        }
    };

    public clearData = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            throw new Error('Failed to clear data');
        }
    };

    public getAllKeys = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (e) {
            throw new Error('Failed to get all keys');
        }
    };
}
