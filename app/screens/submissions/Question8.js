import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
} from 'react-native'
import CheckboxesSection from '../../components/CheckboxSection'
import YesNoQuestion from '../../components/YesNoQuestion'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {englishStyle} from '../../style/englishStyle'
import {generalStyle, universalBackgroundColor} from '../../style/generalStyle'
import {getAnswer} from '../../components/functions'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

const data = {
    mediaSourceTV: false,
    mediaSourceOnlineNews: false,
    mediaSourceNewsPaper: false,
    mediaSourceSocialMedia: false,
    mediaSourceRadio: false,
    mediaSourcePodcast: false,
    mediaSourceBlog: false,
    mediaSourceYoutube: false,
}
export default function Question8({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const currentQuestion = 'question8'
    const [didGetClimateChangeNews, setDidGetClimateChangeNews] = useState(false)
    const [mediaSource, setMediaSource] = useState(data)
    const [invalidAnswer, setInvalidAnswer] = useState(false)

    const mediaOptions = {
        mediaSourceTV: 'Television',
        mediaSourceOnlineNews: 'Online News',
        mediaSourceNewsPaper: 'Newspaper',
        mediaSourceSocialMedia: 'Social Media',
        mediaSourceRadio: 'Radio',
        mediaSourcePodcast: 'Podcast',
        mediaSourceBlog: 'Blog',
        mediaSourceYoutube: 'YouTube',
    }

    // Handles setting whether or not the answer is invalid. An answer will be invalid if the user has chosen Yes, but then not selected an option.
    useEffect(() => {
        const noMediaSourceSelected = Object.values(mediaSource).every(
            (value) => !value
        )
        if (didGetClimateChangeNews && noMediaSourceSelected) {
            setInvalidAnswer(true)
        } else {
            setInvalidAnswer(false)
        }
    }, [didGetClimateChangeNews, mediaSource])

    useEffect(() => {
        getAnswer(currentQuestion).then((response) => {
            if (response) {
                setDidGetClimateChangeNews(response?.didGetClimateChangeNews || false)
                const {didGetClimateChangeNews, ...mediaData} = response

                // Update each state value with fetched results or maintain default value if it doesn't exist
                setMediaSource((prev) => ({
                    ...prev,
                    ...mediaData,
                }))
            }
        })
    }, [])

    // Handles navigation to the next page.
    const handleNext = async () => {
        const questionData = {didGetClimateChangeNews, ...mediaSource}
        if (!invalidAnswer) {
            await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
            navigation.navigate(`Question9`)
        } else {
            alert('Please make a selection.')
            return
        }
    }

    // Handles navigation to the prev page.
    const handlePrev = async () => {
        const questionData = {didGetClimateChangeNews, ...mediaSource}
        await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
        navigation.goBack()
    }

    // Reset all values if the user answers no.
    useEffect(() => {
        if (!didGetClimateChangeNews) {
            setMediaSource(data)
        }
    }, [didGetClimateChangeNews])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    Question 8
                </Text>

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        Did you get some information or news about climate change today?
                    </Text>

                    <YesNoQuestion
                        answer={didGetClimateChangeNews}
                        setAnswer={setDidGetClimateChangeNews}
                    />

                    {didGetClimateChangeNews && (
                        <CheckboxesSection
                            title="Select all that apply:"
                            options={mediaOptions}
                            state={mediaSource}
                            setState={setMediaSource}
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
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={generalStyle.noInfoButton}/>

                    <TouchableOpacity style={generalStyle.button} onPress={handleNext}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>
                <Text style={generalStyle.textBottomScreenIndicator}>(8 of 12)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
