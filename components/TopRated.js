import React, { useState, useEffect } from 'react';
import { SectionList, Text, View } from 'react-native';
import sharedStyles from './styles/sharedStyles';

const TopRated = ({ db }) => {
  const [allRows, setAllRows] = useState([]);

  useEffect(() => {
    try {
      const rows = db.getAllSync(`
        SELECT m.title, r.rating, r.votes 
        FROM movies AS m 
        JOIN ratings AS r ON m.id = r.movie_id 
        ORDER BY r.rating DESC
        LIMIT 50
      `);
      setAllRows(rows);
    } catch (error) {
      console.error('Database query failed:', error);
    }
  }, [db]);

  if (allRows.length === 0) {
    return <Text style={sharedStyles.errorText}>Loading top rated movies...</Text>;
  }

  return (
    <SectionList
      sections={[{ title: 'Top Rated Movies', data: allRows }]}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => (
        <View style={sharedStyles.movieItem}>
          <Text style={sharedStyles.movieTitle}>{item.title}</Text>
          <Text style={sharedStyles.movieDetails}>
            Rating: {item.rating} | Votes: {item.votes}
          </Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={sharedStyles.sectionHeader}>
          <Text style={sharedStyles.sectionTitle}>{section.title}</Text>
        </View>
      )}
      contentContainerStyle={sharedStyles.listContent}
    />
  );
};

export default TopRated;
