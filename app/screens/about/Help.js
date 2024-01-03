import React, {useState} from 'react'
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {englishStyle} from '../../style/englishStyle'
import {translations} from '../../locale/translations'
import {generalStyle} from '../../style/generalStyle'
import {useAuth} from '../../util/context/AuthContext'
import {useUser} from '../../util/context/UserContext'
import {I18n} from 'i18n-js'
import axios from 'axios'

export default function Help({navigation}) {
    const {signOut, getUserToken} = useAuth()
    const {getUserId} = useUser()
    const [isArabic, setIsArabic] = useState(null)
    const i18n = new I18n(translations)
    i18n.locale = isArabic ? 'ar' : 'en'
    const email = 'v.spaiser@leeds.ac.uk'
    const subject = encodeURIComponent('Carbon Champ Feedback')

    // Deletes the user
    const deleteUser = () => {
        getUserToken().then(async (token) => {
            getUserId().then(async (userId) => {
                try {
                    await axios
                        .delete(
                            `${process.env.EXPO_PUBLIC_CLIMATE_CHAMP_URL}/api/users/${userId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        )
                        .then(async (res) => signOut())
                } catch (error) {
                    console.log('Error deleting user:', error)
                }
            })
        })
    }

    return (
        <SafeAreaView style={generalStyle.container}>
            <View style={englishStyle.splitView}>
                <Text style={englishStyle.textHeader}>Instructions</Text>
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
                        Please answer each question in the Questions tab, selecting all
                        answers that apply to you on a given day and then pressing Next or
                        by entering a brief text in the open text field and then pressing
                        Next.
                        {'\n'}
                        {'\n'}
                        Please answer these questions every day in the evening, reflecting
                        your actions throughout the day.
                        {'\n'}
                        {'\n'}
                        Please answer each question as accurately and honestly as possible.
                        {'\n'}
                        {'\n'}
                        If you are in the E group, please carefully read the daily message
                        that will appear on your screen when you open the app.
                        {'\n'}
                        {'\n'}
                        In the Summary tab you will see your individualised daily carbon
                        footprint based on your answers to questions Q1-6 and your civic
                        climate positivity score based on your answers to questions Q7-9
                        visualised as a dot on a time-line graph with days on the x-Axis.
                        {'\n'}
                        {'\n'}
                        If anything is unclear or if you want to know how the scores
                        mentioned above were calculated, please get in touch with:
                        {'\n'}
                        {'\n'}
                        Dr Viktoria Spaiser
                        {'\n'}
                        v.spaiser@leeds.ac.uk
                    </Text>
                </View>

                {/*TODO: This is gonna be the delete functionality once the study completes. */}

                {/* <View>
                    <Text
                        style={[englishStyle.textSubHeader, {paddingTop: 80}]}>
                        Delete account
                    </Text>
                    <Text style={englishStyle.textGeneralInfo}>
                        This is a showcase how the account deletion will work, currently has no functionality and will be only shown after the study.
                        {"\n\n\n"}
                        If you would like to delete your account from our database, please click this button below:
                    </Text>
                    <TouchableOpacity
                        style={[generalStyle.buttonBackFromAbout, {
                            alignSelf: 'center',
                            width: '40%',
                            backgroundColor: '#ff0000',
                            borderColor: '#ff0000'
                        }]}
                        onPress={() => {
                            Alert.alert(
                                'Delete Account',
                                '\n' +
                                'You are about to delete your account, this action cannot be undone.' +
                                '\n\n' +
                                'Are you sure you want to proceed?',
                                [
                                    {
                                        text: 'Delete', onPress: () => {
                                            Alert.alert("Delete account confirmation",
                                                "\nYou are about to delete your account forever.",
                                                [
                                                    {
                                                        text: 'Delete', onPress: () => {
                                                            // deleteUser()
                                                            Alert.alert("Account deleted")
                                                        }, style: 'destructive'
                                                    },
                                                    {
                                                        text: 'Cancel', onPress: () => {
                                                        }, style: 'cancel'
                                                    }
                                                ]
                                            )
                                        },
                                        style: 'destructive'
                                    },
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                                ]
                            )
                        }}
                    >
                        <Text style={generalStyle.textButton}>Delete account</Text>
                    </TouchableOpacity>
                    <Text style={englishStyle.textGeneralInfo}>
                        This process will not delete your completed questionnaire submissions.
                    </Text>
                </View> */}

                <View style={{paddingBottom: 300}}/>
            </ScrollView>
        </SafeAreaView>
    )
}
