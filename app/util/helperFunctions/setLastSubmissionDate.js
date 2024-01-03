import axios from 'axios'
import {climateChampURL} from "../../components/Main";

export default async function setLastSubmissionDate(
  userID,
  token,
  lastSubmissionDate
) {
  if (!token) return
  try {
    const data = JSON.stringify({
      lastSubmissionDate: lastSubmissionDate,
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

    return response.data
  } catch (error) {
    console.error(error.message)
  }
}
