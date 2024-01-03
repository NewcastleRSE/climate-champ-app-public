import * as Device from 'expo-device'
import 'react-native-gesture-handler'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import { generalStyle } from '../../style/generalStyle'
import setUserPushToken from './setUserPushToken'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default async function registerForPushNotificationsAsync(
  user,
  userToken
) {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
      console.log(finalStatus)
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: '874073df-c42a-417e-9761-f3374a90fabb',
    })
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: generalStyle.secondaryColor,
    })
  }

  if (token && user) {
    await setUserPushToken(user.id, userToken, token.data)
  }

  return token
}
