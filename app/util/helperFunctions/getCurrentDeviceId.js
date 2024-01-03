import * as Application from 'expo-application';

// Retrieves the users device id
export default getCurrentDeviceId = async () => {
    let currDeviceId
    if (Platform.OS === 'ios') {
        currDeviceId = await Application.getIosIdForVendorAsync();
    } else if (Platform.OS === 'android') {
        currDeviceId = Application.androidId;
    } else {
        // Fallback for other platforms
        currDeviceId = Constants.installationId;
    }
    return currDeviceId
  }