import fetchLastSubmissionDate from './fetchLastSubmissionDate'

// Will return when the user can next submit.
const hasUserSubmittedBefore = async (token) => {
  const lastSubmissionDate = await fetchLastSubmissionDate(token)

  if (
    lastSubmissionDate === 'No reports submitted.' ||
    lastSubmissionDate === 'Error retrieving submission date' ||
    !lastSubmissionDate
  )
    return false
  else return true
}
export default hasUserSubmittedBefore
