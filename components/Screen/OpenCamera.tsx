import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

function OpenCamera() {
  // Get access to the back camera device
  const device = useCameraDevice('back');
  
  // Check if the app has permission to use the camera
  const { hasPermission, requestPermission } = useCameraPermission();
  
  // If no permission, show a button to request permission
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>You need to grant camera permissions to use this feature</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // If no camera device found, show error
  if (device == null) {
    return (
      <View style={styles.container}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  // Render the camera
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OpenCamera;