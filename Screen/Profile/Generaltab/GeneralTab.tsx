import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TextField from '../TextField';
import Button from '../Button';
import { useRoute } from '@react-navigation/native';

const GeneralTab = () => {
    const [userData, setUserData] = useState({
        username: '',
        designation: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        provideservice: '',
        photoUri: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { profileId } = route.params;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDoc = await firestore().collection('Profile').doc(profileId).get();
                
                if (userDoc.exists) {
                    console.log('Fetched data:', userDoc.data());
                    setUserData(userDoc.data());  // Correct way to set data
                } else {
                    console.log('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                Alert.alert("Error", "Failed to fetch user details.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();  // Call the function directly
    }, [profileId]);

    const handleInputChange = (field, value) => {
        setUserData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                await firestore().collection('Profile').doc(profileId).update(userData);
                Alert.alert("Profile Updated", "Your profile has been updated successfully!");
            } catch (error) {
                console.error("Error updating profile:", error);
                Alert.alert("Update Failed", "There was an error updating your profile.");
            }
        } else {
            Alert.alert("Validation Failed", "Please fill out the required fields correctly.");
        }
    };

    const validateForm = () => {
        const validationErrors = {};
        let isValid = true;

        if (!userData.username.trim()) {
            validationErrors.username = 'Full Name is required';
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!userData.email.trim()) {
            validationErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(userData.email)) {
            validationErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    {userData.photoUri ? (
                        <Image source={{ uri: userData.photoUri }} style={styles.profileImage} />
                    ) : (
                        <Text style={styles.imageUnavailableText}>Image Unavailable</Text>
                    )}
                </View>
                <Text style={styles.profileName}>{userData.username}</Text>
            </View>

            {/* Form Fields */}
            <TextField
                label="Full Name"
                iconName="person"
                value={userData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                error={errors.username}
            />

            <TextField
                label="Designation"
                iconName="school"
                value={userData.designation}
                onChangeText={(text) => handleInputChange('designation', text)}
                error=""
            />

            <TextField
                label="Email"
                iconName="email"
                value={userData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                error={errors.email}
            />

            <TextField
                label="Phone No."
                iconName="phone"
                value={userData.phoneNumber}
                onChangeText={(text) => handleInputChange('phoneNumber', text)}
                error=""
            />

            {/* Additional fields */}
            <TextField label="Address" iconName="location-on" value={userData.address} onChangeText={(text) => handleInputChange('address', text)} />
            <TextField label="City" iconName="location-city" value={userData.city} onChangeText={(text) => handleInputChange('city', text)} />
            <TextField label="State" iconName="map" value={userData.state} onChangeText={(text) => handleInputChange('state', text)} error={undefined} secureTextEntry={undefined} accessibilityLabel={undefined} />
            <TextField label="Zip Code" iconName="markunread-mailbox" value={userData.zipcode} onChangeText={(text) => handleInputChange('zipcode', text)} />
            <TextField label="Provide Services" iconName="directions" value={userData.provideservice} onChangeText={(text) => handleInputChange('provideservice', text)} />

            <Button text="Update" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    profileContainer: { alignItems: 'center', marginBottom: 20 },
    aboutlabel: { textAlign: 'left', marginLeft: 10, fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: 'black' },
    profileImageContainer: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 5 },
    imageUnavailableText: { fontSize: 14, color: 'gray', fontStyle: 'italic' },
    profileImage: { width: 100, height: 100, borderRadius: 40, marginBottom: 10 },
    profileName: { fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 14 },
    text: { fontSize: 14, color: 'black', marginBottom: 10, borderRadius: 20, lineHeight: 30, fontWeight: 'bold', padding: 25, backgroundColor: '#EEEDEB' },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: 'black' },
    errorText: { color: 'red', fontSize: 12, marginTop: -5, marginBottom: 10 }
});

export default GeneralTab;
