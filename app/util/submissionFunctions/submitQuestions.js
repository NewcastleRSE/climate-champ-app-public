import getAsyncData from '../helperFunctions/getAsyncData'
import submitQuestion from './submitQuestion'
import submitReport from './submitReport'
import convertQuestionNumber from './convertQuestionNumber'
import getTodaysDate from '../helperFunctions/getTodaysDate'
import getCarbonScore from '../carbonAlgorithm/carbon_algorithm'

export default async function submitQuestions(user, token) {
  try {
    const storage = await getAsyncData()
    const date = getTodaysDate()

    let carbonScore1 = 0 // Carbon Data
    let carbonScore2 = 0 // Civic Behaviour Data

    let questionPromises = Object.keys(storage).map(
      async (questionKey, index) => {
        const questionNumber = index + 1
        const questionData = storage[questionKey]

        let carbonScore
        if (questionNumber > 0 && questionNumber < 10) {
          carbonScore = parseFloat(
            getCarbonScore(questionData, questionNumber, user).toFixed(2)
          )
          if (questionNumber <= 6) {
            carbonScore1 += carbonScore
          } else {
            carbonScore2 += carbonScore
          }
        }

        return await submitQuestion(
          token,
          {
            ...questionData,
            user: user.id,
            dateSubmitted: date,
            carbonScore,
          },
          convertQuestionNumber(questionNumber, user)
        )
      }
    )

    let responses = await Promise.all(questionPromises)

    let report = responses
      .map((response) => response?.data?.id)
      .filter((value) => value !== undefined)

    carbonScore1 = carbonScore1.toFixed(2)
    carbonScore2 = carbonScore2.toFixed(2)

    try {
      const response = await submitReport(
        user,
        token,
        report,
        date,
        carbonScore1,
        carbonScore2
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
    console.log('All questions and the report were submitted successfully')
  } catch (error) {
    console.log('Error', error.message)
  }
}
