import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import YesNoQuestion from '../../components/YesNoQuestion'
import CheckboxesSection from '../../components/CheckboxSection'
import {englishStyle} from '../../style/englishStyle'
import {
    generalStyle,
    universalBackgroundColor,
} from '../../style/generalStyle'
import RadioButtonSection from '../../components/RadioButtonSection'
import data from './Question7Data.json'
import useNavigateToWelcomeScreen from '../../util/helperFunctions/useNavigateToWelcomeScreen'

const reactionData = data.reactionData // Formatted as the backend expects.
const contactsData = data.contactsData // Default keys and falsey values.
const talkedToOptions = data.talkedToOptions // Keys are fields. Values are the text that is displayed to the user.
const reactionOptions = data.reactionOptions // Keys are fields. Values are the text that is displayed to the user.

// Question 7 - Did you talk to anyone about climate change today?
export default function Question7({navigation}) {
    useNavigateToWelcomeScreen(navigation)
    const [responses, setResponses] = useState(reactionData)
    const [didSpeakAboutClimateChange, setDidSpeakAboutClimateChange] =
        useState(false) // Answer to the yes or no question.
    const [currentPage, setCurrentPage] = useState(1) // Tracks the current page. 1 is for selecting contacts and 2 is for reactions.
    const [contacts, setContacts] = useState(contactsData) // Contacts are all of the contacts
    const [activeContacts, setActiveContacts] = useState([]) // Active contacts are contacts that have been selected.
    const [activeContactIndex, setActiveContactIndex] = useState(0) // This is the current index of contacts.

    // Fetches saved data from async storage and assigns it. As the only data saved is the responses, this function also updates the contacts and activeContacts states. Also needs to update the didSpeakAboutClimateChange state as well based on if any of the values are not 'didNotTalk'.
    useEffect(() => {
        const getPreviousAnswers = async () => {
            const response = await AsyncStorage.getItem('question7')
            if (response) {
                const previousAnswers = JSON.parse(response)
                setResponses(previousAnswers)

                // Update contacts
                const contactsFromPreviousAnswers = Object.keys(previousAnswers).reduce(
                    (acc, key) => {
                        acc[key] = previousAnswers[key] !== 'didNotTalk'
                        return acc
                    },
                    {}
                )
                setContacts(contactsFromPreviousAnswers)

                // If the user selected that they talked to someone.
                const didSpeak = Object.values(previousAnswers).some(
                    (answer) => answer !== 'didNotTalk'
                )
                setDidSpeakAboutClimateChange(didSpeak)

                // Update active contacts
                const truthyContactsFromPreviousAnswers = Object.keys(
                    contactsFromPreviousAnswers
                ).filter((key) => contactsFromPreviousAnswers[key])
                setActiveContacts(truthyContactsFromPreviousAnswers)
            }
        }
        getPreviousAnswers()
    }, [])

    // Whenever the contacts state changes we need to check to see if any of the contacts are now active. They are active if they have a true value. We need to also assign a reaction of 'didNotTalk' to any falsey values. This is because of the difference in data structures, if the user deselects a contact, we need to ensure we also reset their reaction to 'didNotTalk'.
    useEffect(() => {
        const truthyContacts = Object.keys(contacts).filter((key) => contacts[key])
        const falseyContacts = Object.keys(contacts).filter((key) => !contacts[key])
        // Updates active contacts with all the contacts that are truthy.
        setActiveContacts(truthyContacts)

        // Updates responses and sets all of the contacts that were falsey to 'didNotTalk'.
        setResponses((prevResponses) => {
            let updatedResponses = {...prevResponses}
            falseyContacts.forEach((key) => {
                updatedResponses[key] = 'didNotTalk'
            })
            return updatedResponses
        })
    }, [contacts])

    // If the user selects no, regardless of where they are in the process, we need to fully reset all our ta structures and and put them back to page 1.
    useEffect(() => {
        if (!didSpeakAboutClimateChange) {
            setContacts(contactsData)
            setActiveContacts([])
            setActiveContactIndex(0)
            setResponses(reactionData)
            setCurrentPage(1)
        }
    }, [didSpeakAboutClimateChange])

    // Handles the reaction changing for the active contacts. Grabs the name of the key by getting the index of the active contacts.
    const handleReactionChange = (reaction) => {
        setResponses((prev) => ({
            ...prev,
            [activeContacts[activeContactIndex]]: reaction,
        }))
    }

    // Handles pressing the Next button.
    const handleNext = () => {
        // If the user has said that they spoke to someone but didn't select a contact then an alert will appear.
        if (!didSpeakAboutClimateChange) {
            AsyncStorage.setItem('question7', JSON.stringify(responses))
            navigation.navigate('Question8')
        }
        if (currentPage === 1 && didSpeakAboutClimateChange) {
            if (activeContacts.length === 0) {
                alert('Please select at least one contact.')
                return
            }
            // If they did select someone then we need to go to page 2. Page 2 is a series of sub pages, of which the size is decided by how many contacts are active.
            setCurrentPage(2)
            setActiveContactIndex(0) // This will increase as next is pressed and basically goes through each contact.
            // If the user is on the reaction pages..
        } else if (currentPage === 2) {
            // Get the current contacts reaction
            const currentContactReaction =
                responses[activeContacts[activeContactIndex]]
            // If they haven't selected a reaction then display an alert.
            if (currentContactReaction == 'didNotTalk') {
                alert(
                    `Please select how ${talkedToOptions[
                        activeContacts[activeContactIndex]
                        ].toLowerCase()} reacted. If you did not speak to ${talkedToOptions[
                        activeContacts[activeContactIndex]
                        ].toLowerCase()} about Climate Change today, press Back and unselect them.`
                )
                // If there are more contacts to assign reactions then increase the index and go to the next contact.
            } else if (activeContactIndex !== activeContacts.length - 1) {
                setActiveContactIndex(activeContactIndex + 1)
                // If there are no more contacts then go to question 8 and save the response data in storage.
            } else {
                AsyncStorage.setItem('question7', JSON.stringify(responses))
                navigation.navigate('Question8')
            }
        }
    }

    // Handles pressing the Prev button.
    const handlePrev = () => {
        // If the user is on the reaction page and there are more activeContacts to go back through then go back to the previous reaction page.
        if (currentPage === 2 && activeContactIndex > 0) {
            setActiveContactIndex(activeContactIndex - 1)
            // If not then just go to page 1 - the contact page.
        } else if (currentPage === 2) {
            setCurrentPage(1)
            // If currentPage is 1 then go back to question 6 and save response data.
        } else {
            AsyncStorage.setItem('question7', JSON.stringify(responses))
            navigation.goBack()
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={generalStyle.container}>
                <Text
                    style={[
                        englishStyle.textHeader,
                        generalStyle.flex1,
                        generalStyle.height50,
                    ]}>
                    Question 7
                </Text>
                <View style={{flex: 10}}>
                    <Text
                        style={[englishStyle.textGeneralInfo, generalStyle.fontWeight500]}>
                        Did you speak to anyone about climate change today?
                    </Text>

                    <YesNoQuestion
                        answer={didSpeakAboutClimateChange}
                        setAnswer={setDidSpeakAboutClimateChange}
                    />
                    {/* If the user did speak about climate change then show checkbox options for the user to select who they talked to */}
                    {didSpeakAboutClimateChange && currentPage === 1 && (
                        <CheckboxesSection
                            title="Who did you talk to?"
                            options={talkedToOptions}
                            state={contacts}
                            setState={setContacts}
                        />
                    )}

                    {/* If the user did speak about climate change and they're not on the contact page, they should be on the reaction page which will be dynamically populated based on the information related to the index of activeContacts. */}
                    {didSpeakAboutClimateChange && currentPage === 2 && (
                        <RadioButtonSection
                            title={`What Was The Reaction Of ${
                                talkedToOptions[activeContacts[activeContactIndex]]
                            }?`}
                            options={reactionOptions}
                            state={responses[activeContacts[activeContactIndex]]}
                            setState={handleReactionChange}
                        />
                    )}
                </View>

                {/* Bottom of the page which contains the back btn, previous btn and page counter. */}
                <View
                    style={[
                        generalStyle.flexDirectionRow,
                        generalStyle.alignSelfCenter,
                        generalStyle.paddingBottom50,
                        {backgroundColor: universalBackgroundColor, paddingTop: 5},
                    ]}>
                    <TouchableOpacity
                        style={generalStyle.buttonBack}
                        onPress={handlePrev}>
                        <Text style={generalStyle.textBackButton}>Back</Text>
                    </TouchableOpacity>

                    <View style={generalStyle.noInfoButton}/>

                    <TouchableOpacity style={generalStyle.button} onPress={handleNext}>
                        <Text style={generalStyle.textButton}>Next</Text>
                    </TouchableOpacity>
                </View>

                <Text style={generalStyle.textBottomScreenIndicator}>(7 of 12)</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
