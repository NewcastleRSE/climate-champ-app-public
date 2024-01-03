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
import AsyncStorage from '@react-native-async-storage/async-storage'
import {universalBackgroundColor, generalStyle} from '../../style/generalStyle'
import BoxSelection from '../../components/BoxSelection'
import {getAnswer} from '../../components/functions'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

const options = ['content', 'anxious', 'angry', 'stressed', 'sad', 'happy']

export default function Question10({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const [overallFeeling, setOverallFeeling] = useState(false)

    const question10 = {
        overallFeeling,
    }

    useEffect(() => {
        getAnswer('question10').then((response) => {
            setOverallFeeling(response?.overallFeeling || false)
        })
    }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    Question 10
                </Text>

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        How did you feel today overall?
                    </Text>

                    <>
                        <BoxSelection
                            options={options}
                            state={overallFeeling}
                            setState={setOverallFeeling}
                        />
                    </>
                </View>
                <View
                    style={[
                        generalStyle.flexDirectionRow,
                        generalStyle.alignSelfCenter,
                        generalStyle.paddingBottom50,
                        {backgroundColor: universalBackgroundColor, paddingTop: 5},
                    ]}>
                    <TouchableOpacity
                        style={generalStyle.buttonBack}
                        onPress={async () => {
                            await AsyncStorage.setItem(
                                'question10',
                                JSON.stringify(question10)
                            )
                            navigation.goBack()
                        }}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={generalStyle.noInfoButton}/>

                    <TouchableOpacity
                        style={generalStyle.button}
                        onPress={async () => {
                            if (overallFeeling) {
                                await AsyncStorage.setItem(
                                    'question10',
                                    JSON.stringify(question10)
                                )
                                navigation.navigate('Question11')
                            } else {
                                alert('Please make a selection.')
                                return
                            }
                        }}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>(10 of 12)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
