import axios from 'axios'
import {climateChampURL} from "../../components/Main";

// Fetches user if there's a valid token.
export default async function setUserPushToken(user, token, pushToken) {
  let data = JSON.stringify({
    pushToken,
  })

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `${climateChampURL}/api/users/${user}?populate=*`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}
