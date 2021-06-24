import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {

    static instance = new Storage();

    store = async (key, value) => {
        try {

            await AsyncStorage.setItem(key, value);
            return true;

        } catch (err) {

            console.log("Storage store error: ", err);
            return false;

        }
    }

    get = async (key) => {
        try {

            return await AsyncStorage.getItem(key);

        } catch (err) {

            console.log("Storage get error: ", err);
            throw Error(err);

        }
    }

    getAll = async (keys) => {
        try {

            return await AsyncStorage.multiGet(keys);

        } catch (err) {

            console.log("Storage getAll error: ", err);
            throw Error(err);

        }
    }

    getAllKeys = async () => {
        try {

            return await AsyncStorage.getAllKeys();

        } catch (err) {

            console.log("Storage getAllKeys error: ", err);
            throw Error(err);

        }
    }

    remove = async (key) => {
        try {

            await AsyncStorage.removeItem(key);
            return true;

        } catch (err) {

            console.log("Storage remove error: ", err);
            return false;

        }
    }

}

export default Storage;