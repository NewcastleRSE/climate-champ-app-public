import AsyncStorage from '@react-native-async-storage/async-storage'

const getLastSubmissionDate = async () => {
  const storedDateStr = await AsyncStorage.getItem('lastSubmissionDate')

  if (!storedDateStr) {
    return null
  }

  return new Date(storedDateStr)
}

export default getLastSubmissionDate
