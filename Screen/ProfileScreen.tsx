// ProfileScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ProfileScreen= ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          color="#9987d9"
          onPress={() => navigation.navigate('LoginScreen')}
        />
        </View>

        <View style={styles.buttonContainer}>
        <Button
          title="SignUp"
          color="#9987d9"
          onPress={() => navigation.navigate('SignupScreen')}
        />
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
    marginBottom: 20, 
  },
});


export default ProfileScreen;
