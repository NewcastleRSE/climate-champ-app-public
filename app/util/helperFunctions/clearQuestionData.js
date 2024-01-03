import AsyncStorage from '@react-native-async-storage/async-storage'

const clearQuestionData = async () => {
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

  try {
    for (const key of keys) {
      try {
        await AsyncStorage.removeItem(key)
      } catch (e) {
        console.error(`Failed to remove data for key ${key}:`, e)
      }
    }
    console.log('Data cleared successfully')
  } catch (e) {
    console.error('Error clearing data:', e)
  }
}

export default clearQuestionData
