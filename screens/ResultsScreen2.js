import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import openDB from '../database/AccessScreen';
import { useRoute } from '@react-navigation/native';

export default function ResultsScreen() {
  const route = useRoute();
  const { queryType } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await openDB();
        let sql = '';
        let params = [];

        switch (queryType) {
          case 'Directors':
            sql = `SELECT DISTINCT director FROM movies WHERE director LIKE ? ORDER BY director LIMIT 50`;
            params = [`%${searchTerm}%`];
            break;
          case 'TopRated':
            sql = `SELECT title, rating FROM movies ORDER BY rating DESC LIMIT 50`;
            break;
          case 'MoviesByYear':
            sql = `SELECT title, year FROM movies WHERE year LIKE ? ORDER BY year LIMIT 50`;
            params = [`%${searchTerm}%`];
            break;
          default:
            console.error('Invalid query type');
            setLoading(false);
            return;
        }

        db.transaction(tx => {
          tx.executeSql(sql, params, (_, { rows }) => {
            setData(rows._array);
            setLoading(false);
          }, (txObj, error) => {
            console.error('Query Error:', error);
            setLoading(false);
            return true;
          });
        });
      } catch (error) {
        console.error('Database Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [queryType, searchTerm]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={queryType === 'MoviesByYear' ? 'Search by Year' : 'Search by Name'}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title || item.director}</Text>
              {item.rating && <Text style={styles.rating}>⭐ {item.rating}</Text>}
              {item.year && <Text style={styles.year}>{item.year}</Text>}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchBar: { padding: 12, marginBottom: 16, borderRadius: 8, backgroundColor: '#f0f0f0', fontSize: 16 },
  item: { padding: 16, backgroundColor: '#f8f8f8', borderRadius: 8, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  itemText: { fontSize: 18, fontWeight: '600' },
  rating: { fontSize: 16, color: '#E50914' },
  year: { fontSize: 14, color: '#555' },
  loader: { marginTop: 20 }
});