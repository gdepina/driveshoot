# React Native App Using Firebase
A React Native App Using Firebase for Authentication and Database

### TODO
**Authentication**
1. ~~Register With Email~~
2. ~~Login With Email~~
3. Register / Login With Facbook
   
**Quotes**
1. Get All Quotes
2. Add Quote
3. Update Quote
4. Delete Quote


## Tutorial
In this tutorial, we will build a React Native app that uses Firebase Authentication and Realtime Database services, to find out more about Firebase, visit this [link](https://firebase.google.com/).
1. Register app with Firebase and Facebook
2. Getting Started
3. Install Dependencies


### Register app with Firebase and Facebook
#### Facebook
Follow the instructions at this [link](https://docs.expo.io/versions/latest/sdk/facebook.html#expofacebookloginwithreadpermissionsasync) to register your app and set it up for Facebook integration. Follow the instructions for The Expo client app.

#### Firebase
To create a new firebase project, go to your [Firebase console](https://console.firebase.google.com/), click “Add Project”, type in your project’s name and select your region.

Enable Facebook Login: (taken from https://firebase.google.com/docs/auth/ios/facebook-login)

1. In the [Firebase console](https://console.firebase.google.com/), open the **Authentication** section.
2. On the **Sign in method** tab, enable the **Facebook** sign-in method and specify the **App ID** and **App Secret** you got from Facebook.
3. Then, make sure your **OAuth redirect URI** (e.g. my-app-12345.firebaseapp.com/__/auth/handler) is listed as one of your **OAuth redirect URIs** in your Facebook app's settings page on the [Facebook for Developers](https://developers.facebook.com/) site in the ****Product Settings > Facebook Login**** config.
4. On the your Facebook app’s settings page, click ‘Add Product’, select the ‘Facebook Login’ product and click ‘Set Up’.
5. On the left side, click ‘Settings’ under Facebook Login and add your **OAuth redirect URI** to your app’s Valid OAuth redirect URIs

On the left side, select “Project Overview” and click “Add firebase to your web app” link on the home screen and take note of the config object, this will be later used in our app config file.


### Step 1: Getting Started
If this is your first time creating a React Native app, make sure you have [Node](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/lang/en/docs/install/) installed. For this project, I will be using yarn and [create-react-native-app](https://github.com/react-community/create-react-native-app) which has been dubbed as the easiest way to start building a new React Native app.

There are many advantages to using [CRNA](https://github.com/react-community/create-react-native-app), one being that it allows you to start a project without installing or configuring any tools to build native code — no Xcode or Android Studio installation required and you can install the [Expo](https://expo.io/) app on your iOS or Android phone for testing.

Before we begin, we have to globally install the create-react-native-app command line utility using npm or yarn.

Open up your terminal and run one of the commands below depending on whether you are using npm or yarn.

```bash
$ npm install -g create-react-native-app
  # or
$ yarn global add create-react-native-app

```

Now that CRNA is installed, we can create a new project by running the command below:

```bash
$ create-react-native-app firebase-auth-app
$ cd firebase-auth-app/

```

### Step 2: Install Dependencies
We will be using the following packages:
- [Redux](https://github.com/reactjs/redux/) for managing the app’s state
- [React-Redux](https://github.com/reactjs/react-redux), will be used to connect our app’s components to the redux store.
- [Redux Thunk](https://github.com/gaearon/redux-thunk) is a middleware for Redux that allows us to write action creators that return a function instead of an action.
- [React Native Elements](https://github.com/react-native-training/react-native-elements) as our UI Toolkit,
- [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) for our apps navigation,
- [Axios](https://github.com/mzabriskie/axios), a promised-based HTTP client for making calls to our API
- [React Native Redux Listener](https://github.com/line64/react-native-redux-listener), a Redux store enhancer to dispatch common React Native events, we will be using this package to detect change in our network connection
- [React Native Loading Spinner Overlay](https://github.com/joinspontaneous/react-native-loading-spinner-overlay)
- [Firebase](https://firebase.google.com/)

```bash
yarn add redux
yarn add react-redux 
yarn add redux-thunk 
yarn add react-native-elements
yarn add react-native-router-flux
yarn add axios
yarn add react-native-redux-listener
yarn add firebase
yarn add react-native-loading-spinner-overlay
```

Before we continue, run the command below to test the app, This will start a development server for you, and print a QR code in your terminal. If you are using the Expo app, you can scan the QR code.

```bash
$ yarn start
```