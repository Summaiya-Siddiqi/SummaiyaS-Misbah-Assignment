
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Profile"
          color="#e28ed5"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Settings"
          color="#e28ed5"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Users list"
          color="#e28ed5"
          onPress={() => navigation.navigate('Userlist')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Redux Counter"
          color="#e28ed5"
          onPress={() => navigation.navigate('Counter')}
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
    backgroundColor:"#dec99b",
    
  },
  buttonContainer: {
    marginBottom: 20, // Space between buttons
  },
});

export default HomeScreen;