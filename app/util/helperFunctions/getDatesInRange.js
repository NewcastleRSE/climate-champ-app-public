/* Date functions adapted from
 * https://stackoverflow.com/questions/71568920/get-all-dates-between-2-dates-javascript
 */
export default function getDatesInRange(startDate, endDate) {
  const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
  const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0))
  const date = new Date(start.getTime())
  const dates = []
  while (date <= end) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return dates
}
