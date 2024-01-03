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
import {getAnswer} from '../../components/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    universalBackgroundColor,
    generalStyle,
} from '../../style/generalStyle'
import CheckboxesSection from '../../components/CheckboxSection'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

const data = {
    didContactMPViaSocialMediaOrEmail: false,
    didContactMPViaLetter: false,
    didSignPetition: false,
    didContactCityCouncil: false,
    didDonateForClimateCause: false,
    didJoinClimateCampaignGroup: false,
    didClimateProtestAction: false,
    didContactEmplover: false,
    didContactPensionFund: false,
    didContactBank: false,
    didChangeElectricitySupplier: false,
    didEnquireGreenHomeRetrofitting: false,
    noneApply: true,
    other: false,
}

export default function Question9({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const currentQuestion = 'question9'
    const [didMitigateClimateChange, setDidMitagateClimateChange] =
        useState(false)
    const [actionType, setActionType] = useState(data)
    const [otherAnswer, setOtherAnswer] = useState('')
    const [invalidAnswer, setInvalidAnswer] = useState(false)

    // Handles setting whether or not the answer is invalid. An answer will be invalid if the user has chosen Yes, but then not selected an option.
    useEffect(() => {
        const noSelection = Object.values(actionType).every((value) => !value)
        if (didMitigateClimateChange && noSelection) {
            setInvalidAnswer(true)
        } else {
            setInvalidAnswer(false)
        }
    }, [didMitigateClimateChange, actionType])

    // Will take their previous answers and apply them.
    useEffect(() => {
        getAnswer(currentQuestion).then((response) => {
            if (response) {
                setDidMitagateClimateChange(response.didMitigateClimateChange || false)
                const {didMitigateClimateChange, ...data} = response
                setOtherAnswer(data.other)
                setActionType((prev) => ({
                    ...prev,
                    ...data,
                }))
            }
        })
    }, [])

    // Will set didMitigateClimateChange to false if the noneApply option has been selected and true otherwise.
    useEffect(() => {
        if (actionType.noneApply) {
            setDidMitagateClimateChange(false)
        } else {
            setDidMitagateClimateChange(true)
        }
    }, [actionType])

    // Handles navigation to the next page.
    const handleNext = async () => {
        const {noneApply, ...restActionTypes} = actionType
        const questionData = {
            didMitigateClimateChange,
            ...restActionTypes,
            other: otherAnswer,
        }

        if (!invalidAnswer) {
            await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
            navigation.navigate(`Question10`)
        } else {
            alert('Please make a selection.')
            return
        }
    }

    // Handles navigation to the prev page.
    const handlePrev = async () => {
        const questionData = {
            didMitigateClimateChange,
            ...actionType,
            other: otherAnswer,
        }
        await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
        navigation.goBack()
    }

    // Options for whom the person has contacted.
    const options = {
        didContactMPViaSocialMediaOrEmail:
            'Wrote Local MP Via Social Media or Email',
        didContactMPViaLetter: 'Wrote Local MP A Letter',
        didSignPetition: 'Signed Petition',
        didContactCityCouncil: 'Contacted City Council',
        didDonateForClimateCause: 'Donated Money For Climate Cause',
        didJoinClimateCampaignGroup: 'Joined Climate Campaign Group',
        didClimateProtestAction: 'Protested Climate Change',
        didContactEmplover: 'Contacted Employer',
        didContactPensionFund: 'Contacted Pension Fund',
        didContactBank: 'Contacted Bank',
        didChangeElectricitySupplier: 'Changed Electricity Supplier',
        didEnquireGreenHomeRetrofitting: 'Inquired About Green Home Retrofitting',
        noneApply: 'None Apply',
        other: 'Other',
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                {/* Header */}
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    Question 9
                </Text>

                {/* Content */}
                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        Did you do anything else today to help mitigate climate change?
                    </Text>

                    {/* Will render either the first or second page. The first page lets the user select which people they talked to about climate change and the second page lets the user select what reactions they had. */}
                    <>
                        <CheckboxesSection
                            title="Select All That Apply"
                            options={options}
                            state={actionType}
                            setState={setActionType}
                            otherState={otherAnswer}
                            setOtherState={setOtherAnswer}
                            data={data}
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
                        onPress={handlePrev}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={generalStyle.noInfoButton}/>

                    <TouchableOpacity style={generalStyle.button} onPress={handleNext}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>
                <Text style={generalStyle.textBottomScreenIndicator}>(9 of 12)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
