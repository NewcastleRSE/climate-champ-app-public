import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {climateChampURL} from "../../components/Main";

export async function setStarterAnswers(userID, token) {
  if (!token) return
  // Fetch the answers from AsyncStorage
  const carType = await AsyncStorage.getItem('StarterQuestion1')
  const heaterType = await AsyncStorage.getItem('StarterQuestion2')
  const averageElectricityConsumptionInKwh = await AsyncStorage.getItem(
    'StarterQuestion3'
  )

  try {
    const data = JSON.stringify({
      newUser: false,
      carType,
      heaterType,
      averageElectricityConsumptionInKwh,
    })

    const response = await axios.put(
      `${climateChampURL}/api/users/${userID}?populate=*&`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return true
  } catch (error) {
    console.error(error.message)
    return false
  }
}
