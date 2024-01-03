import React, { createContext, useContext, useState, useEffect } from 'react'
import fetchLastSubmissionDate from '../helperFunctions/fetchLastSubmissionDate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getCurrentDeviceId from '../helperFunctions/getCurrentDeviceId'
import fetchRegisteredDeviceId from '../helperFunctions/fetchRegisteredDeviceId'
import fetchUser from '../helperFunctions/fetchUser'
import setRegisteredDeviceId from '../helperFunctions/setRegisteredDeviceId'
import { useAuth } from './AuthContext'
import { setStarterAnswers } from '../helperFunctions/setStarterAnswers'
import { Alert } from 'react-native'
import timeUntilReset from '../helperFunctions/timeUntilReset'
import { AppState } from 'react-native'
import variables from '../data/variables'
import registerForPushNotificationsAsync from '../helperFunctions/registerForPushNotifications'
import { DateTime } from 'luxon'
import getTodaysDate from '../helperFunctions/getTodaysDate'

// Export statements
export const UserContext = createContext()
export const useUser = () => {
  return useContext(UserContext)
}

// Device Provider
export function UserProvider({ children }) {
  // User token
  const { userToken } = useAuth()
  // State to manage if the user is using the correct device
  const [correctDevice, setCorrectDevice] = useState(null)
  // State to manage whether the user can submit i.e. if they didn't submit today
  const [canSubmit, setCanSubmit] = useState(false)
  // State to manage the user object
  const [user, setUser] = useState(null)
  const [firstTimeUser, setFirstTimeUser] = useState(null)
  const [showStarterQuestions, setShowStarterQuestions] = useState(null)
  const [experimentalUser, setExperimentalUser] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)

  // Gets and sets the user object
  const getUserDetails = async (token) => {
    if (token) {
      const tempUser = await fetchUser(token)
      setUser(tempUser)
      if (tempUser?.newUser) setShowStarterQuestions(true)
      // Removed push notifications temporarily
      // await registerForPushNotificationsAsync(tempUser, token)
      setLoadingUser(false)
    }
  }

  useEffect(() => {
    getUserDetails(userToken)
  }, [userToken, canSubmit])

  useEffect(() => {
    if (user?.isExperiment) setExperimentalUser(true)
  }, [user])
  // Updates local and backend. Tells the system not to show the starter questions.
  const handleSetShowStarterQuestions = async () => {
    const success = await setStarterAnswers(user.id, userToken)
    // Need to update user details to ensure we get the latest results from updating starter question answers.
    getUserDetails()
    if (success) {
      setShowStarterQuestions(false)
    } else {
      Alert.alert(
        'Submission Failed',
        'There was an issue submitting your data. Please check your internet connection and try again.',
        [{ text: 'OK', onPress: () => console.log('Alert Closed') }]
      )
    }
  }

  // Checks if the user can submit i.e. they haven't submitted today.
  useEffect(() => {
    checkIfUserCanSubmit()
  })

  const checkIfUserCanSubmit = async () => {
    let lastSubmissionDate = await fetchLastSubmissionDate(userToken)
    console.log('Users last submission was', lastSubmissionDate)

    const nowLocal = DateTime.now().setZone('local')
    if (lastSubmissionDate === 'No reports submitted.') {
      if (nowLocal.hour >= variables.startTime && nowLocal.hour < 24) {
        setCanSubmit(true)
        return true
      }
    } else {
      // Convert the last submission date from UTC to the user's local time zone
      const lastSubmissionLocal =
        DateTime.fromISO(lastSubmissionDate).setZone('local')

      // Check if the last submission was on a day before today AND the current time is between 4pm and midnight
      if (
        lastSubmissionLocal.startOf('day') < nowLocal.startOf('day') &&
        nowLocal.hour >= variables.startTime &&
        nowLocal.hour < 24
      ) {
        setCanSubmit(true) // The user can submit
        return true
      }
    }

    setCanSubmit(false) // The user can't submit
    return false
  }

  useEffect(() => {
    if (canSubmit) console.log('User can make a submission.')
    else console.log('User cannot make a submission.')
  }, [canSubmit])

  // Check if the users device is the one they initially logged in with.
  const checkDevice = async (token, id, username) => {
    // If the user is apple then let them in no matter what device they are using.
    if (username === 'apple') {
      setCorrectDevice(true)
      return true
    }
    try {
      const currentDeviceId = await getCurrentDeviceId()
      let registeredDeviceId = await fetchRegisteredDeviceId(token)
      // FOR DEVELOPMENT AND TESTING
      // If deviceid is "any" the user can login.
      if (registeredDeviceId == 'any') {
        setCorrectDevice(true)
        return true
      }
      // If registeredDeviceId is null, this is the user's first login.
      // Store this device's ID.)
      if (registeredDeviceId == null) {
        console.log('Setting registered device.')
        await setRegisteredDeviceId(id, token, currentDeviceId)
        setCorrectDevice(true) // Since we've set this as the user's device, they are on the correct device.
        return true
      }
      // Check if the current device matches the registered device.
      if (currentDeviceId == registeredDeviceId) {
        console.log('User is using the correct device.')
        setCorrectDevice(true)
        return true
      } else {
        console.warn(
          'User is trying to use a different device than the one they registered.'
        )
        setCorrectDevice(false)
        return false
      }
    } catch (error) {
      console.error('Error checking device:', error)
    }
  }

  async function getUserId() {
    return await AsyncStorage.getItem('userId', (err, value) => {
      if (!err) {
        return value
      } else {
        return null
      }
    })
  }

  // Will check if the users device is correct.
  useEffect(() => {
    checkDevice()
  }, [userToken])

  // Works out the time between now and 4pm and then sets a time interval to run at 4pm to check if the user can submit now, which they will be able to.
  useEffect(() => {
    const updateSubmitState = async () => {
      await checkIfUserCanSubmit()
    }

    // Checks once the duration until 4 PM has elapsed
    const timeoutId = setTimeout(updateSubmitState, timeUntilReset())

    // Cleanup function on unmount
    return () => clearTimeout(timeoutId)
  }, [])

  // Everytime the app is made active it will check if the user can submit. This will ensure the correct screen is being shown at all times.
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      subscription.remove()
    }
  }, [])

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // Check and possibly update canSubmit state when app becomes active
      checkIfUserCanSubmit()
    }
    setAppState(nextAppState)
  }

  // Values
  const value = {
    user,
    userToken,
    checkDevice,
    correctDevice,
    canSubmit,
    setCanSubmit,
    checkIfUserCanSubmit,
    getUserDetails,
    getUserId,
    firstTimeUser,
    setFirstTimeUser,
    showStarterQuestions,
    handleSetShowStarterQuestions,
    experimentalUser,
    loadingUser,
    setLoadingUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
