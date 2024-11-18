import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

const TextField = ({ label, iconName,value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {iconName && <Icon name={iconName} size={20} color="#888" style={styles.icon} />}
        <TextInput
          style={styles.input}
          value={value}        
          onChangeText={onChangeText} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight:'bold',color: 'black', marginBottom: 5 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding:8,
    backgroundColor: '#EEEDEB',
    paddingHorizontal: 10,
  
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 45, color :'black',fontWeight:'bold'},
});

export default TextField;
