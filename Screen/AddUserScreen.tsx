import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddUserScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      Alert.alert('Signed out successfully');
      navigation.navigate('LoginScreen');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleAddUser = async () => {
    if (!username || !email || !name) {
      Alert.alert('Error', 'Please fill out the required fields!');
      return;
    }

    try {
      await firestore().collection('Users').add({
        username,
        email,
        name,
        companyName: companyName || '',
        phoneNumber: phoneNumber || '',
      });
      Alert.alert('Success', 'User added successfully');
      setUsername('');
      setEmail('');
      setName('');
      setCompanyName('');
      setPhoneNumber('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New User</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Company Name (optional)"
        value={companyName}
        onChangeText={setCompanyName}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number (optional)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button title="Add User" onPress={handleAddUser} color="#4CAF50" />

      <View style={styles.navigationContainer}>
        <Button
          title="Go to Existing Users"
          onPress={() => navigation.navigate('UserScreen')} 
          color="#2196F3"
        />
      </View>

      <View style={styles.signOutContainer}>
        <Button title="Sign Out" onPress={handleSignOut} color="red" />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#89c7d9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  navigationContainer: {
    marginTop: 20,
  },
  signOutContainer: {
    marginTop: 20,
  },
});

export default AddUserScreen;
