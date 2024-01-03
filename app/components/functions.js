import {Alert} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const isInteger = (integer) => {
    const reg = /^\d+$/
    return reg.test(integer)
}

export const isLessThan100 = (integer) => {
    const reg = /^([0-9]|[1-9][0-9]|99)$/
    return reg.test(integer)
}

export const getAnswer = async (answer) => {
    try {
        return JSON.parse(await AsyncStorage.getItem(answer))
    } catch (error) {
        console.log(error)
    }
}

export const saveAnswer = async (saveThisQuestion, answer, nextQuestion, {navigation}) => {
    return await AsyncStorage.setItem(saveThisQuestion, JSON.stringify(answer))
    // navigation.navigate(nextQuestion)
}

export const goingBackAlert = ({navigation}) => {
    Alert.alert(
        "Are you sure you want to go back?",
        "\nYour progress on this question will be lost.",
        [{
            text: "Go Back",
            style: 'destructive',
            onPress: () => {navigation.goBack()},
        }, {
            text: "Stay"
        }],
        {cancelable: false},
    )
}

export async function getReportsAsync() {
    return await AsyncStorage.getItem("reports", (err, value) => {
        if (!err) {
            return value
        } else {
            return null
        }
    })
}

export function trim(s) {
    // This trims any whitespace from the beginning and end of the string
    return s.replace(/\s+$/g, '').replace(/^\s+/g, '')
}

export const isEmailValidRegex = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    return reg.test(email)
}