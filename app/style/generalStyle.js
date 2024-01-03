import {Dimensions, Platform, StyleSheet} from 'react-native'

export const screenHeight = Dimensions.get('window').height
export const screenWidth = Dimensions.get('window').width

// Colour scheme
export const primaryColor = '#429928' // Primary Green
export const secondaryColor = '#7D8C79' // Secondary Grey-Like Green
// export const tertiaryColor = '#8a9e8f' // Gray-like Green
export const backButtonBackground = '#eceff3' // Light Gray
export const backButtonBorder = '#848b91' // Deep gray
export const universalBackgroundColor = '#f2f2f2' // Light Gray

export const generalStyle = StyleSheet.create({
    // GENERAL

    screenWidth: {
        width: screenWidth,
    },
    screenWidthPer1point2: {
        width: screenWidth / 1.2,
    },
    screenWidthMinus30: {
        width: screenWidth - 30,
    },
    paddingBottom75: {
        paddingBottom: 75,
    },
    alignItemsCenter: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    height50: {
        height: 50,
    },
    containerCenteredScreen: {
        paddingTop: screenHeight / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: backButtonBackground,
        padding: 10,
        width: screenWidth - screenWidth / 10,
        height: 45,
        margin: 15,
    },
    numberInput: {
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: backButtonBackground,
        padding: 5,
        width: screenWidth / 6,
        height: 40,
        margin: 15,
        fontSize: 18,
        alignContent: 'center',
    },
    otherInput200Characters: {
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: backButtonBackground,
        padding: 5,
        width: screenWidth / 1.2,
        height: 40,
        margin: 15,
        fontSize: 18,
        alignSelf: 'center',
    },
    otherInput100Characters: {
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: backButtonBackground,
        padding: 5,
        width: screenWidth / 1.2,
        height: 20,
        margin: 15,
        fontSize: 18,
        alignSelf: 'center',
    },
    lineBreak: {
        height: 10,
        width: screenWidth,
    },
    longerInput: {
        height: screenHeight * 0.4,
        textAlignVertical: 'top',
    },
    chevronSwipeDialog: {
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 25,
    },
    buttonNavigationView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        paddingTop: 50,
        bottom: 30,
        textAlign: 'center',
    },
    loginImageLogo: {
        height: 150,
        width: 150,
        shadowColor: '#000',
        borderRadius: 15,
        marginBottom: 15,
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                marginTop: 30,
            },
            android: {
                marginTop: 50,
            },
        }),
    },
    locationDeniedView: {
        zIndex: 999,
        backgroundColor: 'brown',
        marginBottom: 50,
        opacity: 0.9,
        borderRadius: 9,
    },

    // MISC

    flexDirectionRow: {
        flexDirection: 'row',
    },
    alignSelfCenter: {
        alignSelf: 'center',
    },
    paddingLeftScreenWidthDividedBy15: {
        paddingLeft: screenWidth / 15,
    },
    paddingBottom50: {
        paddingBottom: 50,
    },

    // BUTTONS

    buttonWide: {
        backgroundColor: primaryColor,
        alignItems: 'center',
        width: 200,
        borderRadius: 15,
        marginTop: 20,
        padding: 18,
        alignSelf: 'center',
    },
    infoButton: {
        marginLeft: screenWidth / 12,
        marginRight: screenWidth / 12,
    },
    noInfoButton: {
        marginLeft: screenWidth / 5,
        marginRight: screenWidth / 5,
    },
    button: {
        backgroundColor: primaryColor,
        borderRadius: 15,
        padding: 16,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    buttonBack: {
        backgroundColor: backButtonBackground,
        borderColor: backButtonBorder,
        borderWidth: 2,
        borderRadius: 15,
        padding: 16,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    // This is used to remove an image taken during submission
    buttonRemove: {
        backgroundColor: secondaryColor,
        padding: 10,
        borderRadius: 8,
        width: 120,
        margin: 10,
        alignItems: 'center',
    },
    // This is used on the submission page to delete the entire submission draft
    buttonDelete: {
        backgroundColor: 'red',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#be0606',
        ...Platform.select({
            ios: {
                padding: 12,
            },
            android: {
                padding: 12,
                marginTop: 30,
            },
        }),
        width: 85,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 5,
    },
    buttonSubmit: {
        backgroundColor: primaryColor,
        width: 200,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        padding: 18,
        marginTop: 8,
        marginBottom: 10,
    },
    buttonLogin: {
        width: 300,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderColor: primaryColor,
        borderWidth: 2,
        borderRadius: 15,
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        marginTop: 30,
    },
    buttonStart: {
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderColor: primaryColor,
        borderWidth: 2,
        borderRadius: 15,
        padding: 12,
        margin: 30,
        width: 300,
    },
    buttonSignUp: {
        alignItems: 'center',
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderWidth: 2,
        borderRadius: 15,
        padding: 12,
        margin: 30,
        width: 300,
    },
    buttonBackFromAbout: {
        width: '20%',
        margin: 5,
        padding: 5,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: backButtonBorder,
        borderColor: backButtonBorder,
        borderWidth: 2,
        borderRadius: 6,
    },
    buttonEditOnReview: {
        backgroundColor: secondaryColor,
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        marginRight: 15,
    },
    buttonPicked: {
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: 65,
        borderRadius: 15,
        padding: 8,
        margin: 10,
    },
    buttonNotPicked: {
        backgroundColor: backButtonBackground,
        borderColor: backButtonBorder,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: 65,
        borderRadius: 15,
        padding: 8,
        margin: 10,
    },
    buttonPickedWide: {
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: 100,
        borderRadius: 15,
        padding: 8,
        margin: 10,
    },
    buttonNotPickedWide: {
        backgroundColor: backButtonBackground,
        borderColor: backButtonBorder,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: 100,
        borderRadius: 15,
        padding: 8,
        margin: 10,
    },

    // TEXT

    titleLogin: {
        marginBottom: 50,
        fontWeight: 'bold',
        fontSize: 19,
        color: primaryColor,
        alignSelf: 'center',
    },
    textBottomScreenIndicator: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBackButton: {
        fontSize: 18,
    },
    textWarning: {
        color: 'red',
        fontSize: 14,
        paddingLeft: screenWidth / 20,
        alignSelf: 'flex-start',
    },
    locationDeniedText: {
        alignSelf: 'center',
        fontSize: 17,
        padding: 10,
        color: 'white',
    },
    textNotPicked: {
        fontSize: 18,
        fontWeight: '500',
    },
    fontWeight500: {
        fontWeight: '500',
    },

    // IMAGES

    imagePreview: {
        height: screenHeight / 4,
        width: screenWidth - 20,
        borderRadius: 5,
        margin: 10,
    },
    androidNeedsExtraCareOnBorderWidthAnnoyingly: {
        ...Platform.select({
            android: {
                borderWidth: 1,
                borderRadius: 10,
                marginRight: 10,
                marginLeft: 10,
            },
        }),
    },
    loaderContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
})
