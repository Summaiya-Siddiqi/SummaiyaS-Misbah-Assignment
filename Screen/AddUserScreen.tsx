import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';
import RNFS from 'react-native-fs';

const AddUserScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
        const getLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position.coords);
                },
                (error) => {
                    console.error('Location error', error);
                    Alert.alert('Error', 'Failed to get location. Please check permissions.');
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
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
            await firestore().collection('Users').add({
                username,
                email,
                name,
                companyName: companyName || '',
                phoneNumber: phoneNumber || '',
                latitude: location.latitude || '',
                longitude: location.longitude || '',
                photoUri: photo,
            });

            Alert.alert('Success', 'User added successfully');
            setUsername('');
            setEmail('');
            setName('');
            setCompanyName('');
            setPhoneNumber('');
            setLocation(null);
            setPhoto(filePath);
            //setPhotoBase64(photoBase64);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New User</Text>

            <TextInput
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />

            <TextInput
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Company Name (optional)"
                placeholderTextColor="#888"
                value={companyName}
                onChangeText={setCompanyName}
                style={styles.input}
            />

            <TextInput
                placeholder="Phone Number (optional)"
                placeholderTextColor="#888"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={styles.input}
            />

            <View style={styles.container}>
                {/* Camera component */}
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFillObject}
                    device={device}
                    isActive={true}
                    photo={true}
                />

                <Button title="Capture Image" onPress={captureImage} />


                {photo && (
                    <Image
                        source={{ uri: photo }}
                        style={{ width: 200, height: 200, marginTop: 10 }}
                    />

                )}
            </View>

            <View style={styles.navigationContainer}>
                <Button title="Add User" onPress={handleAddUser} color="#4CAF50" />
            </View>

            {/* Display Location Data */}
            {/*location ? (
                <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
                    <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
                </View>
            ) : (
                <Text style={styles.locationText}>Location not available</Text>
            )*/}

            <View style={styles.navigationContainer}>
                <Button
                    title="Go to Existing Users"
                    onPress={() => navigation.navigate('UserScreen')}
                    color="#2196F3"
                />
            </View>

            <View style={styles.signOutContainer}>
                <Button title="Sign Out" onPress={handleSignOut} color="" />
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
        color: 'black',
    },
    capturedImage: {
        width: 300,
        height: 400,
        marginTop: 20,
        borderRadius: 10,
    },
    locationContainer: {
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    locationText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    navigationContainer: {
        marginTop: 20,
    },
    signOutContainer: {
        marginTop: 20,
    },
});

export default AddUserScreen;