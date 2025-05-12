// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const nav = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/image/welcome.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>IMBD Query Hub</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Results', { queryType: 'Directors' })}
        >
          <Text style={styles.buttonText}>Directors By Name</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Results', { queryType: 'TopRated' })}
        >
          <Text style={styles.buttonText}>Top Rated Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Results', { queryType: 'MoviesByYear' })}
        >
          <Text style={styles.buttonText}>Movies By Year</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1,
    width: '100%',
    height: '100%'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'
  },
});
