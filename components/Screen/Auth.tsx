import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Button, View, useColorScheme } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '60428079565-nokbvo4d5nn3bcssipkolf6ip2sehghu.apps.googleusercontent.com', // Replace with your Web Client ID
});

function Auth(): React.JSX.Element {
  const [user, setUser] = useState<any>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // Google Sign-In function
  const signInWithGoogle = async () => {
    try {
      // Get the user's Google login credentials
      const idToken:any  = await GoogleSignin.signIn();

      // Create a Firebase credential with the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase using the Google credentials
      const userCredential = await auth().signInWithCredential(googleCredential);

      // Set the user info in state
      setUser(userCredential.user);
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null); // Clear user info
    } catch (error) {
      console.error('Sign-Out Error: ', error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>React Native Firebase Google Auth</Text>

          {/* Display user info if signed in */}
          {user ? (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome, {user.displayName}</Text>
              <Text>Email: {user.email}</Text>
              <Button title="Sign out" onPress={signOut} />
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <Button title="Sign in with Google" onPress={signInWithGoogle} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Auth;