import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text, Image, PermissionsAndroid, TouchableOpacity, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';
import RNFS from 'react-native-fs';

const AddUserScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [Designation, setDesignation] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [ZipCode, setZipCode] = useState('');
    const [Services, setServices] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState<any>(null);
    const [photo, setPhoto] = useState<string | null>(null);  // State for the photo URI
    const [photoBase64, setPhotoBase64] = useState<string | null>(null);
    const [filePath, setFilePath] = useState(null);

    // Request Notification permission and FCM token
    useEffect(() => {
        const requestNotificationPermission = async () => {
            try {
                await messaging().requestPermission();
                console.log('FCM permission granted');
            } catch (error) {
                console.log('FCM permission denied', error);
            }
        };

        const getFCMToken = async () => {
            const token = await messaging().getToken();
            console.log('FCM Token:', token); // Use this token for sending push notifications
        };

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('FCM message received in foreground:', remoteMessage);
            Alert.alert('New FCM Message', JSON.stringify(remoteMessage));
        });

        requestNotificationPermission();
        getFCMToken();

        

        // Get location
        const getLocation =async () => {
            const hasPermission =await  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

            if (hasPermission) {
                console.log('Permission already granted');
                Geolocation.getCurrentPosition(
                    (position) => {
                        setLocation(position.coords);
                    },
                    (error) => {
                        console.error('Location error', error);
                        Alert.alert('Error', 'Failed to get location. Please check permissions.');
                    },
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
                );
              } else {
                console.log('Permission not granted');
              }
            
        };
        getLocation();

        return unsubscribe;
    }, []);

    // Sign out function
    const handleSignOut = async () => {
        try {
            await auth().signOut();
            Alert.alert('Signed out successfully');
            navigation.navigate('LoginScreen');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    // Use the Camera hook to access the device cameras
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();

    // Create a reference to the Camera component
    const cameraRef = useRef<Camera>(null);

    // Check if the app has permission to use the camera
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
                //setPhoto(photoData.path); 
                const filePath = `file://${photoData.path}`; // Ensure correct URI format

                // Check if file exists
                const fileExists = await RNFS.exists(filePath);
                if (!fileExists) {
                    console.error('Photo file does not exist:', filePath);
                } else {
                    console.log('Photo captured at:', filePath);
                    setPhoto(filePath); 
                }
                const base64 = await RNFS.readFile(photoData.path, 'base64');
                //console.log({base64})
                setPhotoBase64(base64); 

            } catch (error) {
                console.error('Error capturing photo:', error);
            }
        }
    };


    // Function to add user data to Firestore
    const handleAddUser = async () => {
        if (!username || !email || !name || !photo) {
            Alert.alert('Error', 'Please fill out the required fields and capture an image!');
            return;
        }
        console.log('Pressed Button')

        try {
            // Store the user data in Firestore
            await firestore().collection('Profile').add({
                username,
                email,
                name,
                companyName: companyName || '',
                phoneNumber: phoneNumber || '',
                latitude: location?.latitude || '',
                longitude: location?.longitude || '',
                photoUri: photo,
                designation: Designation,
                state: State,
                city: City,
                zipcode: ZipCode,
                provideservice: Services,
                address: Address,
            });

            Alert.alert('Success', 'User added successfully');
            setUsername('');
            setEmail('');
            setName('');
            setCompanyName('');
            setPhoneNumber('');
            setLocation(null);
            setPhoto(filePath);
            setDesignation(Designation);
            setState(State);
            setCity(City);
            setZipCode(ZipCode);
            setServices(Services);
            setAddress(Address);
            //setPhotoBase64(photoBase64);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Add New User</Text>
      
          {/* Form Fields */}
          <Text style={styles.sectionTitle}>User Information</Text>
          <TextInput placeholder="Username" placeholderTextColor="#888" value={username} onChangeText={setUsername} style={styles.input} />
          <TextInput placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
          <TextInput placeholder="Name" placeholderTextColor="#888" value={name} onChangeText={setName} style={styles.input} />
      
          <TextInput placeholder="Company Name" placeholderTextColor="#888" value={companyName} onChangeText={setCompanyName} style={styles.input} />
          <TextInput placeholder="Phone Number" placeholderTextColor="#888" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" style={styles.input} />
      
          {/* Address Details */}
          <Text style={styles.sectionTitle}>Address Details</Text>
          <TextInput placeholder="Address" placeholderTextColor="#888" value={Address} onChangeText={setAddress} style={styles.input} />
          <TextInput placeholder="City" placeholderTextColor="#888" value={City} onChangeText={setCity} style={styles.input} />
          <TextInput placeholder="State" placeholderTextColor="#888" value={State} onChangeText={setState} style={styles.input} />
          <TextInput placeholder="Zip Code" placeholderTextColor="#888" value={ZipCode} onChangeText={setZipCode} style={styles.input} />
          <TextInput placeholder="Designation" placeholderTextColor="#888" value={Designation} onChangeText={setDesignation} style={styles.input} />
      
          {/* Camera Capture */}
          <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add New User</Text>

      <View style={styles.cameraContainer}>
        {/* Camera Preview */}
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      </View>

      <Button title="Capture Image" onPress={captureImage} color="#3B82F6" />

      {photo && (
        <Image
          source={{ uri: photo }}
          style={styles.capturedImage}
        />
      )}
    </SafeAreaView>
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleAddUser}>
              <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#2196F3' }]} onPress={() => navigation.navigate('UserScreen')}>
              <Text style={styles.buttonText}>Go to Existing Users</Text>
            </TouchableOpacity>
          </View>
      
          {/* Sign Out */}
          <TouchableOpacity style={[styles.buttonStyle, styles.signOutButton]} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
      
          {/* Location Display */}
          <View style={styles.locationContainer}>
            {location ? (
              <>
                <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
                <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
              </>
            ) : (
              <Text style={styles.locationText}>Location not available</Text>
            )}
          </View>
        </ScrollView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F0F4F8', // Light background color for better contrast
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 25,
      color: '#333',
    },
    input: {
      height: 50,
      borderColor: '#D1D5DB',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingLeft: 12,
      backgroundColor: '#FFFFFF',
      fontSize: 16,
      color: '#333',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#444',
      marginVertical: 10,
      textAlign: 'left',
    },
    buttonContainer: {
      marginTop: 20,
      borderRadius: 8,
      overflow: 'hidden',
    },
    buttonStyle: {
      backgroundColor: '#3B82F6',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 8,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: '600',
    },
    cameraContainer: {
      marginVertical: 20,
      alignItems: 'center',
      height: 250,
      borderRadius: 10,
      //overflow: 'hidden',
      backgroundColor: '#000',
    },
    capturedImage: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginTop: 15,
    },
    locationContainer: {
      marginTop: 20,
      padding: 12,
      backgroundColor: '#E2E8F0',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
    },
    locationText: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
    },
    signOutButton: {
      backgroundColor: '#EF4444',
      marginVertical: 15,
    },
  });
export default AddUserScreen;