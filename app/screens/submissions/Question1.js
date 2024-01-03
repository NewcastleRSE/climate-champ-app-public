import React, {useState} from 'react'
import SingleValueQuestion from '../../components/SingleValueQuestion'

export default function Question1({navigation}) {
    const UPPER_BOUND = 600 // Estimated max miles one can drive in a day.
    const LOWER_BOUND = 0 // Can be less than 1 mile.
    const [didUseCar, setDidUseCar] = useState(false)
    const [milesDriven, setMilesDriven] = useState(0)
    const [invalidAnswer, setInvalidAnswer] = useState(false)
    const STORAGE_KEYS = ['didUseCar', 'milesDriven']


    return (
        <SingleValueQuestion
            pageNumber={1}
            questionText="Did you use a car or taxi today?"
            questionText2="How many miles did you drive approximately?"
            unitSingular="mile"
            unitPlural="miles"
            answer={didUseCar}
            setAnswer={setDidUseCar}
            value={milesDriven}
            setValue={setMilesDriven}
            upperBound={UPPER_BOUND}
            lowerBound={LOWER_BOUND}
            invalidAnswer={invalidAnswer}
            setInvalidAnswer={setInvalidAnswer}
            answer1={didUseCar}
            setAnswer1={setDidUseCar}
            answer2={milesDriven}
            setAnswer2={setMilesDriven}
            navigation={navigation}
            storageKeys={STORAGE_KEYS}
        />
    )
}
