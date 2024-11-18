import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TextField from './TextField';
import Button from './Button';

const GeneralTab = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        designation: '',
        email: '',
        phoneno: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        provideservice: '',
        photouri: ''
    });

    const userId = 'Summaiya';
    

    useEffect(() => {
        const reference = firestore().collection('Profile').doc(userId);

        reference
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    setUserData({
                        fullname: data?.fullname || '',
                        designation: data?.designation || '',
                        email: data?.email || '',
                        phoneno: data?.phoneno || '',
                        address: data?.address || '',
                        city: data?.city || '',
                        state: data?.state || '',
                        zipcode: data?.zipcode || '',
                        provideservice: data?.provideservice || '',
                        photouri: data?.photouri
                    });
                } else {
                    console.log("User not found");
                }
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                Alert.alert("Error", "There was an error fetching your profile data.");
            });
    }, []);

    const handleUpdate = () => {
        const reference = firestore().collection('Profile').doc(userId);

        reference
            .update({
                fullname: userData.fullname,
                designation: userData.designation,
                email: userData.email,
                phoneno: userData.phoneno,
                address: userData.address,
                city: userData.city,
                state: userData.state,
                zipcode: userData.zipcode,
                provideservice: userData.provideservice
            })
            .then(() => {
                Alert.alert("Profile Updated", "Your profile has been updated successfully!");
            })
            .catch(error => {
                console.error("Error updating profile: ", error);
                Alert.alert("Update Failed", "There was an error updating your profile.");
            });
    };


    const handleInputChange = (field: string, value: string) => {
        setUserData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    {userData.photouri ? (
                        <Image source={{ uri: userData.photouri }} style={styles.profileImage} />
                    ) : (
                        <Text style={styles.imageUnavailableText}>Image Unavailable</Text>
                    )}
                </View>
                <Text style={styles.profileName}>{userData.fullname}</Text>
                <View style={styles.container}>
                    <Text style={styles.label}>About</Text>
                    <Text style={styles.text}>Lorem ipsum is simply dummy text of the printing and typesetting...</Text>
                </View>
            </View>


            <TextField
                label="Full Name"
                iconName="person"
                value={userData.fullname}
                onChangeText={text => handleInputChange('fullname', text)}
               
            />
            <TextField
                label="Designation"
                iconName="school"
                value={userData.designation}
                onChangeText={text => handleInputChange('designation', text)}
                
            />
            <TextField
                label="Email"
                iconName="email"
                value={userData.email}
                onChangeText={text => handleInputChange('email', text)}
              
            />
            <TextField
                label="Phone No."
                iconName="phone"
                value={userData.phoneno}
                onChangeText={text => handleInputChange('phoneno', text)}
            />
            <TextField
                label="Address"
                iconName="location-on"
                value={userData.address}
                onChangeText={text => handleInputChange('address', text)}
               
            />
            <TextField
                label="City"
                iconName="location-city"
                value={userData.city}
                onChangeText={text => handleInputChange('city', text)}
               
            />
            <TextField
                label="State"
                iconName="map"
                value={userData.state}
                onChangeText={text => handleInputChange('state', text)}
            
            />
            <TextField
                label="Zip Code"
                iconName="markunread-mailbox"
                value={userData.zipcode}
                onChangeText={text => handleInputChange('zipcode', text)}
            
            />
            <TextField
                label="Provide Services"
                iconName="directions"
                value={userData.provideservice}
                onChangeText={text => handleInputChange('provideservice', text)}
            
            />

            <Button text="Update" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    profileContainer: { alignItems: 'center', marginBottom: 20 },
    profileImageContainer: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10 , marginTop:5},
    imageUnavailableText: { fontSize: 14, color: 'gray', fontStyle: 'italic' },
    profileImage: { width: 100, height: 100, borderRadius: 40, marginBottom: 10 },
    profileName: { fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 14 },
    text: { fontSize: 14, color: 'black', marginBottom: 10, borderRadius: 20, lineHeight: 30, fontWeight: 'bold', padding: 25, backgroundColor: '#EEEDEB' },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: 'black' }
});

export default GeneralTab;
