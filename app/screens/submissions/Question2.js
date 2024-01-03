import React, {useState} from 'react'
import SingleValueQuestion from '../../components/SingleValueQuestion'

export default function Question2({navigation}) {
    const UPPER_BOUND = 19 // Longest flight length.
    const LOWER_BOUND = 0
    const [didTakePlane, setDidTakePlane] = useState(false)
    const [hoursOfFlightLength, setHoursOfFlightLength] = useState(0)
    const [invalidAnswer, setInvalidAnswer] = useState(false)
    const STORAGE_KEYS = ['didTakePlane', 'hoursOfFlightLength']


    return (
        <SingleValueQuestion
            pageNumber={2}
            questionText="Did you take a flight today?"
            questionText2="How long was the flight?"
            unitSingular="hour"
            unitPlural="hours"
            answer={didTakePlane}
            setAnswer={setDidTakePlane}
            value={hoursOfFlightLength}
            setValue={setHoursOfFlightLength}
            upperBound={UPPER_BOUND}
            lowerBound={LOWER_BOUND}
            invalidAnswer={invalidAnswer}
            setInvalidAnswer={setInvalidAnswer}
            answer1={didTakePlane}
            setAnswer1={setDidTakePlane}
            answer2={hoursOfFlightLength}
            setAnswer2={setHoursOfFlightLength}
            navigation={navigation}
            storageKeys={STORAGE_KEYS}
        />
    )
}
