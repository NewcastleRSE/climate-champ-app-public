import React, { useState } from 'react'
import { generalStyle } from '../style/generalStyle'
import { Text, TouchableOpacity, View } from 'react-native'
import { translations } from '../locale/translations'
import { I18n } from 'i18n-js'

export default function YesNoQuestion({ answer, setAnswer }) {
  const [language, setLanguage] = useState('en')
  const i18n = new I18n(translations)
  i18n.locale = language

  return (
    <View
      style={[
        generalStyle.flexDirectionRow,
        generalStyle.paddingLeftScreenWidthDividedBy15,
      ]}>
      <TouchableOpacity
        style={
          answer !== true
            ? generalStyle.buttonPicked
            : generalStyle.buttonNotPicked
        }
        onPress={() => {
          setAnswer(false)
        }}>
        <Text
          style={
            answer !== true
              ? generalStyle.textButton
              : generalStyle.textNotPicked
          }>
          {String(i18n.t('no'))}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          answer ? generalStyle.buttonPicked : generalStyle.buttonNotPicked
        }
        onPress={() => {
          setAnswer(true)
        }}>
        <Text
          style={answer ? generalStyle.textButton : generalStyle.textNotPicked}>
          {String(i18n.t('yes'))}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
