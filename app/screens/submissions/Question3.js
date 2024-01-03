import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
} from 'react-native'
import {I18n} from 'i18n-js'
import {englishStyle} from '../../style/englishStyle'
import {translations} from '../../locale/translations'
import {getAnswer} from '../../components/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import YesNoQuestion from '../../components/YesNoQuestion'
import {universalBackgroundColor, generalStyle} from '../../style/generalStyle'
import CheckboxesSection from '../../components/CheckboxSection'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

const data = {
    beefUK: false,
    beefSouthAmerica: false,
    lamb: false,
    porkOrBaconOrHam: false,
    chicken: false,
    freshFish: false,
    tinnedFish: false,
    eggs: false,
    milkCow: false,
    cheese: false,
    yoghurt: false,
    cream: false,
}

export default function Question3({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const currentQuestion = 'question3'
    const [didEatMeatOrDairy, setDidEatMeatOrDairy] = useState(false)
    const [consumedOf, setConsumedOf] = useState(data)
    const OPTIONS_MAP = {
        beefUK: 'Beef (UK)',
        beefSouthAmerica: 'Beef (South American)',
        lamb: 'Lamb',
        porkOrBaconOrHam: 'Pork, Bacon Or Ham',
        chicken: 'Chicken',
        freshFish: 'Fresh Fish',
        tinnedFish: 'Tinned Fish',
        eggs: 'Eggs',
        milkCow: 'Cow Milk',
        cheese: 'Cheese',
        yoghurt: 'Yoghurt',
        cream: 'Cream',
    }

    const [invalidAnswer, setInvalidAnswer] = useState(false)
    const [language, setLanguage] = useState('en')
    const i18n = new I18n(translations)
    i18n.locale = language

    // Handles setting whether or not the answer is invalid.
    // An answer will be invalid if the user has chosen Yes, but then not selected an option.
    useEffect(() => {
        const noOptionSelection = Object.values(consumedOf).every((value) => !value)
        if (didEatMeatOrDairy && noOptionSelection) {
            setInvalidAnswer(true)
        } else {
            setInvalidAnswer(false)
        }
    }, [didEatMeatOrDairy, consumedOf])

    useEffect(() => {
        getAnswer(currentQuestion).then((response) => {
            if (response) {
                setDidEatMeatOrDairy(response.didEatMeatOrDairy || false)
                const {didEatMeatOrDairy, ...data} = response
                // Update each state value with fetched results or maintain default value if it doesn't exist
                setConsumedOf((prev) => ({
                    ...prev,
                    ...data,
                }))
            }
        })
    }, [])

    // Handles navigation to the next page.
    const handleNext = async () => {
        const questionData = {didEatMeatOrDairy, ...consumedOf}
        if (!invalidAnswer) {
            await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
            navigation.navigate(`Question4`)
        } else {
            alert('Please make a selection.')
            return
        }
    }

    // Handles navigation to the prev page.
    const handlePrev = async () => {
        const questionData = {didEatMeatOrDairy, ...consumedOf}
        await AsyncStorage.setItem(`question3`, JSON.stringify(questionData))
        navigation.goBack()
    }

    // Reset all values if the user answers no.
    useEffect(() => {
        if (!didEatMeatOrDairy) {
            setConsumedOf(data)
        }
    }, [didEatMeatOrDairy])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    {String(i18n.t('question'))} 3
                </Text>

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        {String(i18n.t(currentQuestion))}
                    </Text>

                    <YesNoQuestion
                        answer={didEatMeatOrDairy}
                        setAnswer={setDidEatMeatOrDairy}
                        answer2={consumedOf}
                        setAnswer2={setConsumedOf}
                    />

                    {didEatMeatOrDairy && (
                        <CheckboxesSection
                            title={String(i18n.t('selectAllThatApply'))}
                            options={OPTIONS_MAP}
                            state={consumedOf}
                            setState={setConsumedOf}
                        />
                    )}
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
                        onPress={handlePrev}>
                        <Text style={generalStyle.textBackButton}>
                            {String(i18n.t('back'))}
                        </Text>
                    </TouchableOpacity>

                    <View style={generalStyle.noInfoButton}/>

                    <TouchableOpacity style={generalStyle.button} onPress={handleNext}>
                        <Text style={generalStyle.textButton}>
                            {String(i18n.t('next'))}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>
                    {String(i18n.t('threeOfTwelve'))}
                </Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
