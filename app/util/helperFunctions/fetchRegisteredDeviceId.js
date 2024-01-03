import axios from 'axios'
import {climateChampURL} from "../../components/Main";

export default async function fetchRegisteredDeviceId(token) {
  if (!token) return
  try {
    const response = await axios.get(
      `${climateChampURL}/api/users/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data.deviceID
  } catch (error) {
    console.error(error.message)
  }
}
