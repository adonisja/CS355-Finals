import React from 'react';
import { Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QueryButton from '../components/QueryButton';

export default function HomeScreen() {
  const nav = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/image/welcome.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.header}>IMDB Query Hub</Text>
        <QueryButton label="Directors By Name" queryType="DirectorsList" navigation={nav} />
        <QueryButton label="Top Rated Movies" queryType="TopRated" navigation={nav} />
        <QueryButton label="Movies By Year" queryType="MoviesByYear" navigation={nav} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 40,
  },
});