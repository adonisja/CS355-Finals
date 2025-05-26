import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, Dimensions,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const imageMap = {
  DirectorsList: require('../assets/image/director_cut.webp'),
  TopRated: require('../assets/image/top_rated.jpg'),
  MoviesByYear: require('../assets/image/movie_timeline.jpg'),
  PopularActors: require('../assets/image/popular_actors.jpg'), 
};

export default function QueryButton({ label, queryType, navigation, customWidth, customHeight }) {
  const imageSource = imageMap[queryType];

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        customWidth && { width: customWidth }, 
        customHeight && { height: customHeight }, 
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

const { width: screenWidth } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  cardContainer: {
    
    width: screenWidth * 0.85, 
    height: 140, 
    borderRadius: 10, 
    marginVertical: 8, 
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    paddingHorizontal: 10,
  },
  cardText: {
    color: '#FFF',
    fontSize: 18, 
    fontWeight: 'bold',
    letterSpacing: 0.8, 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});