&nbsp;

<img align="left" width="100" height="100" src="./app/assets/icon.png" alt="app-logo">

# Climate Champ App

A field experiment between an intervention and a control group.

## About

Available on [iOS](https://apps.apple.com/us/app/climate-champ/id6451383726) and [Android](https://play.google.com/store/apps/details?id=uk.ac.ncl.climatechamp).
 

### Project Team

Dr Viktoria Spaiser  
Associate Professor in Sustainability Research and Computational Social Science  
University of Leeds  
Email: [v.spaiser@leeds.ac.uk](mailto:v.spaiser@leeds.ac.uk)

### RSE Contact

Imre Draskovits  
Research Software Engineer  
Newcastle University  
Email: [imre.draskovits@newcastle.ac.uk](mailto:imre.draskovits@newcastle.ac.uk)    
GitHub: [@notimre](https://github.com/notimre/)    

## Built With

[React Native](https://reactnative.dev/)  
[Expo](https://expo.dev/)  
[NodeJS](https://nodejs.org/en/)

## Getting Started

### Prerequisites

#### App development

Contributing to the development requires an [Expo Account](https://expo.dev/signup).

1. Create a new [Expo Account](https://expo.dev/signup) using your university email address, or use your existing one.
2. Contact Imre Draskovits and request to be added to the University of Newcastle upon Tyne team in the Expo Portal.
3. Complete the verification process from the resulting emails.

#### Tools

The Mobile App is built with React Native, therefore, it runs on both iOS and Android.
You will need to have either XCode or Android Studio installed, depending on your platform of choice.

- [Get XCode from the App Store](https://apps.apple.com/gb/app/xcode/id497799835?mt=12)  
- [Get Android Studio from Jetbrains Toolbox](https://www.jetbrains.com/toolbox-app/)  
- [Get IntelliJ from Jetbrains Toolbox](https://www.jetbrains.com/toolbox-app/)  

#### MacOS Package manager
[Homebrew](https://brew.sh) package manager may be required for some parts of the installation. Follow the instructions on the Homebrew landing page to install the software. Note that some recommended additional post-installation steps are displayed in the terminal following installation.

#### Project Package manager
[yarn](https://yarnpkg.com) package manager is needed to install Expo; follow the [installation instructions](https://yarnpkg.com/getting-started/install). You may need to install `node.js` first; see the next section.   

**Do NOT use `npm` to install packages.**

#### Optional Install
[Gradle build tool](https://gradle.org) is required to build the Android version of the app. Follow the [installation instructions](https://gradle.org/install/) to install Gradle on your OS—recommended to use `brew` to install the package.

### Installation

1. Install [Git](https://git-scm.com)

2. Clone the repository
   ```
   git clone git@github.com:NewcastleRSE/climate-champ-app-public.git
   ```
3. Install [NodeJS](https://nodejs.org/en/download/). This should be done according to the [node.js installation instructions](https://nodejs.dev/en/learn/how-to-install-nodejs/).  
   You should also check that `node.js` is not already installed. Because of binary naming inconsistencies (e.g. the executable is named `nodejs` on Linux systems, rather than `node`) which can cause IDEs to fail to recognise the node executable, potentially the most reliable installation method is to use `brew`:
   ```
   brew install node
   ```
4. Install [Expo](https://expo.dev/) following the [Expo installation instructions](https://docs.expo.dev/get-started/installation/).  
   The Expo installation instructions note that [Watchman](https://facebook.github.io/watchman/docs/install) is required, so this should be installed first:
   ```
   brew update
   brew install watchman
   ```
   Expo can be installed using
   ```
   yarn add expo
   ```
   Note that as of the Expo CLI SDK 46+ the installation mechanism changed; see https://docs.expo.dev/more/expo-cli/.

## Request the `.env` file, which includes the API URL
Then place the `.env` file in the root of your project repository

## Running Locally

**Each command below should be run in `climate-champ-app-public/app` directory. The commands won't work in the root folder.**

### Setting up an emulator or simulator

An emulator (Android) or simulator (iOS) must be configured to allow Expo to run the app.

- Instructions for setting up an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

- Instructions for setting up an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

The app requires the following minimum hardware and SDK:

- iOS
  - iOS 13 and above
- Android
  - Pixel 6 API 33
  - Android 13.0 Google APIs | x86_64

### Building and running the app in an emulator or simulator

#### Quickstart

1. Go to the project `/app` folder
   ```
   cd climate-champ-app-public/app
   ```
2. Install packages
   ```
   yarn install
   ```
3. Start Expo
   ```
   npx expo start
   ```
   If you receive an error message saing "Operation not permitted", scroll down to the section titled 'Watchman Operation Not Permitted Error'.
4. To switch between Development Build and the Expo Go application press
   ```
   s
   ```
5. Start the app on iOS
   ```
   i
   ```
6. Start the app on Android
   ```
   a
   ```

Expo works by creating a server on the host PC and accepting network connections over port 8081 to deploy the app to a mobile device when the Expo app QR code is scanned on the mobile device. The host PC and mobile device must be on the same network for this to work. Wifi networks which are configured to block such connections - such as the Newcastle University WiFi - will prevent mobile device connections to the server and the mobile app deployment will fail. A suitably configured emulator on the host PC should however always work.

A quick work-around when working on University WiFi is to create a hotspot with your own phone, connect your laptop to it and then run the server.

#### Development/Debug version (Hot reload)

   - _Emulator_  
      Using Expo (expo.dev), there are two ways the app can run in an Android emulator. In the `climate-champ-app/app` directory execute
     `   npx expo start`
     then press `a` to run the app in the Android phone emulator. Alternatively, start Expo with the command
     `   npx expo start -a`
     Note that it may be necessary to close down an already running app in the emulator first - occasionally Expo Go will not update the app correctly if it is running.
   - _Emulator (other version)_
     Running the project with a different command is also possible. This is almost equivalent to an actual build.
     `   npx expo run:android`
     Note that If the build fails here, the production `.aab` file will likely fail to build as well. In some instances this works fine, yet the `.aab` file build fails for no apparent reason. Again, it is best to close down an already-running app in the emulator before relaunching.
   - _Actual Device_
     Download the ‘Expo Go’ app on the Play Store https://play.google.com/store/apps/details?id=host.exp.exponent. Run  
      `   npx expo start`
     to start the server. It gives a QR code. You scan it within the Expo App, and the app will run on your device (this is the same as running it in an emulator, not needed to create a .apk file)
     _You cannot run this on the Newcastle University Wi-Fi; create a personal hotspot on your phone or use another non-uni maintained network, as the QR code reading will not see the server_

#### Other notes

The command `npx expo start` must be executed in the `app` folder, not in the root directory of this project. Otherwise, you will get an error:  
`Unable to find expo in this project - have you run yarn / npm install yet?`

Expo can run into an issue after a fresh installation with XCode, saying you still don't have it installed.
To resolve this error:

1. Open XCode.
2. Press `⌘,` or go to Preferences.
3. Select the `Locations` tab.
4. If `Command Line Tools` option is blank, pick any version of XCode for it in the drop-down menu.  
   If `Command Line Tools` option is already selected with a single verison, re-select it again.
5. Restart XCode, the iOS Simulator and re-run the build with `npx expo start`.

Optionally, [this](https://developer.apple.com/forums/thread/678469) thread might help.

On Linux the default installation directory for the Android SDK might be in `~/Android/Sdk`, however Expo might be expecting `~/Android/sdk`. This can be fixed by either: a) creting a symbolic link to the actual installation path; b) renaming the sdk directory to that expected by Expo and changing the settings in Android Studio; or c) setting the `ANDROID_HOME` environment variable to the actual path in your `~/.bashrc` file.

### Running it on Device

1. Download Expo Go for [iOS](https://apps.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR Code from the Terminal or browser tab, which automatically opens.

### Production

Ask Imre Draskovits to publish your update to Apple App Store or the Google Play Store.

### Watchman Operation Not Permitted Error

If installing Watchman on Mac, you may encounter the following error message when running `npx expo start` :

```
Error: Watchman error: std::__1::system_error: open: /Users/../Desktop/climate-champ-app-public/app: Operation not permitted. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.
node:events:492
      throw er; // Unhandled 'error' event
      ^
```

This error is thrown as full disk access needs to be granted to Watchman in order for it to work properly.

- Go to System preferences > Security & Privacy.
- Select Full Disk Access.
- Unlock it and click + button to add new app/tool.
- Select Macintosh HD in the folders list.
- Press Shift + Command + . at the same time to see all directories.
- Click opt > brew > bin (watchman is installed in this folder for MacOS Catalina) || usr > local > Cellar > Watchman > 21**\*** > bin (watchman is installed in this folder MacOS Monterey)
- Look for watchman in the list then select it

Watchman will now work correctly.

## Contributing

1. Create a new branch for your issue.
2. Once ready-to-merge, submit a Pull Request.
3. Ask Imre Draskovits (@notimre) to review your PR.

**Branch naming convention:**

- `issueNumber-name`: Your branch to contribue to the project.  
- Example branch name: `16-push-notifications`

### Feel free to reach out regarding any further questions or problems you might face.
