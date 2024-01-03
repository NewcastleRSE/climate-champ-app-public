import {Text, View, TouchableOpacity} from 'react-native'
import {generalStyle} from '../style/generalStyle'

export default function Footer({
                                   handlePrev,
                                   handleNext,
                                   pageNumber,
                                   handleSkip,
                               }) {
    return (
        <>
            <View
                style={[
                    generalStyle.flexDirectionRow,
                    generalStyle.alignSelfCenter,
                    generalStyle.paddingBottom50,
                ]}>
                <View style={generalStyle.noInfoButton}/>
                {/* <TouchableOpacity style={generalStyle.button} onPress={handleSkip}>
          <Text style={generalStyle.textButton}>Skip</Text>
        </TouchableOpacity> */}
            </View>
            <View
                style={[
                    generalStyle.flexDirectionRow,
                    generalStyle.alignSelfCenter,
                    generalStyle.paddingBottom50,
                ]}>
                {pageNumber !== 1 && (
                    <TouchableOpacity
                        style={generalStyle.buttonBack}
                        onPress={handlePrev}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>
                )}
                {pageNumber === 1 && (
                    <View style={[generalStyle.noInfoButton, {marginLeft: 0}]}/>
                )}

                <View style={generalStyle.noInfoButton}/>
                {pageNumber !== 12 && (
                    <TouchableOpacity style={generalStyle.button} onPress={handleNext}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={generalStyle.textBottomScreenIndicator}>
                ({pageNumber} of 12)
            </Text>
        </>
    )
}
