import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native'
import {I18n} from 'i18n-js'
import {englishStyle} from '../../style/englishStyle'
import {translations} from '../../locale/translations'
import YesNoQuestion from '../../components/YesNoQuestion'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {universalBackgroundColor, generalStyle} from '../../style/generalStyle'
import {getAnswer} from '../../components/functions'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

const data = {
    shoesPair: 0,
    clothes: 0,
    jewellery: 0,
    cosmeticsOrToiletries: 0,
    furniture: 0,
    electricDeviceLaptopOrDesktopOrTV: 0,
    electricDevicePhone: 0,
    electricAccessories: 0,
    other: '',
}

export default function Question4({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const currentQuestion = 'question4'
    const [didPurchaseNonGrocery, setDidPurchaseNonGrocery] = useState(false)
    const [purchaseType, setPurchaseType] = useState(data)
    const [invalidAnswer, setInvalidAnswer] = useState(false)
    const i18n = new I18n(translations)
    i18n.locale = 'en'

    // Handles setting local variables with AsyncStorage data.
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAnswer(`question4`)
            if (response) {
                setDidPurchaseNonGrocery(response.didPurchaseNonGrocery)
                const {didPurchaseNonGrocery, ...data} = response
                if (response) {
                    setPurchaseType((prev) => ({
                        ...prev,
                        ...data,
                    }))
                }
            }
        }
        fetchData()
    }, [])

    // Check if the user has selected at least one thing.
    useEffect(() => {
        const noSelection = Object.values(purchaseType).every(
            (value) => value === '0' || value === ''
        )
        if (noSelection && didPurchaseNonGrocery) {
            setInvalidAnswer(true)
        } else {
            setInvalidAnswer(false)
        }
    }, [purchaseType, didPurchaseNonGrocery])

    // Handles navigation to the next page.
    const handleNext = async () => {
        const questionData = {
            didPurchaseNonGrocery,
            ...purchaseType,
        }
        if (!invalidAnswer) {
            await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
            navigation.navigate(`Question5`)
        } else {
            alert('Please make a selection.')
            return
        }
    }

    // Handles navigation to the prev page.
    const handlePrev = async () => {
        const questionData = {
            didPurchaseNonGrocery,
            ...purchaseType,
        }
        await AsyncStorage.setItem(`question4`, JSON.stringify(questionData))
        navigation.goBack()
    }

    // Reset all values if the user answers no.
    useEffect(() => {
        if (!didPurchaseNonGrocery) {
            setPurchaseType(data)
        }
    }, [didPurchaseNonGrocery])

    // Function to render each input and label pair
    const renderInput = (key, label) => (
        <View
            style={[
                generalStyle.flexDirectionRow,
                generalStyle.paddingLeftScreenWidthDividedBy15,
            ]}>
            <TextInput
                style={generalStyle.numberInput}
                returnKeyType={'done'}
                onChangeText={(value) => {
                    let integerResult = Number(value);

                    if (!isNaN(integerResult) && Number.isInteger(integerResult)) {
                        const parsedValue = parseInt(value, 10)
                        if (!Number.isNaN(parsedValue) && parsedValue <= 99) {
                            setPurchaseType({...purchaseType, [key]: value})
                        } else if (value === '') {
                            setPurchaseType({...purchaseType, [key]: ''})
                        }
                    } else {
                        setPurchaseType({...purchaseType, [key]: ''})
                    }
                }}
                value={String(purchaseType[key])}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={'gray'}
            />
            <Text style={[englishStyle.textGeneralInfo, {alignSelf: 'center'}]}>
                {label}
            </Text>
        </View>
    )


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    {String(i18n.t('question'))} 4
                </Text>

                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        {String(i18n.t(currentQuestion))}
                    </Text>

                    <YesNoQuestion
                        answer={didPurchaseNonGrocery}
                        setAnswer={setDidPurchaseNonGrocery}
                    />

                    <View>
                        {/*If user answered yes*/}
                        {didPurchaseNonGrocery ? (
                            <View style={generalStyle.scrollView}>
                                <Text
                                    style={[
                                        englishStyle.textGeneralInfo,
                                        generalStyle.fontWeight500,
                                    ]}>
                                    Provide the number of items:
                                </Text>

                                <ScrollView style={generalStyle.screenWidth}>
                                    <TouchableWithoutFeedback>
                                        <View>
                                            {renderInput('shoesPair', 'shoes (pair)')}
                                            {renderInput('clothes', 'clothes')}
                                            {renderInput('jewellery', 'jewellery')}
                                            {renderInput(
                                                'cosmeticsOrToiletries',
                                                'cosmetics/toiletries'
                                            )}
                                            {renderInput('furniture', 'furniture')}
                                            {renderInput(
                                                'electricDeviceLaptopOrDesktopOrTV',
                                                'a laptop, desktop or tv'
                                            )}
                                            {renderInput(
                                                'electricDevicePhone',
                                                'mobile phone or tablet'
                                            )}
                                            {renderInput(
                                                'electricAccessories',
                                                'electronic accessories'
                                            )}
                                            <Text
                                                style={[
                                                    englishStyle.textGeneralInfo,
                                                    generalStyle.fontWeight500,
                                                    generalStyle.lineBreak,
                                                ]}></Text>
                                            <TextInput
                                                style={[generalStyle.otherInput200Characters]}
                                                returnKeyType={'done'}
                                                onChangeText={(value) =>
                                                    setPurchaseType({...purchaseType, other: value})
                                                }
                                                value={purchaseType['other']}
                                                inputMode="text"
                                                placeholder="Other..."
                                                placeholderTextColor={'gray'}
                                                multiline={true}
                                            />
                                            <View style={{paddingBottom: 300}}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>
                        ) : null}
                    </View>
                </View>

                <View
                    style={[
                        generalStyle.flexDirectionRow,
                        generalStyle.alignSelfCenter,
                        generalStyle.paddingBottom50,
                        {
                            backgroundColor: universalBackgroundColor,
                            paddingTop: 5,
                            paddingLeft: 25,
                            paddingRight: 25,
                        },
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
                    {String(i18n.t('fourOfTwelve'))}
                </Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
