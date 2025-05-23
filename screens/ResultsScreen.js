import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import DirectorsList from '../components/DirectorList.js';
import TopRated from '../components/TopRated.js';
import MoviesByYear from '../components/MoviesByYear.js';
import sharedStyles from '../components/styles/sharedStyles.js';

export default function Results() {
  const route = useRoute();
  const { queryType } = route.params;
  const db = SQLite.openDatabaseSync('imdb.db');

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
    default:
      content = <Text style={sharedStyles.errorText}>Invalid queryType</Text>;
  }

  return (
    <SafeAreaView style={sharedStyles.safeArea}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>{content}</View>
    </SafeAreaView>
  );
}
