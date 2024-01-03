import React, {useState} from 'react'
import SingleValueQuestion from '../../components/SingleValueQuestion'

export default function Question5({navigation}) {
    const UPPER_BOUND = 24
    const LOWER_BOUND = 0
    const [didUseHeating, setDidUseHeating] = useState(false)
    const [hoursUsedHeating, setHoursUsedHeating] = useState(0)
    const [invalidAnswer, setInvalidAnswer] = useState(false)
    const STORAGE_KEYS = ['didUseHeating', 'hoursUsedHeating']


    return (
        <SingleValueQuestion
            pageNumber={5}
            questionText="Did you have your heating on today?"
            questionText2="For how many hours?"
            unitSingular="hour"
            unitPlural="hours"
            answer={didUseHeating}
            setAnswer={setDidUseHeating}
            value={hoursUsedHeating}
            setValue={setHoursUsedHeating}
            upperBound={UPPER_BOUND}
            lowerBound={LOWER_BOUND}
            invalidAnswer={invalidAnswer}
            setInvalidAnswer={setInvalidAnswer}
            answer1={didUseHeating}
            setAnswer1={setDidUseHeating}
            answer2={hoursUsedHeating}
            setAnswer2={setHoursUsedHeating}
            navigation={navigation}
            storageKeys={STORAGE_KEYS}
        />
    )
}
