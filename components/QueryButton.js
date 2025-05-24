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
  PopularActors: require('../assets/image/popular_actors.jpg'), // Added a new image for a new category
};

export default function QueryButton({ label, queryType, navigation, customWidth, customHeight }) {
  const imageSource = imageMap[queryType];

  return (
    <TouchableOpacity
      // Apply customWidth and customHeight if provided, otherwise fallback to default
      style={[
        styles.cardContainer,
        customWidth && { width: customWidth }, // Apply custom width
        customHeight && { height: customHeight }, // Apply custom height
      ]}
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

const { width: screenWidth } = Dimensions.get('window'); // Renamed to avoid conflict with 'width' prop

const styles = StyleSheet.create({
  cardContainer: {
    // Default values, overridden by props if provided
    width: screenWidth * 0.85, // Original large width, used if customWidth is not provided
    height: 140, // Original height, used if customHeight is not provided
    borderRadius: 10, // Slightly reduced for a tighter grid
    marginVertical: 8, // Reduced margin for tighter grid
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000', // Added shadow properties for consistency
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // alignSelf: 'center', // Removed this as it's now part of a flexWrap container
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    borderRadius: 10, // Match cardContainer borderRadius
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Match cardContainer borderRadius
    paddingHorizontal: 10,
  },
  cardText: {
    color: '#FFF',
    fontSize: 18, // Slightly reduced font size for smaller cards
    fontWeight: 'bold',
    letterSpacing: 0.8, // Slightly reduced letter spacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});