
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Profile"
          color="#9987d9"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Settings"
          color="#9987d9"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Userlist"
          color="#9987d9"
          onPress={() => navigation.navigate('Userlist')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ReduxCounter"
          color="#9987d9"
          onPress={() => navigation.navigate('Counter')}
        />
      </View>

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
    width:300,
    marginBottom: 20, // Space between buttons
  },
});

export default HomeScreen;
