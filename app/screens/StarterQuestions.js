import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {
    StarterQuestion1,
    StarterQuestion2,
    StarterQuestion3,
} from './submissions'

export default function StarterQuestions() {
    return (
        <NavigationContainer independent={true}>
            <StarterQuestionsStack/>
        </NavigationContainer>
    )
}

function StarterQuestionsStack() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="StarterQuestion1"
                component={StarterQuestion1}
                options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
                name="StarterQuestion2"
                component={StarterQuestion2}
                options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
                name="StarterQuestion3"
                component={StarterQuestion3}
                options={{headerShown: false, gestureEnabled: false}}
            />
        </Stack.Navigator>
    )
}
