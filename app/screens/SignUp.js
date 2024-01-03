import React, {useEffect, useState} from 'react'
import {
    Text,
    View,
    SafeAreaView,
    Keyboard,
    Linking,
    TextInput,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import {englishStyle} from '../style/englishStyle'
import {isEmailValidRegex} from '../components/functions'
import axios from 'axios'
import {I18n} from 'i18n-js'
import {translations} from '../locale/translations'
import {getIsArabicAsync} from '../locale/getLocale'
import {generalStyle} from '../style/generalStyle'
import {useAuth} from '../util/context/AuthContext'
import {climateChampURL} from "../components/Main"

export default function SignUp({dispatcher, navigation}) {
    const {setTokenInStorage} = useAuth()
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [emailConfirmed, setEmailConfirmed] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirmed, setPasswordConfirmed] = React.useState('')
    const [showFullNameErrorMessage, setShowFullNameErrorMessage] =
        React.useState(false)
    const [showEmailMismatchMessage, setShowEmailMismatchMessage] =
        React.useState(false)
    const [showInvalidEmailErrorMessage, setShowInvalidEmailErrorMessage] =
        React.useState(false)
    const [showInvalidPasswordMessage, setInvalidPasswordMessage] =
        React.useState(false)
    const [showPasswordMismatchMessage, setShowPasswordMismatchMessage] =
        React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const [isArabic, setIsArabic] = useState(null)
    const i18n = new I18n(translations)
    i18n.locale = isArabic ? 'ar' : 'en'

    const signUpHandle = async () => {
        await axios
            .post(
                `${climateChampURL}/api/auth/local/register`,
                {
                    username: email,
                    fullName: fullName,
                    email: email,
                    password: password,
                }
            )
            .then(async (res) => {
                let userToken = res.data.jwt
                await setTokenInStorage(userToken)
                dispatcher({type: 'REGISTER', id: email, token: userToken})
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getIsArabicAsync().then((r) => setIsArabic(r))
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <View style={[generalStyle.container, generalStyle.paddingBottom75]}>
                    <Text
                        style={[
                            englishStyle.textHeader,
                            {alignSelf: 'center', paddingLeft: 0},
                        ]}>
                        {String(i18n.t('signUp'))}
                    </Text>

                    <TextInput
                        style={generalStyle.input}
                        placeholderTextColor={'gray'}
                        selectionColor="green"
                        onChangeText={(fullName) => {
                            {
                                setFullName(fullName)
                            }
                        }}
                        value={fullName}
                        placeholder={String(i18n.t('fullName'))}
                    />
                    {showFullNameErrorMessage ? (
                        <Text style={generalStyle.textWarning}>
                            {String(i18n.t('fullNameErrorMessage'))}
                        </Text>
                    ) : null}

                    <TextInput
                        style={generalStyle.input}
                        placeholderTextColor={'gray'}
                        selectionColor="green"
                        onChangeText={(email) => {
                            {
                                setEmail(email)
                            }
                        }}
                        value={email}
                        placeholder="Email"
                    />

                    {showInvalidEmailErrorMessage ? (
                        <Text style={generalStyle.textWarning}>
                            {String(i18n.t('emailMismatchErrorMessage'))}
                        </Text>
                    ) : null}

                    <TextInput
                        style={generalStyle.input}
                        placeholderTextColor={'gray'}
                        selectionColor="green"
                        onChangeText={(userNameConfirmed) => {
                            {
                                setEmailConfirmed(userNameConfirmed)
                            }
                        }}
                        value={emailConfirmed}
                        placeholder={String(i18n.t('confirmEmail'))}
                    />

                    {showEmailMismatchMessage ? (
                        <Text style={generalStyle.textWarning}>
                            {String(i18n.t('invalidEmailErrorMessage'))}
                        </Text>
                    ) : null}

                    <TextInput
                        style={generalStyle.input}
                        placeholderTextColor={'gray'}
                        selectionColor="green"
                        onChangeText={(password) => {
                            {
                                setPassword(password)
                            }
                        }}
                        value={password}
                        placeholder={String(i18n.t('password'))}
                        secureTextEntry={true}
                    />

                    {showInvalidPasswordMessage ? (
                        <Text style={generalStyle.textWarning}>
                            {String(i18n.t('invalidPasswordLengthErrorMessage'))}
                        </Text>
                    ) : null}

                    <TextInput
                        style={generalStyle.input}
                        placeholderTextColor={'gray'}
                        selectionColor="green"
                        onChangeText={(passwordConfirmed) => {
                            {
                                setPasswordConfirmed(passwordConfirmed)
                            }
                        }}
                        value={passwordConfirmed}
                        placeholder={String(i18n.t('confirmPassword'))}
                        secureTextEntry={true}
                    />

                    {showPasswordMismatchMessage ? (
                        <Text style={generalStyle.textWarning}>
                            {String(i18n.t('passwordMismatchErrorMessage'))}
                        </Text>
                    ) : null}

                    <Text style={{alignSelf: 'center'}}>
                        {String(i18n.t('termsAndConditions'))}:
                    </Text>
                    <Text
                        style={[
                            englishStyle.textGeneralInfoLink,
                            {
                                fontSize: 12,
                                paddingBottom: 10,
                                margin: 0,
                                alignSelf: 'center',
                            },
                        ]}
                        onPress={() => {
                            Linking.openURL(
                                'https://www.ncl.ac.uk/data.protection/dataprotectionpolicy/privacynotice/'
                            )
                        }}>
                        {String(i18n.t('readTheTermsAndConditionsHere'))}
                    </Text>

                    {/*TODO: Refactor this code based on the article:
                    //   https://medium.com/@mena.meseha/how-to-refactor-the-arrow-type-code-8c40c21db85f */}
                    <View style={[generalStyle.container, {alignSelf: 'center'}]}>
                        <TouchableOpacity
                            style={generalStyle.buttonLogin}
                            onPress={async () => {
                                // If Full Name is not empty
                                if (fullName.length > 0) {
                                    setShowFullNameErrorMessage(false)

                                    // If Email and Confirm Email are valid email addresses
                                    if (
                                        isEmailValidRegex(email) &&
                                        isEmailValidRegex(emailConfirmed)
                                    ) {
                                        setShowInvalidEmailErrorMessage(false)

                                        // If Email and Confirmed Email are the same and neither is an emtpy field
                                        if (
                                            email === emailConfirmed &&
                                            email.length > 0 &&
                                            emailConfirmed.length > 0
                                        ) {
                                            setShowEmailMismatchMessage(false)

                                            // If password and confirmed password's lengths are at least 6 characters long
                                            if (
                                                password.length >= 6 &&
                                                passwordConfirmed.length >= 6
                                            ) {
                                                setInvalidPasswordMessage(false)

                                                // If password and confirmed password are matching
                                                if (password === passwordConfirmed) {
                                                    setShowPasswordMismatchMessage(false)
                                                    setIsLoading(true)
                                                    // Send Sign Up request to the server
                                                    await signUpHandle(email, fullName, password)

                                                    // OTHERWISE: Show error messages on the appropriate user input mistake
                                                } else {
                                                    setShowPasswordMismatchMessage(true)
                                                }
                                            } else {
                                                setInvalidPasswordMessage(true)
                                            }
                                        } else {
                                            setShowEmailMismatchMessage(true)
                                        }
                                    } else {
                                        setShowInvalidEmailErrorMessage(true)
                                    }
                                } else {
                                    setShowFullNameErrorMessage(true)
                                }
                            }}>
                            {isLoading ? (
                                <ActivityIndicator size="small" style={{padding: 1}}/>
                            ) : (
                                <Text style={generalStyle.textButton}>
                                    {String(i18n.t('signUp'))}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={englishStyle.buttonBackLogin}
                            onPress={() =>
                                Alert.alert(
                                    String(i18n.t('discardSignUp')),
                                    String(i18n.t('discardSignUpMessage')),
                                    [
                                        {
                                            text: String(i18n.t('discard')),
                                            style: 'destructive',
                                            onPress: () => navigation.navigate('Login'),
                                        },
                                        {
                                            text: String(i18n.t('cancelButton')),
                                        },
                                    ]
                                )
                            }>
                            <Text style={generalStyle.textBackButton}>
                                {String(i18n.t('back'))}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
