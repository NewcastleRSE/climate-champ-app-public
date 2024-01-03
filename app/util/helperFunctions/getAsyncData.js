import AsyncStorage from '@react-native-async-storage/async-storage'

const getAsyncData = async () => {
  const keys = [
    'question1',
    'question2',
    'question3',
    'question4',
    'question5',
    'question6',
    'question7',
    'question8',
    'question9',
    'question10',
    'question11',
    'question12',
  ]
  const result = {}

  try {
    for (const key of keys) {
      try {
        const value = await AsyncStorage.getItem(key)
        result[key] = JSON.parse(value)
      } catch (e) {
        console.error(`Failed to fetch or parse data for key ${key}:`, e)
      }
    }
  } catch (e) {
    console.error('Error fetching data:', e)
  }

  return result
}

export default getAsyncData
