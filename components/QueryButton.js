// QueryButton.js
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const imageMap = {
  DirectorsList: require('../assets/image/director_cut.webp'),
  TopRated: require('../assets/image/top_rated.jpg'),
  MoviesByYear: require('../assets/image/movie_timeline.jpg'),
};

export default function QueryButton({ label, queryType, navigation }) {
  const imageSource = imageMap[queryType];

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Results', { queryType })}
      activeOpacity={0.85}
    >
      <ImageBackground
        source={imageSource}
        style={styles.card}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        >
          <Text style={styles.cardText}>{label}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    width: '85%',
    height: 140,
    borderRadius: 20,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
    alignSelf: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  cardText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
