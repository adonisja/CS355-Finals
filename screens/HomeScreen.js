import React from 'react';
import { Text, StyleSheet, ImageBackground, SafeAreaView, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import QueryButton from '../components/QueryButton';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const nav = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/image/welcome.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.85)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <Ionicons name="film-outline" size={36} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.headerText}>IMDB Query Hub</Text>
          </View>

          <View style={styles.buttonGroup}>
            <QueryButton label="Directors By Name" queryType="DirectorsList" navigation={nav} />
            <QueryButton label="Top Rated Movies" queryType="TopRated" navigation={nav} />
            <QueryButton label="Movies By Year" queryType="MoviesByYear" navigation={nav} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
});
