import React, {useEffect, useRef, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {I18n} from 'i18n-js'
import {englishStyle} from '../../style/englishStyle'
import {translations} from '../../locale/translations'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    universalBackgroundColor,
    generalStyle,
} from '../../style/generalStyle'
import {Slider} from '@miblanchard/react-native-slider'
import {useUser} from '../../util/context/UserContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SwipeUpDown from 'react-native-swipe-up-down'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

export default function Question6({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const swipeUpDownRef = useRef()
    const {user} = useUser()
    const currentQuestion = 'question6'
    const [electricityUsage, setElectricityUsage] = useState(null)
    const i18n = new I18n(translations)
    i18n.locale = 'en'

    useEffect(() => {
        async function fetchInitialValue() {
            // Try fetching from AsyncStorage
            const storedValue = await AsyncStorage.getItem(currentQuestion)
            const parsedValue = storedValue ? JSON.parse(storedValue) : null

            if (parsedValue?.electricityUsedInKwh) {
                setElectricityUsage(parsedValue.electricityUsedInKwh)
            }
            // If not found in AsyncStorage, get value from user object
            else if (user?.averageElectricityConsumptionInKwh) {
                setElectricityUsage(user.averageElectricityConsumptionInKwh)
            }
        }

        fetchInitialValue()
    }, [user])

    const question6 = {
        electricityUsedInKwh: electricityUsage,
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
                    {String(i18n.t('question'))} 6
                </Text>

                <SwipeUpDown
                    ref={swipeUpDownRef}
                    itemFull={(close) => (
                        <View>
                            <TouchableOpacity
                                onPress={close}
                                style={generalStyle.closeButton}>
                                <Ionicons name={'close-circle-outline'} size={30}/>
                            </TouchableOpacity>

                            <Ionicons
                                name={'chevron-down-outline'}
                                size={20}
                                style={generalStyle.chevronSwipeDialog}
                            />

                            <ScrollView>
                                <TouchableWithoutFeedback style={generalStyle.screenWidth}>
                                    <View>
                                        <Text style={englishStyle.textGeneralInfo}>
                                            Note on Solar Panels:
                                            {'\n\n'}
                                            If you have solar panels installed on your roofs for
                                            instance, you can subtract the electricity generated
                                            through solar panels from the overall used electricity.
                                            {'\n\n'}
                                            For instance, if your solar panels produced 9 kWh that day
                                            and you used overall 12 kWh, you can move the slider to 3
                                            kWh.
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{padding: 150}}/>
                            </ScrollView>
                        </View>
                    )}
                    animation="easeInEaseOut"
                    disableSwipeIcon
                    extraMarginTop={100}
                    iconColor="yellow"
                    iconSize={30}
                    style={englishStyle.swipeDialog}
                    blurRadius={1}
                />

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        {String(i18n.t(currentQuestion))}
                    </Text>

                    <View>
                        <Text
                            style={[
                                englishStyle.textGeneralInfo,
                                generalStyle.fontWeight500,
                            ]}>
                            {String(i18n.t('question6Subtext'))}
                        </Text>

                        <Slider
                            value={electricityUsage}
                            onValueChange={setElectricityUsage}
                            animateTransitions={true}
                            minimumTrackTintColor={'#000000'}
                            containerStyle={{
                                width: 300,
                                alignSelf: 'center',
                                marginTop: 50,
                            }}
                            minimumValue={0}
                            maximumValue={40}
                            onSlidingComplete={(value) => {
                                setElectricityUsage(Math.floor(Number(value)))
                            }}
                        />

                        <View
                            style={[
                                generalStyle.flexDirectionRow,
                                {
                                    alignContent: 'space-between',
                                    justifyContent: 'space-between',
                                },
                            ]}>
                            <Text style={[englishStyle.textGeneralInfo]}> 0 kWh </Text>
                            <Text style={englishStyle.textGeneralInfo}> 40 kWh </Text>
                        </View>

                        <Text
                            style={[
                                englishStyle.textGeneralInfo,
                                generalStyle.fontWeight500,
                                generalStyle.alignSelfCenter,
                            ]}>
                            {'\n\n'}
                            Your electricity usage today:
                        </Text>
                        <Text
                            style={[
                                englishStyle.textGeneralInfo,
                                generalStyle.fontWeight500,
                                generalStyle.alignSelfCenter,
                                {fontSize: 35},
                            ]}>
                            {String(Math.floor(Number(electricityUsage)))}
                            kWh
                        </Text>
                    </View>
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
                            if (electricityUsage !== null) {
                                console.log(question6)
                                await AsyncStorage.setItem(
                                    currentQuestion,
                                    JSON.stringify(question6)
                                )
                                navigation.goBack()
                            }
                        }}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={[generalStyle.infoButton, {justifyContent: 'center'}]}>
                        <Ionicons
                            name={'information-circle-outline'}
                            onPress={() => swipeUpDownRef.current.showFull()}
                            size={40}
                            style={generalStyle.infoButton}
                        />
                    </View>

                    <TouchableOpacity
                        style={generalStyle.button}
                        onPress={async () => {
                            if (electricityUsage !== null) {
                                await AsyncStorage.setItem(
                                    currentQuestion,
                                    JSON.stringify(question6)
                                )
                                navigation.navigate('Question7')
                            }
                        }}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>(6 of 12)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
