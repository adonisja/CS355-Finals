import React, { useEffect, useState } from 'react';
import {
  SectionList,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import sharedStyles from './styles/sharedStyles';

const MoviesByYear = ({ db }) => {
  const [year, setYear] = useState('2020');
  const [allRows, setAllRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchMovies = (targetYear) => {
    try {
      const rows = db.getAllSync(
        `
        SELECT m.title AS movie_title, p.name AS director_name
        FROM movies AS m
        JOIN directors AS d ON m.id = d.movie_id
        JOIN people AS p ON d.person_id = p.id
        WHERE m.year = ?
        `,
        [parseInt(targetYear)]
      );

      setAllRows(rows);
      setErrorMsg(rows.length === 0 ? `No movies found for ${targetYear}` : '');
    } catch (error) {
      console.error('Database query failed:', error);
      setErrorMsg('Query failed. Please try again.');
      setAllRows([]);
    }
  };

  useEffect(() => {
    fetchMovies(year);
  }, []);

  const handleSearch = () => {
    Keyboard.dismiss();
    if (/^\d{4}$/.test(year)) {
      fetchMovies(year);
    } else {
      setErrorMsg('Please enter a valid 4-digit year.');
      setAllRows([]);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.searchContainer}>
        <TextInput
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          placeholder="Enter year (e.g., 2020)"
          style={sharedStyles.searchInput}
          maxLength={4}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {errorMsg ? (
        <Text style={sharedStyles.errorText}>{errorMsg}</Text>
      ) : (
        <SectionList
          sections={[{ title: `Movies from ${year}`, data: allRows }]}
          keyExtractor={(item, index) => item.movie_title + index}
          renderItem={({ item }) => (
            <View style={sharedStyles.movieItem}>
              <Text style={sharedStyles.movieTitle}>{item.movie_title}</Text>
              <Text style={sharedStyles.directorName}>
                Director: {item.director_name}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={sharedStyles.sectionHeader}>
              <Text style={sharedStyles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          contentContainerStyle={sharedStyles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
              No movies to display.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default MoviesByYear;
