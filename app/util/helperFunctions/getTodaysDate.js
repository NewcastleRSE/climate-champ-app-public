import { DateTime } from 'luxon'

export default function getTodaysDate() {
  // Get the current date in UTC time. This will be sent to Strapi as UTC but displayed in Strapi as local time.
  const now = DateTime.now().toUTC()

  // Format the date to the desired format (without seconds)
  const isoString = now.toISO().substring(0, 16) + ':00'
  // Example format: 2023-01-31T12:45:00
  console.log('todays date', isoString)
  return isoString
}
