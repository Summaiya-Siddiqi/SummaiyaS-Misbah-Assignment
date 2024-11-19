import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import TextField from './TextField';
import Button from './Button';

const PasswordTab = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Password validation
  const validatePasswords = () => {
    let isValid = true;
    const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };

    // Validate current password
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
      isValid = false;
    }

    // Validate new password
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password.';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdatePassword = async () => {
    if (!validatePasswords()) {
      return; // If validation fails, exit early
    }

    try {
      const user = auth().currentUser;

      if (user) {
        const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);

        // Re-authenticate with current password
        await user.reauthenticateWithCredential(credential);
        // Update password
        await user.updatePassword(newPassword);
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
        iconName="lock"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        error={errors.currentPassword}
        secureTextEntry={true}
      />
      <TextField
        label="New Password"
        iconName="lock"
        value={newPassword}
        onChangeText={setNewPassword}
        error={errors.newPassword}
        secureTextEntry={true}
      />
      <TextField
        label="Confirm Password"
        iconName="lock"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={errors.confirmPassword}
        secureTextEntry={true}
      />
      <Button text="Update Password" onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default PasswordTab;
