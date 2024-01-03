import variables from '../data/variables'

const getDaysIntoStudy = () => {
  const [year, month, day] = variables.startDate.split('-').map(Number)
  const startDate = new Date(year, month - 1, day) // Months are 0-indexed

  // Get current date and strip off the time
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // Compute the difference in milliseconds
  const diff = currentDate - startDate

  // Convert the difference into days
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  // If user opens the app before the study starts.
  if (days < 0) return 0
  return days
}

export default getDaysIntoStudy
