import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Button from './Profile/Button';

interface User {
  name: string;
  email: string;
  companyName?: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  photoUri?: string;
  designation?: string;
  state?: string;
  city?: string;
  address?: string;
  provideservice?: string;
  zipcode?: string;
  id?: string;
}

const UserScreen = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const snapshot = await firestore().collection('Profile').get();
        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        console.log('===>',{userList});
        
      } catch (error) {
        console.error('Error fetching profiles:', error);
        Alert.alert('Error', 'Failed to fetch profiles from Firestore.');
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profileId) => {
    navigation.navigate('Profile', { profileId });
    console.log('Profile ID:', profileId);
  };
  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('Profile').doc(userId).delete();
              setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
              Alert.alert('Success', 'User deleted successfully.');
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Existing Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            {item.photoUri ? (
              <Image source={{ uri: item.photoUri }} style={styles.profileImage} />
            ) : (
              <Text style={styles.noImageText}>No Image Available</Text>
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.infoText}>{item.email}</Text>
            {item.companyName && <Text style={styles.infoText}>Company: {item.companyName}</Text>}
            {item.phoneNumber && <Text style={styles.infoText}>Phone: {item.phoneNumber}</Text>}
            {item.address && <Text style={styles.infoText}>Address: {item.address}</Text>}
            <Text style={styles.infoText}>City: {item.city || 'N/A'}</Text>
            <Text style={styles.infoText}>State: {item.state || 'N/A'}</Text>
            <Text style={styles.infoText}>Zip Code: {item.zipcode || 'N/A'}</Text>
            <Text style={styles.infoText}>Service: {item.provideservice || 'N/A'}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleProfileClick(item.id)} style={styles.editButton}>
                <Text style={styles.buttonText}>Edit User</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete User</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  userCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default UserScreen;
