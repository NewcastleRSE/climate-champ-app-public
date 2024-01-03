import {
    Alert,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {englishStyle} from '../style/englishStyle'
import {isEmailValidRegex} from '../components/functions'
import {generalStyle, primaryColor} from '../style/generalStyle'
import {climatechampURL} from '../components/functions'
import {getIsArabicAsync} from '../locale/getLocale'
import {translations} from '../locale/translations'
import {arabicStyle} from '../style/arabicStyle'
import {I18n} from 'i18n-js'
import axios from 'axios'

export default function ForgotPassword({navigation}) {
    const [isArabic, setIsArabic] = useState(null)
    const i18n = new I18n(translations)
    i18n.locale = isArabic ? 'ar' : 'en'

    const [recoveryEmail, setRecoveryEmail] = React.useState('')
    const [showInvalidEmailMessage, setShowInvalidEmailMessage] =
        React.useState(false)

    useEffect(() => {
        getIsArabicAsync().then((r) => setIsArabic(r))
    })

    return (
        <SafeAreaView
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={englishStyle.textSubHeader2}>
                {String(i18n.t('provideYourEmail'))}:
            </Text>

            <TextInput
                style={isArabic === false ? generalStyle.input : arabicStyle.input}
                placeholderTextColor={'gray'}
                selectionColor={primaryColor}
                onChangeText={(recoveryEmail) => {
                    {
                        setRecoveryEmail(recoveryEmail)
                    }
                }}
                value={recoveryEmail}
                placeholder="Email"
            />

            {showInvalidEmailMessage ? (
                <Text style={{color: 'red'}}>
                    {String(i18n.t('provideValidEmail'))}
                </Text>
            ) : null}

            <View style={generalStyle.splitViewLogin}>
                <TouchableOpacity
                    style={generalStyle.buttonLogin}
                    onPress={() => {
                        // If the email is valid and has length > 0, then send the recovery email
                        if (
                            !(!isEmailValidRegex(recoveryEmail) && recoveryEmail.length >= 0)
                        ) {
                            setShowInvalidEmailMessage(false)

                            axios
                                .post(
                                    `${climatechampURL}/api/auth/forgot-password`,
                                    {email: recoveryEmail},
                                    {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    }
                                )
                                .then((response) => {
                                    Alert.alert(
                                        i18n.t('recoveryEmailSent'),
                                        i18n.t('recoveryEmailSentToAddress') +
                                        ':' +
                                        '\n\n' +
                                        '"' +
                                        recoveryEmail +
                                        '"' +
                                        '\n\n' +
                                        i18n.t('checkSpamFolder'),
                                        [
                                            {
                                                text: i18n.t('ok'),
                                                style: 'cancel',
                                                onPress: () => navigation.navigate('Login'),
                                            },
                                        ]
                                    )
                                })
                                .catch((err) => {
                                    Alert.alert(
                                        i18n.t('recoveryEmailNotSent'),
                                        '\n' +
                                        i18n.t('recoveryEmailNotSentToAddress') +
                                        ' :' +
                                        '\n\n' +
                                        '"' +
                                        recoveryEmail +
                                        '"' +
                                        '\n\n' +
                                        String(i18n.t('recoveryEmailNotSentMessage')) +
                                        '\n\n' +
                                        String(err),
                                        [
                                            {
                                                text: i18n.t('ok'),
                                                style: i18n.t('cancelButton'),
                                                onPress: () => {
                                                },
                                            },
                                        ]
                                    )
                                })
                        } else {
                            // If the email is invalid, then show the invalid email message
                            setShowInvalidEmailMessage(true)
                        }
                    }}>
                    <Text style={generalStyle.textButton}>
                        {String(i18n.t('sendRecoveryEmail'))}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={englishStyle.buttonBackLogin}
                    onPress={() => navigation.goBack()}>
                    <Text style={generalStyle.textBackButton}>
                        {String(i18n.t('back'))}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
