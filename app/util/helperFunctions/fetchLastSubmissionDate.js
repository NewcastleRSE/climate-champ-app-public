import axios from 'axios'
import {climateChampURL} from "../../components/Main";

export default async function fetchLastSubmissionDate(token) {
  if (!token) return
  try {
    const response = await axios.get(
      `${climateChampURL}/api/users/me?populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.data.reports.length > 0) {
      console.log(
        'return',
        response.data.reports[response.data.reports.length - 1].dateSubmitted
      )
      return response.data.reports[response.data.reports.length - 1]
        .dateSubmitted
    } else {
      return 'No reports submitted.'
    }
  } catch (error) {
    console.error(error.message)
    return 'Error retrieving submission date'
  }
}
