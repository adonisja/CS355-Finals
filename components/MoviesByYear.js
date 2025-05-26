// MoviesByYear.js
import React, { useEffect, useState } from 'react';
import { SectionList, Text, View, TextInput, Button, Keyboard, ActivityIndicator } from 'react-native';
import sharedStyles from './styles/sharedStyles';

const MoviesByYear = ({ db }) => { 
  const [year, setYear] = useState('2020');
  const [allRows, setAllRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const fetchMovies = async (targetYear) => { 
    setIsLoading(true);
    try {
      if (!db) { 
        console.warn('DB not available in MoviesByYear.js');
        setErrorMsg('Database not ready.');
        setAllRows([]);
        return;
      }

      const rows = await db.getAllAsync( 
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
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (db) {
        fetchMovies(year);
    }
  }, [db]); 

  const handleSearch = () => {
    Keyboard.dismiss();
    if (!db) { 
        setErrorMsg('Database not ready. Please wait.');
        return;
    }
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
          placeholderTextColor="#BBBBBB"
          style={sharedStyles.searchInput}
          maxLength={4}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <Button title="Search" onPress={handleSearch} color="#E50914" />
      </View>

      {isLoading ? (
        <View style={sharedStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#E50914" />
          <Text style={sharedStyles.loadingText}>Searching movies...</Text>
        </View>
      ) : errorMsg ? (
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
            <Text style={sharedStyles.emptyMessage}>
              No movies to display.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default MoviesByYear;