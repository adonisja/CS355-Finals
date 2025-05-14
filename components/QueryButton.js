import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function QueryButton({ label, queryType, navigation }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Results', { queryType })}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
});