import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';

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
      >
        <View style={styles.overlay}>
          <Text style={styles.cardText}>{label}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '85%',
    height: 140,
    borderRadius: 20,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cardText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
