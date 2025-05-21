import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

// ─────────────────────────────────────────────
// DIRECTORS LIST
// ─────────────────────────────────────────────
const DirectorsList = ({ db }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionListRef = useRef(null);
  const [sectionData, setSectionData] = useState([]);
  const [letters, setLetters] = useState([]);
  const [activeLetter, setActiveLetter] = useState('');

  useEffect(() => {
    const allRows = db.getAllSync(`
      SELECT p.name AS director_name, COUNT(*) AS movies_directed 
      FROM people AS p 
      JOIN directors AS d ON d.person_id = p.id 
      GROUP BY p.name 
      ORDER BY director_name ASC
    `);

    const groupedData = allRows.reduce((acc, director) => {
      const firstLetter = director.director_name[0].toUpperCase();
      const existingGroup = acc.find(g => g.title === firstLetter);
      if (existingGroup) {
        existingGroup.data.push(director);
      } else {
        acc.push({ title: firstLetter, data: [director] });
      }
      return acc;
    }, []);

    setSectionData(groupedData);
    setLetters(groupedData.map(section => section.title));
    if (groupedData.length > 0) {
      setActiveLetter(groupedData[0].title);
    }
  }, [db]);

  const filteredData = searchQuery
    ? sectionData
        .map(section => ({
          ...section,
          data: section.data.filter(item =>
            item.director_name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(section => section.data.length > 0)
    : sectionData;

  const scrollToSection = (sectionIndex) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      viewOffset: 0,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.directorsList.searchContainer}>
        <TextInput
          style={styles.directorsList.searchInput}
          placeholder="Search directors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.directorsList.mainContainer}>
        <SectionList
          ref={sectionListRef}
          sections={filteredData}
          keyExtractor={(item, index) => item.director_name + index}
          style={styles.directorsList.listContainer}
          contentContainerStyle={styles.directorsList.listContent}
          renderItem={({ item }) => (
            <View style={styles.directorsList.directorItem}>
              <Text style={styles.directorsList.directorName}>{item.director_name}</Text>
              <Text style={styles.directorsList.movieCount}>{item.movies_directed} movies</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.directorsList.sectionHeader}>
              <Text style={styles.directorsList.sectionTitle}>{section.title}</Text>
            </View>
          )}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setActiveLetter(viewableItems[0].section.title);
            }
          }}
          stickySectionHeadersEnabled
        />
        <ScrollView
          style={styles.directorsList.letterScroller}
          contentContainerStyle={styles.directorsList.letterContainer}
          showsVerticalScrollIndicator={false}
        >
          {letters.map((letter, index) => (
            <TouchableOpacity
              key={letter}
              onPress={() => scrollToSection(index)}
              style={styles.directorsList.letterButton}
            >
              <Text
                style={[
                  styles.directorsList.letterText,
                  letter === activeLetter && styles.directorsList.activeLetter,
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────
// TOP RATED
// ─────────────────────────────────────────────
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
    return <Text style={styles.shared.errorText}>Loading top rated movies...</Text>;
  }

  return (
    <SectionList
      sections={[{ title: 'Top Rated Movies', data: allRows }]}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => (
        <View style={styles.topRated.movieItem}>
          <Text style={styles.topRated.movieTitle}>{item.title}</Text>
          <Text style={styles.topRated.movieDetails}>
            Rating: {item.rating} | Votes: {item.votes}
          </Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.shared.sectionHeader}>
          <Text style={styles.shared.sectionTitle}>{section.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.topRated.listContent}
    />
  );
};

// ─────────────────────────────────────────────
// MOVIES BY YEAR
// ─────────────────────────────────────────────
const MoviesByYear = ({ db }) => {
  const [allRows, setAllRows] = useState([]);

  useEffect(() => {
    try {
      const rows = db.getAllSync(`
        SELECT m.title AS movie_title, p.name AS director_name 
        FROM movies AS m 
        JOIN directors AS d ON m.id = d.movie_id 
        JOIN people AS p ON d.person_id = p.id 
        WHERE m.year = 2020
      `);
      setAllRows(rows);
    } catch (error) {
      console.error('Database query failed:', error);
    }
  }, [db]);

  if (allRows.length === 0) {
    return <Text style={styles.shared.errorText}>Loading movies by year...</Text>;
  }

  return (
    <SectionList
      sections={[{ title: '2020 Movies', data: allRows }]}
      keyExtractor={(item, index) => item.movie_title + index}
      renderItem={({ item }) => (
        <View style={styles.moviesByYear.movieItem}>
          <Text style={styles.moviesByYear.movieTitle}>{item.movie_title}</Text>
          <Text style={styles.moviesByYear.directorName}>Director: {item.director_name}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.moviesByYear.sectionHeader}>
          <Text style={styles.moviesByYear.sectionTitle}>{section.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.moviesByYear.listContent}
    />
  );
};

// ─────────────────────────────────────────────
// RESULTS SCREEN EXPORT
// ─────────────────────────────────────────────
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
      content = <Text style={styles.shared.errorText}>Invalid queryType</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shared.container}>{content}</View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLESHEET
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shared: {
    container: { flex: 1 },
    sectionHeader: {
      backgroundColor: '#E50914',
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
  },
  directorsList: {
    searchContainer: {
      padding: 15,
      backgroundColor: '#f5f5f5',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    searchInput: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      fontSize: 16,
    },
    mainContainer: {
      flex: 1,
      position: 'relative',
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: 40,
    },
    directorItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    directorName: {
      fontSize: 16,
    },
    movieCount: {
      fontSize: 14,
      color: '#666',
    },
    letterScroller: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: 20,
      backgroundColor: 'rgba(0,0,0,0.03)',
      paddingVertical: 10,
    },
    letterContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    letterButton: {
      paddingVertical: 2,
    },
    letterText: {
      fontSize: 10,
      color: '#E50914',
      fontWeight: 'bold',
    },
    activeLetter: {
      color: '#000',
      fontSize: 12,
    },
    sectionHeader: {
      backgroundColor: '#E50914',
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  },
  topRated: {
    listContent: {
      flexGrow: 1,
      paddingBottom: 40,
    },
    movieItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: 'white',
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    movieDetails: {
      fontSize: 14,
      color: '#666',
    },
  },
  moviesByYear: {
    listContent: {
      flexGrow: 1,
      paddingBottom: 40,
    },
    movieItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: 'white',
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    directorName: {
      fontSize: 14,
      color: '#666',
    },
    sectionHeader: {
      backgroundColor: '#E50914',
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  },
});
