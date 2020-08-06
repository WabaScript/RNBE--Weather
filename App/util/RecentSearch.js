import AsyncStorage from '@react-native-community/async-storage';

const KEY = '@WeatherApp/searchHistory';

export const getRecentSearch = () => AsyncStorage.getItem(KEY).then(str => {
    if (str) {
        return JSON.parse(str);
    }
    return [];
});


export const storeRecentSearch = (item) => {
    return getRecentSearch().then(history => {
        const oldHistory = history.filter(existingItem => existingItem.id !== item.id);
        const newHistory = [item, ...oldHistory];
        return AsyncStorage.setItem(KEY, JSON.stringify(newHistory));
    });
};