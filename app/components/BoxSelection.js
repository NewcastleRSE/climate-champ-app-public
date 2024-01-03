import {View, TouchableOpacity, Text, ScrollView} from 'react-native'
import {generalStyle} from '../style/generalStyle'
import {englishStyle} from '../style/englishStyle'

const BoxSelection = ({options, state, setState}) => (
    <View>
        <View
            style={[
                generalStyle.flexDirectionRow,
                {alignSelf: 'center', paddingTop: 20},
            ]}>
            <ScrollView
                style={[
                    generalStyle.screenWidth,
                    {paddingLeft: 5, paddingRight: 15},
                ]}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={
                            state === option
                                ? [englishStyle.buttonPickedWider, generalStyle.alignSelfCenter]
                                : [
                                    englishStyle.buttonNotPickedWider,
                                    generalStyle.alignSelfCenter,
                                ]
                        }
                        onPress={() => {
                            setState(option)
                        }}>
                        <Text
                            style={
                                state === option
                                    ? generalStyle.textButton
                                    : generalStyle.textNotPicked
                            }>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
                <View style={{padding: 50}}/>
            </ScrollView>
        </View>
    </View>
)

export default BoxSelection
