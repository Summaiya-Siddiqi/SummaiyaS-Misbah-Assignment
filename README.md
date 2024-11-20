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

### CREATING DEBUG REPORT
1. Component are correctly rendering 
2. Profile image URL is a URL of cache, that may cause failed rendering on other devices
3. Icons are displayed correctly
4. Input fields for email, phone and password are appropriate
5. Validation is not done yet.
6. Components are responsive on different sizes of screen (emulator and personal device)
7. Buttons are working fine