import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


// Configure Google Sign-In
GoogleSignin.configure({
  //webClientId: 'AIzaSyBjHF7REaSQb4OcnbrvSMwDdZOQjZtyOyo',   // Replace with your Web client ID from Firebase Console
  webClientId: '60428079565-nokbvo4d5nn3bcssipkolf6ip2sehghu.apps.googleusercontent.com',   // Replace with your Web client ID from Firebase Console
});


// Signup function
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created:', userCredential.user);
  } catch (error) {
    console.error('Error during signup:', error);
  }
};

// Login function
const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error during login:', error);
  }
};

const signInWithGoogle = async () => {
    try {
      // Initiate Google Sign-In process
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Sign in or sign up with Firebase using the Google credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log('User signed in with Google:', userCredential.user);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };
  

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in:', user);
    } else {
      console.log('User is signed out');
    }
  });

  return () => unsubscribe();
}, []);


  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Text>Password:</Text>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      
      <View style={styles.buttonContainer}>
      <Button title="Sign Up" onPress={() => signUpWithEmailAndPassword(email, password)} />
      </View>
      
      <View style={styles.buttonContainer}>
      <Button title="Login" onPress={() => signInWithEmailAndPassword(email, password)} />
      </View>

      <View style={styles.buttonContainer}>
      <Button title="Sign In with Google" onPress={signInWithGoogle} />
      </View>

    

    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#89c7d9",
      
    },
    buttonContainer: {
      marginBottom: 20, // Space between buttons
    },
  });
  

export default AuthScreen;
