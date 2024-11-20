/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen';
import SettingsScreen from './Screen/SettingsScreen';
import UserlistScreen from './Screen/UserlistScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxCounter from './components/ReduxCounter';
import AddUserScreen from './Screen/AddUserScreen';
import LoginScreen from './Screen/LoginScreen';
import SignupScreen from './Screen/SignupScreen';
import UserScreen from './Screen/UserScreen';
import Profile from './Screen/Profile/Profile';
import '@react-native-firebase/app'; // Import the core Firebase package

// You can also import specific Firebase services like Firestore or Auth if needed
import '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {
  // const showAlert = () => {
  //   Alert.alert("Hello Summaiya Siddiqi");
//};

  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Userlist" component={UserlistScreen} options={{ title: 'Userlist' }} />
      <Stack.Screen name="Counter" component={ReduxCounter} options={{ title: 'Redux Counter' }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} options={{ title: 'AddUser' }} />
      <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'User' }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Signup' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile Setting' }} /> 

    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
    
    // <View style={styles.container}>
    //   <TouchableOpacity style={styles.button} onPress={showAlert}>
    //     <Text style={styles.buttonText}>Notify Me</Text>
    //   </TouchableOpacity>
    // </View>
  
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   button: {
//     padding: 15,
//     backgroundColor: '#982fb3',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
export default App;
