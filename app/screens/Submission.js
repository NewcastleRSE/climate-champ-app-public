import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    Question6,
    Question7,
    Question8,
    Question9,
    Question10,
    Question11,
    Question12,
} from './submissions'
import Welcome from './Welcome'

export default function Submission() {
    return (
        <NavigationContainer independent={true}>
            <SubmissionStack/>
        </NavigationContainer>
    )
}

function SubmissionStack() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
                name="Question1"
                component={Question1}
                options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
                name="Question2"
                component={Question2}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question3"
                component={Question3}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question4"
                component={Question4}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question5"
                component={Question5}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question6"
                component={Question6}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question7"
                component={Question7}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question8"
                component={Question8}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question9"
                component={Question9}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question10"
                component={Question10}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question11"
                component={Question11}
                options={{headerShown: false, gestureEnabled: false}}
            />

            <Stack.Screen
                name="Question12"
                component={Question12}
                options={{headerShown: false, gestureEnabled: false}}
            />
        </Stack.Navigator>
    )
}
