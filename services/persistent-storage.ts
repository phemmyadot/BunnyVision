import * as SecureStore from 'expo-secure-store';

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
            await SecureStore.setItemAsync(key, value);
        } catch (e) {
            throw new Error('Failed to store data');
        }
    };

    public getData = async (key: string) => {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (e) {
            throw new Error('Failed to retrieve data');
        }
    };
}
