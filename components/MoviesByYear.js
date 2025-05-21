import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../ResultScreenStyle';

const MoviesByYear = ({ data }) => {
  const yearCount = data.reduce((acc, movie) => {
    acc[movie.year] = (acc[movie.year] || 0) + 1;
    return acc;
  }, {});

  const years = Object.keys(yearCount).sort((a, b) => b - a);

  return (
    <View style={styles.moviesByYear.sectionContainer}>
      <Text style={styles.moviesByYear.sectionHeader}>📆 Movies By Year</Text>
      {years.map((year) => (
        <View key={year} style={styles.moviesByYear.yearItem}>
          <Text style={styles.moviesByYear.yearText}>{year}: {yearCount[year]} movies</Text>
        </View>
      ))}
    </View>
  );
};

export default MoviesByYear;
