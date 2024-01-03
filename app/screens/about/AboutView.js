import React from 'react'
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    View,
    FlatList,
} from 'react-native'
import {englishStyle} from '../../style/englishStyle'
import {translations} from '../../locale/translations'
import {generalStyle} from '../../style/generalStyle'
import {useAuth} from '../../util/context/AuthContext'
import {I18n} from 'i18n-js'
import Constants from 'expo-constants'

export default function AboutView({navigation}) {
    const {signOut} = useAuth()
    const i18n = new I18n(translations)
    i18n.locale = 'en'

    const menuOptions = [
        {
            id: '1',
            name: String(i18n.t('about')),
            nav: 'AboutDetails',
        },
        {
            id: '2',
            name: 'Instructions',
            nav: 'Help',
        },
    ]

    // Render Settings Menu List
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(String(item.nav), {item})
                }}
                style={{backgroundColor: '#f0f0f0'}}>
                <View style={englishStyle.listView}>
                    <Text style={{fontSize: 20, fontWeight: '500'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

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
                {String(i18n.t('appName'))}
            </Text>

            <FlatList
                data={menuOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={[englishStyle.screenWidth, {paddingTop: 10}]}
            />

            <View style={{paddingBottom: 40}}/>

            <TouchableOpacity
                style={[generalStyle.buttonSignUp, generalStyle.alignItemsCenter]}
                onPress={() =>
                    Alert.alert(
                        String(i18n.t('signOut')),
                        String(i18n.t('signOutMessage')),
                        [
                            {
                                text: String(i18n.t('signOut')),
                                style: 'destructive',
                                onPress: () => {
                                    signOut()
                                },
                            },
                            {
                                text: String(i18n.t('cancelButton')),
                            },
                        ]
                    )
                }>
                <Text style={generalStyle.textButton}>{String(i18n.t('signOut'))}</Text>
            </TouchableOpacity>
            <Text style={[englishStyle.textGeneralInfo, {alignSelf: 'center'}]}>{Constants.expoConfig.version}</Text>
        </SafeAreaView>
    )
}
