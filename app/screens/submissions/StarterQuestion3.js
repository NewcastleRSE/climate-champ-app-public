import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import {englishStyle} from '../../style/englishStyle'
import {generalStyle, screenWidth, secondaryColor, universalBackgroundColor} from '../../style/generalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useUser} from '../../util/context/UserContext'

export default function StarterQuestion3({navigation}) {
    const {handleSetShowStarterQuestions} = useUser()
    const [selectedOption, setSelectedOption] = useState(null)
    const [invalidInput, setInvalidInput] = useState(false)
    const currentQuestion = 'StarterQuestion3'

    // Fetch saved answer.
    useEffect(() => {
        async function fetchStoredAnswer() {
            const storedAnswer = await AsyncStorage.getItem(currentQuestion)
            if (storedAnswer !== null) {
                setSelectedOption(storedAnswer)
            }
        }

        fetchStoredAnswer()
    }, [])

    // Handle choosing an option.
    const handleOptionSelection = async (option) => {
        setSelectedOption(option)
        await AsyncStorage.setItem(currentQuestion, option)
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    Question 3
                </Text>

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        What is your average electricity consumption (kWh)?
                    </Text>
                    <Text style={[englishStyle.textGeneralInfo, {marginTop: 10}]}>
                        You can find this information (daily) on your most recent
                        electricity bill.
                    </Text>

                    <TextInput
                        style={[generalStyle.numberInput, {alignSelf: 'center'}]}
                        onChangeText={(value) => {
                            handleOptionSelection(value)
                        }}
                        value={selectedOption}
                        keyboardType="numeric"
                        placeholder="30"
                        placeholderTextColor={'gray'}
                    />

                    <TouchableOpacity
                        style={[generalStyle.buttonWide, {marginTop: 50, backgroundColor: secondaryColor}]}
                        onPress={() => handleOptionSelection('9')}>
                        <Text style={generalStyle.textButton}>I'm not sure</Text>
                    </TouchableOpacity>
                </View>

                {invalidInput &&
                    Alert.alert(
                        'Invalid Input',
                        'Please input a valid positive integer between 4 and 30.',
                        [{text: 'OK', onPress: () => setInvalidInput(false)}]
                    )}

                <View
                    style={[
                        generalStyle.flexDirectionRow,
                        generalStyle.alignSelfCenter,
                        generalStyle.paddingBottom50,
                        {backgroundColor: universalBackgroundColor, paddingTop: 5},
                    ]}>
                    <TouchableOpacity
                        style={generalStyle.buttonBack}
                        onPress={async () => navigation.goBack()}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={[generalStyle.noInfoButton, {marginLeft: screenWidth/6, marginRight: screenWidth/6}]}/>

                    <TouchableOpacity
                        style={[generalStyle.button, {width: 130}]}
                        onPress={async () => {
                            const parsedValue = parseInt(selectedOption)
                            if (parsedValue >= 4 && parsedValue <= 30) {
                                setInvalidInput(false)
                                handleSetShowStarterQuestions()
                            } else {
                                setInvalidInput(true)
                            }
                        }}>
                        <Text style={generalStyle.textButton}>Submit</Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>(3 of 3)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
