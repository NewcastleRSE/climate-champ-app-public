import variables from '../data/variables'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Will check if the user has seen the modal already.  Should only open once after the user is able to submit again. If the user closes the modal it should not open again until tomorrow after the time the user is able to submit again.
const shouldShowModalToday = async () => {
  const currentDate = new Date()
  const lastShown = await AsyncStorage.getItem('modalLastShown')

  if (lastShown) {
    const lastShownDate = new Date(lastShown)
    if (lastShownDate.toDateString() === currentDate.toDateString()) {
      return false // Modal has already been shown today
    }
  }

  // Check if current time is past 4 PM
  if (currentDate.getHours() < variables.startTime) {
    return false
  }

  // Save the current timestamp to AsyncStorage
  await AsyncStorage.setItem('modalLastShown', currentDate.toISOString())

  return true
}

export default shouldShowModalToday
