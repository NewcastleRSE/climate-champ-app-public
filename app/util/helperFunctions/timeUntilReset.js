import variables from '../data/variables'

// Will work out how long left until the reset time. Which is the current start date for when a user can submit.
const timeUntilReset = () => {
  const now = new Date()
  const resetTime = new Date(now)
  resetTime.setHours(variables.startTime, 0, 0, 0) // Sets the time to the reset time

  // If it's already past the reset time, set it to the reset time on the next day
  if (now > resetTime) {
    resetTime.setDate(resetTime.getDate() + 1)
  }

  return resetTime - now // Returns time in milliseconds until the time of reset.
}

export default timeUntilReset
