import axios from 'axios'
import {climateChampURL} from "../../components/Main";

export default async function submitQuestion(token, data, questionNumber) {
  if (!data.user || !data.dateSubmitted) {
    console.log('Missing required fields.')
    return
  }
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${climateChampURL}/api/question-${questionNumber}?populate=*`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: { data },
  }

  try {
    const response = await axios.request(config)
    console.log(JSON.stringify(response.data))
    return response.data
  } catch (error) {
    console.log('Error', error.message)
  }
}
