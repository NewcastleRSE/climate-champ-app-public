import { DateTime } from 'luxon'
import fetchLastSubmissionDate from './fetchLastSubmissionDate'
import variables from '../data/variables'

const getNextSubmissionDay = async (token) => {
  const lastSubmissionDate = await fetchLastSubmissionDate(token)
  console.log('lastSubmissionDate', lastSubmissionDate)

  // Get the current local date-time
  const today = DateTime.now()
  console.log('today', today)

  // Convert lastSubmissionDate to local time
  const lastSubmissionDateTime =
    DateTime.fromISO(lastSubmissionDate).setZone('local')

  if (lastSubmissionDate === 'No reports submitted.') {
    if (today.hour >= variables.startTime) {
      return 'now'
    } else {
      return 'today after 4PM'
    }
  }

  console.log('today start', today.startOf('day'))
  if (lastSubmissionDateTime >= today.startOf('day')) {
    console.log('not being reached')
    return 'tomorrow at 4PM'
  } else {
    if (today.hour >= variables.startTime) {
      console.log('being reached')
      return 'now'
    } else {
      return 'today at 4PM'
    }
  }
}

export default getNextSubmissionDay
