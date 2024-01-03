import React, { useEffect, useState } from 'react'
import { Text, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useUser } from '../util/context/UserContext'
import extractUserScores from '../util/helperFunctions/extractUserScores'

/* Draw the Carbon Score chart */
const CarbonLineChart = () => {
  const { user, canSubmit } = useUser()
  const [scoreLabels, setScoreLabels] = useState(null)
  const [scoreValues, setScoreValues] = useState(null)
  const [scoreHide, setScoreHide] = useState(null)

  // Will re-check the scores when the component comes into focus. After the user makes a submission, the canSubmit variable will change to false and these charts should update with the latest report that was just submitted.
  useEffect(() => {
    if (user?.reports) {
      const [labels, values, hide] = extractUserScores(
        'question1to6OverallCarbonScore',
        user
      )
      setScoreLabels(labels)
      setScoreValues(values)
      setScoreHide(hide)
    }
  }, [user, canSubmit])

  return (
    <>
      <Text>{'\n'}Daily Carbon Footprint (in kg CO2)</Text>
      {scoreLabels && scoreValues && (
        <LineChart
          data={{
            labels: scoreLabels,
            datasets: [{ data: scoreValues }],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          yAxisSuffix={''}
          fromZero={true}
          hidePointsAtIndex={scoreHide}
          withShadow={false}
          chartConfig={{
            backgroundGradientFrom: '#bfffbf',
            backgroundGradientTo: '#5ed75d',
            decimalPlaces: 2,
            color: (opacity = 255) => `rgba(0,0,0, ${opacity})`,
          }}
          style={{
            borderRadius: 6,
          }}
        />
      )}
    </>
  )
}

export default CarbonLineChart
