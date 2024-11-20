This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


# Debugging and Reporting

### DEBBUGING STEPS
# Understanding the Componenets
1. Main Components - ProfileScreen, GeneralTab, PasswordTab, Textfield and Button
2. Check interaction between componenets.
3. Understanding props.

# Set up debugging tool
1. Run - npx react-native start
2. Press d to open dev menu and select Debug JS remotely
3. Add logs (console.log) statements 
4. Wrap components in try and catch blocks

# Test key Functionalities
1. Check if all components render correctly.
2. Test input fields
3. Confirm icons appears correctly
4. Check button actions

# Check Common Issues
1. Styling
2. Responsiveness
3. Performance
4. Warnings or errors

### DEBUG REPORT
1. Component are correctly rendering 
2. Profile image URL is a URL of cache, that may cause failed rendering on other devices
3. Icons are displayed correctly
4. Input fields for email, phone and password are appropriate
5. Validation is not done yet.
6. Components are responsive on different sizes of screen (emulator and personal device)
7. Buttons are working fine

### Unit Test Using Jest
Ran all test suites matching /GeneralTab.test.tsx
below is the successed test results.
```bash
console.log
    Profile Successfully updated
      at log (Screen/Profile/Generaltab/GeneralTab.tsx:122:29)

 PASS  Screen/Profile/Generaltab/GeneralTab.test.tsx
  GeneralTab Component
    √ should render the form and display user data correctly (492 ms)                                                                        
    √ should show validation errors for empty fields (39 ms)                                                                                 
    √ should show email validation error for invalid email (31 ms)                                                                           
    √ should update the profile when the form is valid (170 ms)        
```


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start


## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
