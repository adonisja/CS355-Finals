import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'; 

import DirectorsList from '../components/DirectorList.js';
import TopRated from '../components/TopRated.js';
import MoviesByYear from '../components/MoviesByYear.js';
import sharedStyles from '../components/styles/sharedStyles.js';


export default function Results({ db }) { 
  const route = useRoute();
  const { queryType, searchTerm } = route.params; 

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
    case 'FreeTextSearch': 
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