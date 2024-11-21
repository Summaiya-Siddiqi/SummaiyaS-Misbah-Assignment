import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Button from './Profile/Button';

interface User {
  fullname: string;
  email: string;
  
  companyName?: string; 
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  photoUri?: string;  // Add image URL for the user profile picture
  designation?: string;
  state?: string;
  city?: string;
  address?: string;
  provideservice?: string;
  zipcode?: string;
  id?:string
}

const UserScreen = ({navigation}) => {
  const [users, setUsers] = useState<User[]>([]);

  // const unsub = async () =>{
  //   await firestore()
  //   .collection('Users')
    
  //   .onSnapshot(snapshot => {
  //     const userList: User[] = snapshot.docs.map(doc => doc.data() as User);
  //     setUsers(userList); 
  //     console.log("Userlist "+userList);
  //   });
  // }
  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('Profile')
      
  //     .onSnapshot(snapshot => {
  //       const userList: User[] = snapshot.docs.map(doc => doc.data() as User);
  //       setUsers(userList); 
  //       console.log({userList});
  //     });
  //   return () => unsubscribe(); 
  // }, []);
  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const snapshot = await firestore().collection('Profile').get();
        const userList = snapshot.docs.map(doc => ({
          id: doc.id, // Firebase document ID
          ...doc.data(), // Profile data
        }));
        setUsers(userList); 
      } catch (error) {
        console.error('Error fetching profiles:', error);
        Alert.alert('Error', 'Failed to fetch profiles from Firestore.');
      }
    };

    fetchProfiles();
  }, []);
  const handleProfileClick = (profileId, profileName) => {
    Alert.alert('Profile Selected', `Profile ID: ${profileId}\nName: ${profileName}`);
    console.log('Profile ID:', profileId); // Use this for further actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Existing Users</Text>

      <FlatList 
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard} >
            <Text style={styles.fullname} >{item.fullname}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.company}>{item.companyName}</Text>
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            <Text style={styles.phoneNumber}>{item.address}</Text>
            <Text style={styles.phoneNumber}>{item.city}</Text>
            <Text style={styles.phoneNumber}>{item.zipcode}</Text>
            <Text style={styles.phoneNumber}>{item.designation}</Text>
            <Text style={styles.phoneNumber}>{item.state}</Text>
            <Text style={styles.phoneNumber}>{item.provideservice}</Text>

            {item.photoUri ? (
              <Image source={{ uri: item.photoUri }} style={styles.profileImage} />
            ) : (
              <Text style={styles.noImageText}>No Image Available</Text>
            )}

            {item.latitude && item.longitude ? (
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Latitude: {item.latitude}</Text>
                <Text style={styles.locationText}>Longitude: {item.longitude}</Text>
              </View>
            ) : (
              <Text style={styles.noLocationText}>Location not available</Text>
            )}
            <Button   onPress={() => handleProfileClick(item.id)} text={"Edit User"}></Button>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#89c7d9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 5, 
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  fullname: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  email: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 5,
  },
  name: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 5,
  },
  company: {
    fontSize: 14,
    color: '#011936',
    marginTop: 5,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#1446A0',
    marginTop: 5,
  },
  profileImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  noImageText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  locationContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  noLocationText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default UserScreen;
