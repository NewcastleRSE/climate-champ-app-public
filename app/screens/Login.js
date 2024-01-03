import React, {useEffect, useState} from 'react'
import {
    Image,
    SafeAreaView,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
} from 'react-native'
import {isEmailValidRegex} from '../components/functions'
import {generalStyle, primaryColor} from '../style/generalStyle'
import {englishStyle} from '../style/englishStyle'
import {translations} from '../locale/translations'
import {I18n} from 'i18n-js'
import axios from 'axios'
import {useUser} from '../util/context/UserContext'
import {useAuth} from '../util/context/AuthContext'
import {climateChampURL} from "../components/Main"

// Login component
export default function Login({dispatcher}) {
    const {checkDevice, getUserDetails} = useUser()
    const {setTokenInStorage, setUserIdInStorage} = useAuth()
    // User input for login.
    const [uid, setUid] = useState('')
    // Is the UID valid?
    const [isUIDValid, setIsUIDValid] = useState(false)
    // If the UUID is invalid it will display an error message informing the user.
    const [showInvalidLoginMessage, setShowInvalidLoginMessage] =
        React.useState(false)
    // If the user uses the wrong device it will display an error message informing the user
    const [showInvalidDeviceMessage, setInvalidDeviceMessage] = useState(false)
    // Loading state.
    const [isLoading, setIsLoading] = useState(false)

    const i18n = new I18n(translations)
    i18n.locale = 'en'

    const password = process.env.EXPO_PUBLIC_PW

    const handleWrongLogin = () => {
        setUid('')
        setIsLoading(false)
    }

    // Login function
    const loginHandle = async () => {
        try {
            // Reset error messages
            setShowInvalidLoginMessage(false)
            setInvalidDeviceMessage(false)
            let data = JSON.stringify({
                identifier: uid,
                password: String(password),
            })

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${climateChampURL}/api/auth/local`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            }

            const res = await axios.request(config)

            try {
                const userToken = res.data.jwt
                const id = res.data.user.id
                const username = res.data.user.username
                const correctDevice = await checkDevice(userToken, id, username)

                // If the device is not correct, then set an error message and don't allow the user to log in.
                if (!correctDevice) {
                    setIsLoading(false)
                    setInvalidDeviceMessage(true)
                    return
                }

                await setTokenInStorage(userToken)
                await setUserIdInStorage(id)
                await getUserDetails(userToken)

                dispatcher({type: 'LOGIN', id: uid, token: userToken})
            } catch (innerErr) {
                console.error('Error during post-request handling:', innerErr)
                setIsLoading(false)
                setShowInvalidLoginMessage(true)
            }
        } catch (err) {
            setIsLoading(false)
            // Check if the error is due to a network issue
            if (err.request && !err.response) {
                Alert.alert(
                    'Connection Error',
                    'Could not establish a connection with the server.'
                )
            } else {
                // Check if it's an invalid login or some other server error.
                if (err.response && err.response.status === 400) {
                    setShowInvalidLoginMessage(true)
                } else {
                    Alert.alert(
                        'Server Error',
                        'There was an issue with the server. Please try again later.'
                    )
                }
            }
            console.error('User login failed, error:', err.response || err)
        }
    }

    // Login request to the server. Identifier is what the user inputs and the password is hardcoded as it's the same for all users.
    // Pull the userToken from the response and add it to AsyncStorage.
    // Don't want to show the wrong device error message while displaying the wrong uid message.
    useEffect(() => {
        if (showInvalidLoginMessage) setInvalidDeviceMessage(false)
    }, [showInvalidLoginMessage])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Image
                    style={generalStyle.loginImageLogo}
                    source={require('../assets/icon1024.png')}
                />
                <Text style={generalStyle.titleLogin}>{String(i18n.t('appName'))}</Text>

                {/*Swapping Languages*/}
                {/*<Text style={[englishStyle.textGeneralInfoLink,*/}
                {/*    {alignSelf: 'flex-end', paddingRight: 30}]}*/}
                {/*    onPress={toggleSwitch}*/}
                {/*>*/}
                {/*    {language === false ? "عربي" : "English"}*/}
                {/*</Text>*/}

                <TextInput
                    style={[
                        generalStyle.input,
                        generalStyle.screenWidthPer1point2,
                        generalStyle.alignItemsCenter,
                        {marginTop: 20},
                    ]}
                    placeholderTextColor={'gray'}
                    selectionColor={primaryColor}
                    onChangeText={(email) => {
                        setUid(email)
                    }}
                    value={uid}
                    placeholder={String(i18n.t('uid'))}
                />

                {showInvalidLoginMessage ? (
                    <Text style={{color: 'red', alignSelf: 'center'}}>
                        {String(i18n.t('invalidUIDErrorMessage'))}
                    </Text>
                ) : null}

                {showInvalidDeviceMessage ? (
                    <Text style={{color: 'red', alignSelf: 'center'}}>
                        You must use the device you originally logged in on.
                    </Text>
                ) : null}

                <View style={englishStyle.splitViewLogin}>
                    <TouchableOpacity
                        style={generalStyle.buttonLogin}
                        onPress={async () => {
                            setIsLoading(true)
                            setIsUIDValid(!isEmailValidRegex(uid) && uid.length > 0)
                            Alert.alert(
                                `You are logging in as ${uid}`,
                                'Are you sure this is your username?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: async () => await loginHandle(),
                                    },
                                    {
                                        text: 'No',
                                        onPress: () => handleWrongLogin(),
                                    },
                                ]
                            )
                        }}>
                        {isLoading ? (
                            <ActivityIndicator size="small" style={{padding: 1}}/>
                        ) : (
                            <Text style={generalStyle.textButton}>
                                {String(i18n.t('login'))}
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/*Sign Up*/}
                    {/*<TouchableOpacity*/}
                    {/*    style={[generalStyle.buttonSignUp, {marginTop: 20}]}*/}
                    {/*    onPress={() => navigation.navigate('SignUp')}*/}
                    {/*>*/}
                    {/*    <Text style={generalStyle.textButton}>{String(i18n.t('signUp'))}</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
