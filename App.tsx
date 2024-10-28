/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React from 'react';
 import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
 
 const App = () => {
   const showAlert = () => {
     Alert.alert('Hello Misbah Zahra');
   };
 
   return (
     <View style={styles.container}>
       <Button title='Click Me' onPress={showAlert}>
       </Button>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#f8f8f8',
   },
   button: {
     padding: 15,
     backgroundColor: '#982fb3',
     borderRadius: 5,
   },
   buttonText: {
     color: '#fff',
     fontSize: 16,
   },
 });
 export default App;