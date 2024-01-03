import getDatesInRange from './getDatesInRange'
/*
 * Extract the user's scores from the data structure
 */
export default function extractUserScores(category, user) {
  // Throws error if no category or user are passed in
  if (!user || !category) {
    throw new Error('User or Category is undefined')
  }

  /* Const processing length */
  const maxItems = 7

  /* Dates for plotting - 1 week backwards from current date */
  let today = new Date()
  let past = new Date()
  past.setDate(today.getDate() - maxItems + 1)
  let dateArray = getDatesInRange(past, today)
  dateArray = dateArray.map(function (item) {
    return (
      ('0' + item.getDate()).slice(-2) +
      '/' +
      ('0' + (item.getMonth() + 1)).slice(-2)
    )
  })

  /*
   * Take the last 7 scores maximum. This assumes that the scores are
   * in strict temporal order with the latest at the end of the array.
   * If there's no data, return an empty values array (see end for
   * required LineChart bug workaround) - remember also hideArray!!!
   */
  let scores = user?.reports
  if (scores?.length > maxItems) {
    scores = scores?.slice(-maxItems)
  } else if (scores?.length === 0) {
    /* Return no data */
    let valArray = new Array(maxItems).fill(null)
    let hideArray = Array.from(Array(maxItems).keys())
    valArray[0] = 0
    return [dateArray, valArray, hideArray]
  }

  /* Map the scores data to something more tractable */
  scores = scores?.map(function (item) {
    item['dateSubmitted'] = item['dateSubmitted'].split('T')[0]
    ymd = item['dateSubmitted'].split('-')
    item = { [ymd[2] + '/' + ymd[1]]: item[category] }
    return item
  })
  scores = scores?.reduce(function (current, next) {
    return Object.assign(current, next)
  }, {})

  /* Values for plotting, corresponding to the dates */
  let valArray = []
  dateArray.forEach(function (val, idx, arr) {
    valArray?.push(scores[val])
  })
  /* Convert "undefined" to "null" for plotting */
  valArray = valArray?.map(function (item) {
    if (item == undefined) {
      return 0
    }
    return item
  })

  /*
   * Fix up data to get around a very specific bug in LineChart:
   *   - if the data has only one non-null value and that is
   *     zero, then LineChart will raise an exception
   *   - to get around this, if there is only one data point
   *     and that is zero, then make the first data point zero
   */
  let zeros = 0
  let nulls = 0
  valArray?.forEach(function (val, idx, arr) {
    switch (val) {
      case null: {
        nulls++
        break
      }
      case 0: {
        zeros++
        break
      }
    }
  })
  if ((nulls === maxItems - 1 && zeros === 1) || nulls === maxItems) {
    valArray[0] = 0
  }

  /* Fix for "no data", i.e. when values in valArray===null */
  let hideArray = []
  valArray?.forEach((val, idx, arr) => {
    if (val === null) {
      dateArray[idx] = dateArray[idx]
        .split('')
        .map((char) => char + '\u0336')
        .join('')
      hideArray.push(idx)
    }
  })

  return [dateArray, valArray, hideArray]
}
