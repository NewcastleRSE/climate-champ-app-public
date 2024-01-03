import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { englishStyle } from '../style/englishStyle'
import { generalStyle } from '../style/generalStyle'

const RadioButtonSection = ({ title, options, state, setState }) => (
  <View>
    <Text style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
      {title}
    </Text>
    <View
      style={[
        generalStyle.flexDirectionRow,
        generalStyle.paddingLeftScreenWidthDividedBy15,
      ]}>
      <ScrollView
        style={[
          generalStyle.screenWidth,
          { paddingLeft: 5, paddingRight: 15 },
        ]}>
        {Object.keys(options).map((option) => (
          <RadioButton.Item
              mode={'android'}
            key={option}
            status={state === option ? 'checked' : 'unchecked'}
            label={options[option]}
            onPress={() => setState(option)}
          />
        ))}
        <View style={{ padding: 250 }} />
      </ScrollView>
    </View>
  </View>
)

export default RadioButtonSection
