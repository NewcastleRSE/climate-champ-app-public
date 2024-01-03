import axios from 'axios'
import {climateChampURL} from "../../components/Main";

export default async function setRegisteredDeviceId(userID, token, deviceID) {
  if (!token) return
  try {
    const data = JSON.stringify({
      deviceID: deviceID,
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
