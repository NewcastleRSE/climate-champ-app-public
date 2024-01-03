import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
} from 'react-native'
import {englishStyle} from '../../style/englishStyle'
import {generalStyle} from '../../style/generalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function StarterQuestion2({navigation}) {
    const [selectedOption, setSelectedOption] = useState(null)
    const currentQuestion = 'StarterQuestion2'

    // The key is what the user sees and the values are the required format to be sent to the server.
    const options = [
        {key: 'Heat pump (air or ground source heat pump)', value: 'heatPump'},
        {key: 'Modern gas boiler (max 5. years old)', value: 'modernGasBoiler'},
        {key: 'Old gas boiler', value: 'oldGasBoiler'},
        {key: 'Electric heaters', value: 'electricHeater'},
        {key: 'None', value: 'none'},
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
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    Question 2
                </Text>

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        How do you heat your home?
                    </Text>

                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                generalStyle.buttonWide,
                                {
                                    backgroundColor:
                                        selectedOption === option.value ? 'lightgray' : 'white',
                                },
                            ]}
                            onPress={() => handleOptionSelection(option.value)}>
                            <Text>{option.key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View
                    style={[
                        generalStyle.flexDirectionRow,
                        generalStyle.alignSelfCenter,
                        generalStyle.paddingBottom50,
                    ]}>
                    <TouchableOpacity
                        style={generalStyle.buttonBack}
                        onPress={async () => navigation.goBack()}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={generalStyle.noInfoButton}/>

                    <TouchableOpacity
                        style={generalStyle.button}
                        onPress={async () => {
                            if (selectedOption) {
                                navigation.navigate('StarterQuestion3')
                            }
                        }}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>(2 of 3)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
