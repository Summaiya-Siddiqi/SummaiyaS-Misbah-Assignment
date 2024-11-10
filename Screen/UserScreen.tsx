import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';


interface User {
  username: string;
  email: string;
  name: string;
  companyName?: string; 
  phoneNumber?: string; 
}

const UserScreen = () => {
  
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .onSnapshot(snapshot => {
        
        const userList: User[] = snapshot.docs.map(doc => doc.data() as User);
        setUsers(userList); 
      });

    return () => unsubscribe(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Existing Users</Text>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.company}>{item.companyName}</Text>
             <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
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
  username: {
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
 
});

export default UserScreen;
