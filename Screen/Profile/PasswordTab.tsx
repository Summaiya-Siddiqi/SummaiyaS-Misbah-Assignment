import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'; 
import TextField from './TextField';
import Button from './Button';

const PasswordTab = () => {
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords don't match", "Please ensure the new password and confirm password are the same.");
      return;
    }

    try {
      const user = auth().currentUser; 

      if (user) {
        
        const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);

        await user.reauthenticateWithCredential(credential); // Re-authenticate

        
        await user.updatePassword(newPassword);
        console.log("Password updated");

        
        Alert.alert('Password Updated', 'Your password has been updated successfully.');
      } else {
        Alert.alert('No user logged in', 'Please log in to update your password.');
      }
    } catch (error) {
      
      console.error(error);
      Alert.alert('Error', 'There was an error updating your password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextField
        label="Current Password"
        secureTextEntry={true}
        iconName="lock"
        value={currentPassword}
        onChangeText={setCurrentPassword} keyboardType={undefined}      />
      <TextField
        label="New Password"
        secureTextEntry={true}
        iconName="lock"
        value={newPassword}
        onChangeText={setNewPassword} keyboardType={undefined}      />
      <TextField
        label="Confirm Password"
        secureTextEntry={true}
        iconName="lock"
        value={confirmPassword}
        onChangeText={setConfirmPassword} keyboardType={undefined}      />
      <Button text="Update Password" onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,},
});

export default PasswordTab;
