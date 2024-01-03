import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
} from 'react-native'
import { I18n } from 'i18n-js'
import { englishStyle } from '../../style/englishStyle'
import { translations } from '../../locale/translations'
import YesNoQuestion from '../../components/YesNoQuestion'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  universalBackgroundColor,
  generalStyle,
} from '../../style/generalStyle'
import { getAnswer } from '../../components/functions'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

export default function Question11({ navigation }) {
  useNavigateToWelcomeScreen(navigation)
  const currentQuestion = 'question11'
  const [didFeelClimateAgency, setDidFeelClimateAgency] = useState(false)
  const i18n = new I18n(translations)
  i18n.locale = 'en'

  // Handles pulling in latest question data
  useEffect(() => {
    const fetchData = async () => {
      getAnswer(currentQuestion).then((response) => {
        if (response) {
          setDidFeelClimateAgency(response.didFeelClimateAgency)
        }
      })
    }
    fetchData()
  }, [])

  // Handles navigation to the next page.
  const handleNext = async () => {
    const questionData = { didFeelClimateAgency }
    if (didFeelClimateAgency !== null) {
      await AsyncStorage.setItem(currentQuestion, JSON.stringify(questionData))
      navigation.navigate(`Question12`)
    } else {
      alert('Please make a selection.')
      return
    }
  }

  // Handles navigation to the prev page.
  const handlePrev = async () => {
    const questionData = { didFeelClimateAgency }
    await AsyncStorage.setItem(`question11`, JSON.stringify(questionData))
    navigation.goBack()
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
          {String(i18n.t('question'))} 11
        </Text>

        <View style={{ flex: 10 }}>
          <Text
            style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
            {String(i18n.t(currentQuestion))}
          </Text>

          <YesNoQuestion
            answer={didFeelClimateAgency}
            setAnswer={setDidFeelClimateAgency}
          />
        </View>

        <View
          style={[
            generalStyle.flexDirectionRow,
            generalStyle.alignSelfCenter,
            generalStyle.paddingBottom50,
            { backgroundColor: universalBackgroundColor, paddingTop: 5 },
          ]}>
          <TouchableOpacity
            style={generalStyle.buttonBack}
            onPress={handlePrev}>
            <Text style={generalStyle.textBackButton}>
              {String(i18n.t('back'))}
            </Text>
          </TouchableOpacity>

          <View style={generalStyle.noInfoButton} />

          <TouchableOpacity style={generalStyle.button} onPress={handleNext}>
            <Text style={generalStyle.textButton}>
              {String(i18n.t('next'))}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={generalStyle.textBottomScreenIndicator}>
          {String(i18n.t('elevenOfTwelve'))}
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
