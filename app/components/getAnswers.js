import AsyncStorage from "@react-native-async-storage/async-storage"


export const getPanel = async (item) => {
    try {
        const selectedReport = JSON.parse(await AsyncStorage.getItem(item))
        const currentPanel = selectedReport.panel ?? selectedReport
        return {
            "latitude": currentPanel.latitude,
            "longitude": currentPanel.longitude,
            "additionalComments": currentPanel.additionalComments
        }
    } catch (error) { console.log(error) }
}

export const getRecorder = async (item) => {
    try {
        const selectedReport = JSON.parse(await AsyncStorage.getItem(item))
        const currentRecorder = selectedReport.recorder ?? selectedReport
        return {
            "yourName": currentRecorder.yourName,
            "emailAddress": currentRecorder.emailAddress,
            "dateRecorded": currentRecorder.dateRecorded
        }
    } catch (error) { console.log(error) }
}

export const getOther = async (item) => {
    try {
        const selectedReport = JSON.parse(await AsyncStorage.getItem(item))
        const currentOther = selectedReport.other ?? selectedReport
        if(currentOther.images) {
            if(currentOther.images.length >= 2) {
                return {
                    "image1": currentOther.images[0].url ?? "",
                    "image2": currentOther.images[1].url ?? "",
                    "comments": currentOther.comments
                }
            } else if (currentOther.images.length === 1) {
                return {
                    "image1": currentOther.images[0].url ?? "",
                    "image2": "",
                    "comments": currentOther.comments ?? ""
                }
            }
        } else {
            return {
                "image1": "",
                "image2": "",
                "comments": currentOther.comments ?? ""
            }
        }

    } catch (error) { console.log(error) }
}