import {Dimensions, StyleSheet, Platform} from 'react-native'
import {
    primaryColor,
    secondaryColor,
    backButtonBackground,
    backButtonBorder,
} from './generalStyle'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

// In the Styling properties trailing comma is preferred
export const englishStyle = StyleSheet.create({
    screenHeight: {
        height: screenHeight,
    },
    leftAlign: {
        alignSelf: 'flex-start',
    },
    centered: {
        marginTop: screenHeight / 3,
    },
    swipeDialogBottomPadding: {
        height: 250,
    },
    listView: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    centimetreInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: backButtonBackground,
        padding: 10,
        width: screenWidth / 3,
        height: 45,
        margin: 15,
        alignSelf: 'flex-start',
    },
    swipeDialog: {
        backgroundColor: '#eeeeee',
        opacity: 0.98,
        zIndex: 1,
    },
    imageHomeSubmissionView: {
        width: screenWidth - 20,
        height: 250,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    imageSize4: {
        height: screenHeight / 5.8,
        width: screenWidth / 3.8,
        margin: 10,
        opacity: 0.8,
    },
    imageSize4Square: {
        height: screenWidth / 2.7,
        width: screenWidth / 2.7,
        margin: 10,
        opacity: 0.8,
    },
    imageSize4SquareSmaller: {
        height: screenWidth / 3.6,
        width: screenWidth / 3.6,
        margin: 10,
        opacity: 0.8,
    },
    scrollView: {
        flex: 2,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 20,
        fontWeight: '300',
        paddingBottom: 5,
    },
    textTandC: {
        fontSize: 13,
        paddingBottom: 10,
    },
    textPadding: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '300',
        marginTop: 40,
        paddingBottom: 5,
    },
    textCentered: {
        textAlign: 'center',
    },
    textInput: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
    },
    textInputScrollView: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: backButtonBackground,
        padding: 10,
        width: screenWidth - 65,
        height: 45,
        margin: 15,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: screenWidth / 20,
        ...Platform.select({
            ios: {
                paddingTop: 15,
            },
            android: {
                paddingTop: 30,
            },
        }),
    },
    textSubHeader: {
        fontSize: 22,
        fontWeight: '500',
        alignSelf: 'flex-start',
        paddingTop: 15,
        paddingBottom: 10,
        paddingLeft: screenWidth / 20,
        paddingRight: screenWidth / 20,
    },
    textSubHeader2: {
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
    },
    textSubHeader2NotAbsoluteItalic: {
        fontSize: 18,
        fontStyle: 'italic',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
    },
    textSubheader3NotAbsolute: {
        fontSize: 18,
        fontWeight: '300',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: screenWidth / 9,
        paddingRight: 20,
    },
    textGeneralInfo: {
        fontSize: 18,
        fontWeight: '300',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: screenWidth / 20,
        paddingRight: screenWidth / 20,
    },
    textGeneralInfoLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    textSubHeader4: {
        fontSize: 16,
        textAlign: 'left',
        paddingTop: 30,
        paddingLeft: 20,
    },
    textNotPicked: {
        fontSize: 18,
        fontWeight: '500',
    },
    radioButtonGroup: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        fontSize: 18,
        padding: 10,
    },
    radioButtonGroupRow: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        paddingLeft: 15,
        flexDirection: 'row',
        padding: 10,
    },
    border: {
        borderColor: primaryColor,
        borderWidth: 8,
        opacity: 1,
    },
    button: {
        backgroundColor: primaryColor,
        borderRadius: 15,
        position: 'absolute',
        bottom: 50,
        padding: 18,
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
    buttonPickedWider: {
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: 150,
        borderRadius: 15,
        padding: 13,
        margin: 8,
    },
    buttonPickedWider2: {
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: screenWidth - 50,
        borderRadius: 15,
        padding: 12,
        margin: 5,
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
    buttonNotPickedWider: {
        backgroundColor: backButtonBackground,
        borderColor: backButtonBorder,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: 150,
        borderRadius: 15,
        padding: 13,
        margin: 8,
    },
    buttonNotPickedWider2: {
        backgroundColor: backButtonBackground,
        borderColor: backButtonBorder,
        borderWidth: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: screenWidth - 50,
        borderRadius: 15,
        padding: 12,
        margin: 5,
    },
    buttonViewSplit: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
    },
    buttonNotAbsoluteWide: {
        backgroundColor: primaryColor,
        width: 200,
        alignItems: 'center',
        borderRadius: 15,
        padding: 18,
    },
    buttonUploadNotAbsolute: {
        backgroundColor: secondaryColor,
        padding: 18,
        borderRadius: 15,
        width: 220,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonBackLogin: {
        width: 300,
        height: 50,
        alignItems: 'center',
        backgroundColor: backButtonBackground,
        borderColor: backButtonBorder,
        borderWidth: 2,
        borderRadius: 15,
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        marginTop: 15,
    },
    caption: {
        alignSelf: 'center',
        textAlign: 'center',
    },
    splitHorizonatalView: {
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    splitView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    splitViewLogin: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
        marginBottom: 50,
    },
    viewScrollBox: {
        height: screenHeight / 2,
        paddingBottom: 40,
    },
    tapBoxRow: {
        flexDirection: 'row',
    },
    listItem: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#333',
        padding: 15,
        width: screenWidth,
    },
})
