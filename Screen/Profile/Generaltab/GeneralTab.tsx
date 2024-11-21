import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TextField from '../TextField';
import Button from '../Button';
import auth from '@react-native-firebase/auth';
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
        photouri: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        zipcode: ''
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const [user, setUser] = useState(null);
    
    const { email } = route.params;  // Extract the email from the route parameters

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userDoc = await firestore().collection('users').doc(email).get();
          if (userDoc.exists) {
            setUser(userDoc.data());  // Set the user data
          } else {
            console.log('User not found');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      }})
    // useEffect(() => {
    //     // Get the current logged-in user
    // //     const currentUser = auth().currentUser;
    // // console.log({currentUser});
    // // console.log({currentUser:currentUser?.uid});
    
    // //     if (!currentUser) {
    // //       Alert.alert("Not Logged In", "Please log in to view your profile.");
    // //       //setLoading(false);
    // //       return;
    // //     }
    
    //     const userId = currentUser.uid;
    
    //     // Fetch user profile from Firestore
    //     const reference = firestore().collection('Profile').doc(userId);
    
    //     reference
    //       .get()
    //       .then(snapshot => {
    //         if (snapshot.exists) {
    //           const data = snapshot.data();
    //           setUserData({
    //             username: data?.username || '',
    //             designation: data?.designation || '',
    //             email: data?.email || '',
    //             phoneNumber: data?.phoneNumber || '',
    //             address: data?.address || '',
    //             city: data?.city || '',
    //             state: data?.state || '',
    //             zipcode: data?.zipcode || '',
    //             provideservice: data?.provideservice || '',
    //             photouri: data?.photouri || '',
    //           });
    //         } else {
    //           Alert.alert("User Not Found", "No profile data available for this user.");
    //         }
    //       })
    //       .catch(error => {
    //         console.error("Error fetching data: ", error);
    //         Alert.alert("Error", "There was an error fetching your profile data.");
    //       })
    //       .finally(() => {
    //         //setLoading(false);
    //       });
    //   }, []);

    // const userId = 'NnqdWLZou7ASfkjGk3UG';

    // useEffect(() => {
    //     const reference = firestore().collection('Profile').doc(userId);

    //     reference
    //         .get()
    //         .then(snapshot => {
    //             if (snapshot.exists) {
    //                 const data = snapshot.data();
    //                 console.log({data});
                    
    //                 setUserData({
    //                     username: data?.username || '',
    //                     designation: data?.designation || '',
    //                     email: data?.email || '',
    //                     phoneNumber: data?.phoneNumber || '',
    //                     address: data?.address || '',
    //                     city: data?.city || '',
    //                     state: data?.state || '',
    //                     zipcode: data?.zipcode || '',
    //                     provideservice: data?.provideservice || '',
    //                     photouri: data?.photouri,
                        
    //                 });
    //             } else {
    //                 console.log("User not found");
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data: ", error);
    //             Alert.alert("Error", "There was an error fetching your profile data.");
    //         });
    // }, []);

    const validateForm = () => {
        const validationErrors: any = {};
        let isValid = true;

        // Validate Full Name
        if (!userData.username.trim()) {
            validationErrors.username = 'Full Name is required';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!userData.email.trim()) {
            validationErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(userData.email)) {
            validationErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Validate Phone Number
        const phoneRegex = /^[0-9]{11}$/;
        if (!userData.phoneNumber.trim()) {
            validationErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(userData.phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        // Validate Zip Code
        const zipCodeRegex = /^[0-9]{5}$/;
        if (!userData.zipcode.trim()) {
            validationErrors.zipcode = 'Zip code is required';
            isValid = false;
        } else if (!zipCodeRegex.test(userData.zipcode)) {
            validationErrors.zipcode = 'Please enter a valid 5-digit zip code';
            isValid = false;
        }

        setErrors(validationErrors); // Set the error messages to state
        return isValid;
    };

    const handleUpdate = () => {
        if (validateForm()) {
            const reference = firestore().collection('Profile').doc(userId);

            reference
                .update({
                    username: userData.username,
                    designation: userData.designation,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,
                    city: userData.city,
                    state: userData.state,
                    zipcode: userData.zipcode,
                    provideservice: userData.provideservice
                })
                .then(() => {
                    Alert.alert("Profile Updated", "Your profile has been updated successfully!");
                    console.log("Profile Successfully updated")
                })
                .catch(error => {
                    console.error("Error updating profile: ", error);
                    Alert.alert("Update Failed", "There was an error updating your profile.");
                });
        } else {
            Alert.alert("Validation Failed", "Please fill out the required fields correctly.");
        }
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
                <Text style={styles.profileName}>{userData.username}</Text>
                <View style={styles.container}>
                    <Text style={styles.aboutlabel}>About</Text>
                    <Text style={styles.text}>Lorem ipsum is simply dummy text of the printing and typesetting...</Text>
                </View>
            </View>

            <TextField
                label="Full Name"
                iconName="person"
                value={userData.username}
                onChangeText={(text: string) => handleInputChange('username', text)}
                error={errors.username}
                secureTextEntry={false}
                accessibilityLabel="Full Name"  // Correctly adding the accessibilityLabel
            />

            <TextField
                label="Designation"
                iconName="school"
                value={userData.designation}
                onChangeText={(text: string) => handleInputChange('designation', text)}
                error=""
                secureTextEntry={false}
                accessibilityLabel="Designation"  // Add accessibilityLabel for Designation
            />

            <TextField
                label="Email"
                iconName="email"
                value={userData.email}
                onChangeText={(text: string) => handleInputChange('email', text)}
                error={errors.email}
                secureTextEntry={false}
                accessibilityLabel="Email"  // Add accessibilityLabel for Email
            />

            <TextField
                label="Phone No."
                iconName="phone"
                value={userData.phoneNumber}
                onChangeText={(text: string) => handleInputChange('phoneNumber', text)}
                error={errors.phoneNumber}
                secureTextEntry={false}
                accessibilityLabel="Phone No."  // Add accessibilityLabel for Phone No.
            />

            <TextField
                label="Address"
                iconName="location-on"
                value={userData.address}
                onChangeText={(text: string) => handleInputChange('address', text)}
                error=""
                secureTextEntry={false}
                accessibilityLabel="Address"  // Add accessibilityLabel for Address
            />

            <TextField
                label="City"
                iconName="location-city"
                value={userData.city}
                onChangeText={(text: string) => handleInputChange('city', text)}
                error=""
                secureTextEntry={false}
                accessibilityLabel="City"  // Add accessibilityLabel for City
            />

            <TextField
                label="State"
                iconName="map"
                value={userData.state}
                onChangeText={(text: string) => handleInputChange('state', text)}
                error=""
                secureTextEntry={false}
                accessibilityLabel="State"  // Add accessibilityLabel for State
            />

            <TextField
                label="Zip Code"
                iconName="markunread-mailbox"
                value={userData.zipcode}
                onChangeText={(text: string) => handleInputChange('zipcode', text)}
                error={errors.zipcode}
                secureTextEntry={false}
                accessibilityLabel="Zip Code"  // Add accessibilityLabel for Zip Code
            />

            <TextField
                label="Provide Services"
                iconName="directions"
                value={userData.provideservice}
                onChangeText={(text: string) => handleInputChange('provideservice', text)}
                error=""
                secureTextEntry={false}
                accessibilityLabel="Provide Services"  // Add accessibilityLabel for Provide Services
            />

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
