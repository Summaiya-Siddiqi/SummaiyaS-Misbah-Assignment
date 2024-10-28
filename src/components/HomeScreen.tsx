
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Profile"
          color="#c7edd4"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Settings"
          color="#c7edd4"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f0ead0",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonContainer: {
    marginBottom: 20, 
  },
});

export default HomeScreen;
