// ResultScreen.js
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
// REMOVE: import * as SQLite from 'expo-sqlite'; // No longer needed here
import DirectorsList from '../components/DirectorList.js';
import TopRated from '../components/TopRated.js';
import MoviesByYear from '../components/MoviesByYear.js';
import sharedStyles from '../components/styles/sharedStyles.js';

// CORRECT: Receive db prop directly from App.js via navigation stack
export default function Results({ db }) { // Now correctly receives db
  const route = useRoute();
  const { queryType, searchTerm } = route.params; // Destructure searchTerm too

  let content;
  switch (queryType) {
    case 'DirectorsList':
      content = <DirectorsList db={db} />;
      break;
    case 'TopRated':
      content = <TopRated db={db} />;
      break;
    case 'MoviesByYear':
      content = <MoviesByYear db={db} />;
      break;
    case 'FreeTextSearch': // Handle the FreeTextSearch from HomeScreen
      // You'll need to create a component or modify an existing one to handle this.
      // For now, let's just display the search term.
      // You might pass 'db' and 'searchTerm' to a dedicated search results component.
      content = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#FFF', marginBottom: 10 }}>
            Searching for: "{searchTerm}"
          </Text>
          <Text style={{ fontSize: 14, color: '#AAA' }}>
            (Implement actual search logic here, e.g., filter movies by title/director)
          </Text>
        </View>
      );
      break;
    default:
      content = <Text style={sharedStyles.errorText}>Invalid queryType</Text>;
  }

  return (
    <SafeAreaView style={sharedStyles.safeArea}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>{content}</View>
    </SafeAreaView>
  );
}