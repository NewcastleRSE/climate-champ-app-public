import { useFocusEffect } from '@react-navigation/native'
import variables from '../data/variables'
import React from 'react'

export default function useNavigateToWelcomeScreen(navigation) {
  useFocusEffect(
    React.useCallback(() => {
      const checkTimeAndNavigate = () => {
        const now = new Date()
        const currentHour = now.getHours()
        // Check if the current time is between midnight and 4 pm
        if (currentHour >= 0 && currentHour < variables.startTime) {
          navigation.navigate('Welcome')
        }
      }
      // Immediate check when the screen is focused
      checkTimeAndNavigate()
      // Check at midnight
      const timeUntilMidnight = timeUntilHour(24)
      const intervalForMidnight = setTimeout(() => {
        checkTimeAndNavigate()
      }, timeUntilMidnight)
      // Clean up the intervals
      return () => {
        clearTimeout(intervalForMidnight)
      }
    }, [navigation])
  )
}

function timeUntilHour(hour) {
  const now = new Date()
  const targetTime = new Date(now)
  targetTime.setHours(hour, 0, 0, 0)
  if (now >= targetTime) {
    targetTime.setDate(now.getDate() + 1)
  }
  return targetTime - now
}
