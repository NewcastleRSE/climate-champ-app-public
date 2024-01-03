import handleCheckboxChange from '../util/helperFunctions/handleCheckboxChange'
import React from 'react'
import { Text, View, ScrollView, TextInput } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { englishStyle } from '../style/englishStyle'
import { generalStyle } from '../style/generalStyle'

// Displays checkboxes, just pass in the answers state and setState function, the title i.e. "Select All That Apply" and the options. Options are an array of options that follow normal casing without spaces. Spaces will be applied in this components.
const CheckboxesSection = ({
  title,
  options,
  state,
  setState,
  otherState,
  setOtherState,
  data,
}) => (
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
          <Checkbox.Item
              mode={'android'}
            key={option}
            status={
              state[option] && state[option] !== 'didNotTalk'
                ? 'checked'
                : 'unchecked'
            }
            label={options[option]}
            onPress={() => handleCheckboxChange(setState, option, data)}
          />
        ))}
        {state?.other && (
          <TextInput
            style={generalStyle.otherInput200Characters}
            returnKeyType={'done'}
            onChangeText={setOtherState}
            value={otherState.toString()}
            inputMode="text"
            placeholder="Please further specify"
            placeholderTextColor={'gray'}
          />
        )}
        <View style={{ padding: 150 }} />
      </ScrollView>
    </View>
  </View>
)

export default CheckboxesSection
