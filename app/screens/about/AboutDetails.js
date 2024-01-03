import React from 'react'
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native'
import {translations} from '../../locale/translations'
import {englishStyle} from '../../style/englishStyle'
import {generalStyle} from '../../style/generalStyle'
import {I18n} from 'i18n-js'

export default function AboutDetails({navigation}) {
    const i18n = new I18n(translations)
    i18n.locale = 'en'

    return (
        <SafeAreaView>
            <View style={englishStyle.splitView}>
                <Text style={englishStyle.textHeader}>{String(i18n.t('about'))}</Text>
                <TouchableOpacity
                    style={generalStyle.buttonBackFromAbout}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Text style={generalStyle.textButton}>{String(i18n.t('back'))}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View>
                    <Text style={englishStyle.textGeneralInfo}>
                        {'\n'}
                        This is a research study on actions that individuals can take to
                        contribute to efforts to fight climate change.
                        {'\n'}
                        {'\n'}
                        This study is funded by UK Research & Innovation and being conducted
                        by Dr Viktoria Spaiser.
                        {'\n'}
                        {'\n'}
                        In the 8-weeks field-experiment using the smartphone app Climate
                        Champ, developed by Newcastle University, you are kindly asked to
                        answer a set of questions each day. If you are in the E group (your
                        unique user ID starts with E), then you will also see each day a
                        message when opening the app.
                        {'\n'}
                        {'\n'}
                        If your unique user ID starts with C then you are in the C group,
                        which means you will not see the daily messages.
                        {'\n'}
                        {'\n'}
                        No matter in which group you are, do try and take action.
                        {'\n'}
                        {'\n'}
                        If you have any questions about the study, please get in touch with:
                        {'\n'}
                        {'\n'}
                        Dr Viktoria Spaiser
                        {'\n'}
                        v.spaiser@leeds.ac.uk
                    </Text>
                </View>
                <View style={{paddingBottom: 300}}/>
            </ScrollView>
        </SafeAreaView>
    )
}
