import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AboutView from './AboutView'
import AboutDetails from './AboutDetails'
import Help from './Help'

export default function About() {
    return (
        <NavigationContainer independent={true}>
            <AboutStack/>
        </NavigationContainer>
    )
}

function AboutStack() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'AboutView'}
                component={AboutView}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name={'AboutDetails'}
                component={AboutDetails}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name={'Help'}
                component={Help}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    unmountOnBlur: true,
                }}
            />
        </Stack.Navigator>
    )
}
