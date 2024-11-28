import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures'; // Add this import
import GeneralTab from './Generaltab/GeneralTab';
import PasswordTab from './PasswordTab';

const { width } = Dimensions.get('window');

const Profile = () => {
  const [activeTab, setActiveTab] = useState('General');

  // Handle swipe gestures
  const onSwipeLeft = () => {
    if (activeTab === 'General') setActiveTab('Password');
  };

  const onSwipeRight = () => {
    if (activeTab === 'Password') setActiveTab('General');
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      style={styles.container}
    >
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('General')}
          style={activeTab === 'General' ? styles.activeTabButton : styles.tabButton}
        >
          <Text style={activeTab === 'General' ? styles.activeTabText : styles.tabText}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Password')}
          style={activeTab === 'Password' ? styles.activeTabButton : styles.tabButton}
        >
          <Text style={activeTab === 'Password' ? styles.activeTabText : styles.tabText}>Password</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activeTab === 'General' ? <GeneralTab /> : <PasswordTab />}
      </ScrollView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FEFBF6' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20 },
  activeTabButton: { borderBottomWidth: 2, borderBottomColor: '#3B82F6' },
  tabText: { fontSize: 16, color: 'gray' },
  activeTabText: { fontSize: 16, color: '#3B82F6', fontWeight: 'bold' },
  scrollContainer: { paddingBottom: 20 },
});

export default Profile;
