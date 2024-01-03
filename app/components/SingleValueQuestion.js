import React, { useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import YesNoQuestion from './YesNoQuestion'
import UnitOfMeasurement from './UnitOfMeasurement'
import handleValidation from '../util/helperFunctions/handleValidation'
import { generalStyle } from '../style/generalStyle'
import { englishStyle } from '../style/englishStyle'
import Footer from './Footer'
import { getAnswer } from './functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useUser } from '../util/context/UserContext'
import useNavigateToWelcomeScreen from '../util/helperFunctions/useNavigateToWelcomeScreen'

const SingleValueQuestion = ({
  pageNumber,
  questionText,
  questionText2,
  unitSingular,
  unitPlural,
  answer,
  setAnswer,
  value,
  setValue,
  upperBound,
  lowerBound,
  invalidAnswer,
  setInvalidAnswer,
  answer1,
  setAnswer1,
  answer2,
  setAnswer2,
  navigation,
  storageKeys,
}) => {
  // Handles setting local variables with AsyncStorage data.
  useNavigateToWelcomeScreen(navigation)

  useEffect(() => {
    const fetchData = async () => {
      const savedAnswer = await getAnswer(`question${pageNumber}`)
      if (savedAnswer) {
        setAnswer1(savedAnswer[storageKeys[0]])
        setAnswer2(savedAnswer[storageKeys[1]])
      }
    }
    fetchData()
  }, [])

  // Handles navigation to the next page.
  const handleNext = async () => {
    const questionData = {
      [storageKeys[0]]: answer1,
      [storageKeys[1]]: answer2,
    }
    if (
      answer1 === false ||
      (answer1 === true && answer2 >= lowerBound && answer2 <= upperBound && !invalidAnswer)
    ) {
      await AsyncStorage.setItem(
        `question${pageNumber}`,
        JSON.stringify(questionData)
      )
      navigation.navigate(`Question${pageNumber + 1}`)
    } else {
      alert(`Please input a whole number between ${lowerBound} and ${upperBound}`)
      return
    }
  }

  // Handles navigation to the prev page.
  const handlePrev = async () => {
    const questionData = {
      [storageKeys[0]]: answer1,
      [storageKeys[1]]: answer2,
    }
    await AsyncStorage.setItem(
      `question${pageNumber}`,
      JSON.stringify(questionData)
    )
    navigation.navigate(`Question${pageNumber - 1}`)
  }

  // Handles navigation to the prev page.
  const handleSkip = async () => {
    navigation.navigate(`Question12`)
  }

  // UI
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={generalStyle.container}>
        <Text
          style={[
            englishStyle.textHeader,
            generalStyle.flex1,
            generalStyle.height50,
          ]}>
          Question {pageNumber}
        </Text>
        <View style={{ flex: 10 }}>
          <Text
            style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
            {questionText}
          </Text>
          <YesNoQuestion
            answer={answer}
            setAnswer={setAnswer}
            setAnswer2={setValue}
            answer2={value}
          />
          <View>
            {answer ? (
              <View>
                <Text
                  style={[
                    englishStyle.textGeneralInfo,
                    generalStyle.fontWeight500,
                  ]}>
                  {questionText2}
                </Text>

                <View
                  style={[
                    generalStyle.flexDirectionRow,
                    generalStyle.paddingLeftScreenWidthDividedBy15,
                  ]}>
                  <TextInput
                    style={generalStyle.numberInput}
                    returnKeyType={'done'}
                    onChangeText={(inputValue) =>
                      handleValidation(
                        inputValue,
                        upperBound,
                        lowerBound,
                        setInvalidAnswer,
                        setValue
                      )
                    }
                    value={value?.toString()}
                    keyboardType="numeric"
                    placeholder="1"
                    placeholderTextColor={'gray'}
                  />
                  <UnitOfMeasurement
                    value={value}
                    singular={unitSingular}
                    plural={unitPlural}
                  />
                </View>
                {invalidAnswer ? (
                  <Text style={generalStyle.textWarning}>
                    {`Input a valid number between ${lowerBound} and ${upperBound}.`}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
        <Footer
          handlePrev={handlePrev}
          handleNext={handleNext}
          pageNumber={pageNumber}
          handleSkip={handleSkip}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SingleValueQuestion
