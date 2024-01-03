import axios from 'axios'
import {climateChampURL} from "../../components/Main";

// Fetches user if there's a valid token.
export default async function fetchUser(token) {
  console.log(token)
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
    return response.data
  } catch (error) {
    console.error(error.message)
  }
}
