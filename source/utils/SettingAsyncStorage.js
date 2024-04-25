import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncItem = async (key, item) => {
  try {
    if (key == undefined || item == undefined) {
      console.log(`No item found with key '${key}'.`);
      return null;
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAsyncItem = async key => {
  try {
    const asyncItem = await AsyncStorage.getItem(key);
    if (asyncItem !== null) {
      return JSON.parse(asyncItem);
    } else {
      console.log(`No item found with key '${asyncItem}'.`);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setLogLatAsync = async (key, item) => {
  try {
    if (key == undefined || item == undefined) {
      console.log(`No item found with key '${key}'.`);
      return null;
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
