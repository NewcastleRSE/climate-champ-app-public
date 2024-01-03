import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Modal,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import {generalStyle} from '../style/generalStyle'
import {englishStyle} from '../style/englishStyle'
import {useUser} from '../util/context/UserContext'
import {useFocusEffect} from '@react-navigation/native'
import getNextSubmissionDay from '../util/helperFunctions/getNextSubmissionDay'
import hasUserSubmittedBefore from '../util/helperFunctions/hasUserSubmittedBefore'
import {useAuth} from '../util/context/AuthContext'
import notificationData from '../util/data/notificationData'
import getDaysIntoStudy from '../util/helperFunctions/getDaysIntoStudy'
import variables from '../util/data/variables'
import shouldShowModalToday from '../util/helperFunctions/shouldShowModalToday'
import clearQuestionData from '../util/helperFunctions/clearQuestionData'

// Welcome component
export default function Welcome({navigation}) {
    const {userToken} = useAuth()
    const {canSubmit, user, loadingUser} = useUser()
    const [showModal, setShowModal] = useState(null) // Tracks modal visibility.
    const [buttonEnabled, setButtonEnabled] = useState(false) // Tracks whether OK button can be pressed.
    const [nextSubmissionDay, setNextSubmissionDay] = useState(null)
    const [neverSubmitted, setNeverSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    // If the user is part of the experiment group then show the modal which will give information.
    useEffect(() => {
        const checkModal = async () => {
            if (user?.isExperiment) {
                // const shouldShow = await shouldShowModalToday() // This function checks if the modal has already been shown today and if its past the submission reset time.
                // if (shouldShow) setShowModal(true)
                setShowModal(true)
                // Will set a timer and the Ok button wont be enabled until after the timer has elapsed.
                const timer = setTimeout(() => {
                    setButtonEnabled(true)
                }, variables.timeToShowMessage)
                return () => clearTimeout(timer)
            }
        }
        checkModal()
    }, [user])

    // Will re-check the users submission date when they come back to the screen. Will also re-render at 4pm and midnight to ensure the correct message is displayed.
    useFocusEffect(
        React.useCallback(() => {
            const calculate = async () => {
                setLoading(true)
                const response = await getNextSubmissionDay(userToken)
                const response2 = await hasUserSubmittedBefore(userToken)
                // console.log('you can next submit', response)
                setNextSubmissionDay(response)
                if (!response2) setNeverSubmitted(true)
                else setNeverSubmitted(false)
                setLoading(false)
            }

            if (!loadingUser) {
                calculate()
            }

            // Calculate time until a passed in hour
            const timeUntilHour = (hour) => {
                const now = new Date()
                const targetTime = new Date(now)
                targetTime.setHours(hour, 0, 0, 0)
                if (now >= targetTime) {
                    targetTime.setDate(now.getDate() + 1)
                }
                return targetTime - now
            }

            // Calculate the time until 4 PM and midnight
            const timeUntilFourPM = timeUntilHour(variables.startTime) // 4pm
            const timeUntilMidnight = timeUntilHour(24) // midnight

            // Set up the intervals
            const intervalFor4PM = setTimeout(() => {
                if (!loadingUser) {
                    calculate()
                }
            }, timeUntilFourPM)

            const intervalForMidnight = setTimeout(() => {
                if (!loadingUser) {
                    calculate()
                }
            }, timeUntilMidnight)

            // Clean up the intervals
            return () => {
                clearTimeout(intervalFor4PM)
                clearTimeout(intervalForMidnight)
            }
        }, [loadingUser])
    )

    const startQuestionnaire = async () => {
        await clearQuestionData()
        navigation.navigate('Question1')
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {loadingUser || loading ? (
                    <View style={generalStyle.loaderContainer}>
                        <ActivityIndicator size="large" color="#429928"/>
                    </View>
                ) : (
                    <SafeAreaView style={generalStyle.container}>
                        {/*<Image*/}
                        {/*  style={generalStyle.loginImageLogo}*/}
                        {/*  source={require('../assets/icon1024.png')}*/}
                        {/*/>*/}
                        {/*<Text style={[generalStyle.titleLogin]}>Climate Champ</Text>*/}
                        <View style={{padding: 10}}/>
                        <Text
                            style={[
                                englishStyle.textGeneralInfo,
                                generalStyle.fontWeight500,
                                {
                                    alignSelf: 'center',
                                },
                            ]}>
                            {neverSubmitted
                                ? 'Welcome to Climate Champ.'
                                : 'Welcome back to Climate Champ.'}
                        </Text>
                        {neverSubmitted ? (
                            <Text
                                style={[
                                    englishStyle.textGeneralInfo,
                                    generalStyle.fontWeight500,
                                    {
                                        alignSelf: 'center',
                                    },
                                ]}>
                                {`Thank you for filling out those first three basic questions. \n\nThere are twelve more questions that should be filled out each day after 4PM. ${
                                    nextSubmissionDay == 'now'
                                        ? 'You can make your first submission now, press Start to proceed'
                                        : `\n\nCome back ${nextSubmissionDay} to make your submission.`
                                }`}
                            </Text>
                        ) : (
                            <>
                                {canSubmit ? (
                                    <Text
                                        style={[
                                            englishStyle.textGeneralInfo,
                                            generalStyle.fontWeight500,
                                            {
                                                alignSelf: 'center',
                                            },
                                        ]}>
                                        {`You can start the questionnaire ${nextSubmissionDay}.`}
                                    </Text>
                                ) : (
                                    <Text
                                        style={[
                                            englishStyle.textGeneralInfo,
                                            generalStyle.fontWeight500,
                                            {
                                                alignSelf: 'center',
                                                textAlign: 'center',
                                            },
                                        ]}>
                                        {`Thank you for your previous submission.\nYou can submit again ${nextSubmissionDay}.`}
                                    </Text>
                                )}
                            </>
                        )}
                        {nextSubmissionDay == 'now' && (
                            <TouchableOpacity
                                style={[
                                    generalStyle.buttonStart,
                                    {
                                        alignSelf: 'center',
                                        backgroundColor: '#429928',
                                        borderColor: '#429928',
                                    },
                                ]}
                                onPress={startQuestionnaire}>
                                <Text style={[generalStyle.textButton]}>Start</Text>
                            </TouchableOpacity>
                        )}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showModal}
                            onRequestClose={() => {
                                setShowModal(false)
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'gray',
                                }}>
                                <View
                                    style={{
                                        width: '90%',
                                        height: '50%', //
                                        padding: 20,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        justifyContent: 'space-between',
                                    }}>
                                    <Text style={{fontSize: 24}}>Please Read</Text>
                                    <ScrollView>
                                        <Text style={{fontSize: 18, marginTop: 15}}>
                                            {
                                                notificationData[
                                                getDaysIntoStudy() % notificationData.length
                                                    ]
                                            }
                                        </Text>
                                    </ScrollView>
                                    <TouchableOpacity
                                        onPress={() => setShowModal(false)}
                                        disabled={!buttonEnabled}
                                        style={{
                                            backgroundColor: buttonEnabled ? '#429928' : 'grey',
                                            padding: 10,
                                            marginTop: 20,
                                            borderRadius: 5,
                                            marginBottom: 10,
                                            cursor: 'pointer',
                                            justifySelf: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={{color: 'white', fontSize: 18}}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </SafeAreaView>
                )}
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}
