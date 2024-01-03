import AsyncStorage from "@react-native-async-storage/async-storage"

export const setIsArabicAsync = async (value) => {
    await AsyncStorage.setItem("isArabicAsync", JSON.stringify(!value))
}

export const getIsArabicAsync = async () => {
    return (await AsyncStorage.getItem("isArabicAsync") === 'true')
}