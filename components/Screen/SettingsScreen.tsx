import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

function SettingScreen() {
  // Get access to the back camera device
  const device = useCameraDevice('back');
  
  // Check if the app has permission to use the camera
  const { hasPermission, requestPermission } = useCameraPermission();
  
  // Create a reference to the Camera component
  const cameraRef = useRef<Camera>(null);

  // State to hold the captured image
  const [photo, setPhoto] = useState<string | null>(null);

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

  // Function to capture photo
  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePhoto();
        setPhoto(photoData.path);  // Store the photo URI or base64 string
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera component */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Capture button */}
      <Button title="Capture Image" onPress={captureImage} />

      {/* Display the captured image */}
      {photo && <Image source={{ uri: photo }} style={styles.capturedImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: 300,
    height: 400,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default SettingScreen;