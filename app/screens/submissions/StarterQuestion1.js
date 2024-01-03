import React, {useEffect, useState} from "react"
import {
    SafeAreaView, Text,
    TouchableWithoutFeedback,
    Keyboard, View, TouchableOpacity,
} from 'react-native'
import {englishStyle} from '../../style/englishStyle'
import {generalStyle} from "../../style/generalStyle"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function StarterQuestion1({navigation}) {
    const [selectedOption, setSelectedOption] = useState(null)

    const currentQuestion = "StarterQuestion1"
    const options = [
        {key: 'Electric car', value: 'electric'},
        {key: 'Petrol or diesel (medium/small) car', value: 'petrolOrDiesel'},
        {key: 'SUV/4x4', value: 'SUVOr4x4'},
        {key: 'I do not own a car', value: 'none'}
    ]

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
    const handleOptionSelection = async (optionValue) => {
        setSelectedOption(optionValue)
        await AsyncStorage.setItem(currentQuestion, optionValue)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text style={[englishStyle.textHeader, generalStyle.flex1, generalStyle.height50]}>
                    Question 1
                </Text>

                <View style={{flex: 10}}>
                    <Text style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        What type of car do you drive?
                    </Text>

                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                generalStyle.buttonWide,
                                {backgroundColor: selectedOption === option.value ? 'lightgray' : 'white'}
                            ]}
                            onPress={() => handleOptionSelection(option.value)}
                        >
                            <Text>{option.key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={generalStyle.paddingBottom50}>
                    <TouchableOpacity
                        style={generalStyle.buttonWide}
                        onPress={() => {
                            if (selectedOption) {
                                navigation.navigate('StarterQuestion2')
                            }
                        }
                        }
                    >
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>
                    (1 of 3)
                </Text>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
