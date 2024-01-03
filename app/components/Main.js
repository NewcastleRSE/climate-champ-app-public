import React, { useState, useEffect, useRef } from 'react'
import 'react-native-gesture-handler'
import { StatusBar, Appearance, Platform, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Submission from '../screens/Submission'
import About from '../screens/about/About'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import ForgotPassword from '../screens/ForgotPassword'
import { I18n } from 'i18n-js'
import { translations } from '../locale/translations'
import { primaryColor } from '../style/generalStyle'
import { useUser } from '../util/context/UserContext'
import { useAuth } from '../util/context/AuthContext'
import StarterQuestions from '../screens/StarterQuestions'
import Summary from '../screens/Summary'
import * as Notifications from 'expo-notifications'

export const climateChampURL = process.env.EXPO_PUBLIC_API_URL

export const Main = () => {
  const { dispatch, userToken } = useAuth()
  const { showStarterQuestions, correctDevice } = useUser()
  const [isArabic, setIsArabic] = useState(null)

  const i18n = new I18n(translations)
  i18n.locale = isArabic ? 'ar' : 'en'

  const Tab = createBottomTabNavigator()
  const Stack = createStackNavigator()

  const colorScheme = Appearance.getColorScheme()

  let content
  // Create content based on if the user has logged in and if the user needs to see the starter questions. This content variable will be rendered below.
  if (correctDevice && userToken) {
    if (!showStarterQuestions) {
      content = (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'About') {
                iconName = focused ? 'list' : 'list-outline'
              } else if (route.name === 'Submission') {
                iconName = focused ? 'create' : 'create-outline'
              } else if (route.name === 'Summary') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: primaryColor,
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Submission"
            component={Submission}
            options={{ headerShown: false, title: 'Questions' }}
          />
          <Tab.Screen
            name="Summary"
            component={Summary}
            options={{ headerShown: false, title: 'Summary' }}
          />
          <Tab.Screen
            name="About"
            component={About}
            options={{ headerShown: false, title: String(i18n.t('about')) }}
          />
        </Tab.Navigator>
      )
    } else {
      content = (
        <Stack.Navigator>
          <Stack.Screen
            name="StarterQuestions"
            options={{ headerShown: false }}>
            {({ navigation }) => (
              <StarterQuestions dispatcher={dispatch} navigation={navigation} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )
    }
  } else {
    content = (
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {({ navigation }) => (
            <Login dispatcher={dispatch} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false, gestureEnabled: false }}>
          {({ navigation }) => (
            <SignUp dispatcher={dispatch} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? (
        <StatusBar
          backgroundColor={colorScheme === 'Light' ? '#fff' : '#000'}
          barStyle={colorScheme === 'Light' ? 'light-content' : 'dark-content'}
        />
      ) : null}
      {content}
    </NavigationContainer>
  )
}
