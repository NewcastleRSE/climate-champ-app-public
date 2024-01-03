import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TextInput, ScrollView,
} from 'react-native'
import {I18n} from 'i18n-js'
import {englishStyle} from '../../style/englishStyle'
import {translations} from '../../locale/translations'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    universalBackgroundColor,
    generalStyle, screenWidth,
} from '../../style/generalStyle'
import {useUser} from '../../util/context/UserContext'
import {useAuth} from '../../util/context/AuthContext'
import {getAnswer} from '../../components/functions'
import submitQuestions from '../../util/submissionFunctions/submitQuestions'
import clearQuestionData from '../../util/helperFunctions/clearQuestionData'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

export default function Question12({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const {userToken} = useAuth()
    const {user, setCanSubmit} = useUser()
    const currentQuestion = 'question12'
    const [otherComments, setOthercomments] = useState('')
    const [loading, setLoading] = useState(false)
    const i18n = new I18n(translations)
    i18n.locale = 'en'

    // Handles fetching users answer from storage.
    useEffect(() => {
        const fetchData = async () => {
            getAnswer(currentQuestion).then((response) => {
                if (response) {
                    setOthercomments(response.otherComments)
                }
            })
        }
        fetchData()
    }, [])

    // Handles navigation to the prev page.
    const handlePrev = async () => {
        const questionData = {otherComments}
        await AsyncStorage.setItem(`question12`, JSON.stringify(questionData))
        navigation.goBack()
    }

    // Handles submitting data.
    const handleSubmission = async () => {
        setLoading(true)
        const questionData = otherComments.length > 0 ? { otherComments } : { otherComments: 'No comments.' }
        await AsyncStorage.setItem(`question12`, JSON.stringify(questionData))
        await AsyncStorage.getItem('question')
        const response = await submitQuestions(user, userToken)
        if (response) {
            Alert.alert("Thank you for your submission", "Your answers were successfully recorded")
            console.log('Submission was a success')
            setCanSubmit(false)
            navigation.navigate('Welcome')
            await AsyncStorage.setItem('lastSubmissionDate', response.createdAt)
            await clearQuestionData()
        } else {
            Alert.alert(
                'Submission Failed',
                'There was an issue submitting your data. Please check your internet connection and try again.',
                [{text: 'OK', onPress: () => console.log('Alert Closed')}]
            )
        }
        setLoading(false)
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {loading ? (
                <View style={generalStyle.loaderContainer}>
                    <ActivityIndicator size="large" color="#429928"/>
                </View>
            ) : (
                <SafeAreaView style={generalStyle.container}>
                    <Text
                        style={[
                            englishStyle.textHeader,
                            generalStyle.height50,
                            {height: 70}
                        ]}>
                        {String(i18n.t('question'))} 12
                    </Text>

                    <ScrollView>
                        <Text
                            style={[
                                englishStyle.textGeneralInfo,
                                generalStyle.fontWeight500,
                            ]}>
                            {String(i18n.t(currentQuestion))}

                        </Text>

                        <TextInput
                            style={[
                                generalStyle.otherInput200Characters,
                                generalStyle.longerInput,
                            ]}
                            returnKeyType={'done'}
                            onChangeText={setOthercomments}
                            value={otherComments}
                            inputMode="text"
                            placeholder="Please further specify"
                            placeholderTextColor={'gray'}
                            multiline={true}
                        />

                        <View style={{padding: 50}}/>
                    </ScrollView>

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

                        <View style={[generalStyle.noInfoButton, {
                            marginLeft: screenWidth / 6,
                            marginRight: screenWidth / 6
                        }]}/>

                        {/* Change this button to Submit */}
                        <TouchableOpacity
                            style={[generalStyle.button, {width: 130}]}
                            onPress={handleSubmission}>
                            <Text style={generalStyle.textButton}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={generalStyle.textBottomScreenIndicator}>
                        {String(i18n.t('twelveOfTwelve'))}
                    </Text>
                </SafeAreaView>
            )}
        </TouchableWithoutFeedback>
    )
}
