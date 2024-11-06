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
import HomeScreen from './HomeScreen';
import ProfileScreen from './components/Screen/ProfileScreen';
import SettingsScreen from './components/Screen/SettingsScreen';
import UserlistScreen from './components/Screen/UserlistScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxCounter from './components/ReduxCounter';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Userlist" component={UserlistScreen} options={{ title: 'Users List' }} />
      <Stack.Screen name="Counter" component={ReduxCounter} options={{ title: 'Redux Counter' }} />

    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
};

export default App;
