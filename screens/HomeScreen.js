import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, Dimensions, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QueryButton from '../components/QueryButton'; 
import { Ionicons } from '@expo/vector-icons';


const dummyMoviePosters = [
  { id: '1', title: 'Arrival', image: require('../assets/image/arrival.jpeg') },
  { id: '2', title: 'Dune', image: require('../assets/image/dune.jpeg') },
  { id: '3', title: 'Interstellar', image: require('../assets/image/interstellar.jpeg') },
  { id: '4', title: 'Inception', image: require('../assets/image/inception.jpeg') },
  { id: '5', title: 'Blade Runner 2049', image: require('../assets/image/blade_runner_2049.jpeg') },
  { id: '6', title: 'Gravity', image: require('../assets/image/gravity.jpeg') },
  { id: '7', title: 'Parasite', image: require('../assets/image/parasite.jpeg') },
];

const { width } = Dimensions.get('window'); 

export default function HomeScreen({ db }) { 
  const nav = useNavigation();
  const [searchText, setSearchText] = useState('');

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.moviePosterContainer}
      onPress={() => {
        console.log(`Tapped on movie: ${item.title}`);
        
      }}
    >
      <Image source={item.image} style={styles.moviePoster} />
      <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log('Searching for:', searchText);
      nav.navigate('Results', { queryType: 'FreeTextSearch', searchTerm: searchText });
      setSearchText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="film-outline" size={36} color="#FFF" style={{ marginRight: 10 }} />
        <Text style={styles.headerText}>IMDB Query Hub</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentArea}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movie titles, directors, actors..."
            placeholderTextColor="#AAA"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Trending Movies Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Movies</Text>
          <TouchableOpacity onPress={() => console.log('See All Trending')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dummyMoviePosters}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moviePosterList}
        />

        {/* Browse Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
        </View>
        <View style={styles.categoryGrid}>
          {/* I'll pass a custom width to QueryButton */}
          <QueryButton
            label="Directors By Name"
            queryType="DirectorsList"
            navigation={nav}
            customWidth={(width / 2) - 30} // Approx half screen width
            customHeight={120} // Slightly smaller height for grid
          />
          <QueryButton
            label="Top Rated Movies"
            queryType="TopRated"
            navigation={nav}
            customWidth={(width / 2) - 30}
            customHeight={120}
          />
          <QueryButton
            label="Movies By Year"
            queryType="MoviesByYear"
            navigation={nav}
            customWidth={(width / 2) - 30}
            customHeight={120}
          />
          <QueryButton
            label="Popular Actors"
            queryType="PopularActors"
            navigation={nav}
            customWidth={(width / 2) - 30}
            customHeight={120}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#000', 
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  headerText: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#FFF',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 10, 
    paddingTop: 10,
  },
  // --- Search Bar Styles ---
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 8,
  },
  // --- Section Header Styles (for "Trending" and "Categories") ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 5, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  seeAllText: {
    color: '#0080ff', 
    fontSize: 14,
    fontWeight: '600',
  },
  // --- Movie Poster List Styles ---
  moviePosterList: {
    paddingRight: 10,
    paddingLeft: 5,
  },
  moviePosterContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: width * 0.28, 
  },
  moviePoster: {
    width: '100%',
    height: (width * 0.28) * 1.5, 
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#222', 
  },
  movieTitle: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  // --- Category Grid Styles ---
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', // Distribute items evenly
    marginTop: 10,
    paddingHorizontal: 5, // This padding will influence the (width / 2) - 30 calculation
  },
});