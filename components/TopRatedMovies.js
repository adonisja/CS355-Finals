import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../ResultScreenStyle';

const TopRatedMovies = ({ data }) => {
  const sorted = [...data].sort((a, b) => b.rating - a.rating);
  const top5 = sorted.slice(0, 5);

  return (
    <View style={styles.topRated.sectionContainer}>
      <Text style={styles.topRated.sectionHeader}>🎯 Top 5 Movies</Text>
      <FlatList
        data={top5}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.topRated.movieItem}>
            <Text style={styles.topRated.movieText}>{index + 1}. {item.title} ({item.year}) - ⭐ {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TopRatedMovies;