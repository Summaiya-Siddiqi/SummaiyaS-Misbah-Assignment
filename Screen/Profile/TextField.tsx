import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

const TextField = ({ label, iconName, value, onChangeText, error,secureTextEntry,accessibilityLabel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.errorInput]}>
        {iconName && <Icon name={iconName} size={20} color="#888" style={styles.icon} />}
        <TextInput
          style={[styles.input, error && styles.errorInputText]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry= {secureTextEntry}
          accessibilityLabel={accessibilityLabel}        
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#EEEDEB',
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: '#F44336',  
    backgroundColor: '#FFEBEE', 
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    height: 45,
    color: 'black',
    fontWeight: 'bold',
  },
  errorInputText: {
    color: '#F44336', 
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextField;
