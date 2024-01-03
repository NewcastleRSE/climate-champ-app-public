import axios from 'axios'
import {climateChampURL} from "../../components/Main";

// Submits a report to the backend. The report contains the id of 12 questions, a user id, submission date and two carbon scores.
export default async function submitReport(
  user,
  token,
  report,
  date,
  carbonScore1,
  carbonScore2
) {
  let data = JSON.stringify({
    data: {
      user: user,
      question_1: report[0],
      question_2: report[1],
      question_3: report[2],
      question_4: report[3],
      question_5: report[4],
      question_6: report[5],
      question_7: report[6],
      question_8: report[7],
      question_9: report[8],
      question_10: report[9],
      question_11: report[10],
      question_12: report[11],
      dateSubmitted: date,
      question1to6OverallCarbonScore: carbonScore1,
      question7to9OverallCarbonScore: carbonScore2,
    },
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${climateChampURL}/api/reports?populate=&`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  }

  try {
    const response = await axios.request(config)
    console.log(JSON.stringify(response.data))
    console.log('report response data', response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
