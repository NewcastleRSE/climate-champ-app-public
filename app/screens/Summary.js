import React from 'react'
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native'
import {englishStyle} from '../style/englishStyle'
import {generalStyle} from '../style/generalStyle'
import {useUser} from '../util/context/UserContext'
import CivicBehaviourLineChart from '../components/CivicBehaviourLineChart'
import CarbonLineChart from '../components/CarbonLineChart'

// Summary screen which displays graphs showing user report data.
export default function Summary() {
    const {user} = useUser()

    return (
        <SafeAreaView style={generalStyle.container}>
            <Text
                style={[
                    englishStyle.textSubHeader,
                    {
                        alignSelf: 'center',
                        paddingLeft: 0,
                        paddingTop: 15,
                    },
                ]}>
                Summary for {user?.username ?? "you"}
            </Text>

            <View style={{paddingBottom: 10}}/>

            <ScrollView>
                <Text style={englishStyle.textGeneralInfo}>
                    Here you can see your climate action profile, consisting of your daily carbon footprint (the lower
                    the better) based on the answers you provided to questions Q1-6, and your daily civic climate
                    positivity score (the higher the better) based on the answers your provided to questions Q7-9:
                </Text>
                <TouchableWithoutFeedback>
                    <View style={styles.chartContainer}>
                        <CarbonLineChart/>
                        <View/>
                        <View/>
                        <View/>
                        <CivicBehaviourLineChart/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
        paddingBottom: 40,
        gap: 5,
    },
})
